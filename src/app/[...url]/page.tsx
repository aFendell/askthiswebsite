import { redis } from '../lib/redis';
import { ragChat } from '../lib/rag-chat';
import { indexedSetKey, sessionCookieKey } from '@/constants/common';
import ChatWrapper from './ChatWrapper';
import { cookies } from 'next/headers';

type Props = {
  params: {
    url: string | string[] | undefined;
  };
};

const constructUrl = ({ url }: { url: string[] }) => {
  const decodedComponents = url.map((component) =>
    decodeURIComponent(component)
  );

  return decodedComponents.join('/');
};

const Page = async ({ params }: Props) => {
  const reconstructedUrl = constructUrl({ url: params.url as string[] });
  const sessionCookie = cookies().get(sessionCookieKey)?.value;

  const sessionId = (reconstructedUrl + '--' + sessionCookie).replace('/', '');

  const isAlreadyIndexed = await redis.sismember(
    indexedSetKey,
    reconstructedUrl
  );

  if (!isAlreadyIndexed) {
    const result = await ragChat.context.add({
      type: 'html',
      source: reconstructedUrl,
      config: { chunkOverlap: 50, chunkSize: 200 },
    });

    if (!result.success) {
      console.error(`Failed to add context: ${result.error}`);
      return <div>Failed to load source website</div>;
    }

    await redis.sadd(indexedSetKey, reconstructedUrl);
  }

  return <ChatWrapper sessionId={sessionId} />;
};

export default Page;
