import { useState, useEffect } from "react";
import { signInAnonymously, User } from "firebase/auth";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router";
import { FirebaseError } from "firebase/app";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import createPlayerDto from "../DTOs/player-dto";
import { UI_LINKS } from "../links";

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [opponent /* _setOpponent */] = useState<User | null>(null);
  //loading state
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // logout();
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  const login = () => {
    setLoading(true);
    // signInWithPopup(auth, new GoogleAuthProvider())
    //   .then(({ user: userSnap }) => {
    //     setDoc(doc(db, "players", user?.uid ?? ""), {
    //       ...createPlayerDto(userSnap),
    //     });
    //     setLoading(false);
    //     navigate(UI_LINKS.rooms);
    //   })
    //   .catch((error) => {
    //     console.log("🚀 ~ login ~ error:", error.message);
    //     alert("An Error Occured (" + error.code + ")");
    //   });
    signInAnonymously(auth)
      .then(() => {
        if (auth.currentUser) {
          // Signed in..
          setUser(auth.currentUser);
          setDoc(doc(db, "players", auth.currentUser?.uid ?? ""), {
            ...createPlayerDto(auth.currentUser),
          });

          setTimeout(() => {
            setLoading(false);
          }, 1000);
          navigate("/rooms");
        }
      })
      .catch((error: FirebaseError) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
        console.log("🚀 ~ login ~ errorMessage:", errorMessage);
        console.log("🚀 ~ login ~ errorCode:", errorCode);
      });
  };

  const logout = () => {
    if (user) {
      user.delete();
      updateDoc(doc(db, "players", user?.uid ?? ""), {
        isActive: false,
      });
    }
    auth.signOut();
    navigate(UI_LINKS.login, { replace: true });
  };

  return { login, logout, user, opponent, loading };
};

export default useAuth;
