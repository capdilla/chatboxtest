import * as React from "react";

import { cn } from "@/lib/utils";

const inputClasses = [
  "flex",
  "w-full",
  "rounded-md",
  "border",
  "bg-background",
  "px-4",
  "py-3",
  "text-lg",
  "ring-offset-background",
  "placeholder:text-muted-foreground",
  "transition-colors",
  "file:border-0",
  "file:bg-transparent",
  "file:text-sm",
  "file:font-medium",
  "file:text-foreground",
  "focus-visible:outline-none",
  "focus-visible:ring-2",
  "focus-visible:ring-ring",
  "focus-visible:ring-offset-2",
  "focus:border-blue-500",
  "dark:focus:border-blue-400",
  "disabled:cursor-not-allowed",
  "disabled:opacity-50",
  "md:text-sm",
  "h-10",
];

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputClasses, className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
