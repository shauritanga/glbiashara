// "use client";

// import { useState, useRef } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Textarea } from "@/components/ui/textarea";
// import { Input } from "@/components/ui/input";
// import { createPost } from "@/actions/createPost";
// import regions from "@/lib/regions.json";
// import districts from "@/lib/districts.json";
// import wards from "@/lib/wards.json";
// import streets from "@/lib/streets.json";
// import business from "@/lib/business.json";

// interface CreatePostModalProps {
//   refreshPosts: () => Promise<void>;
// }

// export default function PostForm({ refreshPosts }: CreatePostModalProps) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [content, setContent] = useState("");
//   const [region, setRegion] = useState("");
//   const [district, setDistrict] = useState("");
//   const [ward, setWard] = useState("");
//   const [street, setStreet] = useState("");
//   const [businessType, setBusinessType] = useState("");
//   const [specification, setSpecification] = useState("");
//   const [file, setFile] = useState<File | null>(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const selectedFile = e.target.files[0];
//       if (
//         selectedFile.type.startsWith("image/") ||
//         selectedFile.type.startsWith("video/")
//       ) {
//         setFile(selectedFile);
//       } else {
//         alert("Please select an image or video file.");
//         if (fileInputRef.current) fileInputRef.current.value = "";
//       }
//     }
//   };

//   const districtOptions =
//     districts.find((group) => group.region === region)?.districts || [];
//   const wardOptions =
//     wards.find((group) => group.district === district)?.wards || [];
//   const streetOptions =
//     streets.find((group) => group.ward === ward)?.streets || [];
//   const specificationOptions =
//     business.find((group) => group.business === businessType)?.specifications ||
//     [];

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!content && !file) {
//       alert("Please add some content or upload a file.");
//       return;
//     }
//     setIsUploading(true);
//     try {
//       const formData = new FormData();
//       formData.append("content", content);
//       if (file) formData.append("file", file);
//       const result = await createPost(formData);
//       if (result?.success) {
//         setContent("");
//         setFile(null);
//         setIsOpen(false);
//         if (fileInputRef.current) fileInputRef.current.value = "";
//         await refreshPosts();
//       } else {
//         throw new Error("Failed to create post");
//       }
//     } catch (error) {
//       console.error("Error creating post:", error);
//       alert("Failed to create post. Please try again.");
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={setIsOpen}>
//       <DialogTrigger asChild>
//         <Button className="mb-8">Create Post</Button>
//       </DialogTrigger>
//       <DialogContent className="max-w-2xl">
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <DialogHeader>
//             <DialogTitle>Create a New Post</DialogTitle>
//             <p className="text-sm text-gray-500">
//               Share your thoughts, photos, or videos with the world!
//             </p>
//           </DialogHeader>

//           {/* Content Section */}
//           <div className="space-y-4">
//             <div className="space-y-2">
//               <label htmlFor="title" className="text-sm font-medium">
//                 Title
//               </label>
//               <Input
//                 id="title"
//                 type="text"
//                 required
//                 placeholder="Enter post title"
//               />
//             </div>
//             <div className="space-y-2">
//               <label htmlFor="description" className="text-sm font-medium">
//                 Description
//               </label>
//               <Textarea
//                 id="description"
//                 value={content}
//                 onChange={(e) => setContent(e.target.value)}
//                 placeholder="What's on your mind?"
//                 rows={4}
//               />
//             </div>
//           </div>

//           {/* Category Section */}
//           <div className="space-y-4">
//             <h3 className="text-sm font-semibold">Category Details</h3>
//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <label htmlFor="category" className="text-sm font-medium">
//                   Category
//                 </label>
//                 <select
//                   id="category"
//                   className="w-full p-2 border rounded-md"
//                   value={businessType}
//                   onChange={(e) => {
//                     setBusinessType(e.target.value);
//                     setSpecification("");
//                   }}
//                 >
//                   <option value="">-- Select Category --</option>
//                   {business.map((item) => (
//                     <option key={item.business} value={item.business}>
//                       {item.business}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="space-y-2">
//                 <label htmlFor="specific" className="text-sm font-medium">
//                   Specification
//                 </label>
//                 <select
//                   id="specific"
//                   className="w-full p-2 border rounded-md"
//                   value={specification}
//                   onChange={(e) => setSpecification(e.target.value)}
//                   disabled={!businessType}
//                 >
//                   <option value="">-- Select Specification --</option>
//                   {specificationOptions.map((spec) => (
//                     <option key={spec} value={spec}>
//                       {spec}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>

//           {/* Location Section */}
//           <div className="space-y-4">
//             <h3 className="text-sm font-semibold">Location Details</h3>
//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <label htmlFor="region" className="text-sm font-medium">
//                   Region
//                 </label>
//                 <select
//                   id="region"
//                   className="w-full p-2 border rounded-md"
//                   value={region}
//                   onChange={(e) => {
//                     setRegion(e.target.value);
//                     setDistrict("");
//                     setWard("");
//                     setStreet("");
//                   }}
//                 >
//                   <option value="">-- Select Region --</option>
//                   {regions.map((region) => (
//                     <option key={region.label} value={region.value}>
//                       {region.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="space-y-2">
//                 <label htmlFor="district" className="text-sm font-medium">
//                   District
//                 </label>
//                 <select
//                   id="district"
//                   className="w-full p-2 border rounded-md"
//                   value={district}
//                   onChange={(e) => {
//                     setDistrict(e.target.value);
//                     setWard("");
//                     setStreet("");
//                   }}
//                   disabled={!region}
//                 >
//                   <option value="">-- Select District --</option>
//                   {districtOptions.map((district) => (
//                     <option key={district.label} value={district.value}>
//                       {district.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="space-y-2">
//                 <label htmlFor="ward" className="text-sm font-medium">
//                   Ward
//                 </label>
//                 <select
//                   id="ward"
//                   className="w-full p-2 border rounded-md"
//                   value={ward}
//                   onChange={(e) => {
//                     setWard(e.target.value);
//                     setStreet("");
//                   }}
//                   disabled={!district}
//                 >
//                   <option value="">-- Select Ward --</option>
//                   {wardOptions.map((ward) => (
//                     <option key={ward} value={ward}>
//                       {ward}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="space-y-2">
//                 <label htmlFor="street" className="text-sm font-medium">
//                   Street/Village
//                 </label>
//                 <select
//                   id="street"
//                   className="w-full p-2 border rounded-md"
//                   value={street}
//                   onChange={(e) => setStreet(e.target.value)}
//                   disabled={!ward}
//                 >
//                   <option value="">-- Select Street --</option>
//                   {streetOptions.map((street) => (
//                     <option key={street} value={street}>
//                       {street}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>

//           {/* Media Section */}
//           <div className="space-y-4">
//             <h3 className="text-sm font-semibold">Media Upload</h3>
//             <div className="space-y-2">
//               <label htmlFor="file" className="text-sm font-medium">
//                 Upload Image/Video
//               </label>
//               <div className="space-y-1">
//                 <Input
//                   id="file"
//                   type="file"
//                   accept="image/*,video/*"
//                   onChange={handleFileChange}
//                   ref={fileInputRef}
//                 />
//                 <p className="text-sm text-gray-500">
//                   Supported formats: JPG, PNG, GIF, MP4, etc.
//                 </p>
//                 {file && (
//                   <p className="text-sm text-gray-600">
//                     Selected file: {file.name}
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Submit Button */}
//           <Button type="submit" disabled={isUploading} className="w-full">
//             {isUploading ? "Uploading..." : "Post"}
//           </Button>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }
