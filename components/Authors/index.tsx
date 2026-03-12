"use client";
import "./authors.css";
import { AuthorI } from "@/models/author";
import Link from "next/link";
import Image from "next/image";
import type { AuthorsProps } from "./types";
import TopAuthors from "./TopAuthors";
import Input from "@mui/joy/Input";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import { Typography } from "@mui/joy";
import { SetStateAction, useState } from "react";
import useDebounce from "@hooks/useDebounce";

const Authors = ({ authors, topAuthors }: AuthorsProps) => {
  const [searchAuthor, setSearchedAuthor] = useState<string>("");
  const [sort, setSort] = useState<string>("def");
  const debouncedText = useDebounce(searchAuthor, 500);

  const handleInput = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchedAuthor(event.target.value);
  };
  const handleChange = (
    event: React.SyntheticEvent | null,
    value: T | null,
  ): void => {
    console.log(event.target.value);
    setSort(event.target.value);
  };
  const showedAuthors = authors.filter((author) => {
    const currentAuthor =
      author.firstName.toLowerCase() + " " + author.lastName.toLowerCase();
    return currentAuthor.indexOf(debouncedText) > -1;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-balance mb-2">
            Authors Catalogue
          </h1>
          <p className="text-muted-foreground text-pretty">
            Discover your next favorite book from our curated collection
          </p>
        </div>
        <TopAuthors topAuthors={topAuthors} />
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="text-muted-foreground">
                <Input
                  type="text"
                  placeholder="Wyszukaj autora"
                  onInput={handleInput}
                />
              </div>
              <Select onChange={handleChange} placeholder="Sort names">
                <Option value="def">Sorting Default</Option>
                <Option value="az">Sorting A-Z</Option>
                <Option value="za">Sorting Z-A</Option>
              </Select>
            </div>

            {/* Authors Grid */}
            <div className="searchArea grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {showedAuthors.map((author: AuthorI) => (
                <Card
                  key={`card-${author.id}`}
                  variant="outlined"
                  orientation="horizontal"
                  sx={{
                    height: 200,
                    border: 0,
                    "&:hover": { boxShadow: "md" },
                  }}
                  className="authorTile my-2 border-0"
                >
                  <Link key={author.id} href={`/author/${author.id}`}>
                    <Image
                      src={
                        author.imageUrl !== ""
                          ? author.imageUrl
                          : "/placeholders/author-placeholder.webp"
                      }
                      width={100}
                      height={142}
                      alt={`${author.firstName} ${author.lastName} image`}
                      className="authorTile-image my-2"
                    />
                    <CardContent className="text-nowrap mt-2 text-center">
                      <Typography level="body-sm">
                        {author.firstName} {author.lastName}
                      </Typography>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Authors;
