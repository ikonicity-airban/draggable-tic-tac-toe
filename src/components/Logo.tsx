import { cn } from "@/lib/utils";
import React from "react";

const Logo: React.FC = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex items-center justify-center size-12", className)}>
      <img src="/logo.svg" alt="Logo" />
    </div>
  );
};

export default Logo;
