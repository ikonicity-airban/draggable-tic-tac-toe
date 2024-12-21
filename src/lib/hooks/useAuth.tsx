import { useState, useEffect } from "react";
import { GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";
import { auth } from "../firebase";

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [opponent, _setOpponent] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setIsLoggedIn(user !== null);
    });
    return unsubscribe;
  }, []);

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
