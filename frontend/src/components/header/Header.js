'use client';
import styles from "./Header.module.css";
import Link from 'next/link';
import { useContext } from 'react';
import { MyContext } from "@/app/context/MyContextProvider";

export default function Header() {
    const { someValue } = useContext(MyContext);

    return (
        <header className={styles.header}>
            <nav className={styles.navbar}>
                <div className={styles['page-title-container']}>
                    <Link className={styles['link-in-nav']} href="/">
                        <h1>diceSocial</h1>
                    </Link>
                </div>
                <div className={styles['some-value-container']}>
                    <span>{someValue}</span>
                </div>
            </nav>
        </header>
    );
}
