"use client"; // Required for client-side components

import Header from '../../components/shared/Header';
import Footer from '../../components/shared/Footer';

import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import BOOKS_QUERY from "../../queries/booksQuery";
import Link from "next/link";

function BooksPage() {
  //const { loading, error, data } = useQuery(BOOKS_QUERY);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  //const { book } = data;

  return (
    <div className="w-full">
      <Header />
      <main className="flex flex-col p-8">
        Books catalogue
        <div className="flex flex-col">
          <Link href="/book/12345">Book1</Link>
          <Link href="/book/543345">Book2</Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default BooksPage;
