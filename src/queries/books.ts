import { QueryFunctionContext, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Book } from '../types';

import { findUnique } from '~/utils/utilities';
import axios from 'axios';
import dayjs from 'dayjs';

function fetchBooks(): Promise<{ books: Book[] }> {
  return axios.get('/api/books').then(({ data }) => data);
}

// query key type could be extracted to be something better eg query key factory
function fetchBook({
  queryKey: [{ id }],
}: QueryFunctionContext<[{ scope: string; id: string }]>): Promise<{ book: Book }> {
  return axios.get(`/api/books/${id}`).then(({ data }) => data);
}

function createBook(payload: Book): Promise<{ book: Book }> {
  return axios
    .post('/api/books', {
      ...payload,
      published: dayjs(payload.published, 'DD-MM-YYYY').format('YYYY-MM-DDTHH:mm:ssZ[Z]'),
    })
    .then(({ data }) => data);
}

function deleteBook(id: string) {
  return axios.delete(`/api/books/${id}`).then(({ data }) => data);
}

function updateBook(id: string, payload: Partial<Book>) {
  return axios.patch(`/api/books/${id}`, payload).then(({ data }) => data);
}

function useBooks() {
  return useQuery({ queryKey: [{ scope: 'books' }], queryFn: fetchBooks, select: (data) => data.books });
}

function useBook(id: string) {
  return useQuery({ queryKey: [{ scope: 'books', id }], queryFn: fetchBook, select: (data) => data.book });
}

function useCreateBook() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [{ scope: 'books' }] });
    },
  });
}

function useDeleteBook(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteBook(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [{ scope: 'books' }] });
    },
  });
}

function useUpdateBook(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Partial<Book>) => updateBook(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [{ scope: 'books' }] });
    },
  });
}

// find all the unique publishers
function usePublishers() {
  return useQuery({
    queryKey: [{ scope: 'books', entity: 'publishers' }],
    queryFn: fetchBooks,
    select: (data) => {
      const ret = findUnique(data.books, 'publisher');
      return ret.map((p, index) => ({ id: index + 1, publisher: p }));
    },
  });
}

// find all the unique authors
function useAuthors() {
  return useQuery({
    queryKey: [{ scope: 'books', entity: 'publishers' }],
    queryFn: fetchBooks,
    select: (data) => {
      const ret = findUnique(data.books, 'author');
      return ret.map((a, index) => ({ id: index + 1, author: a }));
    },
  });
}

export { useBooks, usePublishers, useBook, useCreateBook, useDeleteBook, useUpdateBook, useAuthors };
