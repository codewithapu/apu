import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

interface Creation {
  id: string;
  thumbnail_url: string;
  link: string;
  title: string;
  description: string;
  tag: string;
}

interface CreationPageProps {
  creation?: Creation;
}

const CreationPage: React.FC<CreationPageProps> = ({ creation }) => {
  const router = useRouter();

  if (router.isFallback || !creation) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{creation.title}</h1>
      <p>{creation.description}</p>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const jsonData = await import('../../../public/data/creations.json');
  const creations: Creation[] = jsonData.default;

  const paths = creations.map((creation) => ({
    params: { slug: creation.id.toString() },
  }));

  return { paths, fallback: true };
};

interface Params {
  slug: string;
  [key: string]: string | undefined; 
}

export const getStaticProps: GetStaticProps<CreationPageProps, Params> = async ({ params }) => {
    const { slug } = params!;
  
    if (!slug) {
      return {
        notFound: true,
      };
    }
  
    const jsonData = await import('../../../public/data/creations.json');
    const creations: Creation[] = jsonData.default;
  
    const creation = creations.find((c) => c.id === slug);
  
    if (!creation) {
      return {
        notFound: true,
      };
    }
  
    return {
      props: {
        creation,
      },
      revalidate: 1,
    };
  };
  

export default CreationPage;
