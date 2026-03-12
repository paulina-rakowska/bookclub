// app/authors/page.tsx (Server Component)

import Header from "../../components/shared/Header";
import Footer from "../../components/shared/Footer";

import AUTHORS_QUERY from "../../queries/authorsQuery";
import { print } from "graphql";

import Authors from "@/components/Authors";
import { AuthorI } from "@/models/author";
import TOP_AUTHORS_QUERY from "@/queries/topAuthors";

async function fetchAuthors(): Promise<AuthorI[] | []> {
  const res = await fetch("http://localhost:3000/api/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: print(AUTHORS_QUERY),
    }),
    cache: "no-store",
  });

  const { data } = await res.json();
  return data?.authors ?? [];
}
async function fetchTopAuthors(): Promise<AuthorI[] | []> {
  const res = await fetch("http://localhost:3000/api/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: print(TOP_AUTHORS_QUERY),
    }),
    cache: "no-store",
  });

  const { data } = await res.json();
  return data?.authors ?? [];
}

async function AuthorsPage() {
  const authors = await fetchAuthors();
  const topAuthors = await fetchTopAuthors();

  if (!authors) return;

  return (
    <div className="w-full">
      <Header />
      <main className="flex flex-col p-8">
        <Authors authors={authors} topAuthors={topAuthors} />
      </main>
      <Footer />
    </div>
  );
}

export default AuthorsPage;
