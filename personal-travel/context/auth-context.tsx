"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { useToast } from "@/components/ui/use-toast";
import { auth, db,storage } from "@/lib/firebase";

// Definisci il tipo User estendendo FirebaseUser per aggiungere l'id
interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  registerUser: (name: string, email: string, password: string) => Promise<{ id: string; name: string; email: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setUser({ id: user.uid, name: user.displayName || "", email: user.email || "" });
      localStorage.setItem("user", JSON.stringify({ id: user.uid, name: user.displayName, email: user.email }));
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error("Login failed", error);
      setIsLoading(false);
      return false;
    }
  };

  const registerUser = async (name: string, email: string, password: string) => {
    if (!name || !email) {
      throw new Error("Nome e email sono obbligatori.");
    }

    setIsLoading(true);
    try {
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const displayName = user.displayName || "Nome sconosciuto";

      await updateProfile(user, { displayName });

      
      await setDoc(doc(db, 'users', user.uid), {
        name: displayName,
        email: user.email,
        createdAt: new Date(),
      });

      setUser({ id: user.uid, name: displayName, email: user.email! });
      localStorage.setItem("user", JSON.stringify({ id: user.uid, name: displayName, email: user.email! }));

      setIsLoading(false);
      return { id: user.uid, name: displayName, email: user.email! };
    } catch (error) {
      console.error('Registration failed:', error);
      setIsLoading(false);
      throw new Error('Registration failed');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast({
      title: "Logout effettuato",
      description: "Hai effettuato il logout con successo",
    });
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, registerUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}