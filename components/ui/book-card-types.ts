import type { BookI } from "@/models/book";
import type { CategoryI } from "@/models/category";

export interface BookCardProps
  extends Omit<BookI, "category"> {
  category: CategoryI;          // single category for the card
}