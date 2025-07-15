import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Custom PayPal Button Variants (extends ShadCN UI)
 *
 * - variant="paypal-primary": Main CTA, solid blue, white text
 * - variant="paypal-secondary": White bg, blue text, blue border
 * - variant="paypal-ghost": Transparent bg, blue text, subtle border
 * - variant="paypal-hero": Special gradient CTA for hero sections, enhanced shadows and hover effects
 *
 * All variants:
 *   - px-6 py-3 text-base font-semibold rounded-xl
 *   - Equal horizontal and vertical padding
 *   - Icons: ml-2 or mr-2, vertically centered
 */

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold rounded-xl text-base px-6 py-3 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-200",
  {
    variants: {
      variant: {
        default:
          "bg-transparent text-blue-600 border-2 border-blue-600 hover:bg-blue-50 shadow-md hover:shadow-lg",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "bg-transparent border-0 hover:bg-white/10 hover:text-inherit",
        link: "text-primary underline-offset-4 hover:underline",
        // --- Custom PayPal Variants ---
        'paypal-primary': 'bg-blue-600 text-white border-2 border-blue-600 hover:bg-blue-700 hover:border-blue-700 shadow-md hover:shadow-lg',
        'paypal-secondary': 'bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50 hover:text-blue-700 shadow-md hover:shadow-lg',
        'paypal-ghost': 'bg-transparent text-blue-600 border border-blue-300 hover:bg-blue-50 hover:text-blue-700 shadow-sm hover:shadow-md',
        'paypal-hero': 'bg-gradient-to-r from-blue-600 to-blue-700 text-white border-none hover:from-blue-700 hover:to-blue-800 shadow-xl hover:shadow-2xl scale-100 hover:scale-105 transition-all duration-300',
      },
      size: {
        default: "h-12 px-8 py-4 text-lg has-[>svg]:px-8",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-14 rounded-md px-10 py-5 text-xl has-[>svg]:px-8",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
