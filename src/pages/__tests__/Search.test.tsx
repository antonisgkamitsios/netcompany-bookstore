import { screen, waitFor } from '@testing-library/react';
import { expect, it } from 'vitest';
import { Search } from '../Search';

import { render } from '~/test/utilities';

import { QueryClientWrapper } from '~/test/utilities';
import { MemoryRouter } from 'react-router-dom';
import { PropsWithChildren } from 'react';

import dummyBooks from '~/books.json';
import { FilterProvider } from '~/contexts/FilterProvider';
import { server } from '~/test/setup';
import { Response } from 'miragejs';

function wrapper({ children }: PropsWithChildren) {
  return (
    <QueryClientWrapper>
      <FilterProvider>
        <MemoryRouter>{children}</MemoryRouter>
      </FilterProvider>
    </QueryClientWrapper>
  );
}

it('should display all the books on the initial load', async () => {
  render(<Search />, {
    wrapper,
  });

  // expect the loading indicator to be shown
  expect(screen.getByTestId('loading')).toBeInTheDocument();

  // wait for the books to load and expect the list to be in document
  await waitFor(() => expect(screen.getByTestId('book-list')).toBeInTheDocument());

  // expect all the books to be in the document
  dummyBooks.books.forEach((book) => expect(screen.getByText(book.title)).toBeInTheDocument());
});

it('should display correct books when search query is applied', async () => {
  const { user } = render(<Search />, { wrapper });

  // wait fot books to load
  await waitFor(() => expect(screen.getByTestId('book-list')).toBeInTheDocument());

  const searchBar = screen.getByLabelText(/search/i);
  const bookCards = screen.getAllByTestId('book-card');

  // user types 'kyle'
  await user.type(searchBar, 'kyle');

  // wait for the debounced search to take place
  await waitFor(() => expect(screen.getAllByTestId('book-card').length).not.toBe(bookCards.length));

  // expect the card on the screen to be the one that matches the search
  expect(screen.getByTestId('book-card')).toHaveTextContent("You Don't Know JS Yet");

  await user.type(searchBar, 'A book that does not exit fr fr');
  // expect that if no book is found the correct message appears
  await waitFor(() => expect(screen.getByTestId('no-books-found')).toBeInTheDocument());
});

it('should display correct books when publisher filter is applied', async () => {
  const { user } = render(<Search />, { wrapper });

  const publisher = 'No Starch Press';

  // wait fot books to load
  await waitFor(() => expect(screen.getByTestId('book-list')).toBeInTheDocument());

  const selectPublisher = screen.getByLabelText(/publisher/i);

  await user.click(selectPublisher);
  await user.click(screen.getByText(publisher));

  // filter all the books that have the selected publisher and expect those to be in the document
  dummyBooks.books
    .filter((book) => book.publisher === publisher)
    .forEach((book) => expect(screen.getByText(book.title)).toBeInTheDocument());

  // clear the selected publisher
  await user.click(selectPublisher);
  await user.click(screen.getByText(/all/i));

  // expect all the books to be in the document
  dummyBooks.books.forEach((book) => expect(screen.getByText(book.title)).toBeInTheDocument());
});

it('should display correct books when author filter is applied', async () => {
  const { user } = render(<Search />, { wrapper });

  const author = 'Kyle Simpson';

  // wait fot books to load
  await waitFor(() => expect(screen.getByTestId('book-list')).toBeInTheDocument());

  const selectAuthor = screen.getByLabelText(/author/i);

  await user.click(selectAuthor);
  await user.click(screen.getByText(author));

  // filter all the books that have the selected author and expect those to be in the document
  dummyBooks.books
    .filter((book) => book.author === author)
    .forEach((book) => expect(screen.getByText(book.title)).toBeInTheDocument());

  // clear the selected publisher
  await user.click(selectAuthor);
  await user.click(screen.getByText(/all/i));

  // expect all the books to be in the document
  dummyBooks.books.forEach((book) => expect(screen.getByText(book.title)).toBeInTheDocument());
});

it('should display the correct values when search + filters are applied', async () => {
  expect.hasAssertions();

  const publisher = 'No Starch Press';
  const author = 'Marijn Haverbeke';
  const search = 'eloquent';

  const { user } = render(<Search />, { wrapper });

  await waitFor(() => expect(screen.getByTestId('book-list')).toBeInTheDocument());

  const searchBar = screen.getByLabelText(/search/i);
  const publisherSelect = screen.getByLabelText(/publisher/i);
  const authorSelect = screen.getByLabelText(/author/i);

  await user.click(publisherSelect);
  await user.click(screen.getByText(publisher));

  await user.click(authorSelect);
  await user.click(screen.getByText(author));

  await user.type(searchBar, search);

  const filteredBooks = dummyBooks.books.filter(
    (book) => book.author === author && book.publisher === publisher && book.title.toLowerCase().includes(search)
  );

  await waitFor(() => expect(screen.getAllByTestId('book-card').length).toBe(filteredBooks.length));
  filteredBooks.forEach((book) => expect(screen.getByText(book.title)).toBeInTheDocument());
});

// sad path
it('should display an error message when something goes wrong', async () => {
  server.get('/books', () => new Response(400));

  render(<Search />, { wrapper });

  await waitFor(() => expect(screen.getByTestId('error-message')).toBeInTheDocument());
});
