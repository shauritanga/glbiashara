import { auth } from "@/auth";
import { getUser } from "@/actions/getUser";
import getClubs from "@/actions/getClubs";
import { getProfessions } from "@/actions/getProfessions";
import { EditProfileForm } from "../components/EditFormNew";

export default async function EditProfileModal() {
  const session = await auth();
  const profile = await getUser(session?.user?.email!);
  const clubs = await getClubs();

  const professions = await getProfessions();
  return (
    <div className="flex items-center justify-center">
      <EditProfileForm
        profile={profile}
        professions={professions}
        clubs={clubs}
      />
    </div>
  );
}
