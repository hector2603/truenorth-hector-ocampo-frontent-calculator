'use client';
import styles from '../page.module.css';
import axios, { AxiosError } from 'axios';
import { FormEvent } from 'react';
import AuthService from '../../../shared/service/AuthService';
import { Auth } from '../../../shared/model/Auth';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { MessageResponse } from '../../../shared/model/MessageResponse';
import {signIn} from 'next-auth/react'
import { useRouter } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.css';

export default function Register() {
  const router = useRouter();
  const MySwal = withReactContent(Swal)


  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const email = form.email.value;
    const password = form.password.value;
    const data : Auth = {
      username: email,
      password: password
    }
    try {
      const response = await AuthService.register(data);
      MySwal.fire({
        title: <p>Successful Registration</p>,
        icon: 'success'
      })
      const res = await signIn('credentials', {username: email, password: password, redirect: false});
      
      if(res?.ok){
        return router.push('/');
      }

      console.log(response);
    } catch (error) {
      const errorMessage = ((error as AxiosError).response?.data as MessageResponse ).error.message;
      MySwal.fire({
        title: <p>{errorMessage}</p>,
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
          <h1 className={styles.tittle}>Register</h1>
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
          <input type="submit" value="Register" className={styles.submit} />
        </form>
      </section>
    </main>
  )
}
