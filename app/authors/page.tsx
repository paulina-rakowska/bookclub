
import Header from "../../components/shared/Header";
import Footer from "../../components/shared/Footer";

import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import BOOKS_QUERY from "../../queries/booksQuery";

import Link from "next/link";

function AuthorsPage() {
  //const { loading, error, data } = useQuery(BOOKS_QUERY);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  //const { book } = data;

  return (
    <div className="w-full">
      <Header />
      <main className="flex flex-col p-8">
        Authors page
        <div className="flex flex-col">
          <Link href="/author/12345">Author</Link>
          <Link href="/author/543345">Author</Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default AuthorsPage;
