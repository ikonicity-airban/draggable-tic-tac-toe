import useAuth from "../../lib/hooks/useAuth";
import UserImage from "../UserImage";
import { cn } from "@/lib/utils";

function Versus() {
  const { user, opponent } = useAuth();

  return (
    <div className="flex items-center justify-evenly gap-4 w">
      <div className="flex flex-1 items-center justify-between flex-col gap-2">
        <>
          <UserImage
            photoURL={user?.photoURL ?? ""}
            fallback={user?.displayName ?? "Me"}
            className={cn("border-2 scale-110 border-green-500")}
          />
          <p>{user?.displayName || "You"}</p>
        </>
      </div>
      <div className="">
        <p className="text-xl">vs</p>
      </div>
      <div className="flex flex-1 items-center justify-between flex-col gap-2">
        <UserImage
          photoURL={opponent?.photoURL ?? ""}
          fallback={opponent?.displayName ?? ""}
        />
        <p>{opponent?.displayName || "Oppponent"}</p>
      </div>
    </div>
  );
}

export default Versus;
