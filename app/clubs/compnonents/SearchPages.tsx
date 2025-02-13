"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import PagesList from "./PagesList";

interface Page {
  _id: string;
  name: string;
  description: string;
  type: "school" | "club";
  country: string;
  district: string;
}

interface SearchPagesProps {
  pages: Page[];
}

export default function SearchPages({ pages }: SearchPagesProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPages = useMemo(() => {
    if (!searchTerm) return pages;
    return pages.filter((page) =>
      page.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [pages, searchTerm]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <div className="mb-6">
        <Input
          type="text"
          placeholder="Search pages by name..."
          value={searchTerm}
          onChange={handleSearch}
          className="max-w-sm"
        />
      </div>
      <PagesList pages={filteredPages} />
    </div>
  );
}
