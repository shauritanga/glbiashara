import { Suspense } from "react";
import { Header } from "@/components/header";
import { auth } from "@/auth";
import { Footer } from "@/components/footer";
import { redirect } from "next/navigation";
import AcademyRegistrationForm from "./components/AcademyRegistrationForm";

export const dynamic = "force-dynamic";

export default async function RegisterAcademyPage() {
  const session = await auth();
  
  if (!session?.user) {
    redirect("/login?callbackUrl=/sports/register-academy");
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      <Header session={session as any} />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Register Your Sports Academy
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Join our platform and connect with aspiring athletes. Showcase your 
              facilities, programs, and help talents reach their full potential.
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
              <AcademyRegistrationForm />
            </Suspense>
          </div>

          {/* Benefits Section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Reach More Athletes
              </h3>
              <p className="text-gray-600 text-sm">
                Connect with talented athletes looking for quality training and development opportunities.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="text-3xl mb-4">📈</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Grow Your Academy
              </h3>
              <p className="text-gray-600 text-sm">
                Increase enrollment and build your reputation through our verified platform.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="text-3xl mb-4">🏆</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Build Success Stories
              </h3>
              <p className="text-gray-600 text-sm">
                Help create the next generation of sports champions and build lasting legacies.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
