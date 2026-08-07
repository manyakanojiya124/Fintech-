import { Database, Plus } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { Button } from "@/components/ui/button";

export const metadata = { title: "Datasets — Fintech Services" };

export default function DatasetsPage() {
  return (
    <DashboardShell>
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-ink">
              Datasets
            </h1>
            <p className="mt-1 text-sm text-mist">
              Certified semantic models and data sources.
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4" /> Connect source
          </Button>
        </div>

        <EmptyState
          title="No datasets connected"
          description="Connect SQL Server, Excel, or a cloud warehouse to create your first certified dataset."
          actionLabel="Connect a data source"
        />

        <div className="card flex items-center gap-4 p-5">
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-blue-50 text-blue">
            <Database className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-ink">Need help modeling?</p>
            <p className="text-xs text-mist">
              Our team can build a governed semantic model for your stack.
            </p>
          </div>
          <Button variant="outline" size="sm">
            Book a demo
          </Button>
        </div>
      </div>
    </DashboardShell>
  );
}
