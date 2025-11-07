"use client"; // Required for client-side components

import Header from "../../../components/shared/Header";
import Footer from "../../../components/shared/Footer";

import { useParams } from "next/navigation";
import { useQuery } from "@apollo/client";
import AUTHOR_QUERY from "@/queries/authorQuery";

function AuthorPage() {
  const { id: authorId } = useParams();
console.log(authorId);
  const { loading, error, data } = useQuery(AUTHOR_QUERY, {
    variables: { id: authorId },
    skip: !authorId,
  });
console.log(data);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
console.log(data);
  const { author } = data;

  return (
    <div className="w-full">
      <Header />
      <main className="flex flex-col p-8">Author {author.id} {author.firstName} {author.lastName}</main>
      <Footer />
    </div>
  );
}

export default AuthorPage;
