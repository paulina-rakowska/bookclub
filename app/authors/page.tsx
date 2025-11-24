"use client"; // Required for client-side components

import Header from "../../components/shared/Header";
import Footer from "../../components/shared/Footer";

import AUTHORS_QUERY from "../../queries/authorsQuery";
import { print } from "graphql";

import Authors from "@/components/Authors";
import { AuthorI } from "@/models/author";

async function fetchAuthors(): Promise<AuthorI[] | null> {
  const res = await fetch('http://localhost:3000/api/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: print(AUTHORS_QUERY),
    }),
    cache: 'no-store',
  });

  const { data } = await res.json();
  return data?.authors ?? null;
}

async function AuthorsPage() {
  const authors = await fetchAuthors();

  if (!authors) return;

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
