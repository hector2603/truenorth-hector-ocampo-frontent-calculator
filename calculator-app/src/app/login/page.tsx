'use client'
import styles from '../page.module.css'
import { FormEvent } from 'react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {signIn} from 'next-auth/react'
import { useRouter } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.css';


export default function Login() {
  const router = useRouter();
  const MySwal = withReactContent(Swal)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const res = await signIn('credentials', {username: email, password: password, redirect: false});
      if (res?.error) {
        MySwal.fire({
          title: <p>Wrong credentials</p>,
          icon: 'error'
        })
      }
      if (res?.ok) return router.push("/");
    } catch (error) {
      MySwal.fire({
        title: <p>Wrong credentials</p>,
        icon: 'error'
      })
      console.log(error);
    }
  }


  return (
    <main className={styles.maincenter}>
      <section>
        <header>
          <h1 className={styles.tittle}>Calculator App</h1>
          <h1 className={styles.tittle}>Login</h1>
        </header>
        <form className={styles.formlogin} onSubmit={handleSubmit}>
          <div className={styles.inputgroup}>
            <label className={styles.label} htmlFor="email">Username</label>
            <input className={styles.input} type="email" name="email" id="username" />
          </div>
          <div className={styles.inputgroup}>
            <label className={styles.label} htmlFor="password">Password</label>
            <input className={styles.input} type="password" name="password" id="password" />
          </div>
          <input type="submit" value="Login" className={styles.submit} />
        </form>
        <p>Don't have an account yet? Create one</p>
        <button onClick={() => router.push("/register")} className={styles.submit}>Register</button>

      </section>
    </main>
  )
}
