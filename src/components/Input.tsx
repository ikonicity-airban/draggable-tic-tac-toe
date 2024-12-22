import React from "react";
import { Input as TextInput } from "./ui/input";
import { cn } from "@/lib/utils";
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: string;
  label?: string;
}

const Input: React.FC<InputProps> = ({ icon, id, className, ...props }) => {
  return (
    <div
      className={cn(
        "relative flex h-14 w-full bg-transparent rounded-md border border-input text-base p-0 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
    >
      {icon && <label htmlFor={id} className="absolute top-0 left-0">
        {icon}
      </label>}

      <TextInput
        {...props}
        className={cn(className, "w-full p-0 bg-transparent outline-none")}
      />
    </div>
  );
};

export default Input;
