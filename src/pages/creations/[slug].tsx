import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '@/styles/pages/creations.module.scss';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ColorThief from 'colorthief';
import Footer from '@/components/Footer';
import Link from 'next/link';
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit="exit"
            transition={{ duration: 1, ease: [0.785, 0.135, 0.15, 0.86] }}
        >
            <Head>
                <title>Creations</title>
                <meta name="description" content="Design Engineer From India" />
                <meta property="og:site_name" content="Supriyo M." />
                <meta property="og:title" content={creation.title} />
                <meta property="og:image" content={creation.thumbnail_url} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
                <meta property="og:description"
                    content={creation.description}
                />
            </Head>

            <div className={styles.Wraper} data-lenis-prevent-touch>
                <div className={styles.Container}>
                    <div className={styles.Hero} style={gradientStyle}>
                        <div className={styles.BannerContainer}>
                            <img loading="lazy" draggable="false" src={creation.thumbnail_url} className={styles.BannerImage} />

                        </div>
                        {creation.product_url && (
                            <Link href={creation.product_url} target="_blank" className={styles.ProductUrl}>
                                <svg className={styles.LinkIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none">
                                    <path d="M13 26.6429L14.3571 28L27.9277 14.4294L26.5706 13.0723L13 26.6429Z" fill="black" />
                                    <path d="M26.0808 13V27.3938H28V13H26.0808Z" fill="black" />
                                    <path d="M13.6062 13V14.9192H28V13L13.6062 13Z" fill="black" />
                                </svg>
                            </Link>
                        )}
                        <div className={styles.PostDetails}>
                            <p className={styles.PostTag}>{creation.tag}</p>
                            <h1 className={styles.PostTitle}>{creation.title}</h1>
                        </div>
                    </div>

                    <div className={styles.Content}>

                        {/* <p className={styles.PostDesc}>{creation.description}</p> */}

                        <p className={styles.PostDesc}>
                            {creation.description.split('\n').map((line, index) => (
                                <React.Fragment key={index}>
                                    {line}
                                    <br />
                                    <br />
                                </React.Fragment>
                            ))}
                        </p>
                    </div>





                    <div className={styles.AutographContainer}>
                        <svg className={styles.Signature} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 393 231" fill="none">
                            <path d="M320.515 89.4972C325.257 84.833 330.063 80.2311 334.701 75.4653C336.026 74.1038 337.206 72.3949 337.864 70.6263C340.728 62.927 345.672 59.2725 353.909 58.614C356.631 58.3964 359.292 57.3701 361.972 56.6772C369.279 54.7877 376.504 52.4418 383.914 51.1487C388.073 50.423 391.964 52.6513 392.853 57.295C393.699 61.7149 390.99 65.2848 387.104 66.0182C380.884 67.1919 374.263 68.0403 368.081 67.1513C360.342 66.0384 353.833 66.6692 347.73 71.889C345.205 74.049 344.003 76.0878 343.88 79.3891C343.323 94.2992 348.63 107.789 353.607 121.39C358.965 136.032 364.559 150.599 369.441 165.4C372.565 174.87 372.456 184.762 369.994 194.482C369.308 197.188 368.272 199.887 366.924 202.329C363.541 208.459 358.459 210.648 353.957 208.244C349.545 205.888 346.431 197.012 348.81 192.338C349.527 190.928 351.967 189.378 353.342 189.6C354.75 189.828 356.366 191.97 356.897 193.598C357.511 195.48 357.04 197.716 357.04 199.799C357.592 200.022 358.144 200.246 358.696 200.469C360.135 197.932 361.972 195.537 362.941 192.832C366.588 182.657 365.411 172.367 362.175 162.443C358.111 149.979 353.475 137.69 348.766 125.448C343.343 111.348 338.09 97.2345 336.471 80.5034C328.071 90.4094 317.235 96.4636 313.683 109.062C305.421 138.367 295.64 167.125 279.69 193.322C276.074 199.262 271.706 204.775 267.368 210.232C265.047 213.151 261.803 215.624 257.844 213.482C253.844 211.318 254.152 207.067 255.383 203.674C259.733 191.681 263.896 179.55 269.311 168.027C280.083 145.103 293.588 123.798 308.541 103.295C312.764 97.504 313.465 89.1443 315.917 81.5428C304.582 80.3682 299.666 71.4977 291.809 65.2161C289.841 69.6254 287.901 73.5756 286.297 77.6578C283.872 83.8319 282.062 90.2815 279.202 96.235C278.051 98.6302 274.902 101.404 272.506 101.558C268.636 101.806 267.555 97.8363 267.001 94.4237C266.017 88.3535 265.164 82.261 264.088 76.2075C263.788 74.5157 262.901 72.9279 262.214 71.1088C258.471 73.37 257.093 75.5647 257.784 79.8657C259.179 88.5602 257.97 97.1123 252.961 104.731C249.974 109.277 246.113 111.085 242.603 109.458C238.026 107.337 237.609 103.184 238.858 99.229C241.398 91.1921 244.536 83.3444 247.556 75.0652C242.379 68.7604 233.014 70.2361 223.066 79.566C234.312 96.752 228.315 122.017 216.486 134.727C215.132 136.181 213.632 137.545 212.027 138.712C203.546 144.878 196.627 142.317 194.314 132.203C194.058 131.083 193.961 129.926 193.886 129.426C191.057 137.354 188.287 145.871 184.938 154.153C183.471 157.778 181.219 161.279 178.62 164.213C173.406 170.098 166.493 169.249 163.465 161.988C161.407 157.054 160.558 151.439 160.117 146.05C159.564 139.31 159.984 132.49 159.984 124.463C159.139 128.304 157.966 131.221 157.941 134.148C157.774 153.475 158.276 172.816 157.673 192.125C157.381 201.514 155.629 210.939 153.689 220.17C152.159 227.453 147.884 230.961 143.334 230.502C138.786 230.043 135.703 225.941 134.792 218.526C132.748 201.895 135.848 185.651 139.596 169.647C142.617 156.744 147.123 144.191 150.856 131.449C151.719 128.503 152.117 125.422 152.285 122.048C146.901 126.963 141.057 129.965 134.716 125.527C129.647 121.979 125.495 117.12 120.259 112.208C118.306 118.215 116.255 124.095 114.604 130.085C114.365 130.95 115.955 132.417 116.847 133.481C121.839 139.432 127.814 144.793 131.69 151.391C138.323 162.683 135.474 174.196 125.301 182.517C114.041 191.728 100.604 196.102 86.6799 198.918C67.855 202.726 49.0363 203.187 30.1705 196.35C29.6359 198.973 29.4391 201.464 28.5815 203.703C27.7722 205.816 26.5472 207.965 24.9212 209.465C24.3337 210.008 21.0756 209.08 20.7402 208.184C19.9689 206.126 19.7394 203.562 20.2217 201.412C20.8284 198.708 22.3647 196.213 23.6202 193.353C20.952 191.243 18.0996 189.283 15.5894 186.953C2.74274 175.031 -0.681776 159.723 1.23658 143.16C3.65688 122.264 12.5946 104.324 28.6104 90.3976C32.1723 87.3004 36.546 84.8059 40.9552 83.0788C52.3328 78.6221 61.2572 83.1042 65.3236 94.757C66.0897 96.9525 66.657 99.2172 67.5112 102.111C73.174 92.2845 78.2207 82.6014 84.1214 73.4702C98.7303 50.8633 113.611 28.4289 128.651 6.10632C132.68 0.127173 136.339 -1.10863 138.969 1.51108C143.41 5.93565 138.945 9.09925 136.833 12.2949C125.48 29.4793 113.406 46.2208 102.77 63.8328C97.5819 72.4228 94.9768 82.5728 91.2263 91.9572C95.0655 92.3601 98.7412 91.6686 100.328 93.1761C102.468 95.2084 103.605 98.8387 104.093 101.952C105.07 108.18 105.275 114.526 105.885 120.814C106.043 122.443 106.519 124.041 107.971 125.643C109.282 121.431 110.527 117.196 111.931 113.014C112.667 110.821 113.446 108.581 114.617 106.608C117.443 101.848 122.469 101.244 126.242 105.305C129.178 108.464 131.543 112.155 134.49 115.302C139.87 121.047 143.648 120.368 147.87 113.716C152.994 105.644 152.718 96.6781 152.939 87.7049C153.161 78.7223 153.623 69.7455 153.998 60.7669C154.033 59.9382 154.161 59.1072 154.316 58.2907C154.901 55.2163 156.503 52.3584 159.792 53.2511C161.698 53.7685 164.087 56.6558 164.252 58.6434C164.718 64.2454 164.632 69.9998 163.874 75.5732C162.555 85.278 160.533 94.8862 158.883 104.548C158.376 107.516 158.121 110.526 157.63 114.486C162.277 108.04 165.726 102.134 170.263 97.2346C176.443 90.5599 183.059 84.1494 190.214 78.5554C197.719 72.6882 206.43 70.2543 215.995 74.0923C216.962 74.4805 218.619 73.7826 219.699 73.149C223.974 70.6388 227.904 67.3822 232.414 65.4655C239.417 62.4893 246.415 62.9926 252.5 68.3048C252.988 68.0244 253.488 67.857 253.827 67.5243C262.199 59.2887 268.134 60.7686 271.076 72.0181C272.357 76.9149 273.125 81.9458 274.405 88.3019C276.526 82.6011 278.199 78.1531 279.834 73.6913C280.689 71.3594 281.396 68.9712 282.309 66.6634C287.023 54.746 292.694 53.679 301.457 62.9279C304.081 65.6979 306.716 68.5444 309.758 70.8017C311.705 72.2468 314.406 72.6769 317.178 73.7153C319.219 64.2953 321.02 55.8655 322.884 47.4499C323.351 45.3451 323.563 42.9632 324.731 41.297C325.887 39.6472 328.189 37.6715 329.831 37.8031C331.534 37.9396 334.1 40.2067 334.473 41.9334C336.86 53.0099 332.521 72.3766 323.278 79.0646C321.065 80.6658 320.676 84.7886 319.283 88.3845C319.149 89.488 319.182 89.9586 319.214 90.4291C319.647 90.1185 320.081 89.8078 320.515 89.4972ZM126.03 155.771C122.915 149.144 118.299 143.819 112.324 139.129C111.443 142.535 110.752 145.27 110.025 147.994C109.195 151.104 107.772 153.732 104.005 153.441C100.325 153.157 99.5715 150.238 99.4373 147.318C99.1928 142.001 99.3092 136.667 99.1028 131.347C99.0422 129.785 98.8457 127.888 97.9413 126.764C95.2669 123.441 92.2076 120.428 89.1155 117.097C87.7255 120.944 86.3097 124.654 85.0401 128.413C80.0005 143.335 75.0597 158.29 69.9559 173.189C68.7796 176.622 67.4414 180.841 62.6072 179.59C57.8228 178.352 58.743 173.966 59.1118 170.387C59.861 163.117 61.061 155.888 61.6564 148.608C62.3578 140.032 62.6154 131.419 63.0655 122.823C62.4725 122.688 61.8795 122.554 61.2864 122.419C51.3284 144.934 41.3705 167.448 31.3196 190.172C46.9316 196.559 61.7782 197.053 76.7696 194.866C92.5344 192.567 107.691 188.352 120.319 177.919C127.369 172.095 129.119 165.396 126.03 155.771ZM9.77474 167.468C13.1628 175.743 18.0609 182.702 25.8077 186.922C36.7301 164.303 46.8957 141.919 58.3351 120.205C63.0321 111.29 61.6931 103.75 58.0244 95.7269C55.1777 89.5016 50.0654 87.222 43.6304 89.739C39.0744 91.521 34.231 93.7329 30.8182 97.0806C11.1838 116.34 2.24855 139.134 9.77474 167.468ZM167.019 133.857C166.818 142.575 166.247 151.362 171.773 160.059C173.909 157.322 176.266 155.403 177.171 152.949C180.712 143.35 184.538 133.75 186.795 123.818C188.422 116.659 187.887 108.975 187.947 101.522C187.959 100.031 186.525 97.5308 185.36 97.2695C183.726 96.9031 181.575 97.9415 179.925 98.8747C178.885 99.4634 178.3 100.922 177.607 102.05C171.769 111.55 168.537 121.94 167.019 133.857ZM278.436 160.962C271.964 174.454 265.679 188.013 263.536 203.095C285.534 178.812 296.142 149.034 304.866 118.307C294.388 131.245 286.079 145.459 278.436 160.962ZM82.9293 115.476C83.8117 112.331 85.0738 109.236 85.4998 106.029C86.4737 98.699 86.7776 91.275 87.8754 83.9675C88.463 80.0564 90.1323 76.3079 91.3134 72.486C90.8739 72.2955 90.4345 72.105 89.995 71.9146C83.0234 84.3126 76.0209 96.6936 69.1347 109.139C68.5391 110.215 68.5718 111.715 68.5511 113.022C68.393 122.998 68.3933 132.978 68.1329 142.952C68.0122 147.573 67.4198 152.182 67.0412 156.797C67.631 156.934 68.2208 157.07 68.8106 157.207C73.4555 143.554 78.1003 129.9 82.9293 115.476ZM209.447 97.0258C204.467 106.751 200.644 116.848 201.416 127.986C201.858 134.376 204.348 135.375 209.163 131.17C219.527 122.119 222.785 110.231 221.502 96.9855C221.127 93.1128 219.43 89.368 218.339 85.5646C217.808 85.5657 217.276 85.5667 216.745 85.5677C214.451 89.1817 212.157 92.7957 209.447 97.0258ZM142.393 188.024C141.455 199.137 139.699 210.301 144.506 221.134C154.94 197.55 151.505 172.649 152.368 148.173C151.747 148.07 151.125 147.967 150.503 147.864C147.851 160.957 145.199 174.05 142.393 188.024ZM204.392 92.9688C206.89 88.9918 209.388 85.0147 212.12 80.6639C202.193 78.2718 195.226 82.6779 188.321 88.5608C198.345 94.0236 195.681 103.297 196.086 111.446C198.727 105.529 201.384 99.5764 204.392 92.9688ZM95.9378 102.866C92.5675 107.987 92.7594 109.402 98.6487 115.839C97.8507 110.548 97.255 106.6 95.9378 102.866Z" fill="#F6F6F6" />
                            <path d="M226.601 18.7509C230.722 21.6368 231.431 26.2304 228.103 27.8771C226.633 28.6051 223.945 28.6055 222.758 27.6971C221.537 26.7616 220.511 23.8132 221.122 22.6519C222.042 20.9047 224.46 19.9463 226.601 18.7509Z" fill="#F5F5F5" />
                            <path d="M96.2986 102.758C97.255 106.6 97.8507 110.548 98.6487 115.839C92.7594 109.402 92.5675 107.987 96.2986 102.758Z" fill="#141414" />
                            <path d="M320.241 89.2472C320.081 89.8078 319.647 90.1185 319.214 90.4291C319.182 89.9586 319.149 89.488 319.258 88.7678C319.588 88.6778 319.777 88.8376 320.241 89.2472Z" fill="#010101" />
                        </svg>
                    </div>

                </div>
            </div>

            <Footer />
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
