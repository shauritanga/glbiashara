import { Suspense } from "react";
import getClubs from "@/actions/getClubs";
import SearchPages from "./compnonents/SearchPages";
import { Header } from "@/components/header";
import { auth } from "@/auth";
import { Footer } from "@/components/footer";

export const dynamic = "force-dynamic";

export default async function PagesListPage() {
  const pages = await getClubs();
  const session = (await auth()) || {};

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      <Header session={session} />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Clubs Directory
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover and connect with sports clubs from around the world. Join
              your favorite club's community today!
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <Suspense
                fallback={
                  <div className="flex items-center justify-center p-12">
                    <div className="animate-pulse flex flex-col items-center">
                      <div className="h-12 w-12 rounded-full bg-gray-300 mb-4"></div>
                      <div className="h-4 w-48 bg-gray-300 rounded mb-2"></div>
                      <div className="h-3 w-32 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                }
              >
                <SearchPages pages={pages} />
              </Suspense>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
