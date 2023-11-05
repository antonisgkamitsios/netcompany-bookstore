export type Book = {
  id?: string;
  isbn: string;
  title: string;
  subtitle: string;
  author: string;
  published: string;
  publisher: string;
  pages: number;
  description: string;
  website: string;
};

export type Filters = {
  author: string | undefined;
  publisher: string | undefined;
};
