"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button } from "@/components/ui/button";
import { useWindowSize } from "react-use";

type CountdownType = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isOver: boolean;
};

const MATCH_DATE = new Date("2025-05-30T00:00:00");

// Memoized countdown component to prevent re-renders of parent
const CountdownDisplay = memo(({ countdown }: { countdown: CountdownType }) => (
  <div className="inline-block bg-black/30 backdrop-blur-sm rounded-lg px-6 py-3 mb-8">
    <div className="grid grid-cols-4 gap-2 md:gap-4 text-center">
      <div className="flex flex-col">
        <span className="text-2xl md:text-3xl font-bold text-white">
          {countdown.days}
        </span>
        <span className="text-xs md:text-sm text-white/70">Days</span>
      </div>
      <div className="flex flex-col">
        <span className="text-2xl md:text-3xl font-bold text-white">
          {countdown.hours}
        </span>
        <span className="text-xs md:text-sm text-white/70">Hours</span>
      </div>
      <div className="flex flex-col">
        <span className="text-2xl md:text-3xl font-bold text-white">
          {countdown.minutes}
        </span>
        <span className="text-xs md:text-sm text-white/70">Minutes</span>
      </div>
      <div className="flex flex-col">
        <span className="text-2xl md:text-3xl font-bold text-white">
          {countdown.seconds}
        </span>
        <span className="text-xs md:text-sm text-white/70">Seconds</span>
      </div>
    </div>
  </div>
));

CountdownDisplay.displayName = "CountdownDisplay";

export default function PaymentOptionsPage() {
  const [isClient, setIsClient] = useState(false);
  const [countdown, setCountdown] = useState<CountdownType>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isOver: false,
  });
  const router = useRouter();
  const { width, height } = useWindowSize();

  useEffect(() => {
    setIsClient(true);

    const updateCountdown = () => {
      const diff = MATCH_DATE.getTime() - Date.now();
      const timeLeft = diff > 0 ? diff : 0;

      setCountdown({
        days: Math.floor(timeLeft / (1000 * 60 * 60 * 24)),
        hours: Math.floor((timeLeft / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((timeLeft / (1000 * 60)) % 60),
        seconds: Math.floor((timeLeft / 1000) % 60),
        isOver: timeLeft <= 0,
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!isClient) return null;

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    pauseOnHover: false,
    cssEase: "linear",
    arrows: false,
    swipe: true,
    lazyLoad: "ondemand" as const,
  };

  return (
    <div className="min-h-screen flex flex-col bg-black">
      {/* Background video */}
      <div className="absolute inset-0 z-0">
        <div className="relative h-screen">
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            playsInline
            onError={(e) => {
              const target = e.target as HTMLVideoElement;
              target.style.display = "none";
              const parent = target.parentElement;
              if (parent) {
                const placeholder = document.createElement("div");
                placeholder.className =
                  "w-full h-full flex items-center justify-center bg-red-600";
                placeholder.innerHTML =
                  "<p class='text-white text-xl'>Simba SC</p>";
                parent.appendChild(placeholder);
              }
            }}
          >
            <source src="/videos/simbavideo2.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30"></div>
        </div>
      </div>

      {/* Content overlay */}
      <div className="relative z-50 min-h-screen flex flex-col">
        <div className="container mx-auto px-4 pt-6">
          <div className="flex justify-between items-center">
            <Link
              href="/clubs"
              className="inline-flex items-center text-sm text-white bg-black/30 hover:bg-black/50 px-3 py-2 rounded-full transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
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
              Back
            </Link>
            <div className="flex items-center space-x-2">
              <Image
                src="/simba.png"
                alt="Simba SC"
                width={40}
                height={40}
                className="rounded-full"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src =
                    "https://placehold.co/40x40/FF0000/FFFFFF?text=SC";
                }}
              />
              <span className="text-white font-bold">Simba SC</span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 pt-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Support Simba SC
          </h2>
          <p className="text-xl text-white/80 mb-4">
            Confederation Cup 2025 Campaign
          </p>

          <CountdownDisplay countdown={countdown} />
        </div>

        {/* Payment Options */}
        <div className="container mx-auto px-4 py-6 flex-grow flex items-center justify-center">
          <div className="w-full max-w-3xl">
            <h3 className="text-xl font-semibold text-white text-center mb-6">
              Choose Your Payment Method
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Airtel */}
              <div className="bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="h-32 bg-red-600 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                      src="/airtel-logo.png"
                      alt="Airtel"
                      width={100}
                      height={60}
                      className="object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src =
                          "https://placehold.co/100x60/FF0000/FFFFFF?text=M-Pesa";
                      }}
                    />
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-gray-900 mb-2">Airtel Money</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Fast and secure mobile money transfer
                  </p>
                  <p className="text-sm font-medium text-gray-800 mb-4">
                    Number: 0767 123 456
                  </p>
                  <Button
                    className="w-full bg-red-600 hover:bg-red-700"
                    onClick={() => {
                      router.push("/clubs/contributions?method=mpesa");
                    }}
                  >
                    Pay with M-Pesa
                  </Button>
                </div>
              </div>

              {/* Halotel */}
              <div className="bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="h-32 bg-red-600 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                      src="/halotel.png"
                      alt="halotel"
                      width={100}
                      height={60}
                      className="object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src =
                          "https://placehold.co/100x60/FF0000/FFFFFF?text=M-Pesa";
                      }}
                    />
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-gray-900 mb-2">Halo Pesa</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Fast and secure mobile money transfer
                  </p>
                  <p className="text-sm font-medium text-gray-800 mb-4">
                    Number: 0629 123 456
                  </p>
                  <Button
                    className="w-full bg-red-600 hover:bg-red-700"
                    onClick={() => {
                      router.push("/clubs/contributions?method=mpesa");
                    }}
                  >
                    Pay with M-Pesa
                  </Button>
                </div>
              </div>

              {/* M-Pesa */}
              <div className="bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="h-32 bg-red-600 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                      src="/voda-logo.png"
                      alt="M-Pesa"
                      width={100}
                      height={60}
                      className="object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src =
                          "https://placehold.co/100x60/FF0000/FFFFFF?text=M-Pesa";
                      }}
                    />
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-gray-900 mb-2">M-Pesa</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Fast and secure mobile money transfer
                  </p>
                  <p className="text-sm font-medium text-gray-800 mb-4">
                    Number: 0767 123 456
                  </p>
                  <Button
                    className="w-full bg-red-600 hover:bg-red-700"
                    onClick={() => {
                      router.push("/clubs/contributions?method=mpesa");
                    }}
                  >
                    Pay with M-Pesa
                  </Button>
                </div>
              </div>

              {/* Tigo Pesa */}
              <div className="bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="h-32 bg-blue-600 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                      src="/yas-logo.png"
                      alt="Tigo Pesa"
                      width={100}
                      height={60}
                      className="object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src =
                          "https://placehold.co/100x60/0066CC/FFFFFF?text=Tigo+Pesa";
                      }}
                    />
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-gray-900 mb-2">Tigo Pesa</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Quick and convenient payments
                  </p>
                  <p className="text-sm font-medium text-gray-800 mb-4">
                    Number: 0655 654 321
                  </p>
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={() => {
                      router.push("/clubs/contributions?method=tigopesa");
                    }}
                  >
                    Pay with Tigo Pesa
                  </Button>
                </div>
              </div>

              {/* CRDB Bank */}
              <div className="bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="h-32 bg-green-600 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                      src="/bank-logo.png"
                      alt="Bank Transfer"
                      width={100}
                      height={60}
                      className="object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src =
                          "https://placehold.co/100x60/00AA00/FFFFFF?text=Bank";
                      }}
                    />
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-gray-900 mb-2">NMB Bank</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Secure bank transfer option
                  </p>
                  <p className="text-sm font-medium text-gray-800 mb-4">
                    NMB Bank - A/C: 0123456789
                  </p>
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={() => {
                      router.push(
                        "/clubs/contributions?method=bank&bankName=CRDB"
                      );
                    }}
                  >
                    Pay with Bank Transfer
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-white text-sm">
            <p className="mb-2">
              Every contribution boosts player morale and pushes us forward!
            </p>
            <p className="text-white/70">
              © 2023 Simba SC. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
