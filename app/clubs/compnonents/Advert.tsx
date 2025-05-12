"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { useSession } from "next-auth/react";

const MATCH_DATE = new Date("2025-05-30T00:00:00");

export default function AdvertBanner() {
  const [showInstructions, setShowInstructions] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const { data: session } = useSession();

  console.log("session", session);

  // Hydration-safe countdown
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isOver: false,
  });

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

    updateCountdown(); // initial run
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const { width, height } = useWindowSize();
  const router = useRouter();

  if (!isClient) return null; // Prevent hydration mismatch

  return (
    <div>
      {/* Campaign Banner with Countdown */}
      {!countdown.isOver && (
        <>
          <div
            onClick={() =>
              session?.user?.id
                ? setShowInstructions(true)
                : router.push("/login")
            }
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

          {/* Modal Dialog */}
          <Dialog open={showInstructions} onOpenChange={setShowInstructions}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>How to Contribute</DialogTitle>
              </DialogHeader>
              <div className="text-sm space-y-3 text-gray-700">
                <p>
                  🎁 You can support the team with any amount via the following
                  options:
                </p>
                <ul className="list-disc list-inside">
                  <li>
                    <a
                      href="https://www.vodacom.co.tz/mpesa"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <strong>Mpesa:</strong> 0767 123 456 (Name: Simba SC)
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://yas.co.tz/mixx-by-yas/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <strong>Tigo Pesa:</strong> 0655 654 321
                    </a>
                  </li>
                  <li>
                    <strong>Bank:</strong>{" "}
                    <a
                      href="https://www.crdbbank.co.tz/en"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      CRDB Bank - A/C: 0123456789
                    </a>
                  </li>
                </ul>
                <p>
                  📣 Every contribution boosts player morale and pushes us
                  forward!
                </p>
              </div>
            </DialogContent>
          </Dialog>
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
