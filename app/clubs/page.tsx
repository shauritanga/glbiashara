import { Suspense } from "react";
import getClubs from "@/actions/getClubs";
import SearchPages from "./compnonents/SearchPages";

export default async function PagesListPage() {
  const pages = await getClubs();
  console.log({ pages });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8"></h1>
      <Suspense fallback={<div>Loading pages...</div>}>
        <SearchPages pages={pages} />
      </Suspense>
    </div>
  );
}
