"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarCheck, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import { useToast } from "@/components/ui/toast";
import { sendDemoRequest } from "@/services/emailService";
import type {
  DemoRequestErrors,
  DemoRequestField,
  DemoRequestFormData,
} from "@/types/email";

const EMPTY_FORM: DemoRequestFormData = {
  name: "",
  email: "",
  company: "",
  phone: "",
  message: "",
};

const FIELDS: {
  name: DemoRequestField;
  label: string;
  type: string;
  placeholder: string;
  autoComplete: string;
}[] = [
  { name: "name", label: "Full name", type: "text", placeholder: "Jordan Rivera", autoComplete: "name" },
  { name: "email", label: "Work email", type: "email", placeholder: "jordan@company.com", autoComplete: "email" },
  { name: "company", label: "Company", type: "text", placeholder: "Acme Finance", autoComplete: "organization" },
  { name: "phone", label: "Phone", type: "tel", placeholder: "+1 (555) 010-2030", autoComplete: "tel" },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+]?[\d\s().-]{7,}$/;

function validate(data: DemoRequestFormData): DemoRequestErrors {
  const errors: DemoRequestErrors = {};
  if (!data.name.trim() || data.name.trim().length < 2)
    errors.name = "Please enter your full name.";
  if (!data.email.trim()) errors.email = "Please enter your email.";
  else if (!EMAIL_RE.test(data.email.trim()))
    errors.email = "Please enter a valid email address.";
  if (!data.company.trim()) errors.company = "Please enter your company.";
  if (!data.phone.trim()) errors.phone = "Please enter your phone number.";
  else if (!PHONE_RE.test(data.phone.trim()))
    errors.phone = "Please enter a valid phone number.";
  if (!data.message.trim()) errors.message = "Tell us what you're looking for.";
  else if (data.message.trim().length < 10)
    errors.message = "A little more detail helps (min 10 characters).";
  return errors;
}

type Status = "idle" | "sending" | "success";

export function BookDemoModal() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<DemoRequestFormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<DemoRequestErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const submittingRef = useRef(false);
  const toast = useToast();

  useEffect(() => setMounted(true), []);

  const close = useCallback(() => {
    if (submittingRef.current) return;
    setOpen(false);
  }, []);

  useEffect(() => {
    const handler = () => {
      setOpen(true);
      setStatus("idle");
    };
    window.addEventListener("open-book-demo", handler);
    return () => window.removeEventListener("open-book-demo", handler);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name as DemoRequestField])
      setErrors((p) => ({ ...p, [name]: undefined }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submittingRef.current) return;
    const v = validate(form);
    setErrors(v);
    if (Object.keys(v).length > 0) {
      document.getElementById(`demo-${Object.keys(v)[0]}`)?.focus();
      return;
    }
    submittingRef.current = true;
    setStatus("sending");
    try {
      const result = await sendDemoRequest(form);
      if (result.ok) {
        setStatus("success");
        toast.success("Thank you! We'll contact you shortly.");
        setForm(EMPTY_FORM);
        setErrors({});
        setTimeout(() => {
          setOpen(false);
          setStatus("idle");
        }, 1300);
      } else {
        setStatus("idle");
        toast.error("Unable to send. Please try again.");
      }
    } catch {
      setStatus("idle");
      toast.error("Unable to send. Please try again.");
    } finally {
      submittingRef.current = false;
    }
  };

  const label =
    status === "sending"
      ? "Sending..."
      : status === "success"
      ? "Booked Successfully"
      : "Book a Demo";

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[150] flex items-end justify-center p-0 sm:items-center sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]"
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="book-demo-title"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg overflow-hidden rounded-t-2xl border border-line bg-white shadow-pop sm:rounded-2xl"
          >
            <div className="border-b border-line px-6 py-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue">
                Book a Demo
              </p>
              <h2
                id="book-demo-title"
                className="mt-1 text-lg font-semibold tracking-tight text-ink"
              >
                See your data differently
              </h2>
              <p className="mt-1 text-sm text-mist">
                A 30-minute walkthrough tailored to your reporting stack.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="px-6 py-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {FIELDS.map((f) => (
                  <div key={f.name}>
                    <label
                      htmlFor={`demo-${f.name}`}
                      className="label-base mb-1.5 text-[13px]"
                    >
                      {f.label}
                    </label>
                    <Input
                      id={`demo-${f.name}`}
                      name={f.name}
                      type={f.type}
                      placeholder={f.placeholder}
                      autoComplete={f.autoComplete}
                      value={form[f.name]}
                      onChange={handleChange}
                      invalid={Boolean(errors[f.name])}
                      disabled={status !== "idle"}
                    />
                    {errors[f.name] && (
                      <p className="mt-1.5 text-xs text-red">
                        {errors[f.name]}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <label
                  htmlFor="demo-message"
                  className="label-base mb-1.5 text-[13px]"
                >
                  How can we help?
                </label>
                <Textarea
                  id="demo-message"
                  name="message"
                  rows={4}
                  placeholder="Tell us about your reporting stack or the dashboards you have in mind."
                  value={form.message}
                  onChange={handleChange}
                  invalid={Boolean(errors.message)}
                  disabled={status !== "idle"}
                />
                {errors.message && (
                  <p className="mt-1.5 text-xs text-red">{errors.message}</p>
                )}
              </div>

              <Button
                type="submit"
                size="lg"
                className="mt-6 w-full"
                disabled={status !== "idle"}
              >
                {status === "sending" ? (
                  <Spinner className="border-white/40 border-t-white" />
                ) : status === "success" ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <CalendarCheck className="h-4 w-4" />
                )}
                {label}
              </Button>
              <p className="mt-3 text-center text-xs text-mist">
                By submitting you agree to our privacy policy. We never share
                your details.
              </p>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export function openBookDemo(): void {
  if (typeof window !== "undefined")
    window.dispatchEvent(new CustomEvent("open-book-demo"));
}
