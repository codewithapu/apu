import Link from 'next/link';
import { GetStaticProps } from 'next';

interface Creation {
  id: string;
  thumbnail_url: string;
  link: string;
  title: string;
  description: string;
  tag: string;
}

interface CreationPageProps {
  creations: Creation[];
}

const CreationPage: React.FC<CreationPageProps> = ({ creations }) => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <ul>
        {creations.map((creation) => (
          <li key={creation.id}>
            <Link href={`/creations/${creation.id}`}>
                <img src={creation.thumbnail_url} alt={creation.title} />
                <h2>{creation.title}</h2>
                <p>{creation.description}</p>
                <span>{creation.tag}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getStaticProps: GetStaticProps<CreationPageProps> = async () => {
  const jsonData = await import('../../../public/data/creations.json');
  const creations: Creation[] = jsonData.default;

  return {
    props: {
      creations,
    },
    revalidate: 1,
  };
};

export default CreationPage;
