import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { NavMenu } from "@/components/nav-menu";
import { NavigationSheet } from "@/components/navigation-sheet";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import CountCartItem from "@/app/(front)/components/CountCartItem";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import LogoutButton from "./logout-button";

const Navbar = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/90 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-(--breakpoint-xl) items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />

        {/* Desktop Menu */}
        <NavMenu className="hidden lg:block" />

        <div className="flex items-center gap-3">
          <Link href="/cart" aria-label="ตะกร้าสินค้า">
            <span className="relative inline-flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-medium transition hover:bg-[#C026D3] active:bg-[#A21CAF]">
              <ShoppingBag className="size-5" />
              <span className="absolute -right-1 -top-1 flex size-5 min-w-5 items-center justify-center rounded-full bg-tertiary px-1 font-bold text-tertiary-foreground text-xs shadow-sm">
                <CountCartItem />
              </span>
            </span>
          </Link>

          {
            !session && (
              <>
                <Button
                  asChild
                  variant="outline"
                  className="hidden rounded-full border-primary/50 text-primary hover:bg-accent hover:text-primary sm:inline-flex"
                >
                  <Link href="/login">เข้าสู่ระบบ</Link>
                </Button>
                <Button asChild className="hidden rounded-full sm:inline-flex">
                  <Link href="/signup">สมัครสมาชิก</Link>
                </Button>
              </>
            )
          }

          {
            session && (
              <>
                <div className="hidden items-center text-sm font-semibold text-muted-foreground sm:flex">
                  สวัสดี, {session.user.name}
                </div>
                <LogoutButton />
              </>
            )
          }

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <NavigationSheet />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;