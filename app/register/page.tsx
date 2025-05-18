"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { createUser } from "@/actions/user";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import countries from "@/lib/countries.json";
import business from "@/lib/business.json";
import { getProfessions } from "@/actions/getProfessions";
import { IProfessions, PageResponse } from "@/types";
import getClubs from "@/actions/getClubs";
import { motion, AnimatePresence } from "framer-motion";

interface Question {
  id: string;
  text: string;
  type:
    | "text"
    | "email"
    | "select"
    | "password"
    | "file"
    | "tel"
    | "textarea"
    | "multifile";
  placeholder?: string;
  options?: string[];
  optionValues?: Record<string, string>;
  accept?: string;
  minLength?: number;
  description?: string;
  icon?: string;
}

// Service selection questions
const serviceQuestions: Question[] = [
  {
    id: "role",
    text: "What brings you to GLBiashara today?",
    type: "select",
    options: [
      "I want to sell products or services",
      "I want to buy products or services",
      "I'm looking for job opportunities",
    ],
    placeholder: "Select what you're here for",
    description:
      "GLBiashara connects buyers, sellers, and job seekers across Tanzania and beyond.",
    icon: "🌍",
  },
];

// Basic user information
const baseQuestions: Question[] = [
  {
    id: "name",
    text: "What's your name?",
    type: "text",
    placeholder: "Enter your full name",
    description: "We'll use this to personalize your experience",
    icon: "👤",
  },
  {
    id: "email",
    text: "What's your email address?",
    type: "email",
    placeholder: "Enter your email",
    description: "We'll send important updates here",
    icon: "✉️",
  },
];

// Seller-specific questions
const sellerQuestions: Question[] = [
  {
    id: "businessName",
    text: "What's your business called?",
    type: "text",
    placeholder: "Enter your business name",
    description: "This is how customers will find you",
    icon: "🏪",
  },
  {
    id: "industry",
    text: "What industry are you in?",
    type: "select",
    options: business.map((item) => item.business).sort(),
    placeholder: "Select your industry",
    description: "This helps customers find relevant products and services",
    icon: "🏭",
  },
  {
    id: "specific",
    text: "More specifically, what do you offer?",
    type: "select",
    options: [], // Will be populated dynamically
    placeholder: "Select your specialization",
    description: "The more specific, the easier for customers to find you",
    icon: "🔍",
  },
  {
    id: "productImages",
    text: "Upload photos of what you're selling",
    type: "multifile",
    accept: "image/*",
    description: "Add up to 3 photos of your products or services",
    icon: "📸",
  },
  {
    id: "productDescription",
    text: "Describe what you're selling",
    type: "textarea",
    placeholder: "Tell potential customers about your products or services",
    description: "Be detailed about features, benefits, and pricing",
    icon: "📝",
  },
  {
    id: "country",
    text: "Where are you located?",
    type: "select",
    options: countries,
    placeholder: "Select your country",
    description: "We'll connect you with nearby customers",
    icon: "🌎",
  },
  {
    id: "city",
    text: "Which city are you in?",
    type: "text",
    placeholder: "Enter your city",
    description: "Local customers can find you more easily",
    icon: "🏙️",
  },
  {
    id: "streetAddress",
    text: "What's your street address?",
    type: "text",
    placeholder: "Enter your street address",
    description: "This helps customers find your physical location",
    icon: "📍",
  },
  {
    id: "businessLogo",
    text: "Upload your business logo",
    type: "file",
    accept: "image/*",
    description: "A professional logo helps your business stand out",
    icon: "🖼️",
  },
];

// Job seeker questions
const jobSeekerQuestions: Question[] = [
  {
    id: "profession",
    text: "What's your profession?",
    type: "select",
    options: [], // Will be populated from database
    placeholder: "Select your profession",
    description: "This helps match you with relevant job opportunities",
    icon: "💼",
  },
  {
    id: "experience",
    text: "How many years of experience do you have?",
    type: "select",
    options: [
      "Less than 1 year",
      "1-3 years",
      "3-5 years",
      "5-10 years",
      "10+ years",
    ],
    placeholder: "Select your experience level",
    description: "Employers want to know your expertise level",
    icon: "⏱️",
  },
  {
    id: "skills",
    text: "What are your key skills?",
    type: "textarea",
    placeholder: "List your top skills (separated by commas)",
    description: "Highlight what makes you valuable to employers",
    icon: "🔧",
  },
  {
    id: "location",
    text: "Where are you looking for work?",
    type: "select",
    options: countries,
    placeholder: "Select your preferred location",
    description: "We'll show you jobs in this area",
    icon: "📍",
  },
];

// Final questions for all users
const finalQuestions: Question[] = [
  {
    id: "club",
    text: "Which sports club do you support?",
    type: "select",
    options: [
      "Simba SC",
      "Yanga SC",
      "Azam FC",
      "KMC FC",
      "Chelsea FC",
      "Manchester United",
      "Liverpool FC",
      "Barcelona FC",
      "Real Madrid",
      "Bayern Munich",
      "PSG",
      "Inter Milan",
      "AC Milan",
      "Juventus",
      "Atletico Madrid",
      "Borussia Dortmund",
      "Manchester City",
      "Tottenham Hotspur",
      "Arsenal",
      "Everton",
      "West Ham United",
      "Leicester City",
      "Southampton",
      "Newcastle United",
      "Aston Villa",
      "Crystal Palace",
      "Mtibwa Sugar",
      "Coastal Union",
      "Ruvu Shooting",
      "Kagera Sugar",
      "Biashara United",
      "Dodoma Jiji",
      "Namungo FC",
    ],
    placeholder: "Select your favorite club",
    description: "Connect with fellow fans in your area",
    icon: "⚽",
  },
  {
    id: "phone",
    text: "What's your phone number?",
    type: "tel",
    placeholder: "Enter your phone number",
    description: "We'll use this for account verification and notifications",
    icon: "📱",
  },
  {
    id: "password",
    text: "Create a password for your account",
    type: "password",
    placeholder: "Enter a secure password",
    minLength: 6,
    description: "Use at least 6 characters with letters and numbers",
    icon: "🔒",
  },
];

export default function Register() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [professions, setProfessions] = useState<IProfessions[]>([]);
  const [clubs, setClubs] = useState<PageResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [productImages, setProductImages] = useState<File[]>([]);

  // Determine which questions to show based on role
  const [currentSection, setCurrentSection] = useState<
    "service" | "base" | "role-specific" | "final"
  >("service");

  // Initialize answers
  const allPossibleQuestions = [
    ...serviceQuestions,
    ...baseQuestions,
    ...sellerQuestions,
    ...jobSeekerQuestions,
    ...finalQuestions,
  ];

  const initialAnswers: Record<string, string> = allPossibleQuestions.reduce(
    (acc, q) => ({ ...acc, [q.id]: "" }),
    {}
  );

  const [answers, setAnswers] =
    useState<Record<string, string>>(initialAnswers);
  const [businessLogoFile, setBusinessLogoFile] = useState<File | null>(null);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  // Fetch professions from the database
  useEffect(() => {
    const fetchProfessions = async () => {
      try {
        const [professionsData, clubsData] = await Promise.all([
          getProfessions(),
          getClubs(),
        ]);
        setProfessions(professionsData);
        setClubs(clubsData);
      } catch (error) {
        console.error("Failed to fetch professions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfessions();
  }, []);

  // Get specifications based on selected industry
  const getSpecificationsForIndustry = (industryName: string): string[] => {
    const selectedBusiness = business.find((b) => b.business === industryName);
    return selectedBusiness?.specifications || [];
  };

  // Determine which questions to show based on user role
  const getCurrentQuestions = (): Question[] => {
    if (currentSection === "service") {
      return serviceQuestions;
    }

    if (currentSection === "base") {
      return baseQuestions;
    }

    if (currentSection === "role-specific") {
      // For sellers
      if (answers.role === "I want to sell products or services") {
        // Create a copy of sellerQuestions to modify
        const updatedSellerQuestions = [...sellerQuestions];

        // Find the specific question and update its options
        const specificQuestionIndex = updatedSellerQuestions.findIndex(
          (q) => q.id === "specific"
        );

        if (specificQuestionIndex !== -1 && answers.industry) {
          updatedSellerQuestions[specificQuestionIndex] = {
            ...updatedSellerQuestions[specificQuestionIndex],
            options: getSpecificationsForIndustry(answers.industry),
          };
        }

        return updatedSellerQuestions;
      }

      // For job seekers
      if (answers.role === "I'm looking for job opportunities") {
        // Create a copy of jobSeekerQuestions to modify
        const updatedJobSeekerQuestions = [...jobSeekerQuestions];

        // Find the profession question and update its options
        const professionQuestionIndex = updatedJobSeekerQuestions.findIndex(
          (q) => q.id === "profession"
        );

        if (professionQuestionIndex !== -1) {
          updatedJobSeekerQuestions[professionQuestionIndex] = {
            ...updatedJobSeekerQuestions[professionQuestionIndex],
            options: professions.map((p) => p.name),
          };
        }

        return updatedJobSeekerQuestions;
      }

      // For buyers (minimal role-specific questions)
      return [];
    }

    // Final questions for all users
    if (currentSection === "final") {
      return finalQuestions;
    }

    return [];
  };

  const questions = getCurrentQuestions();
  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    if (e.target.type === "file") {
      const fileInput = e.target as HTMLInputElement;

      if (currentQuestion.id === "productImages") {
        const files = fileInput.files;
        if (files && files.length > 0) {
          // Limit to 3 images
          const fileArray = Array.from(files).slice(0, 3);
          setProductImages(fileArray);
          setAnswers({
            ...answers,
            [currentQuestion.id]: fileArray.map((f) => f.name).join(", "),
          });

          // Log to verify files are captured
          console.log(
            "Product images captured:",
            fileArray.map((f) => f.name)
          );
        }
      } else if (currentQuestion.id === "businessLogo") {
        const file = fileInput.files?.[0] || null;
        if (file) {
          setBusinessLogoFile(file);
          setAnswers({ ...answers, [currentQuestion.id]: file.name });

          // Log to verify file is captured
          console.log("Business logo captured:", file.name);
        }
      }
    } else {
      let value = e.target.value;

      // If this is the profession question and we have option values mapping
      if (currentQuestion.id === "profession") {
        // Find the profession ID that corresponds to the selected name
        const selectedProfessionName = e.target.value;
        const selectedProfession = professions.find(
          (p) => p.name === selectedProfessionName
        );

        if (selectedProfession) {
          // Store the profession ID as the value
          value = selectedProfession._id.toString();
          console.log(
            `Selected profession: ${selectedProfessionName}, ID: ${value}`
          );
        }
      }

      const newAnswers = { ...answers, [currentQuestion.id]: value };

      // Reset specific field if industry changes
      if (currentQuestion.id === "industry") {
        newAnswers.specific = "";
      }

      setAnswers(newAnswers);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      // Move to next question in current section
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Move to next section
      setCurrentQuestionIndex(0);

      if (currentSection === "service") {
        setCurrentSection("base");
      } else if (currentSection === "base") {
        setCurrentSection("role-specific");
      } else if (currentSection === "role-specific") {
        setCurrentSection("final");
      } else if (currentSection === "final") {
        setIsComplete(true);
      }

      // Skip role-specific section for buyers
      if (
        currentSection === "base" &&
        answers.role === "I want to buy products or services"
      ) {
        setCurrentSection("final");
      }
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      // Move to previous question in current section
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      // Move to previous section
      if (currentSection === "final") {
        setCurrentSection("role-specific");
        setCurrentQuestionIndex(getCurrentQuestions().length - 1);
      } else if (currentSection === "role-specific") {
        setCurrentSection("base");
        setCurrentQuestionIndex(baseQuestions.length - 1);
      } else if (currentSection === "base") {
        setCurrentSection("service");
        setCurrentQuestionIndex(serviceQuestions.length - 1);
      }

      // Skip role-specific section for buyers when going back
      if (
        currentSection === "final" &&
        answers.role === "I want to buy products or services"
      ) {
        setCurrentSection("base");
        setCurrentQuestionIndex(baseQuestions.length - 1);
      }
    }
  };

  const handleSubmit = async () => {
    setError("");
    setSuccess(false);

    const formData = new FormData();
    formData.append("name", answers.name);
    formData.append("email", answers.email);

    // Map the role to the expected format
    let role = "Buy"; // Default
    if (answers.role === "I want to sell products or services") {
      role = "Sell";
    } else if (answers.role === "I'm looking for job opportunities") {
      role = "Job";
    }

    formData.append("role", role);
    formData.append("password", answers.password);
    formData.append("phone", answers.phone || "");
    formData.append("club", answers.club || "");

    // Append profession ID directly
    formData.append("profession", answers.profession || "");

    if (role === "Sell") {
      formData.append("businessName", answers.businessName || "");
      formData.append("industry", answers.industry || "");
      formData.append("specific", answers.specific || "");
      formData.append("country", answers.country || "");
      formData.append("city", answers.city || "");
      formData.append("streetAddress", answers.streetAddress || "");
      formData.append("productDescription", answers.productDescription || "");

      // Add business logo if available
      if (businessLogoFile) {
        console.log("Appending business logo:", businessLogoFile.name);
        formData.append("image", businessLogoFile);
      }

      // Add product images if available
      if (productImages.length > 0) {
        console.log(
          "Appending product images:",
          productImages.map((f) => f.name)
        );
        productImages.forEach((file, index) => {
          formData.append(`productImage${index + 1}`, file);
        });
      }
    }

    if (role === "Job") {
      formData.append("experience", answers.experience || "");
      formData.append("skills", answers.skills || "");
      formData.append("location", answers.location || "");
    }

    try {
      setIsLoading(true);
      console.log("Submitting form data...");
      const result = await createUser(formData);
      setIsLoading(false);

      if (result.success) {
        setSuccess(true);
        toast.success(
          "Registration successful! Your account has been created.",
          { position: "bottom-center" }
        );
        router.push("/login");
      } else {
        console.error("Registration failed:", result.error);
        setError(result.error || "Registration failed.");
      }
    } catch (err) {
      console.error("Error during submission:", err);
      setError("An error occurred during submission.");
      setIsLoading(false);
    }
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidInput = (): boolean => {
    if (currentQuestion.id === "email") {
      return isValidEmail(answers.email);
    }
    if (currentQuestion.id === "password") {
      return answers.password.length >= (currentQuestion.minLength || 0);
    }
    if (currentQuestion.id === "businessLogo") {
      return !!businessLogoFile;
    }
    if (currentQuestion.id === "productImages") {
      return productImages.length > 0;
    }
    return !!answers[currentQuestion.id];
  };

  // Get progress percentage across all sections
  const getProgressPercentage = (): number => {
    let totalQuestions =
      serviceQuestions.length + baseQuestions.length + finalQuestions.length;

    // Add role-specific questions
    if (answers.role === "I want to sell products or services") {
      totalQuestions += sellerQuestions.length;
    } else if (answers.role === "I'm looking for job opportunities") {
      totalQuestions += jobSeekerQuestions.length;
    }

    // Calculate completed questions
    let completedQuestions = 0;

    if (currentSection === "base") {
      completedQuestions = serviceQuestions.length + currentQuestionIndex;
    } else if (currentSection === "role-specific") {
      completedQuestions =
        serviceQuestions.length + baseQuestions.length + currentQuestionIndex;
    } else if (currentSection === "final") {
      completedQuestions =
        serviceQuestions.length +
        baseQuestions.length +
        (answers.role === "I want to sell products or services"
          ? sellerQuestions.length
          : answers.role === "I'm looking for job opportunities"
          ? jobSeekerQuestions.length
          : 0) +
        currentQuestionIndex;
    } else {
      completedQuestions = currentQuestionIndex;
    }

    return Math.round((completedQuestions / totalQuestions) * 100);
  };

  // Get section title
  const getSectionTitle = (): string => {
    if (currentSection === "service") {
      return "Welcome to GLBiashara";
    } else if (currentSection === "base") {
      return "Basic Information";
    } else if (currentSection === "role-specific") {
      if (answers.role === "I want to sell products or services") {
        return "Seller Information";
      } else if (answers.role === "I'm looking for job opportunities") {
        return "Job Seeker Information";
      } else {
        return "Buyer Information";
      }
    } else {
      return "Almost Done";
    }
  };

  // Get role-specific illustration
  const getRoleIllustration = (): string => {
    if (answers.role === "I want to sell products or services") {
      return "/illustrations/seller.svg";
    } else if (answers.role === "I want to buy products or services") {
      return "/illustrations/buyer.svg";
    } else if (answers.role === "I'm looking for job opportunities") {
      return "/illustrations/job-seeker.svg";
    }
    return "/illustrations/welcome.svg";
  };

  // Get role-specific color
  const getRoleColor = (): string => {
    if (answers.role === "I want to sell products or services") {
      return "from-emerald-500 to-teal-600";
    } else if (answers.role === "I want to buy products or services") {
      return "from-blue-500 to-indigo-600";
    } else if (answers.role === "I'm looking for job opportunities") {
      return "from-amber-500 to-orange-600";
    }
    return "from-purple-500 to-indigo-600";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-xl overflow-hidden"
          >
            <div
              className={`bg-gradient-to-r ${getRoleColor()} p-6 text-white`}
            >
              <h2 className="text-2xl font-bold">Complete Your Registration</h2>
              <p className="mt-2 opacity-90">
                Just one more step to join GLBiashara!
              </p>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Review Your Information
                </h3>
                <p className="text-gray-600 text-sm">
                  Please review your information before submitting.
                </p>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Name:</span>
                  <span className="font-medium">{answers.name}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Email:</span>
                  <span className="font-medium">{answers.email}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Role:</span>
                  <span className="font-medium">{answers.role}</span>
                </div>

                {answers.role === "I want to sell products or services" && (
                  <>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Business:</span>
                      <span className="font-medium">
                        {answers.businessName}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Industry:</span>
                      <span className="font-medium">{answers.industry}</span>
                    </div>
                  </>
                )}

                {answers.role === "I'm looking for job opportunities" && (
                  <>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Profession:</span>
                      <span className="font-medium">
                        {professions.find((p) => p._id === answers.profession)
                          ?.name || answers.profession}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Experience:</span>
                      <span className="font-medium">{answers.experience}</span>
                    </div>
                  </>
                )}
              </div>

              <div className="mt-8 flex flex-col space-y-3">
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className={`w-full py-3 px-4 rounded-md text-white font-medium transition-all 
                    bg-gradient-to-r ${getRoleColor()} hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                    ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Creating your account...
                    </span>
                  ) : (
                    <span>Submit</span>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress bar */}
          <div className="mb-8">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 bg-gradient-to-r ${getRoleColor()}`}
                style={{ width: `${getProgressPercentage()}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>Start</span>
              <span>Complete</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Header section with illustration */}
            <div
              className={`bg-gradient-to-r ${getRoleColor()} p-6 md:p-8 text-white relative overflow-hidden`}
            >
              <div className="relative z-10">
                <h1 className="text-2xl md:text-3xl font-bold">
                  {getSectionTitle()}
                </h1>
                <p className="mt-2 opacity-90 max-w-md">
                  {currentSection === "service" &&
                    "Join GLBiashara to connect with businesses and opportunities across Tanzania"}
                  {currentSection === "base" && "Tell us a bit about yourself"}
                  {currentSection === "role-specific" &&
                    answers.role === "I want to sell products or services" &&
                    "Set up your business profile to reach potential customers"}
                  {currentSection === "role-specific" &&
                    answers.role === "I'm looking for job opportunities" &&
                    "Tell us about your skills and experience to find the right job"}
                  {currentSection === "final" &&
                    "Just a few more details to complete your account"}
                </p>
              </div>

              {/* Decorative illustration */}
              <div className="absolute right-0 top-0 h-full w-1/3 flex items-center justify-center opacity-20 md:opacity-30">
                <div
                  className="w-full h-full bg-contain bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${getRoleIllustration()})` }}
                ></div>
              </div>
            </div>

            {/* Question card */}
            <div className="p-6 md:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${currentSection}-${currentQuestionIndex}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-lg"
                >
                  <div className="p-6">
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-2 flex items-center">
                        {currentQuestion.icon && (
                          <span className="text-2xl mr-2">
                            {currentQuestion.icon}
                          </span>
                        )}
                        {currentQuestion.text}
                      </h3>
                      {currentQuestion.description && (
                        <p className="text-gray-600 text-sm mb-4">
                          {currentQuestion.description}
                        </p>
                      )}
                    </div>

                    {/* Different input types */}
                    {currentQuestion.type === "select" ? (
                      <select
                        value={answers[currentQuestion.id] || ""}
                        onChange={handleAnswer}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="" disabled>
                          {currentQuestion.placeholder}
                        </option>
                        {currentQuestion.options?.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : currentQuestion.type === "textarea" ? (
                      <textarea
                        value={answers[currentQuestion.id] || ""}
                        onChange={handleAnswer}
                        placeholder={currentQuestion.placeholder}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        rows={4}
                      />
                    ) : currentQuestion.type === "file" ? (
                      <div className="w-full">
                        <label
                          htmlFor={currentQuestion.id}
                          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg
                              className="w-8 h-8 mb-3 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                              ></path>
                            </svg>
                            <p className="mb-2 text-sm text-gray-500">
                              <span className="font-semibold">
                                Click to upload
                              </span>{" "}
                              or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">
                              {currentQuestion.accept === "image/*"
                                ? "PNG, JPG or GIF"
                                : "Select a file"}
                            </p>
                          </div>
                          <input
                            id={currentQuestion.id}
                            type="file"
                            onChange={handleAnswer}
                            className="hidden"
                            accept={currentQuestion.accept}
                          />
                        </label>

                        {currentQuestion.id === "businessLogo" &&
                          businessLogoFile && (
                            <div className="mt-3">
                              <p className="text-sm text-gray-600 mb-2">
                                Selected file: {businessLogoFile.name}
                              </p>
                              <div className="relative w-20 h-20 overflow-hidden rounded-md border border-gray-200">
                                <img
                                  src={URL.createObjectURL(businessLogoFile)}
                                  alt="Business Logo Preview"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </div>
                          )}
                      </div>
                    ) : currentQuestion.type === "multifile" ? (
                      <div className="w-full">
                        <label
                          htmlFor={currentQuestion.id}
                          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg
                              className="w-8 h-8 mb-3 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                              ></path>
                            </svg>
                            <p className="mb-2 text-sm text-gray-500">
                              <span className="font-semibold">
                                Click to upload
                              </span>{" "}
                              or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">
                              Upload up to 3 images (PNG, JPG or GIF)
                            </p>
                          </div>
                          <input
                            id={currentQuestion.id}
                            type="file"
                            onChange={handleAnswer}
                            className="hidden"
                            accept={currentQuestion.accept}
                            multiple
                          />
                        </label>

                        {productImages.length > 0 && (
                          <div className="mt-3">
                            <p className="text-sm text-gray-600 mb-2">
                              Selected {productImages.length} image(s)
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {productImages.map((image, index) => (
                                <div
                                  key={index}
                                  className="relative w-20 h-20 overflow-hidden rounded-md border border-gray-200"
                                >
                                  <img
                                    src={URL.createObjectURL(image)}
                                    alt={`Product Image ${index + 1}`}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : currentQuestion.type === "password" ? (
                      <input
                        type="password"
                        value={answers[currentQuestion.id] || ""}
                        onChange={handleAnswer}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder={currentQuestion.placeholder}
                        minLength={currentQuestion.minLength!}
                      />
                    ) : (
                      <input
                        type={currentQuestion.type!}
                        value={answers[currentQuestion.id] || ""}
                        onChange={handleAnswer}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder={currentQuestion.placeholder!}
                        minLength={currentQuestion.minLength!}
                      />
                    )}

                    {currentQuestion.type === "multifile" &&
                      productImages.length > 0 && (
                        <div className="mt-2">
                          {productImages.map((image, index) => (
                            <div key={index} className="mt-2">
                              <img
                                src={URL.createObjectURL(image)}
                                alt={`Product Image ${index + 1}`}
                                className="w-24 h-24 object-cover rounded"
                              />
                            </div>
                          ))}
                        </div>
                      )}

                    {currentQuestion.type === "file" && businessLogoFile && (
                      <div className="mt-2">
                        <img
                          src={URL.createObjectURL(businessLogoFile)}
                          alt="Business Logo"
                          className="w-24 h-24 object-cover rounded"
                        />
                      </div>
                    )}

                    <div className="mt-6 flex justify-between">
                      {currentQuestionIndex > 0 && (
                        <button
                          onClick={handleBack}
                          className="py-2 px-4 rounded-md text-gray-600 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          Back
                        </button>
                      )}
                      <button
                        onClick={isValidInput() ? handleNext : () => {}}
                        disabled={!isValidInput()}
                        className={`py-2 px-4 rounded-md text-white font-medium transition-all 
                          bg-gradient-to-r ${getRoleColor()} hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500
                          ${
                            !isValidInput()
                              ? "opacity-70 cursor-not-allowed"
                              : ""
                          }`}
                      >
                        {currentQuestionIndex < questions.length - 1
                          ? "Next"
                          : "Submit"}
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
