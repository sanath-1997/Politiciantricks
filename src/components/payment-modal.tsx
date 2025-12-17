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
      text: "Hey! 😄📘 I just found an ebook titled “Tricks Politicians Fool Common People?” 🎭🗳️\nIt’s super funny, witty, and painfully relatable 😂🤯\nDefinitely check it out—you’ll laugh and think at the same time! 😉🔥",
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
    let paymentLink = "";

    if (price === 99) {
      paymentLink = "https://rzp.io/rzp/RAo0xzRm";
    } else if (price === 13) {
      paymentLink = "https://rzp.io/rzp/T0n1dNNc";
    }

    if (paymentLink) {
      window.location.href = paymentLink;
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not determine payment link.",
      });
      setIsPaying(false);
    }
  };

  return (
    <Dialog
      onOpenChange={(isOpen) => {
        if (!isOpen && !isPaying) {
          // Reset price to 99 only when the dialog is closed and not during payment redirection
          setTimeout(() => {
            setPrice(99);
          }, 300); // Delay to allow animations to finish
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
            bg-primary
            hover:bg-primary/90
            text-primary-foreground
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
                  px-6
                  py-4
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
                Processing...
              </>
            ) : (
              <>
                Pay ₹{price} and Download
                <ArrowRight />
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
