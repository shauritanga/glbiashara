"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import { createUser } from "@/actions/user";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import countries from "@/lib/countries.json";

interface Question {
  id: string;
  text: string;
  type: "text" | "email" | "select" | "password" | "file";
  placeholder?: string;
  options?: string[];
  accept?: string;
  minLength?: number;
}

const baseQuestions: Question[] = [
  {
    id: "name",
    text: "What is your name?",
    type: "text",
    placeholder: "Enter your name",
  },
  {
    id: "email",
    text: "What is your email address?",
    type: "email",
    placeholder: "Enter your email",
  },
  {
    id: "role",
    text: "Do you want to sell or buy?",
    type: "select",
    options: ["Sell", "Buy"],
    placeholder: "Select an option",
  },
];

const sellerQuestions: Question[] = [
  {
    id: "businessName",
    text: "What is your business name?",
    type: "text",
    placeholder: "Enter your business name",
  },
  {
    id: "industry",
    text: "What industry is your business in?",
    type: "select",
    options: ["Technology", "Healthcare", "Retail", "Manufacturing", "Other"],
    placeholder: "Select an industry",
  },
  {
    id: "country",
    text: "Which country are you operating?",
    type: "select",
    options: countries,
    placeholder: "Select a country",
  },
  {
    id: "city",
    text: "Which city are your business?",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    id: "streetAddress",
    text: "Which street address?",
    type: "text",
    placeholder: "Enter your street address",
  },
  {
    id: "image",
    text: "Upload image?",
    type: "file",
    accept: "image/*",
  },
];

const finalQuestion: Question[] = [
  {
    id: "password",
    text: "Create your login password",
    type: "password",
    placeholder: "Enter your password",
    minLength: 6,
  },
];

const allQuestions = [...baseQuestions, ...sellerQuestions, ...finalQuestion];
const initialAnswers: Record<string, string> = allQuestions.reduce(
  (acc, q) => ({ ...acc, [q.id]: "" }),
  {}
);

export default function Home() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] =
    useState<Record<string, string>>(initialAnswers);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const router = useRouter();

  const getCurrentQuestions = (): Question[] => {
    if (answers.role === "Buy" && currentQuestionIndex >= 2) {
      return [...baseQuestions.slice(0, 3), ...finalQuestion];
    }
    return [...baseQuestions, ...sellerQuestions, ...finalQuestion];
  };

  const questions = getCurrentQuestions();
  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (e.target.type === "file") {
      const fileInput = e.target as HTMLInputElement;
      const file = fileInput.files?.[0] || null;
      setImageFile(file);
      setAnswers({ ...answers, [currentQuestion.id]: file ? file.name : "" });
    } else {
      setAnswers({ ...answers, [currentQuestion.id]: e.target.value });
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handleSubmit = async () => {
    setError("");
    setSuccess(false);

    const formData = new FormData();
    formData.append("name", answers.name);
    formData.append("email", answers.email);
    formData.append("role", answers.role);
    formData.append("password", answers.password);
    if (answers.role === "Sell") {
      formData.append("businessName", answers.businessName || "");
      formData.append("industry", answers.industry || "");
      formData.append("country", answers.country || "");
      formData.append("city", answers.city || "");
      formData.append("streetAddress", answers.streetAddress || "");
      if (imageFile) {
        formData.append("image", imageFile);
      }
    }

    try {
      const result = await createUser(formData);
      if (result.success) {
        setSuccess(true);
        toast.success(
          "Registration successful! Your account has been created.",
          { position: "bottom-center" }
        );
        router.push("/login");
      } else {
        setError(result.error || "Registration failed.");
      }
    } catch (err) {
      setError("An error occurred during submission.");
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
    if (currentQuestion.id === "image") {
      return answers.role === "Buy" || !!imageFile;
    }
    return !!answers[currentQuestion.id];
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <Head>
        <title>Interactive Registration</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-6">
          Make Your Business Accessible Globally
        </h1>
        {isComplete ? (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">All Done!</h2>
            <p className="mb-4">Thanks for registering! Here’s what we got:</p>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {success && (
              <p className="text-green-500 mb-4">Registration successful!</p>
            )}
            <ul className="text-left mb-4">
              {Object.entries(answers).map(([key, value]) => (
                <li key={key} className="capitalize">
                  <strong>{key}:</strong> {value || "Not provided"}
                </li>
              ))}
            </ul>
            <button
              onClick={handleSubmit}
              disabled={success}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
              Confirm Registration
            </button>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-500 h-2.5 rounded-full"
                  style={{
                    width: `${
                      ((currentQuestionIndex + 1) / questions.length) * 100
                    }%`,
                  }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Question {currentQuestionIndex + 1} of {questions.length}
              </p>
            </div>
            <h2 className="text-xl font-semibold mb-4">
              {currentQuestion.text}
            </h2>
            {currentQuestion.type === "select" ? (
              <select
                value={answers[currentQuestion.id]}
                onChange={handleAnswer}
                className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>
                  {currentQuestion.placeholder}
                </option>
                {currentQuestion.options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : currentQuestion.type === "file" ? (
              <input
                type="file"
                id={currentQuestion.id}
                accept={currentQuestion.accept}
                onChange={handleAnswer}
                className="w-full p-2 border rounded mb-4"
              />
            ) : (
              <input
                type={currentQuestion.type}
                placeholder={currentQuestion.placeholder}
                value={answers[currentQuestion.id]}
                onChange={handleAnswer}
                minLength={currentQuestion.minLength}
                className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
            <button
              onClick={handleNext}
              disabled={!isValidInput()}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
              {currentQuestionIndex < questions.length - 1 ? "Next" : "Finish"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
