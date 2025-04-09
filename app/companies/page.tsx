import dbConnect from "@/lib/mongodb";
import CompanyList from "./components/CompanyList";
import { getPageByCompany } from "@/actions/page.ts";

export default async function CompanyListPage() {
  const companies = (await getPageByCompany()) as any[];

  return (
    <div className="min-h-screen bg-blue-50 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-blue-800 text-center mb-8">
          Companies
        </h1>
        <CompanyList initialCompanies={companies} />
      </div>
    </div>
  );
}
