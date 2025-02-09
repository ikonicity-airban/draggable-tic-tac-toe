import { Input } from "@/components/ui/input";
import { ArrowRight, Search } from "lucide-react";
import { useId } from "react";

type Props = {
 
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
export default function SearchBar({  placeholder="Search", onChange }: Props) {
  const id = useId();
  return (
    <div className="space-y-2 w-full">
     
      <div className="relative">
        <Input
          id={id}
          className="peer pe-9 ps-9 text-sm"
          placeholder={placeholder}
          type="search"
          onChange={onChange}
        />
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
          <Search size={16} strokeWidth={2} />
        </div>
        <button
          className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Submit search"
          type="submit"
        >
          <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
