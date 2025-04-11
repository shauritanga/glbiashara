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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { createPage } from "@/actions/createPage";
import { IIndustry } from "@/models";

export default function CreatePageModal({
  industries,
}: {
  industries: IIndustry[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "",
    industry: "",
    country: "",
    district: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, type: value }));
  };

  const handleIndustrySelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, industry: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log({ formData });
    setIsCreating(true);

    try {
      const result = await createPage(formData as any); // TODO: Improve type safety
      if (result.success) {
        // Reset form and close modal
        setFormData({
          name: "",
          description: "",
          type: "",
          industry: "",
          country: "",
          district: "",
        });
        setIsOpen(false);
        // TODO: Show success message or update UI
      } else {
        throw new Error(result.error || "Failed to create page");
      }
    } catch (error) {
      console.error("Error creating page:", error);
      alert("Failed to create page. Please try again.");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Create Page</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a New Page</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Page Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Page Type</Label>
            <Select
              onValueChange={handleTypeSelectChange}
              value={formData.type}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select page type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="school">School</SelectItem>
                <SelectItem value="club">Club</SelectItem>
                <SelectItem value="company">Company</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {formData.type === "company" ? (
            <div className="space-y-2">
              <Label htmlFor="industry">Company Sector</Label>
              <Select
                onValueChange={handleIndustrySelectChange}
                value={formData.industry}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select page type" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((industry) => (
                    <SelectItem
                      value={industry._id.toString()}
                      key={industry._id.toString()}
                    >
                      {industry.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : null}
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="district">District</Label>
            <Input
              id="district"
              name="district"
              value={formData.district}
              onChange={handleInputChange}
              required
            />
          </div>
          <Button type="submit" disabled={isCreating}>
            {isCreating ? "Creating..." : "Create Page"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
