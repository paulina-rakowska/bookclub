import Header from '../../../components/shared/Header';
import Footer from '../../../components/shared/Footer';
import Book from '@/components/Book';
import BOOK_QUERY from '@/queries/bookQuery';
import { print } from 'graphql';
import '@/components/Book/book.css';

async function getBookById(id: string) {
  const res = await fetch('http://localhost:3000/api/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: print(BOOK_QUERY),
      variables: { id },
    }),
    cache: 'no-store',
  });

  const { data } = await res.json();
  return data.book;
}

async function BookPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const book = await getBookById(id);

  if(!book){
    return <div>Book not found</div>
  }

  return (
    <div className="w-full">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Book key={book.id} {...book} />
      </main>
      <Footer />
    </div>
  );
}

export default BookPage;
