import { waitFor } from '@testing-library/react';
import { expect, it } from 'vitest';
import { useBook, useBooks, useCreateBook, useDeleteBook, useUpdateBook } from '../books';

import { renderQueryHook } from '~/test/utilities';
import { dummyBooks } from '~/test/dummyData';
import { act } from 'react-dom/test-utils';
import { Book } from '~/types';

it('should fetch all the books', async () => {
  const { result } = renderQueryHook(() => useBooks());
  await waitFor(() => expect(result.current.isSuccess).toBe(true));
  dummyBooks.books.forEach((book) => {
    expect(result.current.data).toEqual(expect.arrayContaining([expect.objectContaining(book)]));
  });
});

it('should fetch the correct book', async () => {
  const { result } = renderQueryHook(() => useBook('1'));
  await waitFor(() => expect(result.current.isSuccess).toBe(true));

  // here we are taking advantage of the auto id that mirage is providing. The book with id "1" will be the first in the array
  expect(result.current.data).toEqual(expect.objectContaining(dummyBooks.books[0]));
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
  expect(booksResult.current.data).not.toEqual(expect.arrayContaining([expect.objectContaining(dummyBooks.books[0])]));
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

  expect(bookResult.current.data).toEqual(expect.objectContaining(dataToUpdate));
});

it.only('should create a book', async () => {
  const { result } = renderQueryHook(() => useCreateBook());

  const bookToCreate: Book = {
    author: 'Antonis',
    description: 'Description',
    isbn: 'ISBN',
    pages: 1337,
    published: '09-11-2023',
    publisher: 'Antonis',
    subtitle: 'Sub',
    title: 'Title',
    website: 'www.com',
  };

  act(() => {
    result.current.mutate(bookToCreate);
  });
  await waitFor(() => expect(result.current.isSuccess).toBe(true));
  expect(result.current.data?.book).toEqual(
    expect.objectContaining({
      ...bookToCreate,
      // contain in 'published' in any order the '09' and the '11' and the '2023'
      published: expect.stringMatching(/(?=.*?\b09)(?=.*?\b11)(?=.*?\b2023).*/i),
    })
  );
  // '2023-09-11T00:00:00+03:00Z'
  const response = result.current.data?.book;

  const { result: bookResult } = renderQueryHook(() => useBook(response?.id || ''));
  await waitFor(() => expect(bookResult.current.isSuccess).toBe(true));

  expect(bookResult.current.data).toEqual(response);
});
