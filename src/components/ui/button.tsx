import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center font-semibold transition-all outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/30 disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-medium hover:bg-[#C026D3] active:bg-[#A21CAF]",
        outline: "bg-transparent text-primary border-2 border-primary hover:bg-accent",
        secondary: "bg-secondary text-secondary-foreground shadow-medium hover:bg-secondary/80",
        ghost: "bg-transparent text-muted-foreground hover:bg-muted",
        destructive: "bg-destructive text-destructive-foreground shadow-medium hover:bg-[#DC2626] active:bg-[#B91C1C]",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8.5 gap-1.5 px-4.5 text-sm",       // 34px height, 12px 18px padding
        md: "h-10.5 gap-2 px-7 text-base",        // 42px height, 12px 28px padding
        lg: "h-12.5 gap-2.5 px-9 text-lg",        // 50px height, 14px 36px padding
        icon: "size-10.5",                        // 42px square
        "icon-sm": "h-8.5 w-8.5",                 // 34px square
        "icon-lg": "h-12.5 w-12.5",               // 50px square
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "md",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }), "rounded-full")}
      {...props}
    />
  )
}

export { Button, buttonVariants }