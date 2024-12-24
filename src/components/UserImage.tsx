import { cn } from "@/lib/utils";
import { User } from "lucide-react";

export default function UserImage({
  photoURL,
  fallback,
  className,
}: {
  className?: string;
  photoURL: string;
  fallback?: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <div
        className={cn(
          "flex items-center justify-center rounded-full size-10 border overflow-clip",
          className
        )}
      >
        {photoURL ? (
          <img src={photoURL} alt="user" />
        ) : fallback ? (
          <div className="">{fallback}</div>
        ) : (
          <User size={20} />
        )}
      </div>
    </div>
  );
}
