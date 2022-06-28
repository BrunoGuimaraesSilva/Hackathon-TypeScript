import {
  Box,
  Button,
  ButtonGroup,
  Divider,
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
  Tag,
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
import { capitalize, formatCep, formatCpf } from "./../../utils/index";
import { GButton } from "./../../components/Button/GButton";
import { SearchContext } from "./../../contexts/searchContext";
import { MdLockOpen, MdLockOutline } from "react-icons/md";

export default function Pesquisas() {
  const router = useRouter();
  const { allSearchs, getAllSearchs, setSearchToEdit, deleteSearch, getSearchResponse, reponseSearchs } =
    useContext(SearchContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenVisualizar,
    onOpen: onOpenVisualizar,
    onClose: onCloseVisualizar,
  } = useDisclosure();
  const [idDeleteSearch, setIdDeleteSearch] = useState<number>(0);
  const [searchData, setSearchData] = useState<SearchTypeEng>();

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

  function handleClickVisualizar(data: SearchTypeEng): void {
    getSearchResponse(data.id ? data.id : 0 )
    onOpenVisualizar();
    setSearchData(data);
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

      <Modal key={2} isOpen={isOpenVisualizar} onClose={onCloseVisualizar}>
        <ModalOverlay />
        <ModalContent m={15}>
          <ModalHeader>Usuário</ModalHeader>
          <ModalBody pb={6}>
            <Box m={2}>
              <Text>
                Tema: <Tag>{capitalize(searchData?.searchTheme)}</Tag>
              </Text>
            </Box>
            <Box m={2}>
              <Text>
                Nome: <Tag>{capitalize(searchData?.name)}</Tag>
              </Text>
            </Box>
            <Box m={2}>
              <Text>
                E-mail: <Tag>{searchData?.email}</Tag>
              </Text>
            </Box>
            <Box m={2}>
              <Text>
                CPF: <Tag>{formatCpf(searchData?.cpf)}</Tag>
              </Text>
            </Box>
            <Box m={2}>
              <Text>
                Conteúdo: <Tag>{searchData?.body}</Tag>
              </Text>
            </Box>
            <Box m={2}>
              <Text>
                Status: <Tag>{searchData?.status ? "Ativo" : "Inativo"}</Tag>
              </Text>
            </Box>
            <TableContainer>
              <Table size="sm">
                <Thead>
                  <Tr>
                    <Th isNumeric>Id</Th>
                    <Th>Resposta</Th>
                    <Th>Nome</Th>
                  </Tr>
                </Thead>
                <Tbody>
                {reponseSearchs?.map((data) => {
                return (
                  <Tr key={data.id} id={`${data.id}`}>
                    <Td isNumeric>{data.id}</Td>
                    <Td>{capitalize(data.resposta)}</Td>
                    <Td>{capitalize(data.nome)}</Td>
                  </Tr>
                );
              })}
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onCloseVisualizar}>
              Fechar
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
                <Td>Nome</Td>
                <Td>E-mail</Td>
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
                    <Td>{capitalize(data.name)}</Td>
                    <Td>{data.email}</Td>
                    <Td>{data.body}</Td>
                    <Td>{data.status ? <MdLockOpen /> : <MdLockOutline />}</Td>
                    <Td>
                      {
                        <ButtonGroup size="sm" isAttached variant="outline">
                          <GButton
                            colorScheme="blue"
                            onClick={(): void => {
                              handleClickVisualizar(data);
                            }}
                          >
                            Visualizar
                          </GButton>
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
