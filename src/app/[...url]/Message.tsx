import { User, Bot } from 'lucide-react';
import { cn } from '../lib/utils';

type Props = {
  content: string;
  isUserMessage: boolean;
};
const Message = ({ content, isUserMessage }: Props) => {
  return (
    <div
      className={cn({
        'bg-zinc-800': isUserMessage,
        'bg-zinc-900/25': !isUserMessage,
      })}
    >
      <div className='p-6'>
        <div className='max-w-3xl mx-auto flex items-start gap-2.5'>
          <div
            className={cn(
              'size-10 shrink-0 aspect-square rounded-full border border-zinc-700 bg-zinc-900 flex justify-center items-center',
              {
                'bg-blue-950 borderblue700 text-zinc-200': isUserMessage,
              }
            )}
          >
            {isUserMessage ? (
              <User className='siz-5' />
            ) : (
              <Bot className='size-5 text-white' />
            )}
          </div>

          <div className='flex flex-col ml-6 w-full'>
            <div className='flex items-center space-x-2'>
              <span className='text-sm font-semibold'>
                {isUserMessage ? 'You' : 'Website'}
              </span>
            </div>
            <p className='text-sm font-normal py-2.5 text-white'>{content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
