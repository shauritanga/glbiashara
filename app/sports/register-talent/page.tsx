import { Suspense } from "react";
import { Header } from "@/components/header";
import { auth } from "@/auth";
import { Footer } from "@/components/footer";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import TalentRegistrationForm from "./components/TalentRegistrationForm";

export const dynamic = "force-dynamic";

export default async function RegisterTalentPage() {
  const session = await auth();
  
  if (!session?.user) {
    redirect("/login?callbackUrl=/sports/register-talent");
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      <Header session={session as any} />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Navigation */}
          <div className="flex items-center mb-8">
            <Link
              href="/sports/talents"
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <ArrowLeft className="h-5 w-5 mr-1" />
              Back to Talents
            </Link>
          </div>

          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Register as Sports Talent
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Showcase your skills and connect with coaches, scouts, and academies.
              Take the next step in your sporting career by joining our talent network.
            </p>
          </div>

          {/* Registration Form */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <Suspense fallback={
              <div className="flex items-center justify-center p-12">
                <div className="animate-pulse flex flex-col items-center">
                  <div className="h-12 w-12 rounded-full bg-gray-300 mb-4"></div>
                  <div className="h-4 w-48 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 w-32 bg-gray-300 rounded"></div>
                </div>
              </div>
            }>
              <TalentRegistrationForm />
            </Suspense>
          </div>

          {/* Benefits Section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="text-3xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Get Discovered
              </h3>
              <p className="text-gray-600 text-sm">
                Increase your visibility to coaches, scouts, and academies looking for talented athletes.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="text-3xl mb-4">🤝</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Connect with Academies
              </h3>
              <p className="text-gray-600 text-sm">
                Find the right training opportunities and connect with professional academies.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="text-3xl mb-4">🚀</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Advance Your Career
              </h3>
              <p className="text-gray-600 text-sm">
                Take your sporting career to the next level with professional opportunities.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
