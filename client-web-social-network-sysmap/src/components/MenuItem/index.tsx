import React, { ReactNode } from "react";
import { Slot } from "@radix-ui/react-slot";
import Text from "../Text";

interface MenuItemProps {
  menutitle: string;
  children?: ReactNode;
}

export default function MenuItem(props: MenuItemProps) {
  return (
    <li className="mt-5">
      <div className="flex items-center px-4 rounded-full hover:bg-sky-400 pl-2">
        <Slot className="text-slate-50">{props.children}</Slot>
        <Text className="font-extrabold ml-4">{props.menutitle}</Text>
      </div>
    </li>
  );
}