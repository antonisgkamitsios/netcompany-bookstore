import { expect, it } from 'vitest';
import { QueryClientWrapper, render } from '~/test/utilities';
import { BookDetails } from '../BookDetails';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { PropsWithChildren } from 'react';

import { books } from '~/books.json';
import { screen, waitFor } from '@testing-library/react';
import { server } from '~/test/setup';
import { Response } from 'miragejs';
import { Book } from '~/types';

function wrapper({ children, id }: PropsWithChildren<{ id: string }>) {
  return (
    <QueryClientWrapper>
      <MemoryRouter initialEntries={[`/search/book/${id}`]}>
        <Routes>
          <Route path="/search/book/:bookId" element={children} />
        </Routes>
      </MemoryRouter>
    </QueryClientWrapper>
  );
}

it('should display the book', async () => {
  const bookId = 4;

  render(<BookDetails />, { wrapper: ({ children }) => wrapper({ children, id: String(bookId) }) });

  // verify that the book details are loading
  expect(screen.getByTestId('loading')).toBeInTheDocument();

  // the json data don't have id in them so we assume the book with id 4 will be the (4-1) elem in the array
  const bookWithId4 = books[bookId - 1];
  // verify that the book is loaded
  await waitFor(() => expect(screen.getByText(bookWithId4.title)).toBeInTheDocument());

  // verify that the details are loaded

  (Object.keys(bookWithId4) as (keyof typeof bookWithId4)[]).forEach((key) => {
    if (key === 'published') {
      expect(screen.getByText(new RegExp(key, 'i'))).toBeInTheDocument();
    } else {
      expect(screen.getByText(bookWithId4[key])).toBeInTheDocument();
    }
  });
});

it('should display an error message when something goes wrong', async () => {
  const bookId = 4;
  server.get('/books/:id', () => new Response(500));

  render(<BookDetails />, { wrapper: ({ children }) => wrapper({ children, id: String(bookId) }) });

  // verify that the book details are loading
  expect(screen.getByTestId('loading')).toBeInTheDocument();

  // verify that the error message is displayed
  await waitFor(() => expect(screen.getByTestId('error-message')).toBeInTheDocument());
});
