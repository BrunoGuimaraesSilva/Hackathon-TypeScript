import { Box, Flex, SimpleGrid, Text, Heading } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { Footer, Header } from "../../components";

export default function Dashboard() {
  return (
    <>
      <Header />
      <Flex direction="column" h="100vh">
        <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
          <Heading>Pesquisas de Satisfação</Heading>
        </Flex>
      </Flex>
      <Footer />
    </>
  );
}
