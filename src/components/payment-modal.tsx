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
        // User may have cancelled the share, so we don't show an error.
      }
    } else {
      // Fallback for desktop
      try {
        await navigator.clipboard.writeText(window.location.href);
        setPrice(13);
        toast({
          title: "Link Copied & Discount Unlocked!",
          description: "Price dropped to ₹13. Now share the link!",
        });
      } catch (err) {
        console.error("Failed to copy: ", err);
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
    // Simulate Razorpay payment process
    setTimeout(() => {
      window.location.href =
        "https://drive.google.com/file/d/17yAepMItiG1JChoYNIvtMEejXEPA3IoB/view?usp=sharing";
    }, 2000);
  };

  return (
    <Dialog onOpenChange={() => {
        // Reset price if modal is closed without payment
        if (!isPaying) {
            setPrice(99);
        }
    }}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="w-full text-lg font-bold bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg transform hover:scale-105 transition-transform duration-300"
        >
          <BookOpen className="mr-2" /> Get The Ebook Now
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px] bg-card border-primary/50 shadow-2xl grid-rows-[auto,minmax(0,1fr),auto] p-0 max-h-[90vh]">
        <DialogHeader className="p-6">
          <DialogTitle className="text-3xl font-headline text-primary text-center">
            Your Political Satire Fix
          </DialogTitle>
          <DialogDescription className="text-center text-lg pt-2">
            Secure your copy of "PolitiTricks Exposed".
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="px-6">
          <div className="py-8 text-center">
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
                className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground text-base font-semibold"
              >
                <Share2 className="mr-2" /> Share with 1 person to unlock ₹13
                price
              </Button>
            </div>
          )}
        </ScrollArea>

        <DialogFooter className="p-6 pt-0">
          <Button
            size="lg"
            className="w-full bg-primary hover:bg-primary/90 text-xl"
            onClick={handlePayment}
            disabled={isPaying}
          >
            {isPaying ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processing Payment...
              </>
            ) : (
              <>
                Pay ₹{price} and Get Access <ArrowRight className="ml-2" />
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
