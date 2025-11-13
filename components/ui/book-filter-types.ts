import { CategoryI } from "@/models/category";

export interface BookFiltersProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  categories: CategoryI[];
}