// components/Books/types.ts
import { BookI } from "@/models/book";
import { CategoryI } from "@/models/category";

export interface BooksProps {
  initialBooks: BookI[];
  categories: CategoryI[];
  all: number; //number of all books
}