import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { ClientProvider, LoadingProvider } from "../contexts";
import Loading from "./loading";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { destroyCookie, parseCookies } from "nookies";
import jwt_decode from "jwt-decode";
import { TokenType } from "../utils/client";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const cookies = parseCookies();
  const token = cookies.token;
  const theme = extendTheme({
    config: {
      useSystemColorMode: true,
      initialColorMode: "dark",
    },
  });

  function validatedToken(token: string): boolean {
    if (token) {
      const decodedToken: TokenType = jwt_decode(token);
      const currentDate = new Date();

      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  useEffect(() => {
    if (router.pathname == "/login") {
      if (validatedToken(token)) {
        setAuthorized(true);
        router.push("/dashboard");
      } else {
        destroyCookie(undefined, "token");
        setAuthorized(true);
      }
    } else {
      setAuthorized(false);
      if (!validatedToken(token)) {
        router.push("/login");
        destroyCookie(undefined, "token");
      } else {
        setAuthorized(true);
      }
    }
  }, [router]);

  return (
    <ChakraProvider theme={theme}>
      <LoadingProvider>
        <ClientProvider>
          <Loading />
          {authorized && <Component {...pageProps} />}
        </ClientProvider>
      </LoadingProvider>
    </ChakraProvider>
  );
}

export default MyApp;
