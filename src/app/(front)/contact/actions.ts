"use server";

import { Resend } from "resend";
import {
  contactSchema,
  type ContactFieldErrors,
} from "./schema";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  fieldErrors?: ContactFieldErrors;
  message?: string;
};

export async function submitContactMessage(
  formData: FormData
): Promise<ContactFormState> {
  const website = formData.get("website");

  if (typeof website === "string" && website.trim() !== "") {
    return { status: "success" };
  }

  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
    website: website ?? "",
  });

  if (!parsed.success) {
    return {
      status: "error",
      fieldErrors: parsed.error.flatten().fieldErrors,
      message: "กรุณาตรวจสอบข้อมูลที่กรอกให้ถูกต้อง",
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !from || !to) {
    console.error("Contact form: missing RESEND_* environment variables");
    return {
      status: "error",
      message: "เกิดข้อผิดพลาดในการส่งข้อความ กรุณาลองใหม่ภายหลัง",
    };
  }

  const { name, email, subject, message } = parsed.data;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `[ติดต่อเว็บไซต์] ${subject}`,
      text: `ชื่อ: ${name}\nอีเมล: ${email}\nหัวข้อ: ${subject}\n\n${message}`,
    });

    if (error) {
      console.error("Resend send error:", error);
      return {
        status: "error",
        message: "ไม่สามารถส่งข้อความได้ในขณะนี้ กรุณาลองใหม่ภายหลัง",
      };
    }

    return { status: "success" };
  } catch (err) {
    console.error("Resend send exception:", err);
    return {
      status: "error",
      message: "ไม่สามารถส่งข้อความได้ในขณะนี้ กรุณาลองใหม่ภายหลัง",
    };
  }
}