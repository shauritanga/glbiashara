import dbConnect from "@/lib/mongodb";
import Page, { IPage } from "@/models/Page";
import User from "@/models/User";
import CompanyDetail from "../components/CompanyDetail";

export default async function CompanyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await dbConnect();

  const companyId = (await params).id;

  const result = await Page.findById(companyId);
  const company = JSON.parse(JSON.stringify(result, null, 2));

  if (!company || company.type !== "company") {
    return (
      <div className="text-center py-16 text-blue-600">Company not found</div>
    );
  }

  // Extract keywords from company description for profession matching
  const professionKeywords = company.description
    .toLowerCase()
    .split(/\W+/)
    .filter(Boolean);

  // Fetch related professionals
  const response = await User.find({
    profession: { $exists: true, $ne: "" },
    $or: professionKeywords.map((keyword: any) => ({
      profession: { $regex: keyword, $options: "i" },
    })),
  })
    .select("name profession image city country")
    .limit(5)
    .lean();

  const relatedProfessionals = JSON.parse(JSON.stringify(response, null, 2));

  return (
    <div className="min-h-screen bg-blue-50 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <CompanyDetail
          company={company as IPage}
          relatedProfessionals={relatedProfessionals as any[]}
        />
      </div>
    </div>
  );
}
