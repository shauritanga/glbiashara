"use client";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import React from "react";


export default function AppDownloadButton({ id }: { id: string }) {
  return (
    <Link href={`/clubs/${id}/subscriptions`}>
    <Button >
      <PlusCircle /> Become official member
    </Button>
    </Link>
  );
}
