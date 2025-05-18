"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { saveContribution } from "@/actions/contributions";

// Payment method specific sliders
const MPesaSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <div className="rounded-lg overflow-hidden shadow-lg mb-8">
      <Slider {...settings}>
        <div className="relative h-64 md:h-80">
          <Image
            src="/z2.jpg"
            alt="Simba SC M-Pesa Partnership"
            fill
            className="object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src =
                "https://placehold.co/1200x600/FF0000/FFFFFF?text=Simba+SC+%26+M-Pesa";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <div className="p-4 text-white">
              <h3 className="text-xl font-bold">Official Payment Partner</h3>
              <p>Support Simba SC with M-Pesa</p>
            </div>
          </div>
        </div>
        <div className="relative h-64 md:h-80">
          <video
            className="w-full h-full object-cover"
            controls
            playsInline
            onError={(e) => {
              const target = e.target as HTMLVideoElement;
              target.style.display = "none";
              const parent = target.parentElement;
              if (parent) {
                const placeholder = document.createElement("div");
                placeholder.className =
                  "w-full h-full flex items-center justify-center bg-red-600 text-white";
                placeholder.innerHTML = "<p>Simba SC & M-Pesa Partnership</p>";
                parent.appendChild(placeholder);
              }
            }}
          >
            <source src="/videos/simbavideo2.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <div className="p-4 text-white">
              <h3 className="text-xl font-bold">Fast & Secure Payments</h3>
              <p>Support your team in seconds</p>
            </div>
          </div>
        </div>
        <div className="relative h-64 md:h-80">
          <Image
            src="/z1.jpg"
            alt="Simba SC Fans"
            fill
            className="object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src =
                "https://placehold.co/1200x600/FF0000/FFFFFF?text=Support+Simba+SC";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <div className="p-4 text-white">
              <h3 className="text-xl font-bold">Join the Simba Nation</h3>
              <p>Your support makes us stronger</p>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
};

const TigoPesaSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <div className="rounded-lg overflow-hidden shadow-lg mb-8">
      <Slider {...settings}>
        <div className="relative h-64 md:h-80">
          <Image
            src="/tigopesa-simba1.jpg"
            alt="Simba SC Tigo Pesa Partnership"
            fill
            className="object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src =
                "https://placehold.co/1200x600/0066CC/FFFFFF?text=Simba+SC+%26+Tigo+Pesa";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <div className="p-4 text-white">
              <h3 className="text-xl font-bold">Tigo Pesa & Simba SC</h3>
              <p>Partners in football excellence</p>
            </div>
          </div>
        </div>
        <div className="relative h-64 md:h-80">
          <video
            className="w-full h-full object-cover"
            controls
            playsInline
            onError={(e) => {
              const target = e.target as HTMLVideoElement;
              target.style.display = "none";
              const parent = target.parentElement;
              if (parent) {
                const placeholder = document.createElement("div");
                placeholder.className =
                  "w-full h-full flex items-center justify-center bg-blue-600 text-white";
                placeholder.innerHTML =
                  "<p>Simba SC & Tigo Pesa Partnership</p>";
                parent.appendChild(placeholder);
              }
            }}
          >
            <source src="/videos/simbavideo1.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <div className="p-4 text-white">
              <h3 className="text-xl font-bold">Support With Tigo Pesa</h3>
              <p>Quick and convenient payments</p>
            </div>
          </div>
        </div>
        <div className="relative h-64 md:h-80">
          <Image
            src="/yas1.jpg"
            alt="Simba SC Continental Campaign"
            fill
            className="object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src =
                "https://placehold.co/1200x600/0066CC/FFFFFF?text=Continental+Glory";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <div className="p-4 text-white">
              <h3 className="text-xl font-bold">Continental Glory</h3>
              <p>Help us conquer Africa</p>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
};

const BankSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <div className="rounded-lg overflow-hidden shadow-lg mb-8">
      <Slider {...settings}>
        <div className="relative h-64 md:h-80">
          <Image
            src="/simbabk.jpg"
            alt="Simba SC CRDB Partnership"
            fill
            className="object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src =
                "https://placehold.co/1200x600/00AA00/FFFFFF?text=Simba+SC+%26+CRDB+Bank";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <div className="p-4 text-white">
              <h3 className="text-xl font-bold">CRDB Bank & Simba SC</h3>
              <p>Official banking partner</p>
            </div>
          </div>
        </div>
        <div className="relative h-64 md:h-80">
          <video
            className="w-full h-full object-cover"
            controls
            playsInline
            onError={(e) => {
              const target = e.target as HTMLVideoElement;
              target.style.display = "none";
              const parent = target.parentElement;
              if (parent) {
                const placeholder = document.createElement("div");
                placeholder.className =
                  "w-full h-full flex items-center justify-center bg-green-600 text-white";
                placeholder.innerHTML =
                  "<p>Simba SC & CRDB Bank Partnership</p>";
                parent.appendChild(placeholder);
              }
            }}
          >
            <source src="/videos/simbavide2.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <div className="p-4 text-white">
              <h3 className="text-xl font-bold">Secure Bank Transfers</h3>
              <p>Support Simba SC with confidence</p>
            </div>
          </div>
        </div>
        <div className="relative h-64 md:h-80">
          <Image
            src="/bank-simba2.jpg"
            alt="Simba SC Stadium Development"
            fill
            className="object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src =
                "https://placehold.co/1200x600/00AA00/FFFFFF?text=Building+The+Future";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <div className="p-4 text-white">
              <h3 className="text-xl font-bold">Building The Future</h3>
              <p>Help us develop world-class facilities</p>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
};

// Loading fallback component
function ContributionsLoading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <div className="flex justify-center mb-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
        </div>
        <p className="text-center text-gray-600">Loading payment options...</p>
      </div>
    </div>
  );
}

// Component that uses useSearchParams
function ContributionsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paymentMethod = searchParams.get("method") || "mpesa";
  const clubId = searchParams.get("clubId");
  const clubName = searchParams.get("clubName") || "Simba SC";

  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  // Club color schemes based on club name
  const getClubColors = () => {
    const clubNameLower = clubName.toLowerCase();

    if (clubNameLower.includes("simba")) {
      return {
        primary: "bg-red-600",
        text: "text-red-600",
        hover: "hover:bg-red-700",
        light: "bg-red-50",
        border: "border-red-200",
        button: "bg-red-600 hover:bg-red-700",
      };
    } else if (clubNameLower.includes("yanga")) {
      return {
        primary: "bg-green-600",
        text: "text-green-600",
        hover: "hover:bg-green-700",
        light: "bg-green-50",
        border: "border-green-200",
        button: "bg-green-600 hover:bg-green-700",
      };
    } else {
      return {
        primary: "bg-blue-600",
        text: "text-blue-600",
        hover: "hover:bg-blue-700",
        light: "bg-blue-50",
        border: "border-blue-200",
        button: "bg-blue-600 hover:bg-blue-700",
      };
    }
  };

  const colors = getClubColors();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || Number(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid contribution amount.",
        variant: "destructive",
      });
      return;
    }

    if (paymentMethod === "mpesa" && !phone) {
      toast({
        title: "Phone number required",
        description: "Please enter your M-Pesa phone number.",
        variant: "destructive",
      });
      return;
    }

    if (paymentMethod === "tigopesa" && !phone) {
      toast({
        title: "Phone number required",
        description: "Please enter your Tigo Pesa phone number.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Save contribution to database
      const result = await saveContribution({
        amount,
        name: name || "",
        phone: phone || "",
        paymentMethod,
        // Don't pass clubId if it's not a valid value
        clubId: clubId && clubId.length === 24 ? clubId : undefined,
      });

      if (result.success) {
        setIsSubmitting(false);
        setIsSuccess(true);
        toast({
          title: "Contribution successful!",
          description: `Thank you for your contribution of TZS ${amount} to ${clubName}!`,
          variant: "default",
        });
      } else {
        throw new Error(result.error || "Failed to process contribution");
      }
    } catch (error) {
      setIsSubmitting(false);
      toast({
        title: "Error",
        description: "Failed to process your contribution. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="mb-6">
            <CardHeader className="text-center">
              <div
                className={`mx-auto mb-4 ${colors.light} p-3 rounded-full w-16 h-16 flex items-center justify-center`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-8 w-8 ${colors.text}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <CardTitle className="text-2xl">Thank You!</CardTitle>
              <CardDescription>
                Your contribution has been received
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="border-t border-b border-gray-200 py-4 my-4">
                <p className="text-sm text-gray-500">Amount</p>
                <p className="text-2xl font-bold">
                  {Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "TZS",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format(Number(amount))}
                </p>
              </div>
              <div className="text-sm text-gray-600">
                <p>
                  Payment method:{" "}
                  <span className="font-medium capitalize">
                    {paymentMethod}
                  </span>
                </p>
                <p className="mt-2">
                  A confirmation has been sent to your phone number.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button
                onClick={() => router.push(`/clubs/${clubId || ""}`)}
                className={colors.button}
              >
                Return to Club Page
              </Button>
            </CardFooter>
          </Card>

          {/* GLBiashara Registration Prompt */}
          <Card className="border border-blue-200 shadow-md bg-gradient-to-br from-white to-blue-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl text-blue-700">
                Discover GLBiashara
              </CardTitle>
              <CardDescription>
                Tanzania's marketplace for business, jobs, and services
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    Buy & Sell Products
                  </h4>
                  <p className="text-sm text-gray-600">
                    Find local deals or sell your products to thousands of
                    customers
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    Find Job Opportunities
                  </h4>
                  <p className="text-sm text-gray-600">
                    Discover jobs matching your skills in your area
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Local Services</h4>
                  <p className="text-sm text-gray-600">
                    Access services near you from trusted providers
                  </p>
                </div>
              </div>

              <div className="pt-3 pb-1">
                <Link href="/register">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Create Free Account
                  </Button>
                </Link>
                <p className="text-xs text-center text-gray-500 mt-2">
                  Join thousands of Tanzanians already using GLBiashara
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  if (paymentMethod === "mpesa") {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 flex justify-between items-center">
              <Link href="/clubs">
                <Button variant="outline" size="sm">
                  ← Back to Clubs
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-center text-red-600">
                Support {clubName}
              </h1>
              <div className="w-24"></div> {/* Spacer for alignment */}
            </div>

            {/* Main content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Payment form */}
              <div className="md:col-span-2">
                <Card className="border-red-200 bg-white shadow-lg">
                  <CardHeader className="bg-red-600 text-white">
                    <div className="flex items-center">
                      <div className="bg-white rounded-full p-2 mr-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-red-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <CardTitle>M-Pesa Payment</CardTitle>
                        <CardDescription className="text-red-100">
                          Fast and reliable mobile money transfer
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="mpesa-amount">Amount (TZS)</Label>
                        <Input
                          id="mpesa-amount"
                          type="number"
                          placeholder="Enter amount"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          required
                          className="border-red-200 focus:border-red-400"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="mpesa-name">Your Name</Label>
                        <Input
                          id="mpesa-name"
                          type="text"
                          placeholder="Enter your name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="border-red-200 focus:border-red-400"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="mpesa-phone">M-Pesa Number</Label>
                        <Input
                          id="mpesa-phone"
                          type="tel"
                          placeholder="e.g. 0767123456"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                          className="border-red-200 focus:border-red-400"
                        />
                        <p className="text-xs text-gray-500">
                          Enter the M-Pesa number you want to use for payment
                        </p>
                      </div>

                      <div className="bg-white p-4 rounded-lg border border-red-200 mt-4">
                        <div className="flex items-center">
                          <div className="mr-4">
                            <Image
                              src="/voda-logo.png"
                              alt="M-Pesa Logo"
                              width={60}
                              height={60}
                              className="rounded"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src =
                                  "https://placehold.co/60x60/FF0000/FFFFFF?text=M";
                              }}
                            />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">
                              How it works:
                            </h3>
                            <ol className="text-sm text-gray-600 list-decimal list-inside mt-1">
                              <li>Enter your details and submit</li>
                              <li>You'll receive a prompt on your phone</li>
                              <li>Enter your M-Pesa PIN to complete</li>
                            </ol>
                          </div>
                        </div>
                      </div>

                      <div className="pt-2">
                        <Button
                          type="submit"
                          className="w-full bg-red-600 hover:bg-red-700"
                          disabled={isSubmitting}
                        >
                          {isSubmitting
                            ? "Processing..."
                            : "Contribute via M-Pesa"}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar with adverts */}
              <div className="md:col-span-1 space-y-6">
                {/* Other payment methods */}
                <Card className="border-red-200 bg-white shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">
                      Other Payment Methods
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full justify-start border-blue-200 text-blue-600 hover:bg-blue-50"
                      onClick={() =>
                        router.push(
                          `/clubs/contributions?method=tigopesa&clubId=${clubId}&clubName=${clubName}`
                        )
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                        />
                      </svg>
                      Tigo Pesa
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start border-green-200 text-green-600 hover:bg-green-50"
                      onClick={() =>
                        router.push(
                          `/clubs/contributions?method=bank&clubId=${clubId}&clubName=${clubName}`
                        )
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                      Bank Transfer
                    </Button>
                  </CardContent>
                </Card>

                {/* Simba advert */}
                <Card className="border-red-200 overflow-hidden shadow-md">
                  <div className="relative h-40">
                    <Image
                      src="/simba-banner.jpg"
                      alt="Simba SC"
                      fill
                      className="object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src =
                          "https://placehold.co/600x400/FF0000/FFFFFF?text=Simba+SC";
                      }}
                    />
                  </div>
                  <CardContent className="bg-red-600 text-white p-4">
                    <h3 className="font-bold text-lg">
                      Confederation Cup 2025
                    </h3>
                    <p className="text-sm text-red-100">
                      Support our journey to continental glory!
                    </p>
                    <div className="mt-3 flex justify-between items-center">
                      <span className="font-bold">Target: TZS 100M</span>
                      <span className="text-xs bg-yellow-500 text-red-800 px-2 py-1 rounded-full">
                        250 supporters
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* M-Pesa promo */}
                <Card className="border-red-200 bg-white shadow-md">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-center mb-3">
                      <Image
                        src="/voda-logo.png"
                        alt="Vodacom"
                        width={120}
                        height={40}
                        className="object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src =
                            "https://placehold.co/120x40/FF0000/FFFFFF?text=Vodacom";
                        }}
                      />
                    </div>
                    <p className="text-sm text-center text-gray-600">
                      Vodacom M-Pesa is the official payment partner of Simba SC
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (paymentMethod === "tigopesa") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8 text-center">
              <Link
                href={clubId ? `/clubs/${clubId}` : "/clubs"}
                className="inline-flex items-center text-sm text-blue-600 hover:underline mb-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to Club
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">
                Support {clubName} via Tigo Pesa
              </h1>
              <p className="text-gray-600 mt-1">
                Fast and reliable mobile payments
              </p>
            </div>
            <TigoPesaSlider />

            {/* Main content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Payment form */}
              <div className="md:col-span-2">
                <Card className="border-blue-200 bg-white shadow-lg">
                  <CardHeader className="bg-blue-600 text-white">
                    <div className="flex items-center">
                      <div className="bg-white rounded-full p-2 mr-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-blue-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                          />
                        </svg>
                      </div>
                      <div>
                        <CardTitle>Tigo Pesa Payment</CardTitle>
                        <CardDescription className="text-blue-100">
                          Fast and reliable mobile payments
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="tigo-amount">Amount (TZS)</Label>
                        <Input
                          id="tigo-amount"
                          type="number"
                          placeholder="Enter amount"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          required
                          className="border-blue-200 focus:border-blue-400"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tigo-name">Your Name</Label>
                        <Input
                          id="tigo-name"
                          type="text"
                          placeholder="Enter your name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="border-blue-200 focus:border-blue-400"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tigo-phone">Tigo Pesa Number</Label>
                        <Input
                          id="tigo-phone"
                          type="tel"
                          placeholder="e.g. 0655654321"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                          className="border-blue-200 focus:border-blue-400"
                        />
                        <p className="text-xs text-gray-500">
                          Enter the Tigo Pesa number you want to use for payment
                        </p>
                      </div>

                      <div className="bg-white p-4 rounded-lg border border-blue-200 mt-4">
                        <div className="flex items-center">
                          <div className="mr-4">
                            <Image
                              src="/yas-logo.png"
                              alt="Tigo Pesa Logo"
                              width={60}
                              height={60}
                              className="rounded"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src =
                                  "https://placehold.co/60x60/0066CC/FFFFFF?text=T";
                              }}
                            />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">
                              How it works:
                            </h3>
                            <ol className="text-sm text-gray-600 list-decimal list-inside mt-1">
                              <li>Enter your details and submit</li>
                              <li>You'll receive a prompt on your phone</li>
                              <li>Enter your Tigo Pesa PIN to complete</li>
                            </ol>
                          </div>
                        </div>
                      </div>

                      <div className="pt-2">
                        <Button
                          type="submit"
                          className="w-full bg-blue-600 hover:bg-blue-700"
                          disabled={isSubmitting}
                        >
                          {isSubmitting
                            ? "Processing..."
                            : "Contribute via Tigo Pesa"}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar with adverts */}
              <div className="md:col-span-1 space-y-6">
                {/* Other payment methods */}
                <Card className="border-blue-200 bg-white shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">
                      Other Payment Methods
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full justify-start border-red-200 text-red-600 hover:bg-red-50"
                      onClick={() =>
                        router.push(
                          `/clubs/contributions?method=mpesa&clubId=${clubId}&clubName=${clubName}`
                        )
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      M-Pesa
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start border-green-200 text-green-600 hover:bg-green-50"
                      onClick={() =>
                        router.push(
                          `/clubs/contributions?method=bank&clubId=${clubId}&clubName=${clubName}`
                        )
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                      Bank Transfer
                    </Button>
                  </CardContent>
                </Card>

                {/* Simba advert */}
                <Card className="border-blue-200 overflow-hidden shadow-md">
                  <div className="relative h-40">
                    <Image
                      src="/simba-banner.jpg"
                      alt="Simba SC"
                      fill
                      className="object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src =
                          "https://placehold.co/600x400/FF0000/FFFFFF?text=Simba+SC";
                      }}
                    />
                  </div>
                  <CardContent className="bg-blue-600 text-white p-4">
                    <h3 className="font-bold text-lg">
                      Confederation Cup 2025
                    </h3>
                    <p className="text-sm text-blue-100">
                      Support our journey to continental glory!
                    </p>
                    <div className="mt-3 flex justify-between items-center">
                      <span className="font-bold">Target: TZS 100M</span>
                      <span className="text-xs bg-yellow-500 text-blue-800 px-2 py-1 rounded-full">
                        250 supporters
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Tigo Pesa promo */}
                <Card className="border-blue-200 bg-white shadow-md">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-center mb-3">
                      <Image
                        src="/yas-logo.png"
                        alt="Tigo Pesa"
                        width={120}
                        height={40}
                        className="object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src =
                            "https://placehold.co/120x40/0066CC/FFFFFF?text=Tigo+Pesa";
                        }}
                      />
                    </div>
                    <p className="text-sm text-center text-gray-600">
                      Tigo Pesa is the official mobile money partner of Simba SC
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (paymentMethod === "bank") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8 text-center">
              <Link
                href={clubId ? `/clubs/${clubId}` : "/clubs"}
                className="inline-flex items-center text-sm text-green-600 hover:underline mb-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to Club
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">
                Support {clubName} via Bank Transfer
              </h1>
              <p className="text-gray-600 mt-1">
                Direct bank deposit or transfer
              </p>
            </div>
            <BankSlider />

            {/* Main content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Payment form */}
              <div className="md:col-span-2">
                <Card className="border-green-200 bg-white shadow-lg">
                  <CardHeader className="bg-green-600 text-white">
                    <div className="flex items-center">
                      <div className="bg-white rounded-full p-2 mr-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-green-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                      </div>
                      <div>
                        <CardTitle>Bank Transfer</CardTitle>
                        <CardDescription className="text-green-100">
                          Direct bank deposit or transfer
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="bank-amount">Amount (TZS)</Label>
                        <Input
                          id="bank-amount"
                          type="number"
                          placeholder="Enter amount"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          required
                          className="border-green-200 focus:border-green-400"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bank-name">Your Name</Label>
                        <Input
                          id="bank-name"
                          type="text"
                          placeholder="Enter your name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="border-green-200 focus:border-green-400"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bank-phone">Phone Number</Label>
                        <Input
                          id="bank-phone"
                          type="tel"
                          placeholder="e.g. 0712345678"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                          className="border-green-200 focus:border-green-400"
                        />
                        <p className="text-xs text-gray-500">
                          For confirmation purposes
                        </p>
                      </div>

                      <div className="bg-white p-4 rounded-lg border border-green-200 mt-4">
                        <h3 className="font-medium text-gray-900 mb-2">
                          Bank Account Details:
                        </h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                            <span className="text-sm text-gray-600">
                              Bank Name:
                            </span>
                            <span className="font-medium">CRDB Bank</span>
                          </div>
                          <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                            <span className="text-sm text-gray-600">
                              Account Name:
                            </span>
                            <span className="font-medium">
                              {clubName} Official
                            </span>
                          </div>
                          <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                            <span className="text-sm text-gray-600">
                              Account Number:
                            </span>
                            <span className="font-medium">0123456789</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">
                              Branch:
                            </span>
                            <span className="font-medium">Samora Avenue</span>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center">
                          <div className="mr-4">
                            <Image
                              src="/crdb.png"
                              alt="CRDB Bank Logo"
                              width={60}
                              height={60}
                              className="rounded"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src =
                                  "https://placehold.co/60x60/00AA00/FFFFFF?text=CRDB";
                              }}
                            />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">
                              How it works:
                            </h3>
                            <ol className="text-sm text-gray-600 list-decimal list-inside mt-1">
                              <li>
                                Make a deposit/transfer to the account above
                              </li>
                              <li>Enter your details and submit this form</li>
                              <li>We'll verify your payment within 24 hours</li>
                            </ol>
                          </div>
                        </div>
                      </div>

                      <div className="pt-2">
                        <Button
                          type="submit"
                          className="w-full bg-green-600 hover:bg-green-700"
                          disabled={isSubmitting}
                        >
                          {isSubmitting
                            ? "Processing..."
                            : "Confirm Bank Transfer"}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar with adverts */}
              <div className="md:col-span-1 space-y-6">
                {/* Other payment methods */}
                <Card className="border-green-200 bg-white shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">
                      Other Payment Methods
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full justify-start border-red-200 text-red-600 hover:bg-red-50"
                      onClick={() =>
                        router.push(
                          `/clubs/contributions?method=mpesa&clubId=${clubId}&clubName=${clubName}`
                        )
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      M-Pesa
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start border-blue-200 text-blue-600 hover:bg-blue-50"
                      onClick={() =>
                        router.push(
                          `/clubs/contributions?method=tigopesa&clubId=${clubId}&clubName=${clubName}`
                        )
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                        />
                      </svg>
                      Tigo Pesa
                    </Button>
                  </CardContent>
                </Card>

                {/* Simba advert */}
                <Card className="border-green-200 overflow-hidden shadow-md">
                  <div className="relative h-40">
                    <Image
                      src="/simba-banner.jpg"
                      alt="Simba SC"
                      fill
                      className="object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src =
                          "https://placehold.co/600x400/FF0000/FFFFFF?text=Simba+SC";
                      }}
                    />
                  </div>
                  <CardContent className="bg-green-600 text-white p-4">
                    <h3 className="font-bold text-lg">
                      Confederation Cup 2025
                    </h3>
                    <p className="text-sm text-green-100">
                      Support our journey to continental glory!
                    </p>
                    <div className="mt-3 flex justify-between items-center">
                      <span className="font-bold">Target: TZS 100M</span>
                      <span className="text-xs bg-yellow-500 text-green-800 px-2 py-1 rounded-full">
                        250 supporters
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* CRDB Bank promo */}
                <Card className="border-green-200 bg-white shadow-md">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-center mb-3">
                      <Image
                        src="/crdb-logo.png"
                        alt="CRDB Bank"
                        width={120}
                        height={40}
                        className="object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src =
                            "https://placehold.co/120x40/00AA00/FFFFFF?text=CRDB+Bank";
                        }}
                      />
                    </div>
                    <p className="text-sm text-center text-gray-600">
                      CRDB Bank is the official bank partner of Simba SC
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default function ContributionsPage() {
  return (
    <Suspense fallback={<ContributionsLoading />}>
      <ContributionsContent />
    </Suspense>
  );
}
//<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0 0v8m0-8H3m0 0v8m0-8h8M3 13h8m0
