import 'react-loading-skeleton/dist/skeleton.css';
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  Box,
  InputGroup,
  IconButton,
  Text,
  Stack,
  HStack,
  Button,
  InputRightAddon,
  useToast,
  Textarea,
} from '@chakra-ui/react'
import { MdArrowBackIosNew } from "react-icons/md";
import { useNavigate, useParams } from 'react-router-dom';
import { IoSend } from "react-icons/io5";
import instance from '../utils/api';
import moment from 'moment';

const TicketDetail = () => {
  let params = useParams();
  let navigate = useNavigate();
  let ticketId = params.ticketId;
  const [currentTicket, setCurrentTicket] = useState(null);
  const [details, setDetails] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  const chatContentsRef = useRef(null);

  const scrollToBottom = (time = 100) => {
    if (!chatContentsRef.current) return;
    setTimeout(() => {
      chatContentsRef.current.scrollTop = chatContentsRef.current.scrollHeight;
    }, time);
  };

  const fetchTicket = useCallback(async () => {
    const url = `/support/${ticketId}`;
    const response = await instance.get(url);

    if (response.status !== 200) {
      toast({
        title: 'Error fetching ticket details',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    setCurrentTicket(response.data);
  }, [ticketId, toast]);

  useEffect(() => {
    fetchTicket();
    scrollToBottom();
  }, []);

  const pollInterval = 15000;

  useEffect(() => {
    // Fetch chat contents every X seconds
    const interval = setInterval(() => {
      fetchTicket();
    }, pollInterval);

    return () => clearInterval(interval);
  }, [currentTicket, fetchTicket]);

  const respondMessage = useCallback(async () => {
    if (!details) {
      toast({
        title: 'Message details are required',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const url = `/support/${currentTicket._id}/respond`;
    const data = {
      message: details,
    }
    setIsLoading(true);
    const response = await instance.patch(url, data);
    setIsLoading(false);
    if (response.status !== 200) {
      toast({
        title: 'Error sending message, try again later',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    fetchTicket();
    setDetails('');
    scrollToBottom();
  }, [fetchTicket, toast, currentTicket, details]);

  return (
    <div style={{
      padding: '20px',
      height: '100%',
    }}>
      {
        currentTicket === null ? (<>
          <Text>Loading ticket</Text>
        </>) : (<>
          <Box p={4} bg={'#0B1210'} mb={'2rem'}>
            <HStack justify={'space-between'} mb={5}>
              <IconButton color={'#fff'} onClick={() => {
                navigate('/admin');
              }} bg={'#070C0A !important'} aria-label="Back" icon={<MdArrowBackIosNew />} />
              <Button colorScheme='red'>Close Ticket</Button>
            </HStack>

            <Stack gap={5} color={'#fff'}>
              <Text>Ticket #{currentTicket._id}</Text>
              <Text><strong>User ID:</strong> {currentTicket.userId}</Text>
              <Text>
                <strong>Issue Description:</strong> {currentTicket.details}
              </Text>
            </Stack>
          </Box>

          <Stack>
            <Stack ref={chatContentsRef} overflowY={'scroll'} gap={'20px'} rounded='lg' p={4} bg={'#0B1210'} pos={'relative'} height={`calc(100vh - 32rem)`}>
              {
                currentTicket.messages.map(message => {
                  return (
                    message.sender === "representative" ? (
                      <Stack gap={'10px'} rounded='lg' borderTopLeftRadius={0} color={'#000'} bg={'#e5e5ef'} p={4} maxW={'fit-content'} width={'50%'}>
                        <Text>
                          {message.message}
                        </Text>
                        <Text fontSize={'12px'}>{moment(message.timestamp).fromNow()}</Text>
                      </Stack>
                    ) : (
                      <Stack gap={'10px'} alignSelf={'end'} rounded='lg' borderTopRightRadius={0} color={'#000'} bg={'#e5e5ef'} p={4} maxW={'fit-content'} width={'50%'}>
                        <Text>
                          {message.message}
                        </Text>
                        <Text fontSize={'12px'}>
                          {moment(message.timestamp).fromNow()}
                        </Text>
                      </Stack>
                    )
                  )
                })
              }
            </Stack>
            <Box color={'#fff'}>
              <InputGroup bg={'#070C0A'} rounded='lg'>
                <Textarea h={'60px'} type='text' placeholder='Respond to ticket' borderColor={'#0B1210 !important'} value={details} onChange={(e) => {
                  setDetails(e.target.value);
                }} />
                <InputRightAddon display={'flex'} alignContent={'center'} justifyContent={'center'} h={'60px'} w={'60px'} bg={'#070C0A'} borderColor={'#070C0A'} cursor={'pointer'}>
                  <IconButton onClick={() => {
                    respondMessage();
                  }} isLoading={isLoading} isDisabled={isLoading} aria-label="Send" icon={<IoSend />} />
                </InputRightAddon>
              </InputGroup>
            </Box>
          </Stack>
        </>)
      }
    </div>
  );
};

export default TicketDetail;
