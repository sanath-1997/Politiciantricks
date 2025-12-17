"use client";

import { useEffect, useState } from "react";

interface AnimatedPriceProps {
  price: number;
}

export function AnimatedPrice({ price }: AnimatedPriceProps) {
  const [isDiscounted, setIsDiscounted] = useState(false);
  const [showInitialPrice, setShowInitialPrice] = useState(true);

  useEffect(() => {
    if (price === 13) {
      const timer = setTimeout(() => {
        setIsDiscounted(true);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      // Reset state when dialog closes
      setIsDiscounted(false);
    }
  }, [price]);

  useEffect(() => {
    if (isDiscounted) {
      // Hide the initial large price after the transition to avoid overlap
      const timer = setTimeout(() => {
        setShowInitialPrice(false);
      }, 1000); // Should match transition duration
      return () => clearTimeout(timer);
    } else {
      setShowInitialPrice(true);
    }
  }, [isDiscounted]);

  return (
    <div className="flex flex-col items-center justify-center h-24">
      <div className="relative h-20 flex items-center justify-center w-48">
        {/* Initial Price State (99) */}
        {showInitialPrice && (
          <span
            className={`font-headline font-extrabold text-foreground transition-all duration-1000 ease-in-out ${
              isDiscounted
                ? "opacity-0 scale-50"
                : "text-4xl sm:text-5xl opacity-100 scale-100"
            }`}
          >
            ₹99
          </span>
        )}

        {/* Discounted Price State (99 crossed out + 13) */}
        <div
          className={`absolute flex items-end justify-center gap-x-2 sm:gap-x-3 transition-all duration-1000 ease-in-out ${
            isDiscounted
              ? "opacity-100 scale-100"
              : "opacity-0 scale-125 pointer-events-none"
          }`}
        >
          <span className="text-2xl sm:text-3xl font-bold text-muted-foreground/80 line-through decoration-2 decoration-destructive/70">
            ₹99
          </span>
          <span className="font-headline font-extrabold text-6xl sm:text-7xl text-destructive">
            ₹13
          </span>
        </div>
      </div>
      <p
        className={`mt-2 text-sm font-medium transition-colors duration-1000 ${
          isDiscounted ? "text-destructive" : "text-muted-foreground"
        }`}
      >
        {isDiscounted ? "Special Discount Price!" : "Standard Price"}
      </p>
    </div>
  );
}
