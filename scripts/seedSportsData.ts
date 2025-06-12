import dbConnect from "@/lib/mongodb";
import { SportsCategory, SportsAcademy, SportsTalent } from "@/models/sports";
import { User } from "@/models";
import bcrypt from "bcryptjs";

const sampleUsers = [
  {
    name: "John Mwalimu",
    email: "john.mwalimu@example.com",
    password: "password123",
    phone: "+255123456789",
    city: "Dar es Salaam",
    state: "Dar es Salaam",
    country: "Tanzania",
    streetAddress: "Haile Selassie Road, Msasani",
  },
  {
    name: "Grace Kimaro",
    email: "grace.kimaro@example.com",
    password: "password123",
    phone: "+255987654321",
    city: "Arusha",
    state: "Arusha",
    country: "Tanzania",
    streetAddress: "Stadium Street, Kaloleni",
  },
  {
    name: "David Msigwa",
    email: "david.msigwa@example.com",
    password: "password123",
    phone: "+255456789123",
    city: "Mwanza",
    state: "Mwanza",
    country: "Tanzania",
    streetAddress: "Uhuru Street, Pamba",
  },
];

const sampleAcademies = [
  {
    name: "Elite Football Academy",
    description: "Premier football training facility with professional coaches and modern equipment. We focus on developing young talents through comprehensive training programs.",
    sport: "football",
    location: {
      region: "Dar es Salaam",
      district: "Kinondoni",
      ward: "Msasani",
      street: "Haile Selassie Road",
    },
    contact: {
      phone: "+255123456789",
      email: "info@elitefootball.co.tz",
      website: "www.elitefootball.co.tz",
    },
    facilities: ["Football pitch", "Gym", "Changing rooms", "Medical room"],
    programs: ["Youth Development", "Professional Training", "Goalkeeper Specialist"],
    ageGroups: ["6-12 years", "13-17 years", "18+ years"],
    capacity: 150,
    currentStudents: 120,
    established: new Date("2015-01-01"),
    rating: 4.8,
    totalReviews: 25,
  },
  {
    name: "Champions Basketball Center",
    description: "State-of-the-art basketball facility focusing on skill development and team play. Our experienced coaches help players reach their full potential.",
    sport: "basketball",
    location: {
      region: "Arusha",
      district: "Arusha City",
      ward: "Kaloleni",
      street: "Stadium Street",
    },
    contact: {
      phone: "+255987654321",
      email: "contact@championsbb.co.tz",
      website: "www.championsbasketball.co.tz",
    },
    facilities: ["Indoor court", "Weight room", "Locker rooms", "Video analysis room"],
    programs: ["Junior League", "Senior Training", "3-Point Specialist"],
    ageGroups: ["8-14 years", "15-18 years", "19+ years"],
    capacity: 100,
    currentStudents: 75,
    established: new Date("2018-03-15"),
    rating: 4.6,
    totalReviews: 18,
  },
  {
    name: "Speed Athletics Club",
    description: "Track and field excellence with Olympic-standard training programs. We specialize in developing sprinters, distance runners, and field event athletes.",
    sport: "athletics",
    location: {
      region: "Mwanza",
      district: "Nyamagana",
      ward: "Pamba",
      street: "Uhuru Street",
    },
    contact: {
      phone: "+255456789123",
      email: "info@speedathletics.co.tz",
      website: "www.speedathletics.co.tz",
    },
    facilities: ["400m track", "Field event areas", "Gym", "Recovery center"],
    programs: ["Sprint Training", "Long Distance", "Field Events"],
    ageGroups: ["10-16 years", "17-23 years", "24+ years"],
    capacity: 80,
    currentStudents: 65,
    established: new Date("2012-06-01"),
    rating: 4.9,
    totalReviews: 32,
  },
];

const sampleTalents = [
  {
    sport: "football",
    position: "Midfielder",
    level: "Advanced",
    dateOfBirth: new Date("2004-05-15"),
    height: 175,
    weight: 68,
    preferredFoot: "Right",
    experience: {
      years: 6,
      description: "Started playing at age 12 in local youth teams. Represented regional team in national championships. Known for excellent passing and vision.",
    },
    achievements: [
      "Regional Youth Champion 2022",
      "Best Player Award 2023",
      "National Youth Team Selection",
    ],
    statistics: {
      matchesPlayed: 45,
      goals: 12,
      assists: 18,
    },
    availability: {
      forTraining: true,
      forMatches: true,
      forTransfer: true,
    },
    preferences: {
      preferredRegions: ["Dar es Salaam", "Arusha"],
      willingToRelocate: true,
      lookingFor: ["Professional Contract", "Academy Training"],
    },
    rating: 4.7,
    totalReviews: 8,
  },
  {
    sport: "basketball",
    position: "Point Guard",
    level: "Intermediate",
    dateOfBirth: new Date("2006-08-22"),
    height: 168,
    weight: 60,
    preferredFoot: "Right",
    experience: {
      years: 4,
      description: "Excellent ball handling and court vision. Led high school team to regional finals. Strong leadership qualities and team player.",
    },
    achievements: [
      "Regional High School Champion",
      "MVP Award 2023",
      "All-Star Team Selection",
    ],
    statistics: {
      matchesPlayed: 32,
      assists: 156,
    },
    availability: {
      forTraining: true,
      forMatches: true,
      forTransfer: false,
    },
    preferences: {
      preferredRegions: ["Arusha", "Kilimanjaro"],
      willingToRelocate: false,
      lookingFor: ["Academy Training", "Scholarship"],
    },
    rating: 4.5,
    totalReviews: 5,
  },
  {
    sport: "athletics",
    position: "Sprinter",
    level: "Professional",
    dateOfBirth: new Date("2001-12-10"),
    height: 180,
    weight: 75,
    experience: {
      years: 8,
      description: "Specialized in 100m and 200m sprints. National record holder in youth category. Consistent performer in international competitions.",
    },
    achievements: [
      "National 100m Record Holder",
      "East African Games Medalist",
      "Olympic Qualifier 2024",
    ],
    statistics: {
      personalBests: [
        { event: "100m", record: "10.15s", date: new Date("2023-07-15") },
        { event: "200m", record: "20.45s", date: new Date("2023-08-20") },
      ],
    },
    availability: {
      forTraining: true,
      forMatches: true,
      forTransfer: true,
    },
    preferences: {
      preferredRegions: ["Dar es Salaam", "Mwanza"],
      willingToRelocate: true,
      lookingFor: ["Professional Contract", "International Opportunities"],
    },
    rating: 4.9,
    totalReviews: 12,
  },
];

export async function seedSportsData() {
  try {
    await dbConnect();
    console.log("Connected to database");

    // Clear existing data
    await SportsCategory.deleteMany({});
    await SportsAcademy.deleteMany({});
    await SportsTalent.deleteMany({});
    console.log("Cleared existing sports data");

    // Create sports categories
    const categories = await SportsCategory.insertMany([
      {
        name: "Football",
        slug: "football",
        icon: "⚽",
        description: "Professional football academies and talent development programs across Tanzania.",
      },
      {
        name: "Basketball",
        slug: "basketball",
        icon: "🏀",
        description: "Basketball training centers and emerging players developing their skills.",
      },
      {
        name: "Athletics",
        slug: "athletics",
        icon: "🏃",
        description: "Track and field training programs for sprinters, distance runners, and field event athletes.",
      },
      {
        name: "Swimming",
        slug: "swimming",
        icon: "🏊",
        description: "Swimming academies and aquatic sports training facilities.",
      },
      {
        name: "Tennis",
        slug: "tennis",
        icon: "🎾",
        description: "Tennis coaching and player development with international standard courts.",
      },
      {
        name: "Volleyball",
        slug: "volleyball",
        icon: "🏐",
        description: "Volleyball training and team development programs.",
      },
    ]);
    console.log("Created sports categories");

    // Create sample users
    const users = [];
    for (const userData of sampleUsers) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = new User({
        ...userData,
        password: hashedPassword,
      });
      await user.save();
      users.push(user);
    }
    console.log("Created sample users");

    // Create sample academies
    const academies = [];
    for (let i = 0; i < sampleAcademies.length; i++) {
      const academyData = sampleAcademies[i];
      const category = categories.find(c => c.slug === academyData.sport);
      const user = users[i];

      const slug = academyData.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
      
      const academy = new SportsAcademy({
        ...academyData,
        slug,
        sport: category._id,
        createdBy: user._id,
        isVerified: true,
      });
      await academy.save();
      academies.push(academy);
    }
    console.log("Created sample academies");

    // Create sample talents
    for (let i = 0; i < sampleTalents.length; i++) {
      const talentData = sampleTalents[i];
      const category = categories.find(c => c.slug === talentData.sport);
      const user = users[i];
      const academy = academies[i];

      const talent = new SportsTalent({
        ...talentData,
        user: user._id,
        sport: category._id,
        currentAcademy: academy._id,
        isVerified: true,
      });
      await talent.save();
    }
    console.log("Created sample talents");

    console.log("✅ Sample sports data seeded successfully!");
    return { success: true, message: "Sample data created successfully" };
  } catch (error) {
    console.error("❌ Error seeding sports data:", error);
    return { success: false, message: "Failed to seed data" };
  }
}

// Run if called directly
if (require.main === module) {
  seedSportsData().then(() => process.exit(0));
}
