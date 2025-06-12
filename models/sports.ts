import mongoose, { Schema, Document } from "mongoose";

// Sports Category Interface and Schema
export interface ISportsCategory extends Document {
  _id: Schema.Types.ObjectId;
  name: string;
  slug: string;
  icon: string;
  description: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const sportsCategorySchema = new Schema<ISportsCategory>(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    icon: { type: String, required: true },
    description: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Sports Academy Interface and Schema
export interface ISportsAcademy extends Document {
  _id: Schema.Types.ObjectId;
  name: string;
  slug: string;
  description: string;
  sport: Schema.Types.ObjectId; // Reference to SportsCategory
  location: {
    region: string;
    district: string;
    ward?: string;
    street?: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  contact: {
    phone: string;
    email: string;
    website?: string;
    socialMedia?: {
      facebook?: string;
      instagram?: string;
      twitter?: string;
    };
  };
  facilities: string[];
  programs: string[];
  ageGroups: string[];
  trainingSchedule: {
    days: string[];
    times: string;
  };
  fees: {
    registration?: number;
    monthly?: number;
    annual?: number;
    currency: string;
  };
  capacity: number;
  currentStudents: number;
  established: Date;
  rating: number;
  totalReviews: number;
  images: string[];
  achievements: string[];
  coaches: {
    name: string;
    qualification: string;
    experience: string;
    photo?: string;
  }[];
  isVerified: boolean;
  isActive: boolean;
  createdBy: Schema.Types.ObjectId; // Reference to User
  createdAt: Date;
  updatedAt: Date;
}

const sportsAcademySchema = new Schema<ISportsAcademy>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    sport: { type: Schema.Types.ObjectId, ref: "SportsCategory", required: true },
    location: {
      region: { type: String, required: true },
      district: { type: String, required: true },
      ward: { type: String },
      street: { type: String },
      coordinates: {
        latitude: { type: Number },
        longitude: { type: Number },
      },
    },
    contact: {
      phone: { type: String, required: true },
      email: { type: String, required: true },
      website: { type: String },
      socialMedia: {
        facebook: { type: String },
        instagram: { type: String },
        twitter: { type: String },
      },
    },
    facilities: [{ type: String }],
    programs: [{ type: String }],
    ageGroups: [{ type: String }],
    trainingSchedule: {
      days: [{ type: String }],
      times: { type: String },
    },
    fees: {
      registration: { type: Number },
      monthly: { type: Number },
      annual: { type: Number },
      currency: { type: String, default: "TZS" },
    },
    capacity: { type: Number, required: true },
    currentStudents: { type: Number, default: 0 },
    established: { type: Date, required: true },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    totalReviews: { type: Number, default: 0 },
    images: [{ type: String }],
    achievements: [{ type: String }],
    coaches: [
      {
        name: { type: String, required: true },
        qualification: { type: String, required: true },
        experience: { type: String, required: true },
        photo: { type: String },
      },
    ],
    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

// Sports Talent Interface and Schema
export interface ISportsTalent extends Document {
  _id: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId; // Reference to User
  sport: Schema.Types.ObjectId; // Reference to SportsCategory
  position: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Professional";
  dateOfBirth: Date;
  height?: number; // in cm
  weight?: number; // in kg
  preferredFoot?: "Left" | "Right" | "Both"; // for sports where applicable
  experience: {
    years: number;
    description: string;
  };
  currentAcademy?: Schema.Types.ObjectId; // Reference to SportsAcademy
  previousAcademies?: {
    academy: string;
    period: string;
    achievements?: string[];
  }[];
  achievements: string[];
  statistics?: {
    matchesPlayed?: number;
    goals?: number;
    assists?: number;
    wins?: number;
    personalBests?: {
      event: string;
      record: string;
      date: Date;
    }[];
  };
  videos: string[]; // URLs to highlight videos
  availability: {
    forTraining: boolean;
    forMatches: boolean;
    forTransfer: boolean;
  };
  preferences: {
    preferredRegions: string[];
    willingToRelocate: boolean;
    lookingFor: string[]; // e.g., ["Professional Contract", "Academy Training", "Scholarship"]
  };
  rating: number;
  totalReviews: number;
  isActive: boolean;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const sportsTalentSchema = new Schema<ISportsTalent>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    sport: { type: Schema.Types.ObjectId, ref: "SportsCategory", required: true },
    position: { type: String, required: true },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced", "Professional"],
      required: true,
    },
    dateOfBirth: { type: Date, required: true },
    height: { type: Number }, // in cm
    weight: { type: Number }, // in kg
    preferredFoot: {
      type: String,
      enum: ["Left", "Right", "Both"],
    },
    experience: {
      years: { type: Number, required: true },
      description: { type: String, required: true },
    },
    currentAcademy: { type: Schema.Types.ObjectId, ref: "SportsAcademy" },
    previousAcademies: [
      {
        academy: { type: String },
        period: { type: String },
        achievements: [{ type: String }],
      },
    ],
    achievements: [{ type: String }],
    statistics: {
      matchesPlayed: { type: Number },
      goals: { type: Number },
      assists: { type: Number },
      wins: { type: Number },
      personalBests: [
        {
          event: { type: String },
          record: { type: String },
          date: { type: Date },
        },
      ],
    },
    videos: [{ type: String }],
    availability: {
      forTraining: { type: Boolean, default: true },
      forMatches: { type: Boolean, default: true },
      forTransfer: { type: Boolean, default: false },
    },
    preferences: {
      preferredRegions: [{ type: String }],
      willingToRelocate: { type: Boolean, default: false },
      lookingFor: [{ type: String }],
    },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    totalReviews: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Sports Review Interface and Schema
export interface ISportsReview extends Document {
  _id: Schema.Types.ObjectId;
  reviewer: Schema.Types.ObjectId; // Reference to User
  targetType: "Academy" | "Talent";
  targetId: Schema.Types.ObjectId; // Reference to Academy or Talent
  rating: number;
  comment: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const sportsReviewSchema = new Schema<ISportsReview>(
  {
    reviewer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    targetType: { type: String, enum: ["Academy", "Talent"], required: true },
    targetId: { type: Schema.Types.ObjectId, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Create indexes for better performance
sportsCategorySchema.index({ slug: 1 });
sportsCategorySchema.index({ isActive: 1 });

sportsAcademySchema.index({ slug: 1 });
sportsAcademySchema.index({ sport: 1 });
sportsAcademySchema.index({ "location.region": 1, "location.district": 1 });
sportsAcademySchema.index({ rating: -1 });
sportsAcademySchema.index({ isActive: 1, isVerified: 1 });

sportsTalentSchema.index({ user: 1 });
sportsTalentSchema.index({ sport: 1 });
sportsTalentSchema.index({ level: 1 });
sportsTalentSchema.index({ rating: -1 });
sportsTalentSchema.index({ isActive: 1, isVerified: 1 });

sportsReviewSchema.index({ targetType: 1, targetId: 1 });
sportsReviewSchema.index({ reviewer: 1 });

// Export models
export const SportsCategory =
  mongoose.models.SportsCategory ||
  mongoose.model<ISportsCategory>("SportsCategory", sportsCategorySchema);

export const SportsAcademy =
  mongoose.models.SportsAcademy ||
  mongoose.model<ISportsAcademy>("SportsAcademy", sportsAcademySchema);

export const SportsTalent =
  mongoose.models.SportsTalent ||
  mongoose.model<ISportsTalent>("SportsTalent", sportsTalentSchema);

export const SportsReview =
  mongoose.models.SportsReview ||
  mongoose.model<ISportsReview>("SportsReview", sportsReviewSchema);
