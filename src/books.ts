export interface Book {
  id: string;
  name: string;
  year: number;
  author: string;
  summary: string;
  publisher: string;
  pageCount: number;
  readPage: number;
  finished: boolean;
  reading: boolean;
  updatedAt: string;
}

const books: Book[] = [];

export { books };
