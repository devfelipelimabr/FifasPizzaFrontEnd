import {
    GetServerSideProps,
    GetServerSidePropsContext,
    GetServerSidePropsResult,
  } from "next";
  import { parseCookies, destroyCookie } from "nookies";
  import { AuthTokenError } from "@/services/errors/AuthTokenError";
  
  type PageProps = { [key: string]: any };
  
  // Função para páginas que só podem ser acessadas por usuários logados
  export function canSSRAuth<P extends PageProps>(
    fn: GetServerSideProps<P>
  ) {
    return async (
      ctx: GetServerSidePropsContext
    ): Promise<GetServerSidePropsResult<P>> => {
      const cookies = parseCookies(ctx);
  
      // Se o usuário não estiver logado, redireciona para o login
      if (!cookies["@fifaspizzauth.token"]) {
        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        };
      }
  
      // Se o usuário estiver logado, permite o acesso normalmente ou trata o erro de token inválido
      try {
        return await fn(ctx);
      } catch (err) {
        if (err instanceof AuthTokenError) {
          // Tratar o erro de token inválido aqui
          destroyCookie(ctx, "@fifaspizzauth.token"); // Destrói o cookie de autenticação
          return {
            redirect: {
              destination: "/",
              permanent: false,
            },
          };
        }
        throw err; // Lança outros erros não tratados
      }
    };
  }
  