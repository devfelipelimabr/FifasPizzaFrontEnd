import { type } from "os";
import { createContext, ReactNode, useState } from "react";

import { api } from "@/services/apiClient";

import { destroyCookie, setCookie, parseCookies } from "nookies";
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

export function signOut() {
  try {
    destroyCookie(undefined, "@fifaspizzauth.token");
    Router.push("/");
  } catch (error) {
    console.log(`${error} - Erro ao deslogar.`);
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>();
  const isAuth = !!user;

  async function signIn({ email, password }: SignInProps) {
    try {
      const response = await api.post("session", {
        email,
        password,
      });
      const { id, name, token } = response.data;

      setCookie(undefined, "@fifaspizzauth.token", token, {
        maxAge: 60 * 60 * 24 * 30, // Expira em 1 mês
        path: "/", //Rotas que terão acesso ao cookie
      });

      setUser({
        id,
        name,
        email,
      });

      // Passar o token para as próximas req
      api.defaults.headers['Authorization'] = `Bearer ${token}`

      // Redirecionar para dashboard
      Router.push('/dashboard')
    } catch (err) {
      console.log(`ERRO AO ACESSAR ${err}`);
    }
  }

  return (
    <AuthContex.Provider value={{ user, isAuth, signIn, signOut }}>
      {children}
    </AuthContex.Provider>
  );
}
