"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createCompanyProfile } from "@/actions/createCompanyProfile";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, PlusCircle, Upload, Building } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CreateCompanyProfileModalProps {
  userId: string;
}

export default function CreateCompanyProfileModal({
  userId,
}: CreateCompanyProfileModalProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [isCreating, setIsCreating] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    overview: "",
    mission: "",
    vision: "",
    history: "",
    targetMarket: "",
    productsOrServices: [] as string[],
    coreValues: [] as string[],
    achievements: [] as string[],
    email: "",
    phone: "",
    website: "",
    address: "",
    registrationNumber: "",
    certifications: [] as string[],
  });

  // Logo state
  const [logo, setLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  // Leadership team state
  const [leadershipTeam, setLeadershipTeam] = useState<
    Array<{
      name: string;
      position: string;
      bio?: string;
      photoUrl?: string;
      photoFile?: File;
    }>
  >([]);

  // Social media state
  const [socialMedia, setSocialMedia] = useState<
    Array<{
      platform: string;
      url: string;
    }>
  >([]);

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle array input changes (products, values, achievements, certifications)
  const handleArrayInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    arrayName:
      | "productsOrServices"
      | "coreValues"
      | "achievements"
      | "certifications",
    index: number
  ) => {
    const newArray = [...formData[arrayName]];
    newArray[index] = e.target.value;
    setFormData((prev) => ({ ...prev, [arrayName]: newArray }));
  };

  // Add item to array
  const addArrayItem = (
    arrayName:
      | "productsOrServices"
      | "coreValues"
      | "achievements"
      | "certifications"
  ) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: [...prev[arrayName], ""],
    }));
  };

  // Remove item from array
  const removeArrayItem = (
    arrayName:
      | "productsOrServices"
      | "coreValues"
      | "achievements"
      | "certifications",
    index: number
  ) => {
    const newArray = [...formData[arrayName]];
    newArray.splice(index, 1);
    setFormData((prev) => ({ ...prev, [arrayName]: newArray }));
  };

  // Handle logo upload
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogo(file);
      const objectUrl = URL.createObjectURL(file);
      setLogoPreview(objectUrl);
    }
  };

  // Leadership team functions
  const addLeadershipMember = () => {
    setLeadershipTeam((prev) => [...prev, { name: "", position: "" }]);
  };

  const removeLeadershipMember = (index: number) => {
    const newTeam = [...leadershipTeam];
    newTeam.splice(index, 1);
    setLeadershipTeam(newTeam);
  };

  const handleLeadershipChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const newTeam = [...leadershipTeam];
    newTeam[index] = { ...newTeam[index], [field]: value };
    setLeadershipTeam(newTeam);
  };

  const handleLeadershipPhotoChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const newTeam = [...leadershipTeam];

      // Create object URL for preview
      const photoUrl = URL.createObjectURL(file);

      newTeam[index] = {
        ...newTeam[index],
        photoFile: file,
        photoUrl: photoUrl, // Add this line to set the preview URL
      };
      setLeadershipTeam(newTeam);
    }
  };

  const addSocialMedia = () => {
    setSocialMedia([...socialMedia, { platform: "", url: "" }]);
  };

  const removeSocialMedia = (index: number) => {
    const newSocialMedia = [...socialMedia];
    newSocialMedia.splice(index, 1);
    setSocialMedia(newSocialMedia);
  };

  const handleSocialMediaChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const newSocialMedia = [...socialMedia];
    newSocialMedia[index] = { ...newSocialMedia[index], [field]: value };
    setSocialMedia(newSocialMedia);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Only proceed with submission if on the legal tab
    if (activeTab !== "legal") {
      return;
    }

    setIsCreating(true);

    try {
      const formDataToSend = new FormData();

      // Basic company info - ensure userId is correctly set
      formDataToSend.append("userId", userId);
      console.log("Submitting for userId:", userId);

      // Rest of the form data appending remains the same...

      // Basic company info
      formDataToSend.append("name", formData.name);
      formDataToSend.append("overview", formData.overview);
      formDataToSend.append("mission", formData.mission);
      formDataToSend.append("vision", formData.vision);
      formDataToSend.append("history", formData.history);
      formDataToSend.append("targetMarket", formData.targetMarket);

      // Products/Services
      formData.productsOrServices.forEach((item, index) => {
        formDataToSend.append(`productsOrServices[${index}]`, item);
      });

      // Core Values
      formData.coreValues.forEach((item, index) => {
        formDataToSend.append(`coreValues[${index}]`, item);
      });

      // Achievements
      formData.achievements.forEach((item, index) => {
        formDataToSend.append(`achievements[${index}]`, item);
      });

      // Contact info
      formDataToSend.append("contact[email]", formData.email);
      formDataToSend.append("contact[phone]", formData.phone);
      formDataToSend.append("contact[website]", formData.website);
      formDataToSend.append("contact[address]", formData.address);

      // Social media
      socialMedia.forEach((item, index) => {
        formDataToSend.append(
          `contact[socialMedia][${index}][platform]`,
          item.platform
        );
        formDataToSend.append(`contact[socialMedia][${index}][url]`, item.url);
      });

      // Legal info
      formDataToSend.append(
        "legal[registrationNumber]",
        formData.registrationNumber
      );
      formData.certifications.forEach((item, index) => {
        formDataToSend.append(`legal[certifications][${index}]`, item);
      });

      // Leadership team
      leadershipTeam.forEach((member, index) => {
        formDataToSend.append(`leadership[${index}][name]`, member.name);
        formDataToSend.append(
          `leadership[${index}][position]`,
          member.position
        );
        formDataToSend.append(`leadership[${index}][bio]`, member.bio || "");
        if (member.photoFile) {
          formDataToSend.append(`leadershipPhoto${index}`, member.photoFile);
        }
      });

      // Logo
      if (logo) {
        formDataToSend.append("logo", logo);
      }

      console.log("Submitting company profile data...");
      const result = await createCompanyProfile(formDataToSend);
      console.log("Submission result:", result);

      if (result.success) {
        // Show success notification
        toast({
          title: "Success",
          description: "Company profile created successfully!",
          variant: "default",
        });

        // Reset form and close modal
        setFormData({
          name: "",
          overview: "",
          mission: "",
          vision: "",
          history: "",
          productsOrServices: [],
          coreValues: [],
          achievements: [],
          targetMarket: "",
          email: "",
          phone: "",
          website: "",
          address: "",
          registrationNumber: "",
          certifications: [],
        });
        setLeadershipTeam([]);
        setSocialMedia([]);
        setLogo(null);
        setLogoPreview(null);
        setIsOpen(false);
        router.refresh();
      } else {
        // Display the specific error message
        throw new Error(result.error || "Failed to create company profile");
      }
    } catch (error: any) {
      console.error("Error creating company profile:", error);
      // Show error notification with the specific error message
      toast({
        title: "Error",
        description:
          error.message ||
          "Failed to create company profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <span className="cursor-pointer">Create Company Profile</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Create Company Profile</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <Tabs
            defaultValue="basic"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="grid grid-cols-5 mb-6">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="team">Leadership</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
              <TabsTrigger value="legal">Legal</TabsTrigger>
            </TabsList>

            {/* Basic Info Tab */}
            <TabsContent value="basic" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Company Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="logo">Company Logo</Label>
                <div className="flex items-center gap-4">
                  {logoPreview ? (
                    <div className="relative w-20 h-20">
                      <Image
                        src={logoPreview}
                        alt="Logo Preview"
                        fill
                        className="object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setLogo(null);
                          setLogoPreview(null);
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-20 h-20 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
                      <div className="flex flex-col items-center justify-center">
                        <Upload className="w-6 h-6 text-gray-400" />
                        <span className="text-xs text-gray-500 mt-1">
                          Upload
                        </span>
                      </div>
                      <input
                        type="file"
                        id="logo"
                        name="logo"
                        accept="image/*"
                        className="hidden"
                        onChange={handleLogoChange}
                      />
                    </label>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="overview">Company Overview *</Label>
                <Textarea
                  id="overview"
                  name="overview"
                  value={formData.overview}
                  onChange={handleInputChange}
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="targetMarket">Target Market</Label>
                  <Input
                    id="targetMarket"
                    name="targetMarket"
                    value={formData.targetMarket}
                    onChange={handleInputChange}
                    placeholder="Who are your customers?"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Products or Services</Label>
                {formData.productsOrServices.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={item}
                      onChange={(e) =>
                        handleArrayInputChange(e, "productsOrServices", index)
                      }
                      placeholder={`Product/Service ${index + 1}`}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        removeArrayItem("productsOrServices", index)
                      }
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addArrayItem("productsOrServices")}
                  className="mt-2"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Product/Service
                </Button>
              </div>
            </TabsContent>

            {/* About Tab */}
            <TabsContent value="about" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mission">Mission Statement</Label>
                <Textarea
                  id="mission"
                  name="mission"
                  value={formData.mission}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Your company's mission"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="vision">Vision Statement</Label>
                <Textarea
                  id="vision"
                  name="vision"
                  value={formData.vision}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Your company's vision"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="history">Company History</Label>
                <Textarea
                  id="history"
                  name="history"
                  value={formData.history}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Brief history of your company"
                />
              </div>

              <div className="space-y-2">
                <Label>Core Values</Label>
                {formData.coreValues.map((value, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={value}
                      onChange={(e) =>
                        handleArrayInputChange(e, "coreValues", index)
                      }
                      placeholder={`Core Value ${index + 1}`}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeArrayItem("coreValues", index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addArrayItem("coreValues")}
                  className="mt-2"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Core Value
                </Button>
              </div>

              <div className="space-y-2">
                <Label>Achievements</Label>
                {formData.achievements.map((achievement, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={achievement}
                      onChange={(e) =>
                        handleArrayInputChange(e, "achievements", index)
                      }
                      placeholder={`Achievement ${index + 1}`}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeArrayItem("achievements", index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addArrayItem("achievements")}
                  className="mt-2"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Achievement
                </Button>
              </div>
            </TabsContent>

            {/* Leadership Team Tab */}
            <TabsContent value="team" className="space-y-4">
              <div className="space-y-4">
                <Label>Leadership Team</Label>
                {leadershipTeam.map((member, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4 space-y-3"
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Team Member {index + 1}</h4>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeLeadershipMember(index)}
                        className="h-8 w-8 p-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`leadership-name-${index}`}>Name</Label>
                        <Input
                          id={`leadership-name-${index}`}
                          value={member.name}
                          onChange={(e) =>
                            handleLeadershipChange(
                              index,
                              "name",
                              e.target.value
                            )
                          }
                          placeholder="Full Name"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`leadership-position-${index}`}>
                          Position
                        </Label>
                        <Input
                          id={`leadership-position-${index}`}
                          value={member.position}
                          onChange={(e) =>
                            handleLeadershipChange(
                              index,
                              "position",
                              e.target.value
                            )
                          }
                          placeholder="Job Title"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`leadership-bio-${index}`}>Bio</Label>
                      <Textarea
                        id={`leadership-bio-${index}`}
                        value={member.bio}
                        onChange={(e) =>
                          handleLeadershipChange(index, "bio", e.target.value)
                        }
                        placeholder="Brief biography"
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`leadership-photo-${index}`}>Photo</Label>
                      <div className="flex items-center gap-4">
                        {member.photoUrl ? (
                          <div className="relative w-20 h-20">
                            <Image
                              src={member.photoUrl}
                              alt={`${member.name} Photo`}
                              fill
                              className="object-cover rounded-md"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newTeam = [...leadershipTeam];
                                newTeam[index] = {
                                  ...newTeam[index],
                                  photoFile: undefined,
                                  photoUrl: undefined,
                                };
                                setLeadershipTeam(newTeam);
                              }}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ) : (
                          <label className="flex flex-col items-center justify-center w-20 h-20 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
                            <div className="flex flex-col items-center justify-center">
                              <Upload className="w-6 h-6 text-gray-400" />
                              <span className="text-xs text-gray-500 mt-1">
                                Upload
                              </span>
                            </div>
                            <input
                              type="file"
                              id={`leadership-photo-${index}`}
                              accept="image/*"
                              className="hidden"
                              onChange={(e) =>
                                handleLeadershipPhotoChange(e, index)
                              }
                            />
                          </label>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  onClick={addLeadershipMember}
                  className="w-full mt-2"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Team Member
                </Button>
              </div>
            </TabsContent>

            {/* Contact Tab */}
            <TabsContent value="contact" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="company@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  placeholder="https://example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Company address"
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label>Social Media</Label>
                {socialMedia.map((item, index) => (
                  <div key={index} className="grid grid-cols-3 gap-2">
                    <div>
                      <Input
                        value={item.platform}
                        onChange={(e) =>
                          handleSocialMediaChange(
                            index,
                            "platform",
                            e.target.value
                          )
                        }
                        placeholder="Platform"
                      />
                    </div>
                    <div className="col-span-2 flex gap-2">
                      <Input
                        value={item.url}
                        onChange={(e) =>
                          handleSocialMediaChange(index, "url", e.target.value)
                        }
                        placeholder="URL"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeSocialMedia(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addSocialMedia}
                  className="mt-2"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Social Media
                </Button>
              </div>
            </TabsContent>

            {/* Legal Tab */}
            <TabsContent value="legal" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="registrationNumber">Registration Number</Label>
                <Input
                  id="registrationNumber"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleInputChange}
                  placeholder="Business registration number"
                />
              </div>

              <div className="space-y-2">
                <Label>Certifications & Licenses</Label>
                {formData.certifications.map((cert, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={cert}
                      onChange={(e) =>
                        handleArrayInputChange(e, "certifications", index)
                      }
                      placeholder={`Certification ${index + 1}`}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeArrayItem("certifications", index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addArrayItem("certifications")}
                  className="mt-2"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Certification
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-between pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isCreating}
            >
              Cancel
            </Button>

            <div className="flex gap-2">
              {activeTab !== "basic" && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const tabs = ["basic", "about", "team", "contact", "legal"];
                    const currentIndex = tabs.indexOf(activeTab);
                    if (currentIndex > 0) {
                      setActiveTab(tabs[currentIndex - 1]);
                    }
                  }}
                >
                  Previous
                </Button>
              )}

              {activeTab !== "legal" ? (
                <Button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const tabs = ["basic", "about", "team", "contact", "legal"];
                    const currentIndex = tabs.indexOf(activeTab);
                    if (currentIndex < tabs.length - 1) {
                      setActiveTab(tabs[currentIndex + 1]);
                    }
                  }}
                >
                  Next
                </Button>
              ) : (
                <Button type="submit" disabled={isCreating}>
                  {isCreating ? "Creating..." : "Create Profile"}
                </Button>
              )}
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
