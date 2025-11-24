// app/books/page.tsx (Server Component)
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import Books from '@/components/Books';
import BOOKS_QUERY from '@/queries/booksQuery';
import { print } from 'graphql';
import CATEGORIES_QUERY from '@/queries/categoriesQuery';

async function getBooks() {
  const res = await fetch('http://localhost:3000/api/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: print(BOOKS_QUERY),
    }),
    cache: 'no-store', // or 'force-cache' for static generation
  });

  const { data } = await res.json();
  return data.books;
}

async function getCategories() {
  const res = await fetch('http://localhost:3000/api/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: print(CATEGORIES_QUERY)
    }),
    cache: 'no-store', // or 'force-cache' for static generation
  });

  const { data } = await res.json();
  return data.categories;
}


export default async function BooksPage() {
  const books = await getBooks();
  const categories = await getCategories();
console.log("in books page", books);
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Books initialBooks={books} categories={categories} />
      </main>
      <Footer />
    </div>
  );
}

export const metadata = {
  title: 'Books Catalogue',
  description: 'Discover your next favorite book from our curated collection',
};