import NavBar from '@/components/NavBar'
import '../styles/Global.scss'
import type { AppProps } from 'next/app'
import { useState, useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';


export default function App({ Component, pageProps }: AppProps) {

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

    return (
        <>
            <link rel="manifest" href="/manifest.json" />
            <link rel="apple-touch-icon" href="/apple-touch-icon.png"/>
            <meta name="theme-color" content="#fff" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&family=Outfit:wght@100..900&family=Space+Grotesk:wght@300..700&family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"></link>
            <NavBar />
            <Component {...pageProps} />
        </>);
}
