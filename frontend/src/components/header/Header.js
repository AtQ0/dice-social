import styles from "./Header.module.css";
import Link from 'next/link';

export default function Header() {

    return (
        <header className={styles.header}>
            <nav className={styles.navbar}>
                <Link className={styles['link-in-nav']} href="/">
                    <h1 >diceSocial</h1>
                </Link>
            </nav>
        </header>
    );
}
