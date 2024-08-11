import { ragChat } from '../lib/rag-chat';
import { redis } from '../lib/redis';
import ChatWrapper from './ChatWrapper';

type Props = {
  params: {
    url: string | string[] | undefined;
  };
};

const constructUrl = (url: string[]) => {
  const decodedComponents = url.map((component) =>
    decodeURIComponent(component)
  );

  return decodedComponents.join('/');
};

const Page = async ({ params }: Props) => {
  const reconstructedUrl = constructUrl(params.url as string[]);

  const isAlreadyIndexed = await redis.sismember(
    'indexed-urls',
    reconstructedUrl
  );

  const sessionId = 'mock-session-id';

  console.log(isAlreadyIndexed);

  if (!isAlreadyIndexed) {
    await ragChat.context.add({
      type: 'html',
      source: reconstructedUrl,
      config: { chunkOverlap: 50, chunkSize: 200 },
    });

    await redis.sadd('indexed-urls', reconstructedUrl);
  }

  return <ChatWrapper sessionId={sessionId} />;
};

export default Page;
