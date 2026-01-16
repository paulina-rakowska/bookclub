import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import HeroSlider from '@/components/HeroSlider';
import Carousel from '@/components/Carousel';
import { Slide } from '@/components/HeroSlider/types';
import BOOKS_QUERY from '@/queries/booksQuery';
import { print } from 'graphql';

const slides: Slide[] = [
  {
    id: 1,
    title: 'Explore Our Book Catalogue',
    subtitle: 'Discover your next favorite read',
    description: 'Browse our curated collection of books across all genres, discover hidden gems, and find your next page-turner.',
    linkText: 'Browse Books →',
    linkHref: '/books',
    image: '/images/slides/library-with-books-and-reading-nook.jpg',
  },
  {
    id: 2,
    title: 'Discover Incredible Authors',
    subtitle: 'Explore diverse literary voices',
    description: 'Learn about talented authors, discover their works, and connect with the creative minds behind your favorite stories.',
    linkText: 'Explore Authors →',
    linkHref: '/authors',
    image: '/images/slides/person-writing-book-review-at-desk.jpg',
  },
  {
    id: 3,
    title: 'Connect with Book Lovers',
    subtitle: 'Build your reading community',
    description: 'Join discussion groups, follow authors, and engage with readers who share your literary interests.',
    linkText: 'Join Community →',
    linkHref: '/register',
    image: '/images/slides/book-club-meeting-discussing-literature.jpg',
  },
]

async function getNewestBooks() {
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

export default async function HomePage() {
  const { books: newestBooks } = await getNewestBooks();
console.log(typeof newestBooks);
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        <HeroSlider slides={slides} />
        <Carousel carouselItems={newestBooks} />
      </main>

      <Footer />
    </div>
  )
}
