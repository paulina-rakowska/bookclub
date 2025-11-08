"use client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { CategoryI } from "@/models/category";

const sortOptions = [
  { value: "popular", label: "Most Popular" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest" },
  { value: "title", label: "Title A-Z" },
  { value: "author", label: "Author A-Z" },
];

interface BookFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: CategoryI[];
}

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
                variant="filter"
                size="filter"
                className="w-full"
                data-active={selectedCategory === null}
                onClick={() => onCategoryChange(null)}
            >
            All Categories
            </Button>
          {categories &&
            categories.map((category: CategoryI) => (
              <Button
                key={category.id}
                variant="filter"
                size="filter"
                className="w-full"
                data-active={selectedCategory === category.id}
                onClick={() => onCategoryChange(category.id)}
              >
                {category.name}
              </Button>
            ))}
        </div>
      </div>
    </>
  );
}
