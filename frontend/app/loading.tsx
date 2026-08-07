import { LogoMark } from "@/components/brand/Logo";
import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="grid min-h-screen place-items-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <LogoMark height={44} priority />
        <Spinner className="text-blue" />
        <p className="text-sm text-mist">Loading…</p>
      </div>
    </div>
  );
}
