/* eslint-disable react/prop-types */
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-blue-600 text-white shadow hover:bg-blue-700 active:scale-[0.98]",
        destructive:
          "bg-red-500 text-white shadow hover:bg-red-600 active:scale-[0.98]",
        outline:
          "border border-slate-300 bg-white text-slate-700 shadow-sm hover:bg-slate-50 hover:border-blue-400 active:scale-[0.98]",
        secondary:
          "bg-slate-100 text-slate-700 shadow-sm hover:bg-slate-200 active:scale-[0.98]",
        ghost:
          "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
        link:
          "text-blue-600 underline-offset-4 hover:underline",
        blue:
          "bg-blue-600 text-white shadow hover:bg-blue-700 active:scale-[0.98]",
        success:
          "bg-emerald-500 text-white shadow hover:bg-emerald-600 active:scale-[0.98]",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-11 rounded-lg px-8 text-base",
        icon: "h-10 w-10",
        xl: "h-14 sm:h-16 rounded-xl px-12 text-lg sm:text-xl font-bold",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    if (asChild && props.children) {
      const child = React.Children.only(props.children);
      return React.cloneElement(child, {
        className: cn(buttonVariants({ variant, size, className }), child.props.className),
        ref,
      });
    }
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
