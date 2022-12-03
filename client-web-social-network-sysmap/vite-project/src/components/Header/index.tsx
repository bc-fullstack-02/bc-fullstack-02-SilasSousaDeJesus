import { Slot } from "@radix-ui/react-slot";
import React, { ReactNode } from "react";
import { clsx } from 'clsx';

export interface HeadingProps {
  size?: "sm" | "md" | "lg";
  children?: ReactNode;
  asChild?: boolean;
  className?: string;
}

function Heading({ size = "md", children, asChild, className }: HeadingProps) {
  const Comp = asChild ? Slot : "h2";
  return (<Comp>{children}</Comp>);
}

export default Heading;
