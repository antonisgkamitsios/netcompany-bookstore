import { expect, it } from 'vitest';
import { QueryClientWrapper, render } from '~/test/utilities';
import { BookDetails } from '../BookDetails';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { PropsWithChildren } from 'react';

import { books } from '~/books.json';
import { screen, waitFor } from '@testing-library/react';
import { server } from '~/test/setup';
import { Response } from 'miragejs';

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
  const bookId = '4';

  render(<BookDetails />, { wrapper: ({ children }) => wrapper({ children, id: bookId }) });

  // verify that the book details are loading
  expect(screen.getByTestId('loading')).toBeInTheDocument();

  // pretty bad but the json data don't have id in them so we assume the 4th book will have id 3
  const bookWithId4 = books[3];
  // verify that the book is loaded
  await waitFor(() => expect(screen.getByText(bookWithId4.title)).toBeInTheDocument());
});

it('should display an error message when something goes wrong', async () => {
  const bookId = '4';
  server.get('/books/:id', () => new Response(500));

  render(<BookDetails />, { wrapper: ({ children }) => wrapper({ children, id: bookId }) });

  // verify that the book details are loading
  expect(screen.getByTestId('loading')).toBeInTheDocument();

  // verify that the error message is displayed
  await waitFor(() => expect(screen.getByTestId('error-message')).toBeInTheDocument());
});
