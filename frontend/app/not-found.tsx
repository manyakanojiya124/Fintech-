import Link from "next/link";
import { Compass, ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="grid min-h-[70vh] place-items-center px-6 pt-32 pb-24">
        <div className="max-w-md text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-blue-50 text-blue">
            <Compass className="h-6 w-6" />
          </div>
          <p className="mt-6 font-mono text-sm font-semibold text-blue">404</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink">
            Page not found
          </h1>
          <p className="mt-3 text-mist">
            The page you&apos;re looking for doesn&apos;t exist or may have been
            moved.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4" /> Back to home
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/templates">Browse templates</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
