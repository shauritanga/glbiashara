import { getUsersWithProfession } from "@/actions/user";
import UserList from "./components/UserList";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function ProfessionsPage() {
  const users = await getUsersWithProfession();

  return (
    <div className="flex flex-col m-6 space-y-4 container mx-auto">
      <Link href="/">
        <Button variant="outline" size="sm" className="mb-4">
          ← Back
        </Button>
      </Link>
      <UserList initialUsers={users} />;
    </div>
  );
}
