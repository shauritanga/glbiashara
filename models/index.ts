//====================INDUSTRY==========================
import mongoose, { Schema, models, model, Document } from "mongoose";

export interface IIndustry extends Document {
  _id: Schema.Types.ObjectId;
  name: string;
}

const industrySchema = new Schema({
  name: {
    type: String,
    required: [true, "Please add industry name"],
  },
});

export const Industry =
  mongoose.models.Industry ||
  mongoose.model<IIndustry>("Industry", industrySchema);

//===================PAGE================================

export interface IPage {
  _id: Schema.Types.ObjectId;
  name: string;
  description: string;
  type: string;
  country: string;
  logo: string;
  district: string;
  industry?: Schema.Types.ObjectId;
  createdBy: string;
  createdAt: Date;
  posts: [string];
}

const PageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, enum: ["school", "club", "company"], required: true },
    country: { type: String, required: true },
    logo: { type: String },
    district: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    industry: { type: Schema.Types.ObjectId, ref: "Industry" },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "PagePost" }],
  },
  { timestamps: true }
);
export const Page = mongoose.models.Page || mongoose.model("Page", PageSchema);

//========================= PAGEPOST ======================================

export interface IPagePost extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  pageId: mongoose.Schema.Types.ObjectId;
  title: string;
  description: string;
  mediaUrl?: string;
  mediaType?: string;
  likes: number;
  dislikes: number;
  createdAt: Date;
}

export interface IPostInteraction extends Document {
  postId: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  type: "like" | "dislike";
  createdAt: Date;
}

export interface IActionResponse {
  success: boolean;
  likes?: number;
  dislikes?: number;
  error?: string;
}

const PagePostSchema = new Schema(
  {
    pageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Page",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    likes: { type: Number, default: 0, min: 0 },
    dislikes: { type: Number, default: 0, min: 0 },
    mediaUrl: { type: String },
    mediaType: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const PagePost = models.PagePost || model("PagePost", PagePostSchema);

const PostInteractionSchema = new Schema<IPostInteraction>({
  postId: {
    type: Schema.Types.ObjectId,
    ref: "PagePost",
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User", // Assuming you have a User model
    required: true,
  },
  type: {
    type: String,
    enum: ["like", "dislike"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

export const PostInteraction =
  models.PostInteraction ||
  model<IPostInteraction>("PostInteraction", PostInteractionSchema);

PagePostSchema.index({ createdAt: -1 });
PostInteractionSchema.index({ postId: 1, userId: 1 }, { unique: true });

//===========================POST==========================================

export interface IPost extends Document {
  _id: Schema.Types.ObjectId;
  title: string;
  description: string;
  category: string;
  specific: string;
  region: string;
  district: string;
  ward: string;
  street: string;
  mediaUrl: string;
  mediaType: string;
  user: mongoose.Schema.Types.ObjectId;
  isGlobal: boolean;
  createdAt: Date;
}

const postSchema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    specific: { type: String, required: true },
    region: { type: String, required: true },
    district: { type: String, required: true },
    ward: { type: String, required: true },
    street: { type: String, required: true },
    mediaUrl: { type: String },
    isGlobal: { type: Boolean, default: false },
    mediaType: { type: String },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const Post =
  mongoose.models.Post || mongoose.model<IPost>("Post", postSchema);

//=====================PROFESSION====================================

export interface IProfession extends Document {
  _id: Schema.Types.ObjectId;
  name: string;
  industries: [Schema.Types.ObjectId];
}

const professionSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please add profession name"],
    industries: [{ type: Schema.Types.ObjectId, ref: "Industry" }],
  },
});

export const Profession =
  mongoose.models.Profession ||
  mongoose.model<IProfession>("Profession", professionSchema);

//=====================SKILL====================================

export interface ISkill extends Document {
  _id: Schema.Types.ObjectId;
  name: string;
  category: string;
  relatedProfessions: Schema.Types.ObjectId[];
}

const skillSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please add skill name"],
    unique: true,
  },
  category: {
    type: String,
    required: [true, "Please add skill category"],
  },
  relatedProfessions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Profession",
    },
  ],
});

// Create indexes for better query performance
skillSchema.index({ name: 1 }, { unique: true });
skillSchema.index({ category: 1 });
skillSchema.index({ relatedProfessions: 1 });

export const Skill =
  mongoose.models.Skill || mongoose.model<ISkill>("Skill", skillSchema);

//==========================USER===================================

export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  image?: string;
  city: string;
  club: Schema.Types.ObjectId;
  streetAddress: string;
  state: string;
  country: string;
  businessName: string;
  profession: { name: string; industries: [string] };
  companyProfileId?: Schema.Types.ObjectId;
  business: string;
  projects?: [
    {
      _id: string;
      name: string;
      description: string;
      image: string;
      location: string;
      startDate: Date;
      endDate: Date;
      status: string;
    }
  ];
  skills: [
    {
      skill: { type: Schema.Types.ObjectId; ref: "Skill" };
      level: {
        type: String;
        enum: ["Beginner", "Intermediate", "Expert"];
        default: "Intermediate";
      };
      endorsements: { type: Number; default: 0 };
    }
  ];
}

const userSchema = new Schema<IUser>({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String },
  streetAddress: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String },
  businessName: { type: String },
  profession: { type: Schema.Types.ObjectId, ref: "Profession" },
  image: { type: String },
  projects: [
    {
      name: { type: String, required: true },
      description: { type: String, required: true },
      image: { type: String },
      location: { type: String, required: true },
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: true },
      status: { type: String, required: true },
    },
  ],
  business: { type: String },
  companyProfileId: { type: Schema.Types.ObjectId, ref: "CompanyProfile" },
  club: { type: Schema.Types.ObjectId, ref: "Page" },
});

userSchema.index({ email: 1, password: 1 }, { unique: true });
userSchema.index({ name: 1, email: 1 }, { unique: true });
userSchema.index({ phone: 1, email: 1 }, { unique: true });

export const User =
  mongoose.models?.User || mongoose.model<IUser>("User", userSchema);

export interface IContribution extends Document {
  _id: Schema.Types.ObjectId;
  amount: number;
  paymentMethod: string;
  phone?: string;
  name?: string;
  club: Schema.Types.ObjectId;
  createdAt: Date;
}

const contributionSchema = new Schema<IContribution>({
  amount: { type: Number, required: true },
  phone: { type: String },
  paymentMethod: { type: String, required: true },
  name: { type: String },
  club: { type: Schema.Types.ObjectId, ref: "Page", required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Contribution =
  mongoose.models.Contribution ||
  mongoose.model("Contribution", contributionSchema);

// models/CompanyProfile.ts
export interface ICompanyProfile extends Document {
  name: string;
  logoUrl?: string;
  overview?: string;
  mission?: string;
  vision?: string;
  history?: string;
  productsOrServices?: string[];
  coreValues?: string[];
  achievements?: string[];
  leadership?: {
    name: string;
    position: string;
    bio?: string;
    photoUrl?: string;
  }[];
  targetMarket?: string;
  contact: {
    email?: string;
    phone?: string;
    website?: string;
    address?: string;
    socialMedia?: {
      platform: string;
      url: string;
    }[];
  };
  legal?: {
    registrationNumber?: string;
    certifications?: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

const CompanyProfileSchema = new Schema<ICompanyProfile>(
  {
    name: { type: String, required: true },
    logoUrl: { type: String },
    overview: { type: String },
    mission: { type: String },
    vision: { type: String },
    history: { type: String },
    productsOrServices: [{ type: String }],
    coreValues: [{ type: String }],
    achievements: [{ type: String }],
    leadership: [
      {
        name: { type: String, required: true },
        position: { type: String, required: true },
        bio: { type: String },
        photoUrl: { type: String },
      },
    ],
    targetMarket: { type: String },
    contact: {
      email: { type: String },
      phone: { type: String },
      website: { type: String },
      address: { type: String },
      socialMedia: [
        {
          platform: { type: String },
          url: { type: String },
        },
      ],
    },
    legal: {
      registrationNumber: { type: String },
      certifications: [{ type: String }],
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

export const CompanyProfile =
  mongoose.models.CompanyProfile ||
  mongoose.model<ICompanyProfile>("CompanyProfile", CompanyProfileSchema);

export interface IConnection extends Document {
  sender: Schema.Types.ObjectId;
  receiver: Schema.Types.ObjectId;
  status: "pending" | "accepted" | "rejected";
  createdAt: Date;
  updatedAt: Date;
}

const connectionSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// Create a compound index to ensure uniqueness of connections
connectionSchema.index({ sender: 1, receiver: 1 }, { unique: true });

export const Connection =
  mongoose.models.Connection ||
  mongoose.model<IConnection>("Connection", connectionSchema);
