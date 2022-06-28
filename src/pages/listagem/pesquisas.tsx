import {
  Button,
  ButtonGroup,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Header } from "../../components";
import { SearchTypeEng } from "../../contexts";
import {
  capitalize,
} from "./../../utils/index";
import { GButton } from "./../../components/Button/GButton";
import { SearchContext } from "./../../contexts/searchContext";
import { MdLockOpen, MdLockOutline } from "react-icons/md";

export default function Pesquisas() {
  const router = useRouter();
  const { allSearchs, getAllSearchs, setSearchToEdit, deleteSearch } =
    useContext(SearchContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [idDeleteSearch, setIdDeleteSearch] = useState<number>(0);

  useEffect(() => {
    getAllSearchs();
  }, []);

  function handleClickEditar(data: SearchTypeEng): void {
    setSearchToEdit(data);
    router.push("/cadastro/pesquisa");
  }

  function handleClickApagar(data: SearchTypeEng): void {
    onOpen();
    setIdDeleteSearch(data?.id ? data.id : 0);
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Apagar a pesquisa</ModalHeader>
          <ModalBody pb={6}>
            <Text fontWeight="bold" mb="1rem">
              Tem certeza que deseja apagar a pesquisa?
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="red"
              onClick={(): Promise<void> => (
                onClose(), deleteSearch(idDeleteSearch)
              )}
              mr={3}
            >
              Sim
            </Button>
            <Button colorScheme="blue" onClick={onClose}>
              Não
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Header />
      <Flex>
        <TableContainer>
          <Table size="lg" variant="simple">
            <TableCaption>Pesquisas Cadastradas</TableCaption>
            <Thead>
              <Tr>
                <Td isNumeric>Id</Td>
                <Td>Tema</Td>
                <Td>Conteúdo</Td>
                <Td>Ativa</Td>
                <Td>Ação</Td>
              </Tr>
            </Thead>
            <Tbody>
              {allSearchs?.map((data) => {
                return (
                  <Tr key={data.id} id={`${data.id}`}>
                    <Td isNumeric>{data.id}</Td>
                    <Td>{capitalize(data.searchTheme)}</Td>
                    <Td>{data.body}</Td>
                    <Td>
                      {data.status ? <MdLockOpen /> : <MdLockOutline />}
                    </Td>
                    <Td>
                      {
                        <ButtonGroup size="sm" isAttached variant="outline">
                          <GButton
                            colorScheme="yellow"
                            onClick={(): void => {
                              handleClickEditar(data);
                            }}
                          >
                            Editar
                          </GButton>
                          <GButton
                            colorScheme="red"
                            onClick={(): void => {
                              handleClickApagar(data);
                            }}
                          >
                            Apagar
                          </GButton>
                        </ButtonGroup>
                      }
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </>
  );
}
