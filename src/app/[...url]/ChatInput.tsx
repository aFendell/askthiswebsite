'use client';

import * as React from 'react';

import { type useChat } from 'ai/react';
import { Send } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

type HandleInputChange = ReturnType<typeof useChat>['handleInputChange'];
type HandleSubmit = ReturnType<typeof useChat>['handleSubmit'];
type SetInput = ReturnType<typeof useChat>['setInput'];

type Props = {
  input: string;
  handleInputChange: HandleInputChange;
  handleSubmit: HandleSubmit;
  setInput: SetInput;
};

const ChatInput = ({
  input,
  handleInputChange,
  handleSubmit,
  setInput,
}: Props) => {
  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
      setInput('');
    }
  };

  return (
    <div className='px-5 py-4'>
      <form onSubmit={handleSubmit} className='relative'>
        <Textarea
          rows={4}
          autoFocus
          onChange={handleInputChange}
          value={input}
          onKeyDown={onKeyDown}
          placeholder='Enter your question...'
          className='resize-none bg-zinc-800 hover:bg-zinc-800/80 rounded-xl text-base focus-visible:ring-blue-500'
        />

        <Button
          size='icon'
          type='submit'
          className='absolute z-10 right-2 bottom-2'
        >
          <Send className='size-4 text-white' />
        </Button>
      </form>
    </div>
  );
};

export default ChatInput;
