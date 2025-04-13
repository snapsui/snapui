import { cn } from "@/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import React from "react";

const buttonStyles = cva(
  "flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition duration-300 border ring-offset-background focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "",
        outline: "",
        soft: "",
        ghost: "",
        link: "",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3",
        lg: "h-12 rounded-md px-8",
        icon: "size-8",
      },
      shape: {
        default: "rounded-lg",
        square: "rounded-none",
        pill: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      shape: "default",
    },
  }
);

type ButtonVariant = "default" | "outline" | "soft" | "ghost" | "link";
type ButtonColor = "default" | "error";

const getVariantClasses = (
  variant: ButtonVariant,
  color: ButtonColor
): string => {
  const variants: Record<ButtonVariant, Record<ButtonColor, string>> = {
    default: {
      default:
        "focus:ring-ring bg-primary focus-visible:bg-primary/90 border-primary text-primary-foreground hover:bg-primary/90 hover:border-transparent",
      error:
        "focus:ring-destructive bg-destructive focus-visible:bg-destructive/50 border-destructive text-destructive-foreground hover:bg-destructive/90 hover:border-transparent",
    },
    outline: {
      default:
        "focus:ring-ring bg-transparent text-primary hover:bg-primary/10 hover:text-accent-foreground",
      error:
        "focus:ring-destructive border-destructive/50 bg-transparent text-destructive hover:border-transparent hover:bg-destructive/10 hover:text-destructive",
    },
    soft: {
      default:
        "focus:ring-ring border border-transparent bg-primary/10 text-primary hover:border hover:border-primary hover:bg-transparent focus:border focus:border-primary focus:bg-transparent",
      error:
        "focus:ring-destructive border border-transparent bg-destructive/10 text-destructive hover:border hover:border-destructive hover:bg-transparent focus:border focus:border-destructive focus:bg-transparent",
    },
    ghost: {
      default:
        "focus:ring-ring border-transparent bg-transparent text-primary hover:bg-accent hover:text-accent-foreground focus:border-input focus:bg-transparent",
      error:
        "focus:ring-destructive border-transparent bg-transparent text-destructive hover:bg-destructive/10 focus:border-destructive focus:bg-transparent",
    },
    link: {
      default:
        "focus:ring-ring bg-transparent border-0 hover:bg-transparent text-primary/90 focus:text-primary underline-offset-4 hover:underline focus:ring-0 focus:ring-offset-0",
      error:
        "focus:ring-destructive bg-transparent border-0 hover:bg-transparent text-destructive/90 focus:text-destructive underline-offset-4 hover:underline focus:ring-0 focus:ring-offset-0",
    },
  };

  return variants[variant][color];
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: "default" | "sm" | "lg" | "icon";
  shape?: "default" | "square" | "pill";
  color?: ButtonColor;
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, color, shape, asChild = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    const buttonContent = (
      <Comp
        className={cn(
          buttonStyles({ variant, size, shape }),
          getVariantClasses(variant || "default", color || "default"),
          className
        )}
        ref={ref}
        {...props}
      />
    );

    return buttonContent;
  }
);
