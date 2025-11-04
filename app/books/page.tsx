"use client"; // Required for client-side components

import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import Books from '@/components/Books';

import { useQuery } from "@apollo/client";
// import { useRouter } from "next/router";
import BOOKS_QUERY from "@/queries/booksQuery";

function BooksPage() {
  const { loading, error, data } = useQuery(BOOKS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { books } = data;
console.log(books);
  return (
    <div className="w-full">
      <Header />
      <main className="flex flex-col p-8">
        Books catalogue
        <Books books={books} />
      </main>
      <Footer />
    </div>
  );
}

export default BooksPage;
