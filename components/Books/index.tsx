// components/Books/Books.tsx
'use client';

import { useState } from 'react';
import { useQuery } from "@apollo/client/react";
import { BookCard } from '@/components/ui/book-card';
import { Button } from '@/components/ui/button';
import BOOKS_QUERY from '@/queries/booksQuery';
import { CategoryI } from '@/models/category';
import { BookI } from '@/models/book';
import { BookFilters } from '../ui/book-filters';

interface BooksProps {
  initialBooks: BookI[];
  categories: CategoryI[];
}

export default function Books({ initialBooks, categories }: BooksProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Use initial data, then fetch on interactions
  const { data, loading } = useQuery(BOOKS_QUERY, {
    variables: { page: currentPage, limit: 12, categoryId: selectedCategory },
    // Use initial data for first render
    skip: currentPage === 1 && selectedCategory === null,
  });

  const booksData = (currentPage === 1 && selectedCategory === null) 
    ? initialBooks 
    : data?.books;

  const handleCategoryChange = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  return (
    <>  {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-balance mb-2">Books Catalogue</h1>
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
        {/* <div className="space-y-2">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            className="w-full justify-start"
            onClick={() => handleCategoryChange(null)}
          >
            All Categories
          </Button>
          {categories && categories.map((category: CategoryI) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className="w-full justify-start"
              onClick={() => handleCategoryChange(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div> */}
      </aside>

      {/* Books Grid */}
      <div className="flex-1">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {booksData && booksData?.map((book: BookI) => (
                <BookCard key={book.id} {...book} />
              ))}
            </div>
            
            {/* Pagination */}
            {booksData?.totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                <Button
                  onClick={() => setCurrentPage(p => p - 1)}
                  disabled={!booksData.hasPreviousPage}
                >
                  Previous
                </Button>
                <span className="flex items-center px-4">
                  Page {booksData.currentPage} of {booksData.totalPages}
                </span>
                <Button
                  onClick={() => setCurrentPage(p => p + 1)}
                  disabled={!booksData.hasNextPage}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div></>
  );
}