"use client"; // Required for client-side components

import Header from "../../components/shared/Header";
import Footer from "../../components/shared/Footer";

import { useQuery } from "@apollo/client/react";
import AUTHORS_QUERY from "../../queries/authorsQuery";

import Authors from "@/components/Authors";

function AuthorsPage() {
  const { loading, error, data } = useQuery(AUTHORS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { authors } = data;

  return (
    <div className="w-full">
      <Header />
      <main className="flex flex-col p-8">
        <Authors authors={authors} />
      </main>
      <Footer />
    </div>
  );
}

export default AuthorsPage;
