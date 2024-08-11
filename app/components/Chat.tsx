'use client'
import { Box, Button, Stack, TextField } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { sendMessage } from '../lib/sendMessage';
import './Chat.module.css';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Hello, how can I help you today?`,
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div id='supportChat'>
      <Box
        width="100vw"
        height="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        bgcolor="#2c2c2c"
      >
        <Stack
          direction="column"
          width="600px"
          height="750px"
          border="1px solid #444"
          bgcolor="#3c3c3c"
          p={2}
          spacing={3}
          borderRadius={4}
          className="custom-scrollbar"
        >
          <Stack
            direction="column"
            spacing={2}
            flexGrow={1}
            overflow="auto"
            maxHeight="100%"
            className="custom-scrollbar"
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
                      maxWidth="73%"
                      fontSize="0.95rem"
                      lineHeight="1.4"
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
              variant="outlined"
              InputProps={{
                style: {
                  color: 'white',
                  backgroundColor: '#4c4c4c',
                  borderRadius: 8,
                },
              }}
              InputLabelProps={{
                style: { color: 'lightgray' },
              }}
            />
            <Button
              variant="contained"
              sx={{
                bgcolor: '#007bff',
                '&:hover': {
                  bgcolor: '#0056b3',
                },
              }}
              onClick={() => {
                if (!isLoading) {
                  sendMessage(messages, input, setInput, setMessages, isLoading, setIsLoading)
                }
              }}
            >Send</Button>
          </Stack>
        </Stack>
      </Box>
    </div>

  )
};

export default Chat;
