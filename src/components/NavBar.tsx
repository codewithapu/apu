import React from 'react'
import styles from '@/styles/components/NavBar.module.scss'
import Link from 'next/link'

const NavBar = () => {
    return (
        <div className={styles.NavBar}>
            <div className={styles.NavBarContainer}>
                <Link href="/" className={styles.NameLink}>Supriya m.</Link>
                <div className={styles.NavLinks}>
                    <Link href="/" className={styles.Link}>
                        works
                    </Link>
                    <Link href="/" className={styles.Link}>
                        resources
                    </Link>
                    <Link href="/" className={styles.Link}>
                        hire me
                    </Link>
                </div>
            </div>


        </div>
    )
}

export default NavBar
