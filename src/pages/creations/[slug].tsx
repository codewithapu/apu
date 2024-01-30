import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '@/styles/pages/creations.module.scss';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ColorThief from 'colorthief';

import { Creation } from '@/types/types';

interface CreationPageProps {
    creation?: Creation;
}

const CreationPage: React.FC<CreationPageProps> = ({ creation }) => {
    const [gradientColor, setGradientColor] = useState<string>('67,22,114');

    useEffect(() => {
        const extractColor = async () => {
            if (creation && creation.thumbnail_url && typeof window !== 'undefined') {
                const img = new window.Image();
                img.src = creation.thumbnail_url;
                img.crossOrigin = 'Anonymous';

                img.onload = () => {
                    const colorThief = new ColorThief();
                    const color = colorThief.getColor(img);
                    const newGradientColor = `${color[0]},${color[1]},${color[2]}`;
                    setGradientColor(newGradientColor);
                };
            }
        };

        extractColor();
    }, [creation?.thumbnail_url]);

    const router = useRouter();

    if (router.isFallback || !creation) {
        return <div>Loading...</div>;
    }

    const transitionVariants = {
        initial: { opacity: 0, y: '100%', scale: 1 },
        enter: { opacity: 1, y: '0%', scale: 1 },
        exit: { opacity: 0, y: '-100%', scale: 1 },
    };

    const gradientStyle = {
        background: `linear-gradient(180deg, rgba(${gradientColor}, 0.8) 0%, #121212 96.75%)`,
    };


    const color = [67, 22, 114];

    const calculateLuminance = (r: number, g: number, b: number): number => {
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      return luminance;
    };
    
    const textColor = calculateLuminance(color[0], color[1], color[2]) > 0.5 ? 'black' : 'white';
    
    const textStyle = {
      color: textColor,
    };


    return (
        <motion.div
            style={{ zIndex: 100 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit="exit"
            transition={{ duration: 1.2, ease: [0.785, 0.135, 0.15, 0.86] }}
        >
            <Head>
                <title>Creations</title>
            </Head>

            <div className={styles.Wraper} data-lenis-prevent-touch>
                <div className={styles.Container}>
                    <div className={styles.Hero} style={gradientStyle}>
                        {/* <h3 style={textStyle}>this is a simple heading to check colour
                        </h3> */}
                        <img src={creation.thumbnail_url} style={{width: 650}} />
                    </div>
                    {/* <h1>{creation.title}</h1>
                    <p>{creation.description}</p> */}
                </div>
            </div>
        </motion.div>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const jsonData = await import('../../../public/data/creations.json');
    const creations: Creation[] = jsonData.default;

    const paths = creations.map((creation) => ({
        params: { slug: encodeURIComponent(creation.title.toLowerCase().replace(/ /g, '-')) },
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

    const decodedSlug = decodeURIComponent(slug);
    const jsonData = await import('../../../public/data/creations.json');
    const creations: Creation[] = jsonData.default;

    const creation = creations.find((c) => c.title.toLowerCase().replace(/ /g, '-') === decodedSlug);

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
