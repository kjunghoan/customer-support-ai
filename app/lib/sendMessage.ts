export const sendMessage = async (
  messages: Message[],
  input: string,
  setInput: React.Dispatch<React.SetStateAction<string>>,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  isLoading: boolean,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (!input.trim() || isLoading) return; // Does not send a message if the input is empty
  setIsLoading(true);

  setInput('');
  setMessages([
    ...messages,
    { role: 'user', content: input },
    { role: 'assistant', content: '' }, // This is a placeholder for the assistant's response
  ]);
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([...messages, { role: 'user', content: input }]),
    });

    if (!response.body) { // Error handling for no response body
      throw new Error('No response body');
    };

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    const processText = async (chunk: ReadableStreamReadResult<Uint8Array>): Promise<void> => {
      if (chunk.done) { // If the response is done, return
        setIsLoading(false);
        return;
      }
      const decodedText = decoder.decode(chunk.value, { stream: true });

      setMessages((prevMessages) => {
        const lastMessage = prevMessages[prevMessages.length - 1];
        const otherMessages = prevMessages.slice(0, prevMessages.length - 1);
        return [
          ...otherMessages,
          { ...lastMessage, content: lastMessage.content + decodedText },
        ];
      });


      return reader.read().then(processText);
    };
    await reader.read().then(processText);
  }
  catch (error) {
    console.error(error);
    setMessages((prevMessages: Message[]) => [
      ...prevMessages,
      { role: 'assistant', content: `I'm sorry, I encountered an error. Please try again later.` }
    ]);
    setIsLoading(false);
  }

};
