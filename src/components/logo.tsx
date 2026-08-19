import Link from "next/link";
import { Zap } from "lucide-react";

export const Logo = () => (
  <Link href="/" className="group flex items-center gap-2" aria-label="ShopVibe">
    <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-medium transition-transform group-hover:-rotate-6">
      <Zap className="size-5 fill-current" />
    </span>
    <span className="font-heading text-2xl font-bold tracking-[-0.02em]">
      Shop<span className="text-primary">Vibe</span>
    </span>
  </Link>
);