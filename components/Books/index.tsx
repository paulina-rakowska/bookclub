import React from 'react';
import Link from "next/link";
import BookModel from '@/models/book';

const Books = (props) => {
  let { books } = props;
  let booksContent = books.map((book) => {
    return (<div key="d">
      <Link href={"/book/" + book.id}>
        {book.title}
        {book.description}
      </Link>
    </div>)
  });
  console.log(books);
  return (
    <div className="flex flex-col">

      <Link href="/book/12345">Book1</Link>
      <Link href="/book/543345">Book2</Link>
    </div>
  )
}

export default Books;