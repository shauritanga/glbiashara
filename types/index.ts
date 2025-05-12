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
