"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Page {
  _id: string;
  name: string;
  description: string;
  type: "school" | "club";
  country: string;
  district: string;
}

interface PagesListProps {
  pages: Page[];
}

export default function PagesList({ pages }: PagesListProps) {
  if (pages.length === 0) {
    return <p className="text-center text-muted-foreground">No pages found.</p>;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {pages.map((page) => (
        <Card key={page._id}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {page.name}
              <Badge variant={page.type === "school" ? "default" : "secondary"}>
                {page.type}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-2">
              {page.description}
            </p>
            <div className="flex justify-between text-sm">
              <span>{page.country}</span>
              <span>{page.district}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
