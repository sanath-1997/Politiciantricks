"use client";

import { useEffect, useState } from "react";

interface AnimatedPriceProps {
  price: number;
}

export function AnimatedPrice({ price }: AnimatedPriceProps) {
  const [isDiscounted, setIsDiscounted] = useState(false);

  useEffect(() => {
    if (price === 13) {
      // We use a timeout to let the dialog open before animating
      const timer = setTimeout(() => {
        setIsDiscounted(true);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setIsDiscounted(false);
    }
  }, [price]);

  return (
    <div className="flex flex-col items-center justify-center h-24">
      <div className="relative h-20 flex items-center">
        {/* Strikethrough price, always present but hidden/shown with opacity */}
        <span
          className={`absolute left-1/2 -translate-x-1/2 text-2xl sm:text-3xl font-bold text-muted-foreground/60 line-through decoration-2 decoration-destructive/70 transition-all duration-300 ease-out ${
            isDiscounted ? "opacity-70 -translate-y-6" : "opacity-0"
          }`}
        >
          ₹99
        </span>

        {/* Main price */}
        <span
          className={`font-headline font-extrabold transition-all duration-300 ease-in-out ${
            isDiscounted
              ? "text-6xl sm:text-7xl text-destructive"
              : "text-4xl sm:text-5xl text-foreground"
          }`}
        >
          ₹{isDiscounted ? 13 : 99}
        </span>
      </div>
      <p
        className={`mt-2 text-sm font-medium transition-colors duration-500 ${
          isDiscounted ? "text-destructive" : "text-muted-foreground"
        }`}
      >
        {isDiscounted ? "Special Discount Price!" : "Standard Price"}
      </p>
    </div>
  );
}
