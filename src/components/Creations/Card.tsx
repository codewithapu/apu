import React from 'react';
import { Creation } from '@/types/types';
import styles from '@/styles/components/Creations/CreationCard.module.scss'
import { motion } from 'framer-motion';

interface CardProps {
    card: Creation;
}

const CreationCard: React.FC<CardProps> = ({ card }) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }} // Initial state before animation
        animate={{ opacity: 1, y: 0 }} // Animate to this state
        exit={{ opacity: 0, y: -50 }} // Exit animation state
        transition={{ duration: 0.5 }}
        className={styles.CreationCard}
        key={card.id}
    >
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
    </motion.div>
);

export default CreationCard;