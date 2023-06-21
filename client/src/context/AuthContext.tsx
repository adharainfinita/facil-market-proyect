import React from "react";
import { createContext, useContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { auth } from "../firebase/firebase.config";
import { FirebaseAuth } from "@firebase/auth-types";

interface AuthContextType {
  auth: FirebaseAuth | null;
  register: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

export const authContext = createContext<AuthContextType | null>(null);

export const useAuth = (): AuthContextType => {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("Error creating auth context");
  }
  return context;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const register = async (email: string, password: string) => {
    const response = await createUserWithEmailAndPassword(auth, email, password);
    console.log(response);
  };

  const login = async (email: string, password: string) => {
    const response = await signInWithEmailAndPassword(auth, email, password);
    console.log(response);
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const logout = async () => {
    await signOut(auth);
  }

  return (
    <authContext.Provider
      value={{
        auth,
        register,
        login,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </authContext.Provider>
  );
}



/* import { auth } from "../firebase/firebase.config";
import { createContext, useContext } from "react";

export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if(!context){
    console.log("error creating auth context");
  }
  return context;
};

export function AuthProvider({children}){
  
  return 
  <authContext.Provider>
    {children}
  </authContext.Provider>
}
 */
