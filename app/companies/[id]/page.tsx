import { notFound } from "next/navigation";
import Link from "next/link";
import CompanyProfileView from "../components/CompanyProfileView";
import RelatedProfessionals from "../components/RelatedProfessionals";
import { ArrowLeft } from "lucide-react";
import { getCompanyProfile } from "@/actions/getCompanyProfile";

export default async function CompanyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getCompanyProfile(id);

  if (!result) {
    return notFound();
  }

  const { companyProfile, owner, professionals } = result;

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <div className="max-w-7xl mx-auto px-4 pt-6 pb-2 relative z-10">
        <Link
          href="/companies"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Companies
        </Link>
      </div>

      <CompanyProfileView
        company={null}
        companyProfile={companyProfile}
        owner={owner}
      />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="lg:col-span-1">
          <RelatedProfessionals professionals={professionals} />
        </div>
      </div>
    </div>
  );
}
