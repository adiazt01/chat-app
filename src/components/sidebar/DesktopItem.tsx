import { LucideProps } from "lucide-react";
import React from "react";
import clsx from "clsx";
import Link from "next/link";

interface DesktopItemProps {
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  label: string;
  active: boolean;
  href: string;
  onClick: () => void;
}

export function DesktopItem({
  active,
  href,
  icon: Icon,
  label,
  onClick,
}: DesktopItemProps) {
  function handleClick() {
    if (onClick) {
      return onClick();
    }
  }

  return (
    <li onClick={handleClick}>
      <Link
        href={href}
        className={clsx(
          `
          group
          flex
          gap-x-3
         rounded-md
        p-3
       text-sm
       leading-6
       font-semibold
       text-gray-500
       hover:text-black
       hover:bg-gray-100
        `,
          active && `text-black bg-gray-100`,
        )}
      >
        <Icon className="size-6 shrink-0" />
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  );
}
