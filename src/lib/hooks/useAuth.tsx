import { useState, useEffect } from "react";
import { GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";
import { auth } from "../firebase";
import { useScreenActions } from "../context/ScreenContext";

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [opponent /* _setOpponent */] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { setScreen } = useScreenActions();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setIsLoggedIn(user !== null);
      if (user) {
        setScreen("game");
      }
    });
    return unsubscribe;
  }, [setScreen]);

  const login = () => {
    signInWithPopup(auth, new GoogleAuthProvider());
    setIsLoggedIn(true);
  };

  const logout = () => {
    auth.signOut();
    setIsLoggedIn(false);
  };

  return { login, logout, user, opponent, isLoggedIn };
};

export default useAuth;
