import { Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmptyState({
  title = "Nothing here yet",
  description = "Get started by creating your first report or connecting a data source.",
  actionLabel = "Create report",
  onAction,
}: {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="card flex flex-col items-center justify-center px-6 py-20 text-center">
      <div className="grid h-12 w-12 place-items-center rounded-full bg-subtle text-mist">
        <Inbox className="h-5 w-5" />
      </div>
      <h3 className="mt-4 text-base font-semibold text-ink">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-mist">{description}</p>
      <Button className="mt-6" onClick={onAction}>
        {actionLabel}
      </Button>
    </div>
  );
}
