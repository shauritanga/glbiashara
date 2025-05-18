import mongoose from "mongoose";
import { Profession, Skill } from "@/models";

// Define types
interface SkillSeed {
  name: string;
  category: string;
  professions: string[];
}

// Comprehensive skills data mapped to professions
const skillsData: SkillSeed[] = [
  // Accounting & Finance Skills
  {
    name: "Financial Reporting",
    category: "Finance",
    professions: ["Accountant", "Financial Analyst"],
  },
  { name: "Tax Preparation", category: "Finance", professions: ["Accountant"] },
  { name: "Auditing", category: "Finance", professions: ["Accountant"] },
  { name: "Bookkeeping", category: "Finance", professions: ["Accountant"] },
  {
    name: "Financial Analysis",
    category: "Finance",
    professions: ["Accountant", "Financial Analyst", "Banker"],
  },
  {
    name: "Budgeting",
    category: "Finance",
    professions: ["Accountant", "Financial Analyst", "Project Manager"],
  },
  { name: "Cost Accounting", category: "Finance", professions: ["Accountant"] },
  { name: "QuickBooks", category: "Finance", professions: ["Accountant"] },
  {
    name: "SAP",
    category: "Finance",
    professions: ["Accountant", "Financial Analyst"],
  },
  {
    name: "Excel Advanced Functions",
    category: "Software",
    professions: ["Accountant", "Financial Analyst", "Project Manager"],
  },
  {
    name: "Regulatory Compliance",
    category: "Legal",
    professions: ["Accountant", "Banker", "Lawyer"],
  },
  {
    name: "Risk Assessment",
    category: "Finance",
    professions: ["Accountant", "Financial Analyst", "Banker"],
  },
  {
    name: "Financial Modeling",
    category: "Finance",
    professions: ["Financial Analyst"],
  },
  {
    name: "Valuation",
    category: "Finance",
    professions: ["Financial Analyst"],
  },
  {
    name: "Investment Analysis",
    category: "Finance",
    professions: ["Financial Analyst"],
  },
  {
    name: "Market Research",
    category: "Business",
    professions: ["Financial Analyst", "Marketing Professional"],
  },
  {
    name: "Forecasting",
    category: "Finance",
    professions: ["Financial Analyst", "Project Manager"],
  },
  {
    name: "Bloomberg Terminal",
    category: "Finance",
    professions: ["Financial Analyst", "Banker"],
  },
  {
    name: "Capital Markets",
    category: "Finance",
    professions: ["Financial Analyst", "Banker"],
  },
  {
    name: "Portfolio Management",
    category: "Finance",
    professions: ["Financial Analyst"],
  },
  { name: "Credit Analysis", category: "Finance", professions: ["Banker"] },
  { name: "Loan Processing", category: "Finance", professions: ["Banker"] },

  // Technology Skills
  {
    name: "JavaScript",
    category: "Software",
    professions: ["Software Engineer", "Computer Programmer"],
  },
  {
    name: "Python",
    category: "Software",
    professions: [
      "Software Engineer",
      "Computer Programmer",
      "Financial Analyst",
    ],
  },
  {
    name: "Java",
    category: "Software",
    professions: ["Software Engineer", "Computer Programmer"],
  },
  {
    name: "C#/.NET",
    category: "Software",
    professions: ["Software Engineer", "Computer Programmer"],
  },
  {
    name: "SQL",
    category: "Software",
    professions: [
      "Software Engineer",
      "Computer Programmer",
      "Financial Analyst",
    ],
  },
  {
    name: "NoSQL",
    category: "Software",
    professions: ["Software Engineer", "Computer Programmer"],
  },
  {
    name: "Cloud Services (AWS/Azure/GCP)",
    category: "Software",
    professions: ["Software Engineer", "Computer Engineer"],
  },
  {
    name: "Git",
    category: "Software",
    professions: ["Software Engineer", "Computer Programmer"],
  },
  { name: "CI/CD", category: "Software", professions: ["Software Engineer"] },
  {
    name: "Microservices",
    category: "Software",
    professions: ["Software Engineer"],
  },
  {
    name: "API Development",
    category: "Software",
    professions: ["Software Engineer", "Computer Programmer"],
  },
  {
    name: "Testing",
    category: "Software",
    professions: ["Software Engineer", "Computer Programmer"],
  },
  {
    name: "Agile Methodologies",
    category: "Software",
    professions: ["Software Engineer", "Project Manager"],
  },
  {
    name: "Algorithm Design",
    category: "Software",
    professions: ["Computer Programmer", "Software Engineer"],
  },
  {
    name: "Data Structures",
    category: "Software",
    professions: ["Computer Programmer", "Software Engineer"],
  },
  {
    name: "Object-Oriented Programming",
    category: "Software",
    professions: ["Computer Programmer", "Software Engineer"],
  },
  {
    name: "Functional Programming",
    category: "Software",
    professions: ["Computer Programmer", "Software Engineer"],
  },
  {
    name: "Debugging",
    category: "Software",
    professions: ["Computer Programmer", "Software Engineer"],
  },
  {
    name: "Hardware Design",
    category: "Hardware",
    professions: ["Computer Engineer"],
  },
  {
    name: "Embedded Systems",
    category: "Hardware",
    professions: ["Computer Engineer"],
  },
  {
    name: "Circuit Design",
    category: "Hardware",
    professions: ["Computer Engineer", "Electrical Engineer"],
  },

  // Healthcare Skills
  {
    name: "Patient Assessment",
    category: "Healthcare",
    professions: ["Doctor", "Nurse"],
  },
  { name: "Diagnosis", category: "Healthcare", professions: ["Doctor"] },
  {
    name: "Treatment Planning",
    category: "Healthcare",
    professions: ["Doctor"],
  },
  {
    name: "Medical Documentation",
    category: "Healthcare",
    professions: ["Doctor", "Nurse"],
  },
  {
    name: "Patient Communication",
    category: "Healthcare",
    professions: ["Doctor", "Nurse", "Pharmacist"],
  },
  { name: "Medical Research", category: "Healthcare", professions: ["Doctor"] },
  { name: "Patient Care", category: "Healthcare", professions: ["Nurse"] },
  {
    name: "Vital Signs Monitoring",
    category: "Healthcare",
    professions: ["Nurse"],
  },
  {
    name: "Medication Administration",
    category: "Healthcare",
    professions: ["Nurse"],
  },
  {
    name: "Medication Dispensing",
    category: "Healthcare",
    professions: ["Pharmacist"],
  },
  {
    name: "Drug Interactions Knowledge",
    category: "Healthcare",
    professions: ["Pharmacist"],
  },
  {
    name: "Inventory Management",
    category: "Business",
    professions: ["Pharmacist"],
  },

  // Engineering Skills
  {
    name: "Structural Analysis",
    category: "Engineering",
    professions: ["Civil Engineer", "Mechanical Engineer"],
  },
  {
    name: "AutoCAD",
    category: "Software",
    professions: [
      "Civil Engineer",
      "Mechanical Engineer",
      "Electrical Engineer",
    ],
  },
  {
    name: "Construction Management",
    category: "Engineering",
    professions: ["Civil Engineer", "Project Manager"],
  },
  {
    name: "Site Planning",
    category: "Engineering",
    professions: ["Civil Engineer"],
  },
  {
    name: "Materials Testing",
    category: "Engineering",
    professions: ["Civil Engineer", "Mechanical Engineer"],
  },
  {
    name: "Power Systems",
    category: "Engineering",
    professions: ["Electrical Engineer"],
  },
  {
    name: "Signal Processing",
    category: "Engineering",
    professions: ["Electrical Engineer", "Computer Engineer"],
  },
  {
    name: "Control Systems",
    category: "Engineering",
    professions: ["Electrical Engineer"],
  },
  {
    name: "PCB Design",
    category: "Engineering",
    professions: ["Electrical Engineer", "Computer Engineer"],
  },
  {
    name: "MATLAB",
    category: "Software",
    professions: ["Electrical Engineer", "Mechanical Engineer"],
  },
  {
    name: "CAD/CAM",
    category: "Software",
    professions: ["Mechanical Engineer"],
  },
  {
    name: "Thermodynamics",
    category: "Engineering",
    professions: ["Mechanical Engineer"],
  },
  {
    name: "Fluid Mechanics",
    category: "Engineering",
    professions: ["Mechanical Engineer"],
  },
  {
    name: "HVAC Design",
    category: "Engineering",
    professions: ["Mechanical Engineer"],
  },

  // Legal Skills
  { name: "Legal Research", category: "Legal", professions: ["Lawyer"] },
  { name: "Contract Drafting", category: "Legal", professions: ["Lawyer"] },
  {
    name: "Negotiation",
    category: "Business",
    professions: ["Lawyer", "Realtor", "Project Manager"],
  },
  { name: "Litigation", category: "Legal", professions: ["Lawyer"] },
  { name: "Client Counseling", category: "Legal", professions: ["Lawyer"] },
  { name: "Legal Writing", category: "Legal", professions: ["Lawyer"] },

  // Creative Skills
  {
    name: "Adobe Creative Suite",
    category: "Creative",
    professions: ["Graphic Designer", "Marketing Professional"],
  },
  {
    name: "Typography",
    category: "Creative",
    professions: ["Graphic Designer"],
  },
  {
    name: "Layout Design",
    category: "Creative",
    professions: ["Graphic Designer"],
  },
  {
    name: "Brand Identity",
    category: "Creative",
    professions: ["Graphic Designer", "Marketing Professional"],
  },
  {
    name: "UI/UX Design",
    category: "Creative",
    professions: ["Graphic Designer", "Software Engineer"],
  },
  {
    name: "Drawing",
    category: "Creative",
    professions: ["Artist", "Graphic Designer"],
  },
  { name: "Painting", category: "Creative", professions: ["Artist"] },
  { name: "Sculpture", category: "Creative", professions: ["Artist"] },
  {
    name: "Digital Art",
    category: "Creative",
    professions: ["Artist", "Graphic Designer"],
  },
  {
    name: "Instrument Proficiency",
    category: "Creative",
    professions: ["Musician"],
  },
  { name: "Music Theory", category: "Creative", professions: ["Musician"] },
  { name: "Composition", category: "Creative", professions: ["Musician"] },

  // Education Skills
  {
    name: "Curriculum Development",
    category: "Education",
    professions: ["Teacher"],
  },
  { name: "Lesson Planning", category: "Education", professions: ["Teacher"] },
  {
    name: "Student Assessment",
    category: "Education",
    professions: ["Teacher"],
  },
  {
    name: "Classroom Management",
    category: "Education",
    professions: ["Teacher"],
  },

  // Construction & Trades Skills
  { name: "Woodworking", category: "Construction", professions: ["Carpenter"] },
  {
    name: "Blueprint Reading",
    category: "Construction",
    professions: ["Carpenter", "Electrician", "Civil Engineer"],
  },
  {
    name: "Electrical Wiring",
    category: "Construction",
    professions: ["Electrician"],
  },
  {
    name: "Circuit Installation",
    category: "Construction",
    professions: ["Electrician"],
  },
  {
    name: "Troubleshooting",
    category: "Technical",
    professions: ["Electrician", "Computer Engineer"],
  },

  // Business & Management Skills
  {
    name: "Project Planning",
    category: "Business",
    professions: ["Project Manager"],
  },
  {
    name: "Resource Allocation",
    category: "Business",
    professions: ["Project Manager"],
  },
  {
    name: "Stakeholder Communication",
    category: "Business",
    professions: ["Project Manager"],
  },
  {
    name: "Agile/Scrum",
    category: "Business",
    professions: ["Project Manager", "Software Engineer"],
  },
  {
    name: "Team Leadership",
    category: "Business",
    professions: ["Project Manager"],
  },
  {
    name: "Campaign Management",
    category: "Marketing",
    professions: ["Marketing Professional"],
  },
  {
    name: "Social Media Marketing",
    category: "Marketing",
    professions: ["Marketing Professional"],
  },
  {
    name: "Content Creation",
    category: "Marketing",
    professions: ["Marketing Professional"],
  },
  {
    name: "SEO/SEM",
    category: "Marketing",
    professions: ["Marketing Professional"],
  },
  {
    name: "Analytics",
    category: "Business",
    professions: ["Marketing Professional", "Financial Analyst"],
  },

  // Real Estate Skills
  {
    name: "Property Valuation",
    category: "Real Estate",
    professions: ["Realtor"],
  },
  {
    name: "Property Law",
    category: "Real Estate",
    professions: ["Realtor", "Lawyer"],
  },
  { name: "Staging", category: "Real Estate", professions: ["Realtor"] },
  { name: "MLS Systems", category: "Real Estate", professions: ["Realtor"] },
  {
    name: "Financing Knowledge",
    category: "Real Estate",
    professions: ["Realtor", "Banker"],
  },
];

/**
 * Seeds the skills database and creates relationships with professions
 */
export async function seedSkills() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("Connected to MongoDB for skills seeding");

    // Get all existing professions
    const professions = await Profession.find().lean();
    const professionMap = new Map();

    // Create a map of profession names to their IDs
    professions.forEach((profession) => {
      professionMap.set(profession.name, profession._id);
    });

    // Create skills and link them to professions
    let skillsCreated = 0;

    for (const skillData of skillsData) {
      // Check if skill already exists
      const existingSkill = await Skill.findOne({ name: skillData.name });

      if (!existingSkill) {
        // Find profession IDs for this skill
        const relatedProfessionIds = skillData.professions
          .map((profName) => professionMap.get(profName))
          .filter((id) => id); // Filter out undefined values

        // Create the skill
        const newSkill = new Skill({
          name: skillData.name,
          category: skillData.category,
          relatedProfessions: relatedProfessionIds,
        });

        await newSkill.save();
        skillsCreated++;
      }
    }

    console.log(
      `Skills seeding completed. Created ${skillsCreated} new skills.`
    );
    return { success: true, skillsCreated };
  } catch (error) {
    console.error("Error seeding skills:", error);
    return { success: false, error };
  } finally {
    // Close the connection
    await mongoose.connection.close();
  }
}

// Export the raw data for other uses
export { skillsData };
