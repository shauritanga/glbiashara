import { getUsersWithProfession } from "@/actions/user";
import UserList from "./components/UserList";

export default async function ProfessionsPage() {
  const users = await getUsersWithProfession();
  console.log("users", users);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Professions
        </h1>
        {/* Pass users to the client component */}
        <UserList initialUsers={users} />
      </div>
    </div>
  );
}
