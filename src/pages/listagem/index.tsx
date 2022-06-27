import {
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
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { Header } from "../../components";
import { ClientContext } from "../../contexts";
import { capitalize,formatCep,formatCpf,formatPhone  } from './../../utils/index';

export default function Listagem() {
  const router = useRouter();
  const { users, getAllUsers } = useContext(ClientContext);
  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <>
      <Header />
      <Flex>
        <TableContainer>
          <Table size='lg' variant="simple">
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
