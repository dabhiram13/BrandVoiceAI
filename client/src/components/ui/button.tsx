import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow-sm hover:shadow-md active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-[#FF7A00] to-[#FF5412] text-white hover:opacity-90 hover:translate-y-[-2px]",
        destructive:
          "bg-gradient-to-r from-destructive to-destructive/80 text-destructive-foreground hover:bg-destructive/90 hover:translate-y-[-2px]",
        outline:
          "border-2 border-[#FF7A00]/20 bg-white text-[#FF7A00] hover:bg-[#FF7A00]/5 hover:border-[#FF7A00] hover:translate-y-[-2px]",
        secondary:
          "bg-white text-[#111827] hover:bg-[#f9f9f9] hover:translate-y-[-2px] border border-gray-100",
        ghost: "hover:bg-[#FF7A00]/5 hover:text-[#FF7A00]",
        link: "text-[#FF7A00] underline-offset-4 hover:underline",
        nike: "bg-gradient-to-r from-[hsl(var(--nike))] to-[hsl(var(--nike))/80] text-white hover:translate-y-[-2px]",
        apple: "bg-gradient-to-r from-[hsl(var(--apple))] to-[hsl(var(--apple))/80] text-white hover:translate-y-[-2px]",
        wendys: "bg-gradient-to-r from-[hsl(var(--wendys))] to-[hsl(var(--wendys))/80] text-white hover:translate-y-[-2px]",
        southwest: "bg-gradient-to-r from-[hsl(var(--southwest))] to-[hsl(var(--southwest))/80] text-white hover:translate-y-[-2px]",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4",
        lg: "h-14 px-8 text-base font-semibold",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
