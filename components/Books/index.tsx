// components/Books/Books.tsx
"use client";

import { useState } from "react";
import { useQuery } from "@apollo/client/react";
import { BookCard } from "@/components/ui/book-card";
import { Button } from "@/components/ui/button";
import BOOKS_QUERY from "@/queries/booksQuery";
import { BOOKS_PER_PAGE } from "@/utils/constants";
import { BookI } from "@/models/book";
import { BookFilters } from "../ui/book-filters";
import { BooksProps } from "./types";
import { BookCardProps } from "../ui/book-card-types";

export default function Books({ initialBooks, categories, all }: BooksProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const offset = (currentPage - 1) * BOOKS_PER_PAGE;

  // console.log(currentPage === 1);
  // console.log("offset");
  // console.log(all - (currentPage - 1));
  // console.log("all");
  // console.log(all);
  // console.log("currentPage");
  // console.log(currentPage);;

  // Use initial data, then fetch on interactions
  const { data, loading } = useQuery<{ books: BookI[] }>(BOOKS_QUERY, {
    variables: {
      limit: BOOKS_PER_PAGE,
      offset: offset,
      categoryId: selectedCategory,
    },
  });

  const books = Array.isArray(data?.books) ? data?.books : [];
  const totalPages = Array.isArray(data?.books)
    ? Math.ceil(all / BOOKS_PER_PAGE)
    : 1;

  const handleCategoryChange = (categoryId: string | null) => {
    console.log(categoryId);
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  return (
    <>
      {" "}
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-balance mb-2">
          Books Catalogue
        </h1>
        <p className="text-muted-foreground text-pretty">
          Discover your next favorite book from our curated collection
        </p>
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="lg:w-64 flex-shrink-0">
          <BookFilters
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            categories={categories}
          />
        </aside>

        {/* Books Grid */}
        <div className="flex-1">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {books &&
                  books.map((book: BookCardProps) => (
                    <BookCard key={book.id} {...book} />
                  ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  <Button
                    onClick={() => setCurrentPage((p) => p - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <span className="flex items-center px-4">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    onClick={() => setCurrentPage((p) => p + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
