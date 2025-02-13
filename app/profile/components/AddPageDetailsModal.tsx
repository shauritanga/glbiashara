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
import { addPageDetails } from "@/actions/addPageDetails";

interface Page {
  _id: string;
  name: string;
  description: string;
  details?: string;
}

interface AddPageDetailsModalProps {
  page: Page;
  refreshProfile: () => Promise<void>;
}

export default function AddPageDetailsModal({
  page,
  refreshProfile,
}: AddPageDetailsModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [details, setDetails] = useState(page.details || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addPageDetails(page._id, details);
      setIsOpen(false);
      refreshProfile();
    } catch (error) {
      console.error("Error adding page details:", error);
      alert("Failed to add page details. Please try again.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Details</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Page Details</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="details">Additional Details</Label>
            <Textarea
              id="details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Add more information about your page..."
              rows={5}
            />
          </div>
          <Button type="submit">Save Details</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
