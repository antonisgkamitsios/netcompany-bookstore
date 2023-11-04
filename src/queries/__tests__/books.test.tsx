import { waitFor } from '@testing-library/react';
import { afterEach, beforeEach, expect, it } from 'vitest';
import { useBook, useBooks, useCreateBook, useDeleteBook, useUpdateBook } from '../books';

import { renderQueryHook } from '~/test/utilities';
import { makeServer } from '~/server';
import { dummyBooks } from '~/test/dummyData';
import { act } from 'react-dom/test-utils';
import { Book } from '~/types';

let server: ReturnType<typeof makeServer>;

beforeEach(() => {
  server = makeServer();
  server.logging = false;
});

afterEach(() => {
  server.shutdown();
});

it('should fetch all the books', async () => {
  const { result } = renderQueryHook(() => useBooks());
  await waitFor(() => expect(result.current.isSuccess).toBe(true));
  dummyBooks.books.forEach((book) => {
    expect(result.current.data?.books).toEqual(expect.arrayContaining([expect.objectContaining(book)]));
  });
});

it('should fetch the correct book', async () => {
  const { result } = renderQueryHook(() => useBook('1'));
  await waitFor(() => expect(result.current.isSuccess).toBe(true));

  // here we are taking advantage of the auto id that mirage is providing. The book with id "1" will be the first in the array
  expect(result.current.data?.book).toEqual(expect.objectContaining(dummyBooks.books[0]));
});

it('should delete the book', async () => {
  const { result, rerender } = renderQueryHook(() => useDeleteBook('1'));
  act(() => {
    result.current.mutate();
  });
  rerender();
  //   wait till the mutation is success
  await waitFor(() => expect(result.current.isSuccess).toBe(true));

  //   fetch the new books
  const { result: booksResult } = renderQueryHook(() => useBooks());

  //   wait till the books query is success
  await waitFor(() => expect(booksResult.current.isSuccess).toBe(true));

  // expect the books array not to contain the first element of the dummy books data
  expect(booksResult.current.data?.books).not.toEqual(
    expect.arrayContaining([expect.objectContaining(dummyBooks.books[0])])
  );
});

it('should update a book', async () => {
  const { result } = renderQueryHook(() => useUpdateBook('1'));

  const dataToUpdate: Partial<Book> = { author: 'Antonis', pages: 690, description: 'An epic epic of epicness ' };

  act(() => {
    result.current.mutate(dataToUpdate);
  });

  // wait the mutation to be success
  await waitFor(() => expect(result.current.isSuccess).toBe(true));

  const { result: bookResult } = renderQueryHook(() => useBook('1'));

  await waitFor(() => expect(bookResult.current.isSuccess).toBe(true));

  expect(bookResult.current.data?.book).toEqual(expect.objectContaining(dataToUpdate));
});

it('should create a book', async () => {
  const { result } = renderQueryHook(() => useCreateBook());

  const bookToCreate: Book = {
    author: 'Antonis',
    description: 'Description',
    isbn: 'ISBN',
    pages: 1337,
    published: 'published',
    publisher: 'Antonis',
    subtitle: 'Sub',
    title: 'Title',
    website: 'www.com',
  };

  act(() => {
    result.current.mutate(bookToCreate);
  });
  await waitFor(() => expect(result.current.isSuccess).toBe(true));
  expect(result.current.data?.book).toEqual(expect.objectContaining(bookToCreate));

  const response = result.current.data;

  const { result: bookResult } = renderQueryHook(() => useBook(response?.book.id || ''));
  await waitFor(() => expect(bookResult.current.isSuccess).toBe(true));

  expect(bookResult.current.data).toEqual(response);
});
