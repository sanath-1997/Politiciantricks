"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Share2, BookOpen, Loader2, ArrowRight } from "lucide-react";
import { AnimatedPrice } from "./animated-price";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "./ui/scroll-area";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export function PaymentModal() {
  const [price, setPrice] = useState(99);
  const [isPaying, setIsPaying] = useState(false);
  const { toast } = useToast();

  const handleShare = async () => {
    const shareData = {
      title: "PolitiTricks Exposed: How to fool common people?",
      text: "Check out this satirical take on modern politics!",
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setPrice(13);
        toast({
          title: "Discount Unlocked!",
          description: "Price dropped to ₹13. Thanks for sharing!",
        });
      } catch (error) {
        console.error("Sharing failed:", error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setPrice(13);
        toast({
          title: "Link Copied & Discount Unlocked!",
          description: "Price dropped to ₹13. Now share the link!",
        });
      } catch (err) {
        console.error("Failed to copy:", err);
        toast({
          variant: "destructive",
          title: "Oops!",
          description: "Could not copy link. Please try again.",
        });
      }
    }
  };

  const handlePayment = () => {
    setIsPaying(true);

    const options = {
      key: "YOUR_RAZORPAY_KEY_ID", // IMPORTANT: Replace with your Razorpay Key ID
      amount: price * 100, // Amount in paise
      currency: "INR",
      name: "PolitiTricks Exposed",
      description: "Ebook by Sanath",
      handler: function (response: any) {
        toast({
          title: "Payment Successful!",
          description: "Redirecting you to the ebook...",
        });
        // Redirect to the ebook on successful payment
        window.location.href =
          "https://drive.google.com/file/d/17yAepMItiG1JChoYNIvtMEejXEPA3IoB/view?usp=sharing";
      },
      prefill: {
        name: "",
        email: "",
        contact: "",
      },
      notes: {
        address: "Digital Product",
      },
      theme: {
        color: "#FF8C00", // Corresponds to your accent color
      },
      modal: {
        ondismiss: function () {
          setIsPaying(false);
          toast({
            variant: "destructive",
            title: "Payment Cancelled",
            description: "You can try again anytime.",
          });
        },
      },
    };

    if (!window.Razorpay) {
      toast({
        variant: "destructive",
        title: "Payment Gateway Error",
        description:
          "Razorpay script not loaded. Please check your connection and try again.",
      });
      setIsPaying(false);
      return;
    }

    const rzp = new window.Razorpay(options);

    rzp.on("payment.failed", function (response: any) {
      setIsPaying(false);
      toast({
        variant: "destructive",
        title: "Payment Failed",
        description: response.error.description || "Please try again.",
      });
    });

    rzp.open();
  };

  return (
    <Dialog
      onOpenChange={(isOpen) => {
        if (!isOpen && !isPaying) {
          setPrice(99);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="
            w-full
            text-lg
            font-bold
            bg-accent
            hover:bg-accent/90
            text-accent-foreground
            shadow-lg
            transform
            hover:scale-105
            transition-transform
            duration-300
          "
        >
          <BookOpen className="mr-2" />
          Get The Ebook Now
        </Button>
      </DialogTrigger>

      <DialogContent
        className="
          w-[calc(100vw-2rem)]
          max-w-full
          sm:max-w-[480px]
          bg-card
          border-primary/50
          shadow-2xl
          grid
          grid-cols-1
          grid-rows-[auto,minmax(0,1fr),auto]
          p-0
          max-h-[90vh]
          overflow-x-hidden
        "
      >
        <DialogHeader className="p-4 sm:p-6 pb-0">
          <DialogTitle className="text-2xl sm:text-3xl font-headline text-primary text-center">
            Your Political Satire Fix
          </DialogTitle>
          <DialogDescription className="text-center text-md sm:text-lg pt-2">
            Secure your copy of &quot;PolitiTricks Exposed&quot;.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="px-4 sm:px-6">
          <div className="py-8 text-center overflow-hidden">
            <AnimatedPrice price={price} />
          </div>

          {price === 99 && (
            <div className="p-4 mb-4 bg-secondary/50 rounded-lg text-center space-y-3">
              <p className="font-semibold text-secondary-foreground">
                Want a massive discount?
              </p>
              <Button
                variant="outline"
                onClick={handleShare}
                className="
                  w-full
                  max-w-full
                  px-3
                  sm:px-4
                  text-sm
                  sm:text-base
                  leading-snug
                  whitespace-normal
                  break-words
                  flex
                  items-center
                  justify-center
                  gap-2
                  text-center
                  border-accent
                  text-accent
                  hover:bg-accent
                  hover:text-accent-foreground
                "
              >
                <Share2 className="shrink-0" />
                <span>
                  Share with 1 person to unlock ₹13 price
                </span>
              </Button>
            </div>
          )}
        </ScrollArea>

        <DialogFooter className="p-4 sm:p-6 pt-0">
          <Button
            size="lg"
            onClick={handlePayment}
            disabled={isPaying}
            className="
              w-full
              bg-primary
              hover:bg-primary/90
              text-xl
              flex
              items-center
              justify-center
              gap-2
            "
          >
            {isPaying ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Processing Payment...
              </>
            ) : (
              <>
                Pay ₹{price} and Get Access
                <ArrowRight />
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
