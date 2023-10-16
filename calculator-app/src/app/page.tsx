'use client';
import Image from 'next/image'
import styles from './page.module.css'
import {useSession} from 'next-auth/react'

export default function Home() {
  const {data: session, status} = useSession();
  console.log(session);

  return (
    <main className={styles.main}>
      <h1 className={styles.tittle}>Calculator App</h1>
      <p>{status}</p>
    </main>
  )
}
