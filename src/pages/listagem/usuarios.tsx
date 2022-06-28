import {
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
  Box,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Header } from "../../components";
import { ClientContext, UserTypeEng } from "../../contexts";
import {
  capitalize,
  formatCep,
  formatCpf,
  formatPhone,
} from "./../../utils/index";
import { GButton } from "./../../components/Button/GButton";

export default function Listagem() {
  const router = useRouter();
  const { users, getAllUsers, setClientToEdit, deleteUser } =
    useContext(ClientContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    isOpen: isOpenVisualizar,
    onOpen: onOpenVisualizar,
    onClose: onCloseVisualizar,
  } = useDisclosure();

  const [idDeleteUser, setIdDeleteUser] = useState<number>(0);
  const [userData, setUserData] = useState<UserTypeEng>();

  useEffect(() => {
    getAllUsers();
  }, []);

  function handleClickEditar(data: UserTypeEng): void {
    setClientToEdit(data);
    router.push("/cadastro/pesquisa");
  }

  function handleClickApagar(data: UserTypeEng): void {
    onOpen();
    setIdDeleteUser(data?.id ? data.id : 0);
  }

  function handleClickVisualizar(data: UserTypeEng): void {
    onOpenVisualizar();
    setUserData(data);
  }

  return (
    <>
      <Modal key={1} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Apagar o usuário</ModalHeader>
          <ModalBody pb={6}>
            <Text fontWeight="bold" mb="1rem">
              Tem certeza que deseja apagar o usuário?
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="red"
              onClick={(): Promise<void> => (
                onClose(), deleteUser(idDeleteUser)
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
        <ModalContent>
          <ModalHeader>Usuário</ModalHeader>
          <ModalBody pb={6}>
            <Box m={2}>
              <Text>
                Nome: <Tag>{capitalize(userData?.name)}</Tag>
              </Text>
            </Box>
            <Divider />
            <Box m={2}>
              <Text>
                E-mail: <Tag>{userData?.email}</Tag>
              </Text>
            </Box>
            <Divider />
            <Box m={2}>
              <Text>
                Telefone: <Tag>{formatPhone(userData?.phone)}</Tag>
              </Text>
            </Box>
            <Divider />
            <Box m={2}>
              <Text>
                CPF: <Tag>{formatCpf(userData?.cpf)}</Tag>
              </Text>
            </Box>
            <Divider />
            <Box m={2}>
              <Text>
                CEP: <Tag>{formatCep(userData?.cep)}</Tag>
              </Text>
            </Box>
            <Divider />
            <Box m={2}>
              <Text>
                Cidade: <Tag>{capitalize(userData?.city)}</Tag>
              </Text>
            </Box>
            <Divider />
            <Box m={2}>
              <Text>
                Estado: <Tag>{capitalize(userData?.state)}</Tag>
              </Text>
            </Box>
            <Divider />
            <Box m={2}>
              <Text>
                Endereço: <Tag>{capitalize(userData?.address)}</Tag>
              </Text>
            </Box>
            <Divider />
            <Box m={2}>
              <Text>
                Bairro: <Tag>{capitalize(userData?.neighborhood)}</Tag>
              </Text>
            </Box>
            <Divider />
            <Box m={2}>
              <Text>
                Número: <Tag>{userData?.houseNumber}</Tag>
              </Text>
            </Box>
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
            <TableCaption>Clientes Cadastrados</TableCaption>
            <Thead>
              <Tr>
                <Td isNumeric>Id</Td>
                <Td>Nome</Td>
                <Td>E-Mail</Td>
                <Td>Telefone</Td>
                <Td>CPF</Td>
                <Td>CEP</Td>
                <Td>Cidade</Td>
                <Td>Estado</Td>
                <Td>Ações</Td>
              </Tr>
            </Thead>
            <Tbody>
              {users?.map((data) => {
                return (
                  <Tr key={data.id} id={`${data.id}`}>
                    <Td isNumeric>{data.id}</Td>
                    <Td>{capitalize(data.name)}</Td>
                    <Td>{data.email}</Td>
                    <Td>{formatPhone(data.phone)}</Td>
                    <Td>{formatCpf(data.cpf)}</Td>
                    <Td>{formatCep(data.cep)}</Td>
                    <Td>{capitalize(data.city)}</Td>
                    <Td>{capitalize(data.state)}</Td>
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
