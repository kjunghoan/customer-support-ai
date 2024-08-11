'use client'
import { useEffect, useRef, useState } from 'react'
import { Box, Button, Stack, TextField } from '@mui/material'
import { sendMessage } from './lib/sendMessage'

const Home: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { // This is the state that will hold the messages
      role: 'assistant',
      content: `Hello, how can I help you today?`,
    }
  ]);
  const [input, setInput] = useState(''); // This is the state that will hold the user's input
  const [isLoading, setIsLoading] = useState(false); // This is the state that will hold the loading state

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      <Box
        width="100vw"
        height="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Stack
          direction="column"
          width="600px"
          height="700px"
          border="1px solid black"
          p={2}
          spacing={3}
        >
          <Stack
            direction="column"
            spacing={2}
            flexGrow={1}
            overflow="auto"
            maxHeight="100%"
          >
            {
              messages.map((message: Message, index: number) => {
                return (
                  <Box
                    key={index}
                    display="flex"
                    justifyContent={message.role === 'assistant' ? 'flex-start' : 'flex-end'}
                  >
                    <Box
                      bgcolor={
                        message.role === 'assistant'
                          ? 'primary.main'
                          : 'secondary.main'
                      }
                      color="white"
                      borderRadius={16}
                      p={3}
                    >
                      {message.content}
                    </Box>
                  </Box>
                )
              })
            }
            <div ref={messagesEndRef} />
          </Stack>
          <Stack
            direction="row"
            spacing={2}
          >
            <TextField
              label="Type a message"
              fullWidth
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
            <Button
              variant="contained"
              onClick={() => {
                if (!isLoading) {
                  sendMessage(messages, input, setInput, setMessages, isLoading, setIsLoading)
                }
              }}
            >Send</Button>
          </Stack>
        </Stack>
      </Box>
    </>

  )
};

export default Home;
