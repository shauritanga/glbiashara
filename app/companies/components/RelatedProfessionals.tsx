import Image from "next/image";
import Link from "next/link";
import { Users, User as UserIcon } from "lucide-react";

interface Professional {
  _id: string;
  name: string;
  image?: string;
  profession?: {
    name: string;
    industries?: string[];
  };
  city?: string;
  country?: string;
}

export default function RelatedProfessionals({
  professionals,
}: {
  professionals: Professional[];
}) {
  if (!professionals || professionals.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <Users className="h-5 w-5 text-blue-600" />
          Related Professionals
        </h2>
      </div>

      <div className="divide-y divide-gray-100">
        {professionals.map((professional) => (
          <Link
            key={professional._id}
            href={`/profile/${professional._id}`}
            className="block p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              {professional.image ? (
                <Image
                  src={professional.image}
                  alt={professional.name}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <UserIcon className="h-5 w-5 text-blue-600" />
                </div>
              )}

              <div>
                <h3 className="font-medium text-gray-900">
                  {professional.name}
                </h3>
                <div className="text-sm text-gray-500">
                  {professional.profession?.name || "Professional"}
                  {professional.city && professional.country && (
                    <span>
                      {" "}
                      · {professional.city}, {professional.country}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
