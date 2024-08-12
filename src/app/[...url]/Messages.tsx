import { type Message as IMessage } from 'ai/react';
import Message from './Message';
import { MessageSquare } from 'lucide-react';

type Props = {
  messages: IMessage[];
};

const Messages = ({ messages }: Props) => {
  return (
    <div className='flex flex-1'>
      {messages.length ? (
        <ul>
          {messages.map((message) => (
            <Message
              key={message.id}
              content={message.content}
              isUserMessage={message.role === 'user'}
            />
          ))}
        </ul>
      ) : (
        <div className='flex flex-1 flex-col items-center justify-center gap-2'>
          <MessageSquare className='size-8 text-blue-500' />
          <h3 className='font-semibold text-xl'>{`You're all set!`}</h3>
          <p className='text-zinc-500'>
            Ask your first question to get started.
          </p>
        </div>
      )}
    </div>
  );
};

export default Messages;
