import { User } from "firebase/auth";

export default function UserImage({
  photoURL,
  fallback,
}: {
  photoURL: string;
  fallback: string;
}) {
  return (
    <div className="user-info">
      {photoURL ? (
        <div className="user-image">
          <img src={photoURL} alt="user" />
        </div>
      ) : (
        <div className="user-image">
          <p>{fallback ?? "O"}</p>
        </div>
      )}
    </div>
  );
}
