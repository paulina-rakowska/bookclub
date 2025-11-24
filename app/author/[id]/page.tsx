import Header from "../../../components/shared/Header";
import Footer from "../../../components/shared/Footer";

import AUTHOR_QUERY from "@/queries/authorQuery";
import { AuthorI } from "@/models/author";
import { print } from "graphql";

async function fetchAuthor(id: string): Promise<AuthorI | null> {
  const res = await fetch('http://localhost:3000/api/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: print(AUTHOR_QUERY),
      variables: { id },
    }),
    cache: 'no-store',
  });

  const { data } = await res.json();
  return data?.author ?? null;
}


async function AuthorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: authorId } = await params;
  console.log(authorId);
  const author = await fetchAuthor(authorId);

  if (!author) return <div>Author not found</div>;
  return (
    <div className="w-full">
      <Header />
      <main className="flex flex-col p-8">Author {author.id} {author.firstName} {author.lastName}</main>
      <Footer />
    </div>
  );
}

export default AuthorPage;
