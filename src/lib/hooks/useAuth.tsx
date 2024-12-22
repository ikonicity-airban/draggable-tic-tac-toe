import { useState, useEffect } from "react";
import { GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router";
import { doc, setDoc } from "firebase/firestore";
import createPlayerDto from "../DTOs/player-dto";

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [opponent /* _setOpponent */] = useState<User | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  const login = () => {
    signInWithPopup(auth, new GoogleAuthProvider())
      .then(({ user: userSnap }) => {
        if (!user)
          setDoc(doc(db, "players"), {
            ...createPlayerDto(userSnap),
          });
        navigate("/rooms");
      })
      .catch((error) => {
        console.log("🚀 ~ login ~ error:", error)
        alert("An Error Occured");
      });
  };

  const logout = () => {
    auth.signOut();
    navigate("/login", { replace: true });
  };

  return { login, logout, user, opponent };
};

export default useAuth;
