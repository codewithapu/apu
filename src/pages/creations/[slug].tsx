import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '@/styles/pages/creations.module.scss'
import Lenis from '@studio-freight/lenis';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

import { Creation } from '@/types/types';

interface CreationPageProps {
    creation?: Creation;
}

const CreationPage: React.FC<CreationPageProps> = ({ creation }) => {


    // Lenis Scroll Starts Here

    const [dimension, setDimension] = useState({ width: 0, height: 0 });
    useEffect(() => {
        const lenis = new Lenis()

        const raf = (time: number) => {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        const resize = () => {
            setDimension({ width: window.innerWidth, height: window.innerHeight })
        }

        window.addEventListener("resize", resize)
        requestAnimationFrame(raf);
        resize();

        return () => {
            window.removeEventListener("resize", resize);
        }
    }, [])

    // Lenis Scroll Ends Here

    const router = useRouter();

    if (router.isFallback || !creation) {
        return <div>Loading...</div>;
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <Head>
                <title>Creations</title>
            </Head>


            <div className={styles.Wraper} data-lenis-prevent-touch>
                <div className={styles.Container}>
                    <img src={creation.thumbnail_url} alt={creation.title} draggable="false" />
                    <h1>{creation.title}</h1>
                    <p>{creation.description}</p>
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
