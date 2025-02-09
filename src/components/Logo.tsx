import { cn } from "@/lib/utils";
import React from "react";

const Logo: React.FC<{ className?: string }> = ({
  className,
}: {
  className?: string;
}) => {
  return (
    <div className={cn("flex items-center gap-2 w-fit cursor-pointer", className)}>
      <img src="/logo.svg" alt="Logo" className=" size-12" />
      <div className="leading-none">
        <p className="text-lg pixel leading-none">Code</p>
        <p className="text-lg pixel leading-none text-red-300">Oven</p>
      </div>
    </div>
  );
};

export default Logo;
