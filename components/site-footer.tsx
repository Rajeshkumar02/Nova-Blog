"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "@/config/app";

interface DeviceInfo {
  browser: string;
  operatingSystem: string;
  screenWidth: number;
  screenHeight: number;
}

function SiteFooter() {
  const [email, setEmail] = useState<string>("");
  const year = new Date().getFullYear();

  function getDeviceInfo(): DeviceInfo {
    const userAgent = window.navigator.userAgent;
    const platform = window.navigator.platform;
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;

    const browserInfo = (userAgent: string) => {
      const match =
        userAgent.match(
          /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
        ) || [];
      const version = /trident/i.test(match[1])
        ? /\brv[ :]+(\d+)/g.exec(userAgent) || []
        : [];
      return match[2] + (version[1] ? "." + version[1] : "");
    };

    const browser = browserInfo(userAgent);

    const operatingSystem = platform.includes("Win")
      ? "Windows"
      : platform.includes("Mac")
      ? "Mac OS"
      : platform.includes("Linux")
      ? "Linux"
      : platform.includes("iPhone")
      ? "iOS"
      : platform.includes("Android")
      ? "Android"
      : "Unknown";

    return {
      browser,
      operatingSystem,
      screenWidth,
      screenHeight,
    };
  }

  const isEmailValid = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubscribe = async () => {
    try {
      const dbInstance = doc(db, "Subscribers", email?.split("@")[0]);

      const subscriberData = {
        Email: email,
        Timestamp: serverTimestamp(),
        DeviceInfo: getDeviceInfo(),
      };

      await setDoc(dbInstance, subscriberData);

      toast({
        description: "Subscribed successfully",
        variant: "success",
      });

      setEmail("");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <footer className=" border-t mb-2">
      <div className=" px-3 md:container">
        <div className=" grid grid-cols-1 md:grid-cols-2">
          <div className=" py-4">
            <p className=" text-lg font-semibold first-letter:text-primary">
              Nova Blog
            </p>

            <p className=" text-sm text-secondary-foreground pt-2">
              Nourish your intellect with our content
            </p>
          </div>
          <div className=" flex h-full justify-center items-center gap-3">
            <Input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              className=""
              placeholder="Email address"
              type="email"
            />
            <Button
              onClick={handleSubscribe}
              disabled={!isEmailValid(email)}
              variant={"secondary"}
            >
              Subscribe
            </Button>
          </div>
        </div>
        <div className="mt-8 text-xs text-neutral-600">
          <p>&copy; {year} Nexus Blog</p>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
