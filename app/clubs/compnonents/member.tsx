"use client";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import React from "react";
const redirectToStore = () => {
  const userAgent =
    typeof window !== "undefined"
      ? navigator.userAgent || navigator.vendor
      : "";

  const isAndroid = /android/i.test(userAgent);
  const isIOS = /iPad|iPhone|iPod/.test(userAgent);

  if (isAndroid) {
    window.open(
      "https://play.google.com/store/apps/details?id=com.simbasc",
      "_blank"
    );
  } else if (isIOS) {
    window.open(
      "https://apps.apple.com/us/app/simba-sc/id1564389213",
      "_blank"
    );
  } else {
    // Fallback (could go to your website or show a modal)
    window.open(
      "https://apps.apple.com/us/app/simba-sc/id1564389213",
      "_blank"
    );
  }
};

export default function AppDownloadButton() {
  return (
    <Button onClick={redirectToStore}>
      {" "}
      <PlusCircle /> Become official member
    </Button>
  );
}
