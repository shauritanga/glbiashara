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
