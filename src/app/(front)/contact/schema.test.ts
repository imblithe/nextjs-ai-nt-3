import { describe, it, expect } from "vitest";
import { contactSchema } from "./schema";

describe("contactSchema", () => {
  it("accepts valid input", () => {
    const result = contactSchema.safeParse({
      name: "สมชาย ใจดี",
      email: "somchai@example.com",
      subject: "สอบถามสินค้า",
      message: "อยากทราบราคาสินค้ารุ่นใหม่ครับ",
      website: "",
    });

    expect(result.success).toBe(true);
  });

  it("rejects name shorter than 2 characters", () => {
    const result = contactSchema.safeParse({
      name: "ก",
      email: "somchai@example.com",
      subject: "สอบถามสินค้า",
      message: "อยากทราบราคาสินค้ารุ่นใหม่ครับ",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.name).toBeDefined();
    }
  });

  it("rejects invalid email", () => {
    const result = contactSchema.safeParse({
      name: "สมชาย ใจดี",
      email: "not-an-email",
      subject: "สอบถามสินค้า",
      message: "อยากทราบราคาสินค้ารุ่นใหม่ครับ",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.email).toBeDefined();
    }
  });

  it("rejects subject shorter than 3 characters", () => {
    const result = contactSchema.safeParse({
      name: "สมชาย ใจดี",
      email: "somchai@example.com",
      subject: "โ",
      message: "อยากทราบราคาสินค้ารุ่นใหม่ครับ",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.subject).toBeDefined();
    }
  });

  it("rejects message shorter than 10 characters", () => {
    const result = contactSchema.safeParse({
      name: "สมชาย ใจดี",
      email: "somchai@example.com",
      subject: "สอบถามสินค้า",
      message: "สั้น",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.message).toBeDefined();
    }
  });
});