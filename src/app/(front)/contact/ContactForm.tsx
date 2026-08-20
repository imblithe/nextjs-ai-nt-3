"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { CircleCheck, CircleAlert, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  contactSchema,
  type ContactFormValues,
} from "./schema";
import { submitContactMessage } from "./actions";

type FormStatus = "idle" | "pending" | "success" | "validation" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      website: "",
    },
  });

  function onSubmit(values: ContactFormValues) {
    setStatus("pending");
    setErrorMessage("");

    startTransition(async () => {
      const formData = new FormData();
      formData.set("name", values.name);
      formData.set("email", values.email);
      formData.set("subject", values.subject);
      formData.set("message", values.message);
      formData.set("website", values.website ?? "");

      try {
        const result = await submitContactMessage(formData);

        if (result.status === "success") {
          form.reset();
          setStatus("success");
          return;
        }

        if (result.fieldErrors) {
          for (const [key, messages] of Object.entries(result.fieldErrors)) {
            if (!messages?.[0]) continue;
            form.setError(key as keyof ContactFormValues, {
              type: "server",
              message: messages[0],
            });
          }
        }

        if (!result.fieldErrors) {
          setErrorMessage(
            result.message ?? "เกิดข้อผิดพลาดในการส่งข้อความ กรุณาลองใหม่ภายหลัง"
          );
        }
        setStatus("error");
      } catch {
        setErrorMessage(
          "ไม่สามารถส่งข้อความได้ในขณะนี้ กรุณาลองใหม่ภายหลัง"
        );
        setStatus("error");
      }
    });
  }

  const pending = status === "pending" || isPending;

  return (
    <div className="rounded-4xl border bg-card p-6 shadow-md ring-1 ring-foreground/5 sm:p-8">
      <h2 className="font-medium text-2xl tracking-[-0.02em]">
        ส่งข้อความถึงเรา
      </h2>
      <p className="mt-2 text-muted-foreground">
        กรอกข้อมูลด้านล่าง เราจะตอบกลับโดยเร็วที่สุด
      </p>

      {status === "success" && (
        <div
          role="status"
          aria-live="polite"
          className="mt-6 flex items-start gap-3 rounded-3xl border border-border bg-muted/50 p-4"
        >
          <CircleCheck className="mt-0.5 size-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
          <p className="text-sm text-muted-foreground">
            ส่งข้อความสำเร็จแล้ว เราจะติดต่อกลับโดยเร็วที่สุด ขอบคุณครับ
          </p>
        </div>
      )}

      {status === "error" && (
        <div
          role="alert"
          aria-live="assertive"
          className="mt-6 flex items-start gap-3 rounded-3xl border border-destructive/40 bg-destructive/10 p-4"
        >
          <CircleAlert className="mt-0.5 size-5 shrink-0 text-destructive" />
          <p className="text-sm text-destructive">{errorMessage}</p>
        </div>
      )}

      <form
        id="form-contact"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        className="mt-6"
      >
        <FieldGroup>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-contact-name">ชื่อ</FieldLabel>
                <Input
                  {...field}
                  id="form-contact-name"
                  type="text"
                  autoComplete="name"
                  aria-invalid={fieldState.invalid}
                  aria-describedby={
                    fieldState.invalid ? "form-contact-name-error" : undefined
                  }
                  placeholder="สมชาย ใจดี"
                />
                {fieldState.invalid && (
                  <FieldError id="form-contact-name-error">
                    {fieldState.error?.message}
                  </FieldError>
                )}
              </Field>
            )}
          />

          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-contact-email">อีเมล</FieldLabel>
                <Input
                  {...field}
                  id="form-contact-email"
                  type="email"
                  autoComplete="email"
                  aria-invalid={fieldState.invalid}
                  aria-describedby={
                    fieldState.invalid ? "form-contact-email-error" : undefined
                  }
                  placeholder="you@example.com"
                />
                {fieldState.invalid && (
                  <FieldError id="form-contact-email-error">
                    {fieldState.error?.message}
                  </FieldError>
                )}
              </Field>
            )}
          />

          <Controller
            name="subject"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-contact-subject">หัวข้อ</FieldLabel>
                <Input
                  {...field}
                  id="form-contact-subject"
                  type="text"
                  aria-invalid={fieldState.invalid}
                  aria-describedby={
                    fieldState.invalid ? "form-contact-subject-error" : undefined
                  }
                  placeholder="สอบถามสินค้า"
                />
                {fieldState.invalid && (
                  <FieldError id="form-contact-subject-error">
                    {fieldState.error?.message}
                  </FieldError>
                )}
              </Field>
            )}
          />

          <Controller
            name="message"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-contact-message">ข้อความ</FieldLabel>
                <Textarea
                  {...field}
                  id="form-contact-message"
                  rows={5}
                  aria-invalid={fieldState.invalid}
                  aria-describedby={
                    fieldState.invalid ? "form-contact-message-error" : undefined
                  }
                  placeholder="พิมพ์ข้อความที่ต้องการติดต่อ..."
                />
                {fieldState.invalid && (
                  <FieldError id="form-contact-message-error">
                    {fieldState.error?.message}
                  </FieldError>
                )}
              </Field>
            )}
          />

          <Controller
            name="website"
            control={form.control}
            render={({ field }) => (
              <Field aria-hidden="true" className="hidden">
                <FieldLabel htmlFor="form-contact-website">
                  Website (อย่ากรอกช่องนี้)
                </FieldLabel>
                <Input
                  {...field}
                  id="form-contact-website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </Field>
            )}
          />
        </FieldGroup>

        <Button
          type="submit"
          form="form-contact"
          className="mt-6 w-full sm:w-auto"
          disabled={pending}
        >
          {pending ? (
            <>
              <Spinner className="size-4" />
              กำลังส่ง...
            </>
          ) : (
            <>
              <Send />
              ส่งข้อความ
            </>
          )}
        </Button>
      </form>
    </div>
  );
}