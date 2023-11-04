import { QueryFunctionContext, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Book } from '../types';

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
  return axios.post('/api/books', payload).then(({ data }) => data);
}

function deleteBook(id: string) {
  return axios.delete(`/api/books/${id}`).then(({ data }) => data);
}

function updateBook(id: string, payload: Partial<Book>) {
  return axios.patch(`/api/books/${id}`, payload).then(({ data }) => data);
}

function useBooks() {
  return useQuery({ queryKey: [{ scope: 'books' }], queryFn: fetchBooks });
}

function useBook(id: string) {
  return useQuery({ queryKey: [{ scope: 'books', id }], queryFn: fetchBook });
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

export { useBooks, useBook, useCreateBook, useDeleteBook, useUpdateBook };
