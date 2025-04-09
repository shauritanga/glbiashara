"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "../auth";
import UserAvatar from "./user-avatar";
import { Menu } from "lucide-react"; // Add this import for hamburger icon
import { useState } from "react"; // For mobile menu toggle

interface Session {
  user?: {
    name?: string;
    email?: string;
    image?: string;
  };
}

export function Header({ session }: { session: Session }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Note: Since this is a server component, we'll need to make the mobile menu client-side
  // For full functionality, you might want to split this into a client component

  return (
    <header className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-gray-800 flex-shrink-0"
        >
          Glbiasharasol
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            href="/professions"
            className="text-gray-600 hover:text-gray-800 py-2"
          >
            Professions
          </Link>
          <Link
            href="/clubs"
            className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            Clubs
          </Link>
          <Link
            href="/companies"
            className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            Companies
          </Link>
          <Link
            href="/schools"
            className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            Schools
          </Link>
        </nav>

        {/* Auth Buttons / User Avatar */}
        <div className="flex items-center space-x-2">
          {session?.user ? (
            <UserAvatar
              name={session.user.name ?? ""}
              email={session?.user?.email ?? ""}
              imageUrl={session?.user?.image ?? ""}
            />
          ) : (
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                asChild
                className="hidden sm:inline-flex"
              >
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <Link href="/register">Register</Link>
              </Button>
            </div>
          )}
          {/* Mobile Menu Button */}
          <button
            className="mr-2 md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
            aria-label="Toggle mobile menu"
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-6 w-6 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation - Note: This needs client-side state management */}
      {/* For a complete solution, consider moving this to a client component */}
      <div
        className={`${
          isMobileMenuOpen ? "block" : "hidden"
        } md:hidden px-4 py-2 bg-gray-50 border-t`}
      >
        <div className="flex flex-col space-y-4">
          <Link href="/" className="text-gray-600 hover:text-gray-800 py-2">
            Home
          </Link>
          <Link
            href="/professions"
            className="text-gray-600 hover:text-gray-800 py-2"
          >
            Professions
          </Link>
          <Link
            href="/clubs"
            className="text-gray-600 hover:text-gray-800 py-2"
          >
            Clubs
          </Link>
          <Link
            href="/companies"
            className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            Companies
          </Link>
          <Link
            href="/schools"
            className="text-gray-600 hover:text-gray-800 py-2"
          >
            Schools
          </Link>
          {!session?.user && (
            <Button variant="outline" asChild className="w-full">
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
