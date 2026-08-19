import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center gap-1 font-semibold transition-all focus-visible:ring-2 focus-visible:ring-ring/50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline: "border-[1.5px] border-input bg-transparent text-foreground hover:bg-muted",
        ghost: "bg-transparent text-muted-foreground hover:bg-muted",
        destructive: "bg-destructive/10 text-destructive hover:bg-destructive/20",
        success: "bg-success/10 text-success-foreground",
        warning: "bg-warning/10 text-warning-foreground",
        error: "bg-destructive/10 text-destructive",
        info: "bg-info/10 text-info-foreground",
        filter: "h-8.5 px-3.5 border-[1.5px] border-input bg-background text-foreground rounded-full hover:bg-muted data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground data-[selected=true]:border-primary",
      },
      size: {
        sm: "h-6 px-2 text-xs",
        md: "h-8.5 px-3.5 text-sm",
        lg: "h-10 px-4 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

function Badge({
  className,
  variant = "default",
  size = "md",
  asChild = false,
  selected,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    asChild?: boolean
    selected?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      data-size={size}
      data-selected={selected}
      className={cn(badgeVariants({ variant, size, className }), variant === "filter" && "rounded-full")}
      {...props}
    />
  )
}

export { Badge, badgeVariants }