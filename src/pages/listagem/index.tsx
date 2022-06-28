import {
  Button,
  ButtonGroup,
  Flex,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
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
  const { users, getAllUsers, setClientToEdit } = useContext(ClientContext);
  useEffect(() => {
    getAllUsers();
  }, []);

  function handleClickEditar(data: UserTypeEng): void {
    setClientToEdit(data)
    router.push('/cadastro')
  }
  function handleClickApagar(data: UserTypeEng): void {
    console.log(data)
  }

  return (
    <>
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
                <Td>Perfil</Td>
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
                            colorScheme="yellow"
                            onClick={():void => {
                              handleClickEditar(data);
                            }}
                          >
                            Editar
                          </GButton>
                          <GButton
                            colorScheme="red"
                            onClick={():void => {
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
