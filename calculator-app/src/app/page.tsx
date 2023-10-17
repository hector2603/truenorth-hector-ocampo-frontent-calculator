'use client';
import Image from 'next/image'
import styles from './page.module.css'
import {useSession} from 'next-auth/react'
import OperationSelector from './components/OperationSelector';
import 'bootstrap/dist/css/bootstrap.css';
import RecordTable from './components/RecordTable';

export default function Home() {

  return (
    <main className={styles.main}>
      <h1 className={styles.tittle}>Calculator App</h1>
      <section className={styles.mainSection}>
        <OperationSelector />
        <RecordTable />
      </section>
    </main>
  )
}
