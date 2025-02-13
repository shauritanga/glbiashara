"use client";

import { useState } from "react";
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createPagePost(pageId, content);
      setContent("");
      setIsOpen(false);
      await refreshProfile();
    } catch (error) {
      console.error("Error creating page post:", error);
      alert("Failed to create page post. Please try again.");
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
          <Button type="submit">Post</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
