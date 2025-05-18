"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MATCH_DATE = new Date("2025-05-30T00:00:00");

export default function AdvertBanner() {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isOver: false,
  });

  useEffect(() => {
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

  const { width, height } = useWindowSize();
  const router = useRouter();

  return (
    <div>
      {!countdown.isOver && (
        <>
          <div
            onClick={() => router.push("/clubs/payment-options")}
            className="cursor-pointer bg-red-600 text-white rounded-xl shadow-md p-6 mb-6 text-center hover:bg-red-700 transition"
          >
            <h3 className="text-xl md:text-2xl font-bold">
              Simba nguvu moja – Washabiki motisha bonus kwa wachezaji wetu
              Confederation Cup 2025
            </h3>
            <p className="italic mt-2 text-sm md:text-base text-red-100">
              Ubaya Ubwela
            </p>
            <div className="mt-4 text-lg font-semibold">
              Countdown: {countdown.days}d {countdown.hours}h{" "}
              {countdown.minutes}m {countdown.seconds}s
            </div>
            <p className="mt-2 text-xs text-red-200">
              (Tap for contribution details)
            </p>
          </div>
        </>
      )}

      {countdown.isOver && (
        <div className="bg-yellow-100 text-yellow-800 rounded-xl shadow-md p-6 mb-6 text-center">
          <h3 className="text-2xl font-bold mb-2">
            🎉 It’s Match Day! Nguvu Moja Simba! 🦁
          </h3>
          <p className="text-sm italic">
            Wakati wa kupambana – tuwaunge mkono mashujaa wetu!
          </p>
          <Confetti
            width={width}
            height={height}
            numberOfPieces={250}
            recycle={false}
          />
        </div>
      )}
    </div>
  );
}
