import Link from "next/link";
import { Compass } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 pt-32 text-center">
        <Compass className="h-10 w-10 text-orange" />
        <h1 className="mt-6 font-display text-4xl text-ink">Page not found</h1>
        <p className="mt-3 max-w-sm text-mist">
          The page you&apos;re looking for doesn&apos;t exist or may have been
          moved.
        </p>
        <Button className="mt-8" asChild>
          <Link href="/">Back to homepage</Link>
        </Button>
      </main>
      <Footer />
    </>
  );
}
