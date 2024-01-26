import React from 'react'
import styles from '@/styles/components/Footer.module.scss'
import Link from 'next/link'

const Footer = () => {
    return (
        <div className={styles.Footer}>
            <div className={styles.FooterContainer}>
                <div className={styles.ContactMail}>
                    contact me
                    <Link href="emailto:mahatosupriya@outlook.com" className={styles.LinkToMail} type='email'>mahatosupriya@outlook.com</Link>
                </div>
            </div>


        </div>
    )
}

export default Footer;
