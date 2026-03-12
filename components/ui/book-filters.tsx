"use client";
import { Button } from "@/components/ui/button";
import { CategoryI } from "@/models/category";
import { BookFiltersProps } from "./book-filter-types";

const sortOptions = [
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest" },
  { value: "title", label: "Title A-Z" },
  { value: "title", label: "Title Z-A" },
];

export function BookFilters({
  selectedCategory,
  onCategoryChange,
  categories,
}: BookFiltersProps) {
  return (
    <>
      <div className="space-y-2">
        <h3 className="font-semibold mb-3">Categories</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="filter"
            className={
              selectedCategory === null
                ? "bg-primary w-full cursor-pointer"
                : "w-full cursor-pointer"
            }
            onClick={() => onCategoryChange(null)}
          >
            All Categories
          </Button>
          {categories &&
            categories.map((category: CategoryI) => (
              <Button
                key={category.id}
                variant={
                  selectedCategory === category.id ? "default" : "outline"
                }
                size="filter"
                className={
                  selectedCategory === category.id
                    ? "bg-primary w-full cursor-pointer"
                    : "w-full cursor-pointer"
                }
                onClick={() =>
                  onCategoryChange(category.id ? String(category.id) : null)
                }
              >
                {category.name}
              </Button>
            ))}
        </div>
      </div>
    </>
  );
}
