import { Suspense } from "react";
import SearchPages from "./components/SearchPages";
import getSchools from "@/actions/getSchools";

export const dynamic = "force-dynamic";

export default async function PagesListPage() {
  const pages = await getSchools();

  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<div>Loading pages...</div>}>
        <SearchPages pages={pages} />
      </Suspense>
    </div>
  );
}
