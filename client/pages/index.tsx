import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>CourseBox</title>
        <meta name="description" content="A course management system for tertiary institutions" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <span>CourseBox</span>
        </h1>

        <p className={styles.description}>
          Manage all courses in one app.
        </p>
      </main>
    </div>
  )
}

export default Home
