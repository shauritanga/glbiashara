import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "../auth";
import UserAvatar from "./user-avatar";

export async function Header() {
  const session = await auth();

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          Glbiasharasol
        </Link>
        <nav className="hidden md:flex space-x-4">
          <Link href="/" className="text-gray-600 hover:text-gray-800">
            Home
          </Link>
          <Link href="/clubs" className="text-gray-600 hover:text-gray-800">
            Clubs
          </Link>
          <Link href="/schools" className="text-gray-600 hover:text-gray-800">
            Schools
          </Link>
        </nav>
        <div className="space-x-2">
          {session?.user ? (
            <UserAvatar
              name={session.user.name ?? ""}
              email={session?.user?.email ?? ""}
              imageUrl={session?.user?.image ?? ""}
            />
          ) : (
            <>
              <Button variant="outline" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Register</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
