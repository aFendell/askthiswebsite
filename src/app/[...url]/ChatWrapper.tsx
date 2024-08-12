'use client';

import { useChat } from 'ai/react';
import Messages from './Messages';
import ChatInput from './ChatInput';

type Props = {
  sessionId: string;
};

const ChatWrapper = ({ sessionId }: Props) => {
  const { messages, handleInputChange, input, handleSubmit, setInput } =
    useChat({
      api: '/api/chat-stream',
      body: { sessionId },
    });

  return (
    <div className='relative min-h-screen bg-zinc-900 flex divide-y divide-zinc-700 flex-col justify-between'>
      <div className='flex-1 bg-zinc-800 justify-between flex flex-col '>
        <Messages messages={messages} />
      </div>
      <ChatInput
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        setInput={setInput}
      />
    </div>
  );
};

export default ChatWrapper;
