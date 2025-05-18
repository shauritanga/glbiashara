// export interface IPosts {
//   title: string;
//   description: string;
//   type: string;
//   url: string;
// }

export type ActionResponse = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>; // Store field-specific errors
  inputs?: any; // Include the original input if need
};

export type IProfessions = {
  _id: string;
  name: string;
  industries: string;
};

export interface PageResponse {
  _id: string;
  name: string;
  description: string;
  type: string;
  country: string;
  logo: string;
  district: string;
  industry?: string;
  createdBy: string;
  createdAt: Date;
  posts: [string];
}

export interface CompanyProfile {
  _id: string;
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
  createdAt?: Date;
  updatedAt?: Date;
}
