"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Mail, Lock, User, Building2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Spinner } from "@/components/ui/spinner";
import { useToast } from "@/components/ui/toast";

export default function SignupPage() {
  const toast = useToast();
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    password: "",
  });
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (form.name.trim().length < 2) next.name = "Enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Enter a valid work email.";
    if (!form.company.trim()) next.company = "Enter your company.";
    if (form.password.length < 8)
      next.password = "Use at least 8 characters.";
    if (!agree) next.agree = "Please accept the terms to continue.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    toast.success("Account created. Check your email to verify.");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-ink">
        Create your account
      </h1>
      <p className="mt-2 text-sm text-mist">
        Start building dashboards in minutes. No credit card required.
      </p>

      <form onSubmit={onSubmit} noValidate className="mt-8 space-y-4">
        <div>
          <label htmlFor="name" className="label-base mb-1.5 text-[13px]">
            Full name
          </label>
          <div className="relative">
            <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-mist" />
            <Input
              id="name"
              autoComplete="name"
              placeholder="Jordan Rivera"
              value={form.name}
              onChange={set("name")}
              invalid={Boolean(errors.name)}
              className="pl-10"
            />
          </div>
          {errors.name && <p className="mt-1.5 text-xs text-red">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="label-base mb-1.5 text-[13px]">
            Work email
          </label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-mist" />
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              value={form.email}
              onChange={set("email")}
              invalid={Boolean(errors.email)}
              className="pl-10"
            />
          </div>
          {errors.email && <p className="mt-1.5 text-xs text-red">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="company" className="label-base mb-1.5 text-[13px]">
            Company
          </label>
          <div className="relative">
            <Building2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-mist" />
            <Input
              id="company"
              autoComplete="organization"
              placeholder="Acme Finance"
              value={form.company}
              onChange={set("company")}
              invalid={Boolean(errors.company)}
              className="pl-10"
            />
          </div>
          {errors.company && <p className="mt-1.5 text-xs text-red">{errors.company}</p>}
        </div>

        <div>
          <label htmlFor="password" className="label-base mb-1.5 text-[13px]">
            Password
          </label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-mist" />
            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              placeholder="At least 8 characters"
              value={form.password}
              onChange={set("password")}
              invalid={Boolean(errors.password)}
              className="pl-10"
            />
          </div>
          {errors.password && <p className="mt-1.5 text-xs text-red">{errors.password}</p>}
        </div>

        <div>
          <label className="flex cursor-pointer items-start gap-2.5 text-sm text-mist">
            <Checkbox checked={agree} onCheckedChange={setAgree} />
            <span>
              I agree to the{" "}
              <Link href="#" className="font-medium text-blue hover:text-blue-700">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" className="font-medium text-blue hover:text-blue-700">
                Privacy Policy
              </Link>
              .
            </span>
          </label>
          {errors.agree && <p className="mt-1.5 text-xs text-red">{errors.agree}</p>}
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          {loading ? <Spinner className="border-white/40 border-t-white" /> : null}
          {loading ? "Creating account…" : "Create account"}
          {!loading && <ArrowRight className="h-4 w-4" />}
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-mist">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-blue hover:text-blue-700">
          Sign in
        </Link>
      </p>
    </div>
  );
}
