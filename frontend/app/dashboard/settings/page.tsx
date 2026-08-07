import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export const metadata = { title: "Settings — Fintech Services" };

export default function SettingsPage() {
  return (
    <DashboardShell>
      <div className="mx-auto max-w-3xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink">
            Settings
          </h1>
          <p className="mt-1 text-sm text-mist">
            Manage your workspace preferences.
          </p>
        </div>

        <section className="card p-6">
          <h2 className="text-base font-semibold text-ink">Workspace</h2>
          <p className="mt-1 text-sm text-mist">
            Update your workspace name and URL.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label-base mb-1.5 text-[13px]">Name</label>
              <Input defaultValue="Acme Finance" />
            </div>
            <div>
              <label className="label-base mb-1.5 text-[13px]">URL</label>
              <Input defaultValue="acme.fintechservices.app" />
            </div>
          </div>
          <div className="mt-5 flex justify-end gap-2">
            <Button variant="outline">Cancel</Button>
            <Button>Save changes</Button>
          </div>
        </section>

        <section className="card p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-base font-semibold text-ink">Plan</h2>
              <p className="mt-1 text-sm text-mist">
                You&apos;re on the Growth plan.
              </p>
            </div>
            <Badge tone="blue">Growth</Badge>
          </div>
        </section>

        <section className="card border-red/20 p-6">
          <h2 className="text-base font-semibold text-red">Danger zone</h2>
          <p className="mt-1 text-sm text-mist">
            Permanently delete this workspace and all of its data.
          </p>
          <Button variant="danger" className="mt-4">
            Delete workspace
          </Button>
        </section>
      </div>
    </DashboardShell>
  );
}
