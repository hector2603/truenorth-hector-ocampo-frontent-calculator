import styles from '../page.module.css'

export default function Login() {
  return (
    <main className={styles.maincenter}>
      <section>
        <header>
          <h1 className={styles.tittle}>Calculator App</h1>
          <h1 className={styles.tittle}>Login</h1>
        </header>
        <form className={styles.formlogin}>
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
      </section>
    </main>
  )
}
