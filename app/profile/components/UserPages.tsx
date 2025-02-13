import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AddPageDetailsModal from "./AddPageDetailsModal";
import CreatePagePostModal from "./CreatePagePostModal";
import dbConnect from "@/lib/mongodb";
import Page, { IPage } from "@/models/Page";
import getUserPages from "@/actions/getUserPages";

interface UserPagesProps {
  userId: string;
  refreshProfile: () => Promise<void>;
}

export default async function UserPages({
  userId,
  refreshProfile,
}: UserPagesProps) {
  const pages = await getUserPages(userId);

  if (pages.length === 0) {
    return (
      <p className="text-center text-muted-foreground mt-8">
        You haven't created any pages yet.
      </p>
    );
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Your Pages</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {pages.map((page: any) => (
          <Card key={page._id}>
            <CardHeader>
              <CardTitle>{page.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {page.description}
              </p>
              <div className="flex justify-between text-sm mb-4">
                <span>{page.country}</span>
                <span>{page.district}</span>
              </div>
              <div className="flex space-x-2">
                <AddPageDetailsModal
                  page={page}
                  refreshProfile={refreshProfile}
                />
                <CreatePagePostModal
                  pageId={page._id}
                  refreshProfile={refreshProfile}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
