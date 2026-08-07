import { UserPlus } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const members = [
  { name: "Jordan Rivera", email: "jordan@acme.com", role: "Owner", initials: "JR" },
  { name: "Aisha Khan", email: "aisha@acme.com", role: "Admin", initials: "AK" },
  { name: "Marco Chen", email: "marco@acme.com", role: "Editor", initials: "MC" },
  { name: "Sana Patel", email: "sana@acme.com", role: "Editor", initials: "SP" },
  { name: "Lukas Novak", email: "lukas@acme.com", role: "Viewer", initials: "LN" },
];

export const metadata = { title: "Team — Fintech Services" };

export default function TeamPage() {
  return (
    <DashboardShell>
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-ink">Team</h1>
            <p className="mt-1 text-sm text-mist">
              Manage roles and access to your workspace.
            </p>
          </div>
          <Button>
            <UserPlus className="h-4 w-4" /> Invite member
          </Button>
        </div>

        <div className="card overflow-hidden">
          <ul className="divide-y divide-line">
            {members.map((m) => (
              <li
                key={m.email}
                className="flex items-center gap-4 p-5 transition-colors hover:bg-subtle/50"
              >
                <div className="grid h-10 w-10 place-items-center rounded-full bg-blue text-sm font-semibold text-white">
                  {m.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink">
                    {m.name}
                  </p>
                  <p className="truncate text-xs text-mist">{m.email}</p>
                </div>
                <Badge
                  tone={m.role === "Owner" ? "red" : m.role === "Admin" ? "blue" : "neutral"}
                >
                  {m.role}
                </Badge>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DashboardShell>
  );
}
