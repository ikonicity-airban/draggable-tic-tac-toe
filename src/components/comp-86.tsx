import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideProps } from "lucide-react";
import { Link } from "react-router";

type Props = {
  className?: string;
  to: string;
  children?: React.ReactNode;
  iconClassName?: string;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
} & React.ComponentPropsWithoutRef<"a">;

export default function LinkButton({
  className,
  to,
  children,
  Icon,
  iconClassName,
}: Props) {
  return (
    <Link
      to={to}
      className={buttonVariants({
        variant: "outline",
        className: cn(
          "group font-light backdrop-filter backdrop-blur-sm hover:bg-accent/10 bg-transparent hover:text-inherit",
          className
        ),
        size: "sm",
      })}
    >
      {children}
      <Icon
        className={cn(
          "-me-1 ms-2 opacity-60 transition-transform group-hover:translate-x-0.5",
          iconClassName
        )}
        size={20}
        strokeWidth={2}
        aria-hidden="true"
      />
    </Link>
  );
}
