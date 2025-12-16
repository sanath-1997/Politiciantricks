import { PaymentModal } from "@/components/payment-modal";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full">
      <Image
        src="https://picsum.photos/seed/capitol/1920/1080"
        alt="Political background"
        fill
        className="object-cover"
        data-ai-hint="capitol building"
      />
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-12">
        <div className="w-full max-w-4xl mx-auto text-center space-y-8">
          <header className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-headline font-bold text-primary">
              How to fool common people? - Political Edition
            </h1>
            <div className="flex items-center justify-center space-x-2">
              <span role="img" aria-label="theater masks" className="text-2xl">
                🎭
              </span>
              <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-body">
                PolitiTricks Exposed
              </p>
            </div>
          </header>

          <section className="bg-card/90 p-6 sm:p-8 rounded-lg shadow-lg border-border/50 max-w-2xl mx-auto text-left space-y-4">
            <h2 className="text-2xl sm:text-3xl font-headline font-semibold text-primary">
              What this ebook is about
            </h2>
            <p className="font-body text-base sm:text-lg leading-relaxed">
              This book is simply about all the nonsense politicians do to grab
              power and cling to it like a lifetime freebie scheme. From
              dramatic speeches to magical promises that expire right after
              elections, every trick is exposed with satire.
            </p>
            <p className="font-body text-sm text-muted-foreground italic pt-2">
              <strong>Note:</strong> After payment, you can access the PDF file
              in your Google Drive.
            </p>
          </section>

          <section className="w-full max-w-md mx-auto pt-4">
            <PaymentModal />
          </section>
        </div>
      </main>
    </div>
  );
}
