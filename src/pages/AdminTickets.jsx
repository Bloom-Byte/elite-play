import 'react-loading-skeleton/dist/skeleton.css';
import { useEffect, useState } from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  InputLeftAddon,
  InputGroup,
  Input,
  useToast,
  Circle,
} from '@chakra-ui/react'
import { RiSearchLine } from "react-icons/ri";
import instance from '../utils/api';
import { useNavigate } from 'react-router-dom';

const Tickets = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState('');

  const toast = useToast();

  useEffect(() => {
    const fetchTickets = async () => {
      const response = await instance.get('/support');
      if (response.status !== 200) {
        toast({
          title: 'Error fetching tickets',
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
        return;
      }
      setTickets(response.data);
    };

    fetchTickets();
  }, [toast]);

  const statusColorMap = {
    open: 'blue.500',
    in_progress: 'yellow.500',
    resolved: 'green.500',
  }

  return (
    <div style={{
      padding: '20px',
    }}>
      <Box mb={5}>
        <InputGroup bg={'#0B1210'}>
          <InputLeftAddon h={'50px'} bg={'#0B1210'} borderColor={'#0B1210'}>
            <RiSearchLine />
          </InputLeftAddon>
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            h={'50px'} type='text'
            placeholder='Search for tickets'
            borderColor={'#0B1210 !important'} />
        </InputGroup>
      </Box>
      <Box bg={'#0B1210'} p={4} rounded='lg'>
        {
          tickets.length === 0 ? (
            <div>
              No tickets available
            </div>
          ) : (
            <TableContainer>
              <Table variant='simple'>
                <Thead>
                  <Tr>
                    <Th>Ticket#</Th>
                    <Th>User ID</Th>
                    <Th>Issue Description</Th>
                    <Th>Status</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {
                    tickets.map(ticket => (
                      <Tr
                      cursor={'pointer'}
                      key={ticket._id} onClick={() => {
                        navigate(`/admin/tickets/${ticket._id}`);
                      }}>
                        <Td>{ticket._id}</Td>
                        <Td>{ticket.userId}</Td>
                        <Td>{ticket.details}</Td>
                        <Td>
                          <Circle size='10px' bg={statusColorMap[ticket.status]} />
                        </Td>
                      </Tr>
                    ))
                  }
                </Tbody>
              </Table>
            </TableContainer>
          )
        }

      </Box>
    </div>
  );
};

export default Tickets;
