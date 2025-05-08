"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const MATCH_DATE = new Date("2025-05-30T00:00:00");

const plans = [
  {
    id: "monthly",
    title: "Monthly Plan",
    price: "TZS21,000 / mo",
    description: "Billed every month. Cancel anytime.",
  },
  {
    id: "yearly",
    title: "Yearly Plan",
    price: "TZS201,600 / yr",
    description: "Best value. Save 20% compared to monthly.",
  },
];

const benefits = [
  "Official member ID and certificate",
  "Exclusive matchday offers",
  "Priority ticket access",
  "Discount on club merchandise",
  "Invitations to member-only events",
];

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState(() => {
    const diff = targetDate.getTime() - new Date().getTime();
    return diff > 0 ? diff : 0;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = targetDate.getTime() - new Date().getTime();
      setTimeLeft(diff > 0 ? diff : 0);
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const seconds = Math.floor((timeLeft / 1000) % 60);
  const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));

  return { days, hours, minutes, seconds, isOver: timeLeft <= 0 };
}

export default function MembershipPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showInstructions, setShowInstructions] = useState(false);

  const router = useRouter();
  const countdown = useCountdown(MATCH_DATE);
  const { width, height } = useWindowSize();

  const handleSelect = (planId: string) => {
    setSelectedPlan(planId);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl">
        {/* Back Button */}
        <div className="mb-2">
          <button
            onClick={() => router.back()}
            className="text-sm text-red-700 hover:text-red-900 underline"
          >
            ← Go Back
          </button>
        </div>
        {/* Club Logo */}
        <div className="flex justify-center mb-4">
          <Image
            src="/simba.png"
            alt="Simba SC Logo"
            width={100}
            height={100}
          />
        </div>
        {/* Campaign Banner with Countdown */}
        {!countdown.isOver && (
          <>
            <div
              onClick={() => setShowInstructions(true)}
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
                    🎁 You can support the team with any amount via the
                    following options:
                  </p>
                  <ul className="list-disc list-inside">
                    <li>
                      <strong>Mpesa:</strong> 0767 123 456 (Name: Simba SC)
                    </li>
                    <li>
                      <strong>Tigo Pesa:</strong> 0655 654 321
                    </li>
                    <li>
                      <strong>Bank:</strong> CRDB Bank - A/C: 0123456789
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

        <div className="mb-2 text-center">
          <h2 className="text-xl text-red-700 font-semibold tracking-wide uppercase">
            Become an official Simba SC member
          </h2>
        </div>

        <h1 className="text-3xl font-bold text-center mb-8">
          Choose Your Membership
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              onClick={() => handleSelect(plan.id)}
              className={cn(
                "cursor-pointer transition border-2",
                selectedPlan === plan.id
                  ? "border-red-600 shadow-lg"
                  : "border-transparent"
              )}
            >
              <CardHeader>
                <CardTitle>{plan.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold">{plan.price}</p>
                <p className="text-muted-foreground mt-2">{plan.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button
            disabled={!selectedPlan}
            className="w-full md:w-1/3 bg-red-600 hover:bg-red-700"
          >
            {selectedPlan
              ? `Continue with ${selectedPlan} plan`
              : "Select a Plan"}
          </Button>
        </div>

        {/* Member Benefits */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
            Member Benefits
          </h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2 text-center md:text-left">
            {benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
