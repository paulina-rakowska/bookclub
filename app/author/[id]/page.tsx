"use client"; // Required for client-side components

import Header from "../../../components/shared/Header";
import Footer from "../../../components/shared/Footer";

import { useParams } from "next/navigation";

function AuthorPage() {
  const { id } = useParams();

  // const { loading, error, data } = useQuery(BOOK_QUERY, {
  //   variables: { id },
  //   skip: !id,
  // });

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  // const { book } = data;

  return (
    <div className="w-full">
      <Header />
      <main className="flex flex-col p-8">Author {id}</main>
      <Footer />
    </div>
  );
}

export default AuthorPage;
