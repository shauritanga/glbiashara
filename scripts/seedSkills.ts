import { seedSkills } from "../data/skillsSeed";

// Self-executing async function
(async () => {
  console.log("Starting skills database seeding...");

  try {
    const result = await seedSkills();

    if (result.success) {
      console.log(
        `Successfully seeded skills database. Created ${result.skillsCreated} new skills.`
      );
      process.exit(0);
    } else {
      console.error("Failed to seed skills database:", result.error);
      process.exit(1);
    }
  } catch (error) {
    console.error("Unexpected error during seeding:", error);
    process.exit(1);
  }
})();
