import { useState, useEffect } from "react";
import { signInAnonymously, User } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router";
import { FirebaseError } from "firebase/app";

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [opponent /* _setOpponent */] = useState<User | null>(null);
  //loading state
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {  
      setUser(user);
    });
    return unsubscribe;
  }, []);

  const login = () => {
    // signInWithPopup(auth, new GoogleAuthProvider())
    //   .then(({ user: userSnap }) => {
    //     if (!user)
    //       setDoc(doc(db, "players"), {
    //         ...createPlayerDto(userSnap),
    //       });
    //   })
    //   .catch((error) => {
    //     console.log("🚀 ~ login ~ error:", error)
    //     alert("An Error Occured");
    //   });
    setLoading(true);
    signInAnonymously(auth)
      .then(() => {
        // Signed in..
        setUser(auth.currentUser);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        navigate("/rooms");
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
    auth.signOut();
    navigate("/login", { replace: true });
  };

  return { login, logout, user, opponent, loading };
};

export default useAuth;
