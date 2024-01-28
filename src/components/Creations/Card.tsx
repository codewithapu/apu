import React from 'react';
import { Creation } from '@/types/types';
import styles from '@/styles/components/Creations/CreationCard.module.scss'

interface CardProps {
    card: Creation;
}

const CreationCard: React.FC<CardProps> = ({ card }) => (
    <div className={styles.CreationCard} key={card.id}>
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
    </div>
);

export default CreationCard;