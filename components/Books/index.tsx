import React from 'react';
import Link from "next/link";
import { BookI } from '@/models/book';
import Image from 'next/image'

const Books = (props) => {
  let { books } = props;

  return (
    <div className="min-h-screen flex flex-col">

            <main className="flex-1 container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-balance mb-2">Books Catalogue</h1>
          <p className="text-muted-foreground text-pretty">
            Discover your next favorite book from our curated collection
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="sticky top-4">
    filters
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                Showing 
              </p>
            </div>

            {/* Books Grid */}
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {books.map((book: BookI) => (
                // <BookCard key={book.id} {...book}/>
                <Link key={book.id} href={`/book/${book.id}`}>
                  {book.cover ? <Image
                    src={`/images/books/${book.id}/book-300x432.webp`}
                    alt={book.title}
                    width={300}
                    height={432}
                  /> : <Image
                    src={`/placeholders/book-placeholder.webp`}
                    alt={book.title}
                    width={300}
                    height={432}
                  />}
                {book.title}
                </Link>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
  
                Load More Books

            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Books;