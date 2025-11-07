import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import BooksClient from '@/components/Books/BooksClient';
import { getClient } from '@/lib/apollo-client-server';
import BOOKS_QUERY from "@/queries/booksQuery";
import CATEGORIES_QUERY from "@/queries/categoriesQuery";

async function BooksPage() {
  const client = getClient();
  
  // Fetch initial data on server
  const [booksResult, categoriesResult] = await Promise.all([
    client.query({ query: BOOKS_QUERY, variables: { page: 1, limit: 12 } }),
    client.query({ query: CATEGORIES_QUERY }),
  ]);


  return (
    <div className="w-full">
      <Header />
      <main className="flex flex-col p-8">
        {/* Pass initial data to client component */}
        <BooksClient 
          initialBooks={booksResult.data.books} 
          categories={categoriesResult.data.categories}
        />
      </main>
      <Footer />
    </div>
  );
}

export default BooksPage;
