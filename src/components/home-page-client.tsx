"use client";

import { PaymentModal } from "@/components/payment-modal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useState, useEffect } from "react";

export function HomePageClient() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="min-h-screen w-full relative">
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: "url('/politics_background_image.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: -1,
        }}
      />
      <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-12 relative z-10">
        <div className="w-full max-w-4xl mx-auto text-center space-y-8">
          <section className="w-full max-w-md mx-auto pt-4">
            <PaymentModal />
          </section>
        </div>

        <footer className="w-full text-center mt-12 bg-black/50 backdrop-blur-sm py-6">
          <div className="max-w-4xl mx-auto flex flex-wrap justify-center items-center gap-x-4 sm:gap-x-6 gap-y-2">
            <FooterLink title="About the Author">
              <p>
                This ebook was written by Sanath, a passionate writer and
                political commentator with a knack for seeing the humor in the
                absurd.
              </p>
            </FooterLink>
            <FooterLink title="Contact Us">
              <p>
                For any questions, support, or feedback, please reach out to
                us via email. We'll get back to you as soon as possible.
                <br />
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:sanathselvakumaran@gmail.com"
                  className="text-primary hover:underline"
                >
                  sanathselvakumaran@gmail.com
                </a>
              </p>
            </FooterLink>
            <FooterLink title="Terms & Conditions">
              <ScrollArea className="h-72">
                <div className="space-y-4 pr-6">
                  <h4 className="font-semibold">1. Introduction</h4>
                  <p>
                    Welcome to PolitiTricks Exposed. These terms and conditions
                    outline the rules and regulations for the purchase and use
                    of our ebook. By purchasing, you agree to these terms.
                  </p>
                  <h4 className="font-semibold">2. Intellectual Property</h4>
                  <p>
                    The ebook and its content are the intellectual property of
                    Sanath. It is for your personal, non-commercial use only.
                    Reproduction or distribution is strictly prohibited.
                  </p>
                  <h4 className="font-semibold">3. Purchase</h4>
                  <p>
                    All sales are final. By completing the purchase, you authorize
                    us to charge your selected payment method.
                  </p>
                  <h4 className="font-semibold">4. Limitation of Liability</h4>
                  <p>
                    The content of the ebook is for informational and
                    entertainment purposes. The author is not liable for any
                    actions taken based on its content.
                  </p>
                </div>
              </ScrollArea>
            </FooterLink>
            <FooterLink title="Privacy Policy">
              <ScrollArea className="h-72">
                <div className="space-y-4 pr-6">
                  <h4 className="font-semibold">1. Data Collection</h4>
                  <p>
                    We collect personal information such as your name and email
                    address during the payment process to facilitate the
                    delivery of the ebook.
                  </p>
                  <h4 className="font-semibold">2. Data Usage</h4>
                  <p>
                    Your information is used solely for processing your order,
                    delivering the product, and for occasional communication
                    regarding your purchase. We do not sell or share your data
                    with third parties for marketing purposes.
                  </p>
                  <h4 className="font-semibold">3. Data Security</h4>
                  <p>
                    We take reasonable measures to protect your personal
                    information. All payments are processed through Razorpay, a
                    secure payment gateway.
                  </p>
                </div>
              </ScrollArea>
            </FooterLink>
            <FooterLink title="Refund Policy">
              <p>
                Due to the digital nature of the ebook, all sales are final. We
                do not offer refunds or cancellations once the purchase is
                complete and the product has been delivered. If you experience
                any issues accessing the file, please contact us at{" "}
                <a
                  href="mailto:sanathselvakumaran@gmail.com"
                  className="text-primary hover:underline"
                >
                  sanathselvakumaran@gmail.com
                </a>
                .
              </p>
            </FooterLink>
            <FooterLink title="Shipping & Delivery">
              <p>
                This is a digital product (ebook in PDF format). Upon
                successful payment, you will be automatically redirected to a
                Google Drive link where you can view and download the ebook.
                There is no physical product to be shipped. You will have
                instant access after your purchase is confirmed.
              </p>
            </FooterLink>
          </div>
          <p className="text-sm mt-6 text-white/80">
            © {isClient ? new Date().getFullYear() : "2024"} PolitiTricks
            Exposed. All Rights Reserved.
          </p>
        </footer>
      </main>
    </div>
  );
}

const FooterLink = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <Dialog>
    <DialogTrigger asChild>
      <button className="text-sm text-white hover:text-primary hover:underline focus:outline-none">
        {title}
      </button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-2xl bg-card">
      <DialogHeader>
        <DialogTitle className="text-2xl font-headline text-primary">
          {title}
        </DialogTitle>
      </DialogHeader>
      <div className="py-4 text-base text-left font-body leading-relaxed text-card-foreground/90">
        {children}
      </div>
    </DialogContent>
  </Dialog>
);
