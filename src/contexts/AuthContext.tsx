import { type } from "os";
import { createContext, ReactNode, useState } from "react";
import { destroyCookie } from "nookies";
import Router from "next/router";

type AuthContextData = {
  user: UserProps | undefined;
  isAuth: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => void;
};

type UserProps = {
  id: string;
  name: string;
  email: string;
};

type SignInProps = {
  email: string;
  password: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContex = createContext({} as AuthContextData);

export const authToken = "@fifaspizzauth.token";

export function signOut() {
  try {
    destroyCookie(undefined, authToken);
    Router.push("/");
  } catch (error) {
    console.log(`${error} - Erro ao deslogar.`);
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>();
  const isAuth = !!user;

  async function signIn({ email, password }: SignInProps) {
    alert(`Dados logados: ${email}, ${password}`);
  }

  return (
    <AuthContex.Provider value={{ user, isAuth, signIn, signOut }}>
      {children}
    </AuthContex.Provider>
  );
}
