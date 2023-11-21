import { authToken } from "./../contexts/AuthContext";
import axios, { AxiosError } from "axios";
import { parseCookies } from "nookies";
import { signOut } from "./../contexts/AuthContext";

import { AuthTokenError } from "./errors/AuthTokenError";

export function setupAPIClient(ctx = undefined) {
  let cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: "http://localhost:3333",
    headers: {
      Authorization: `Bearer ${cookies[authToken]}`,
    },
  });

  api.interceptors.response.use(
    (res) => {
      return res;
    },
    (err: AxiosError) => {
      if (err.response?.status === 401) {
        // qualquer erro 401 (não autorizado) deve deslogar o usuário
      } else if (typeof window !== undefined) {
        // chama função para deslogar usuário
        signOut();
      } else {
        return Promise.reject(new AuthTokenError());
      }

      return Promise.reject(err);
    }
  );
  return api;
}
