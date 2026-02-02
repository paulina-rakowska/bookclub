"use client";

import { useState } from "react";
import Image from "next/image";
import { BookI } from "@/models/book";
import { AuthorI } from "@/models/author";
import Link from "next/link";
import { CategoryI } from "@/models/category";

export default function Book({
  id,
  title,
  author,
  description,
  coverUrl,
  category,
  publisher,
  releaseDate
}: BookI) {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  return (
    <>
      {/* Main content */}
      <div key={id} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
        {/* Book Cover and Actions */}
        <div className="md:col-span-1">
          <div className="sticky top-4">
            {/* Book Cover with hover overlay */}
            <div
              className="aspect-[3/4] overflow-hidden rounded-lg shadow-lg mb-6 relative group cursor-pointer"
              onClick={() => setIsImageModalOpen(true)}
            >
              <Image
                src={
                  coverUrl
                    ? coverUrl
                    : "/placeholders/book-placeholder.webp"
                }
                width={300}
                height={432}
                alt={`${title} cover`}
                className="w-full h-full object-cover"
              />

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                {/* Magnifying glass icon */}
                <svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Book Details */}
        <div className="md:col-span-2 lg:col-span-3">
          <div className="space-y-6">
            {/* Header section */}
            <div>
              <h1 className="text-4xl font-bold mb-2 text-balance">{title}</h1>
              <p className="text-lg text-muted-foreground mb-4">
                by&nbsp;
                {author.map((au: AuthorI, i) => (
                  <Link key={au.id} href={`/author/${au.id}`}>
                    {au.firstName} {au.lastName}{i < author.length-1? ", ": ""}
                  </Link>
                ))}
              </p>
            </div>

            {/* Description */}
            <div className="rounded-xl border border-[#e0d8d0] px-6 py-4 shadow-[inset_0_2px_4px_rgba(255,255,255,0.8),inset_0_-2px_4px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.06)]">
              <h2 className="text-xl font-semibold mb-3">About this book</h2>
              <p className="text-foreground leading-7">{description}</p>
            </div>

            {/* Book Info Grid */}
            <div className="grid grid-cols-2 gap-4 px-4 bg-muted rounded-lg">
              <div className="bar-tile py-4">
                <p className="text-sm text-muted-foreground font-semibold mb-1">Categories</p>
                <p className="">
                    {category?.map((cat: CategoryI) => 
                        (<span key={cat.id}>{cat.name} </span>)
                    )}
                </p>
              </div>
              <div className="bar-tile py-4">
                <p className="text-sm text-muted-foreground font-semibold mb-1">Release date</p>
                <p className="">{releaseDate.toString()}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 px-4 rounded-lg">
                <div className="bar-tile py-4">
                <p className="text-sm text-muted-foreground font-semibold mb-1">Publisher:</p>
                <p className="">
                    {publisher?.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isImageModalOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setIsImageModalOpen(false)}
        >
          <div
            className="relative max-w-2xl max-h-[90vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={
                coverUrl
                  ? coverUrl
                  : "/placeholders/book-placeholder.webp"
              }
              alt={`${title} cover big`}
              className="w-full h-full object-contain"
              width={300}
              height={432}
            />
            {/* Close button */}
            <button
              onClick={() => setIsImageModalOpen(false)}
              className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-2 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
