import React from 'react';
import { Creation } from '@/types/types';
import styles from '@/styles/components/Creations/CreationCard.module.scss'
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';

interface CardProps {
    card: Creation;
}

const cardVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
};


const CreationCard: React.FC<CardProps> = ({ card }) => (



    <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ type: 'spring', stiffness: 100, mass: 0.5, delay: parseInt(card.id) * 0.2 }}
        className={styles.CreationCard}

        key={card.id}
    >
        <Link href={card.link} className={styles.CardLink} draggable="false" target="_blank">
            <img draggable="false" className={styles.Thumbnail} src={card.thumbnail_url} alt={card.title} />
            <div className={styles.CardData}>
                <p className={styles.Tag}>
                    <span className={styles.Circle}></span>
                    {card.tag}
                </p>
                <h2 className={styles.Title}>
                    {card.title}
                </h2>
                <p className={styles.Description}>{card.description}</p>
            </div>
        </Link>
    </motion.div>
);

export default CreationCard;