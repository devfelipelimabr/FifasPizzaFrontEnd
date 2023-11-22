import {
    GetServerSideProps,
    GetServerSidePropsContext,
    GetServerSidePropsResult,
  } from "next";
  import { parseCookies } from "nookies";
  
  type PageProps = { [key: string]: any };
  
  // Função para páginas que só podem ser acessadas por usuários não logados
  export function canSSRGuest<P extends PageProps>(
    fn: GetServerSideProps<P>
  ) {
    return async (
      ctx: GetServerSidePropsContext
    ): Promise<GetServerSidePropsResult<P>> => {
      const cookies = parseCookies(ctx);
  
      // Se o usuário estiver logado, redireciona para o dashboard
      if (cookies["@fifaspizzauth.token"]) {
        return {
          redirect: {
            destination: "/dashboard",
            permanent: false,
          },
        };
      }
  
      // Se o usuário não estiver logado, permite o acesso normalmente
      return fn(ctx);
    };
  }
  