"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { createPagePost } from "@/actions/createPagePost";
import { Input } from "@/components/ui/input";

interface CreatePagePostModalProps {
  pageId: string;
  refreshProfile: () => Promise<void>;
}

export default function CreatePagePostModal({
  pageId,
  refreshProfile,
}: CreatePagePostModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (
        selectedFile.type.startsWith("image/") ||
        selectedFile.type.startsWith("video/")
      ) {
        setFile(selectedFile);
      } else {
        alert("Please select an image or video file.");
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    const formData = new FormData();
    formData.append("content", content);
    if (file) {
      formData.append("file", file);
    }
    try {
      await createPagePost(pageId, formData);
      setContent("");
      setIsOpen(false);
      await refreshProfile();
    } catch (error) {
      console.error("Error creating page post:", error);
      alert("Failed to create page post. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Create Post</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Page Post</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="content">Post Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's new with your page?"
              rows={5}
              required
            />
          </div>
          <div>
            <Input
              type="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
              ref={fileInputRef}
            />
            {file && (
              <p className="mt-2 text-sm text-gray-600">
                Selected file: {file.name}
              </p>
            )}
          </div>
          <Button type="submit" disabled={isUploading}>
            {isUploading ? "Uploading..." : "Post"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
