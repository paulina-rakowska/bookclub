// components/Books/BooksClient.tsx
'use client';

import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { BookCard } from '@/components/ui/book-card';
import { Button } from '@/components/ui/button';
import BOOKS_QUERY from '@/queries/booksQuery';

interface BooksClientProps {
  initialBooks: any;
  categories: any[];
}

export default function BooksClient({ initialBooks, categories }: BooksClientProps) {
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
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar */}
      <aside className="lg:w-64 flex-shrink-0">
        <div className="space-y-2">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            className="w-full justify-start"
            onClick={() => handleCategoryChange(null)}
          >
            All Categories
          </Button>
          {categories.map((category: any) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className="w-full justify-start"
              onClick={() => handleCategoryChange(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </aside>

      {/* Books Grid */}
      <div className="flex-1">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {booksData?.books.map((book: any) => (
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
    </div>
  );
}