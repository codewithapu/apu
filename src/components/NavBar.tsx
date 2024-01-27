import React from 'react'
import styles from '@/styles/components/NavBar.module.scss'
import Link from 'next/link'

const NavBar = () => {
    return (
        <div className={styles.NavBar}>
            <div className={styles.NavBarContainer}>
                <Link href="/" className={styles.NameLink}>

                    <svg className={styles.SMLogo} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 248 241" fill="none">
                        <path d="M4 22H201C214.6 22 225.625 33.025 225.625 46.625C225.625 60.225 214.6 71.25 201 71.25H47.0938C33.4937 71.25 22.4688 82.275 22.4688 95.875C22.4688 109.475 33.4937 120.5 47.0938 120.5H201C214.6 120.5 225.625 131.525 225.625 145.125C225.625 158.725 214.6 169.75 201 169.75H47.0938C33.4937 169.75 22.4688 180.775 22.4688 194.375C22.4688 207.975 33.4937 219 47.0938 219H244.094" stroke="#111111" stroke-width="43.0937" />
                    </svg>
                    {/* Supriya m. */}
                </Link>
                <div className={styles.NavLinks}>
                    <Link href="/" className={styles.Link}>
                        works
                    </Link>
                    <Link href="/" className={styles.Link}>
                        resources


                        <svg width="7" height="auto" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g>
                                <path
                                    id="Vector"
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M13.4383 0L7.48184 5.70218L1.4891 0.0363196L0 1.52542L7.44552 8.78935L15 1.56174L13.4383 0Z"
                                    fill="#111"
                                />
                            </g>
                        </svg>

                    </Link>
                    <Link href="/" className={styles.Link}>
                        start a project
                    </Link>
                </div>
            </div>


        </div>
    )
}

export default NavBar
