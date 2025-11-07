import { AuthorI } from '@/models/author';
import Link from "next/link";

const Authors = (props) => {
  const { authors } = props;

  return (
    <div className="min-h-screen flex flex-col">

            <main className="flex-1 container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-balance mb-2">Authors Catalogue</h1>
          <p className="text-muted-foreground text-pretty">
            Discover your next favorite book from our curated collection
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                Sort
              </p>
            </div>

            {/* Authors Grid */}
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {authors.map((author: AuthorI) => (
                <Link key={author.id} href={`/author/${author.id}`}>
                    {author.firstName} {author.lastName}
                </Link>
                // <Link key={book.id} href={`/book/${book.id}`}>
                //   {book.cover ? <Image
                //     src={`/images/authors/${book.id}/book-300x432.webp`}
                //     alt={book.title}
                //     width={300}
                //     height={432}
                //   /> : <Image
                //     src={`/placeholders/book-placeholder.webp`}
                //     alt={book.title}
                //     width={300}
                //     height={432}
                //   />}
                // {book.title}
                // </Link>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
  
                Pagination

            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Authors;