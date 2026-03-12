"use client";
import { Typography } from "@mui/joy";
import { TopAuthorsProps } from "./types";

export default function TopAuthors({ topAuthors }: TopAuthorsProps) {
  console.log(topAuthors);

  return (
    <>
      <Typography level="title-lg" className="text-center">
        Top 5 authors
      </Typography>
    </>
  );
}
