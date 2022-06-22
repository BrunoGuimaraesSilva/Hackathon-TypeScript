import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { ClientProvider } from "../contexts";

function MyApp({ Component, pageProps }: AppProps) {
  const theme = extendTheme({
    config: {
      useSystemColorMode: true,
      initialColorMode: "dark",
    },
  });
  return (
    <ChakraProvider theme={theme}>
      <ClientProvider>
        <Component {...pageProps} />
      </ClientProvider>
    </ChakraProvider>
  );
}

export default MyApp;
