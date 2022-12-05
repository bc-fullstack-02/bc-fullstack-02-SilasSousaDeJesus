import { Slot } from "@radix-ui/react-slot";
import React, { InputHTMLAttributes, ReactNode } from "react";

interface TextInputRootProps {
  children: ReactNode;
}

interface TextInputIconprops {
  children?: ReactNode;
}
interface TextInputInputprops extends InputHTMLAttributes<HTMLElement> {
  placeholder?: string;
}

function TextInputRoot(props: TextInputRootProps) {
  return (
    <div className="flex items-center gap-3 h-12 py-4 px-3 rounded bg-gray-800 focus-within:ring-2 ring-cyan-300">
      {props.children}
    </div>
  );
}

function TextInputInput(props: TextInputInputprops) {
  return (
    <input
      {...props}
      className="bg-transparent flex-1 text-gray-100 text-xs placeholder: text-gray-400 outline-none"
    />
  );
}

function TextInputIcon(props: TextInputIconprops) {
  return <Slot className="w-6 h-6 text-gray-400">{props.children}</Slot>;
}

export const TextInput = {
  Root: TextInputRoot,
  Input: TextInputInput,
  Icon: TextInputIcon,
};
