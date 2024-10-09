import Link from "next/link";
import clsx from "clsx";
import { LucideProps } from "lucide-react";

interface MobileItemProps {
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  label: string;
  active: boolean;
  href: string;
  onClick: () => void;
}

export function MobileItem({
  active,
  href,
  icon: Icon,
  label,
  onClick,
}: MobileItemProps) {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <Link
      onClick={handleClick}
      className={clsx(
        `
      group
      flex
      gap-x-3
      text-sm
      leading-6
      font-semibold
      w-full
      justify-center
      p-4
      text-gray-500
      hover:text-black
      hover:bg-gray-100
      `,
        active && "bg-gray-100 text-black",
      )}
      href={href}
    >
      <Icon className="size-6" />
      <span className="sr-only">{label}</span>
    </Link>
  );
}
