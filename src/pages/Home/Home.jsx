import React, { useEffect, useRef, useState } from 'react';
import { Box, InputGroup, Input, Button, InputRightElement, Textarea, Card, CardBody, Stack, Image, Text } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';
import { IoMdSend } from 'react-icons/io';
import AIImage from '../../Assets/AI.jpg';
import USERIMAGE from '../../Assets/USER.jpg';
import { DNA } from 'react-loader-spinner'


const Home = ({ messages, setMessages }) => {
  
  const msgEnd = useRef(null);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  useEffect(() => {
    msgEnd.current.scrollIntoView();
  }, [messages]);

  const handleSend = async () => {
    const text = input;
    setInput('');
    setMessages([
      ...messages,
      { text, isBot: false }
    ]);

    setLoading(true); 

    setTimeout(() => {
      const res = 'This is the chatbot speaking';
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: res, isBot: true }
      ]);
      setLoading(false); 
    }, 5000);
  };

  return (
    <Box height='80%'>
      <Box
        bg='#121b21'
        marginBottom='1rem'
        marginTop='1rem'
        borderRadius='5px'
        border='0.7px solid #6fa6cb'
        padding='0.5rem'
        maxHeight='75%'
        overflowY='scroll'
        overflowX='hidden'
        height='90%'
        css={{
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-track': {
            width: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'white',
            borderRadius: '24px',
          },
        }}
      >


        {messages.map((message, index) => {
          return (
            <Card
              direction='row'
              variant={message.isBot ? 'outline':null}
              bg=''
              marginTop='1rem'
              height='fit-content'
              key={index}
              style={{ wordWrap: 'break-word' }}
              css={
                message.isBot ? {
                  background: '#406176',
                  boxShadow: '0 0 10px 0px #48abe0',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '0.5px solid rgba(255, 255, 255, 0.18)',
                } :
                {
                   background:'none'
                  
                }
              }
            >
              <Image
                objectFit='cover'
                width='30px'
                height='30px'
                margin='0.5rem'
                src={message.isBot ? AIImage : USERIMAGE}
                alt='Caffe Latte'
                borderRadius='8px'
                bg='red'
              />

              <CardBody p='0.5rem'  style={{ overflowWrap: 'break-word', wordBreak: 'break-all' }}>
                <Text
                  textAlign='left'
                  fontFamily='Poppins'
                  color={message.isBot ? 'white' : 'white'}
                  fontWeight='600'
                >
                  {message.text}
                </Text>
              </CardBody>
            </Card>
          );
        })}

        { loading && <Card
              direction='row'
              overflow='hidden'
              variant='outline'
              bg='lightblue'
              marginTop='1rem'
              height='fit-content'
              css={{
                  background: '#406176',
                  boxShadow: '0 0 20px 0px #48abe0',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                }
              }
            >
              <Image
                objectFit='cover'
                width='30px'
                height='30px'
                margin='0.5rem'
                src={AIImage}
                alt='Caffe Latte'
                borderRadius='8px'
                bg='red'
              />

              <CardBody p='0.5rem' >
                <Text textAlign='left' fontFamily='Poppins' color={'black'} fontWeight='600'>
                    <DNA
                    visible={true}
                    height="50"
                    width="50"
                    ariaLabel="dna-loading"
                    wrapperStyle={{}}
                    wrapperClass="dna-wrapper"
                    />
                </Text>
              </CardBody>
            </Card>}


        <div ref={msgEnd} />
      </Box>

      {/* //input box */}
      <Box width='100%' height='20%'>
        <InputGroup>
          <Textarea
            pr='3.5rem'
            type='text'
            placeholder='Enter Message'
            borderRadius='7px'
            bg='#121b21'
            color='white'
            css={{
              '&::-webkit-scrollbar': {
                width: '4px',
              },
              '&::-webkit-scrollbar-track': {
                width: '6px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: 'white',
                borderRadius: '24px',
              },
            }}

            value={input}
            onChange={(e) => { setInput(e.target.value) }}
          />
          <InputRightElement width='2.5rem' marginRight='1rem' height='100%'>
            <Button h='1.75rem' size='sm' onClick={handleSend}>
              <Icon as={IoMdSend} color='black' />
            </Button>
          </InputRightElement>
        </InputGroup>
      </Box>

      {/* //inputboxends */}
    </Box>
  );
};

export default Home;
