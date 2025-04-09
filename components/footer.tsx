import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-blue-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Us */}
          <div>
            <h3 className="text-xl font-semibold text-blue-200 mb-4">
              About Us
            </h3>
            <p className="text-blue-300">
              We are a leading tech company providing innovative solutions for
              businesses worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-blue-200 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-blue-300 hover:text-blue-100 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/clubs"
                  className="text-blue-300 hover:text-blue-100 transition-colors"
                >
                  Clubs
                </Link>
              </li>
              <li>
                <Link
                  href="/schools"
                  className="text-blue-300 hover:text-blue-100 transition-colors"
                >
                  Schools
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-blue-300 hover:text-blue-100 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-xl font-semibold text-blue-200 mb-4">
              Contact Us
            </h3>
            <p className="text-blue-300">
              123 Tech Street, Silicon Valley, CA 94000
            </p>
            <p className="text-blue-300">Phone: (123) 456-7890</p>
            <p className="text-blue-300">Email: info@techcompany.com</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-blue-700 text-center">
          <p className="text-blue-300">
            © 2023 Glbiashara Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
