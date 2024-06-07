'use client';
import styles from "./page.module.css";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [username, setUsername] = useState('');
  const router = useRouter();

  // Update username with every typed letter in the input tbx
  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    router.push(`/game/${username}`);
  }

  return (
    <main className={styles.main}>
      <div className={styles['login-container']}>
        <form onSubmit={handleSubmit} className={styles['input-wrapper']}>
          <h4>Username:</h4>
          <input
            className={styles['name-tbx']}
            placeholder="Type your user name"
            onChange={handleUsernameChange}
            value={username}
          />
          <div className={styles['name-btn-container']}>
            <button type="submit" className={styles['name-btn']}>Log in</button>
          </div>
        </form>
      </div>
    </main>
  );
}
