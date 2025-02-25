"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IUser } from "@/models/User";
import { updateUser } from "@/actions/getUser";

interface Club {
  _id: string;
  name: string;
}

export default function EditProfileModal({
  profile,
  clubs,
}: {
  profile: IUser;
  clubs: Club[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransistion] = useTransition();
  const [formData, setFormData] = useState({
    name: profile.name,
    club: profile.club || "",
    business: "",
    profession: "",
    country: profile.country || "",
    phone: profile.phone || "",
    streetAddress: profile.streetAddress || "",
    city: profile.city || "",
    state: profile.state || "",
  });

  const handleOpen = () => {
    setFormData({
      name: profile.name,
      club: profile.club || "",
      profession: profile.profession || "",
      business: profile.business || "",
      country: profile.country || "",
      phone: profile.phone || "",
      streetAddress: profile.streetAddress || "",
      city: profile.city || "",
      state: profile.state || "",
    });
    setIsOpen(true);
  };

  const handleSelectChange =
    (field: keyof typeof formData) => (value: string) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    };

  const handleInputChange =
    (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const submitAction = () => {
    startTransistion(async () => {
      try {
        await updateUser(profile._id, formData);
        setIsOpen(false);
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    });
  };

  const countries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo (Congo-Brazzaville)",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czechia (Czech Republic)",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar (Burma)",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Korea",
    "North Macedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestine",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Korea",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vatican City",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe",
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={handleOpen}>Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <form action={submitAction} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Personal Information</h3>
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <Input
                id="name"
                value={formData.name}
                onChange={handleInputChange("name")}
                className="mt-1"
                placeholder="Enter your name"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone
              </label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={handleInputChange("phone")}
                className="mt-1"
                placeholder="Enter your phone number"
                type="tel"
              />
            </div>
          </div>

          {/* Address Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Address Information</h3>
            <div className="space-y-2">
              <label
                htmlFor="streetAddress"
                className="block text-sm font-medium text-gray-700"
              >
                Street Address
              </label>
              <Input
                id="streetAddress"
                value={formData.streetAddress}
                onChange={handleInputChange("streetAddress")}
                className="mt-1"
                placeholder="Enter your street address"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  City
                </label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={handleInputChange("city")}
                  className="mt-1"
                  placeholder="Enter your city"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="state"
                  className="block text-sm font-medium text-gray-700"
                >
                  State
                </label>
                <Input
                  id="state"
                  value={formData.state}
                  onChange={handleInputChange("state")}
                  className="mt-1"
                  placeholder="Enter your state"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700"
              >
                Country
              </label>
              <Select
                value={formData.country}
                onValueChange={handleSelectChange("country")}
              >
                <SelectTrigger id="country">
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px] overflow-y-auto">
                  {countries.map((country) => (
                    <SelectItem
                      key={country.toLowerCase().replace(/\s+/g, "-")}
                      value={country.toLowerCase().replace(/\s+/g, "-")}
                    >
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Professional Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Professional Information</h3>
            <div className="space-y-2">
              <label
                htmlFor="club"
                className="block text-sm font-medium text-gray-700"
              >
                Football Club
              </label>
              <Select
                value={`${formData.club}`}
                onValueChange={handleSelectChange("club")}
              >
                <SelectTrigger id="club">
                  <SelectValue placeholder="Select a club" />
                </SelectTrigger>
                <SelectContent>
                  {clubs.map((club) => (
                    <SelectItem key={club._id} value={club._id}>
                      {club.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="career"
                className="block text-sm font-medium text-gray-700"
              >
                Career
              </label>
              <Select
                value={formData.profession}
                onValueChange={handleSelectChange("profession")}
              >
                <SelectTrigger id="profession">
                  <SelectValue placeholder="Select a career" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="software-engineer">
                    Software Engineer
                  </SelectItem>
                  <SelectItem value="graphic-designer">
                    Graphic Designer
                  </SelectItem>
                  <SelectItem value="project-manager">
                    Project Manager
                  </SelectItem>
                  <SelectItem value="data-analyst">Data Analyst</SelectItem>
                  <SelectItem value="marketing-specialist">
                    Marketing Specialist
                  </SelectItem>
                  <SelectItem value="financial-advisor">
                    Financial Advisor
                  </SelectItem>
                  <SelectItem value="teacher">Teacher</SelectItem>
                  <SelectItem value="nurse">Nurse</SelectItem>
                  <SelectItem value="sales-representative">
                    Sales Representative
                  </SelectItem>
                  <SelectItem value="human-resources">
                    Human Resources
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="business"
                className="block text-sm font-medium text-gray-700"
              >
                Business
              </label>
              <Select
                value={formData.business}
                onValueChange={handleSelectChange("business")}
              >
                <SelectTrigger id="business">
                  <SelectValue placeholder="Select a business" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="hospitality">Hospitality</SelectItem>
                  <SelectItem value="construction">Construction</SelectItem>
                  <SelectItem value="transportation">Transportation</SelectItem>
                  <SelectItem value="media">Media & Entertainment</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
