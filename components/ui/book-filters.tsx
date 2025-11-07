"use client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

const categories = [
  "All Books",
  "Fiction",
  "Non-Fiction",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Fantasy",
  "Biography",
  "History",
  "Self-Help",
]

const sortOptions = [
  { value: "popular", label: "Most Popular" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest" },
  { value: "title", label: "Title A-Z" },
  { value: "author", label: "Author A-Z" },
]

interface BookFiltersProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

export function BookFilters({ selectedCategory, onCategoryChange}: BookFiltersProps) {
  return (
    <div className="space-y-6">
      {/* Category Filters */}
      <div>
        <h3 className="font-semibold mb-3">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => onCategoryChange(category)}
              className={selectedCategory === category ? "bg-primary" : ""}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

    </div>
  )
}
