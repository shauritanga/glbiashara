"use client";

import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { createPagePost } from "@/actions/createPagePost";
import { Input } from "@/components/ui/input";
import { AlertCircle, ImageIcon, VideoIcon, X } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

interface CreatePagePostModalProps {
  pageId: string;
  refreshProfile: () => Promise<void>;
}

export default function CreatePagePostModal({
  pageId,
  refreshProfile,
}: CreatePagePostModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const uploadTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (uploadTimerRef.current) {
        clearInterval(uploadTimerRef.current);
      }
    };
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];

      // Check file size
      if (selectedFile.size > MAX_FILE_SIZE) {
        setError(
          "File size exceeds the 10MB limit. Please upload a smaller file."
        );
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        return;
      }

      if (
        selectedFile.type.startsWith("image/") ||
        selectedFile.type.startsWith("video/")
      ) {
        setFile(selectedFile);

        // Create preview
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
          setPreview(e.target?.result as string);
        };
        fileReader.readAsDataURL(selectedFile);
      } else {
        setError("Please select an image or video file.");
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    }
  };

  const clearFile = () => {
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setFile(null);
    setPreview(null);
    setError(null);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (uploadTimerRef.current) {
      clearInterval(uploadTimerRef.current);
      uploadTimerRef.current = null;
    }
  };

  // Simulate upload progress
  const simulateProgress = () => {
    setUploadProgress(0);

    // Estimate upload time based on file size
    const estimatedTimeInSeconds = file ? Math.max(5, file.size / 100000) : 5;
    const steps = 100;
    const intervalTime = (estimatedTimeInSeconds * 1000) / steps;

    let progress = 0;

    uploadTimerRef.current = setInterval(() => {
      // Increment progress, but slow down as we approach 90%
      if (progress < 90) {
        const increment = 90 - progress > 30 ? 2 : 1;
        progress += increment;
        setUploadProgress(progress);
      }
    }, intervalTime);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    if (!description.trim()) {
      setError("Description is required");
      return;
    }

    setIsUploading(true);

    // Start progress simulation if we have a file
    if (file) {
      simulateProgress();
    } else {
      setUploadProgress(50); // Set to 50% immediately if no file
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (file) {
      formData.append("file", file);
    }

    try {
      const result = await createPagePost(pageId, formData);

      // Clear the progress timer
      if (uploadTimerRef.current) {
        clearInterval(uploadTimerRef.current);
        uploadTimerRef.current = null;
      }

      if (result.success) {
        // Set progress to 100% on success
        setUploadProgress(100);

        // Small delay to show 100% before closing
        setTimeout(() => {
          toast({
            title: "Success!",
            description: "Your post has been published.",
            duration: 5000,
          });
          resetForm();
          setIsOpen(false);
          refreshProfile();
        }, 500);
      } else {
        // If there's a timeout error, offer to post without media
        if (result.error && result.error.includes("timed out") && file) {
          setError(
            "Media upload timed out. You can try with a smaller file or post without media."
          );
        } else {
          setError(result.error || "Failed to create post. Please try again.");
        }
        setUploadProgress(0);
      }
    } catch (error) {
      console.error("Error creating page post:", error);
      setError("An unexpected error occurred. Please try again.");
      setUploadProgress(0);

      if (uploadTimerRef.current) {
        clearInterval(uploadTimerRef.current);
        uploadTimerRef.current = null;
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handlePostWithoutMedia = async () => {
    setError(null);
    setIsUploading(true);
    setUploadProgress(50); // Start at 50% for no media

    // Create form data without the file
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);

    try {
      const result = await createPagePost(pageId, formData);

      if (result.success) {
        setUploadProgress(100);

        // Small delay to show 100% before closing
        setTimeout(() => {
          toast({
            title: "Success!",
            description: "Your post has been published without media.",
            duration: 5000,
          });
          resetForm();
          setIsOpen(false);
          refreshProfile();
        }, 500);
      } else {
        setError(result.error || "Failed to create post. Please try again.");
        setUploadProgress(0);
      }
    } catch (error) {
      console.error("Error creating page post:", error);
      setError("An unexpected error occurred. Please try again.");
      setUploadProgress(0);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) resetForm();
      }}
    >
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90">Create Post</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Create Page Post
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          {error && (
            <Alert variant="destructive" className="py-2">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {error && error.includes("timed out") && (
            <div className="flex justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={handlePostWithoutMedia}
                className="mt-2"
              >
                Post without media
              </Button>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">
              Post Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a title for your post"
              className="w-full"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Post Content
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What would you like to share?"
              rows={4}
              className="w-full resize-none"
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Media (Optional)</Label>

            {preview ? (
              <div className="relative mt-2 rounded-md overflow-hidden border border-gray-200">
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8 rounded-full z-10"
                  onClick={clearFile}
                >
                  <X className="h-4 w-4" />
                </Button>

                {file?.type.startsWith("image/") ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <video
                    src={preview}
                    controls
                    className="w-full h-48 object-cover"
                  />
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="file-upload"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <div className="flex mb-2">
                      <ImageIcon className="h-6 w-6 text-gray-400 mr-1" />
                      <VideoIcon className="h-6 w-6 text-gray-400" />
                    </div>
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      Images or videos (max 10MB)
                    </p>
                  </div>
                  <Input
                    id="file-upload"
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    className="hidden"
                  />
                </label>
              </div>
            )}
          </div>

          {isUploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Uploading</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}

          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isUploading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isUploading} className="ml-2">
              {isUploading ? "Uploading..." : "Publish Post"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
