import Head from 'next/head'
import Image from 'next/image'
import useSWR from 'swr'
import React, { useState } from 'react'
import styles from '../styles/Home.module.css'

const fetcher = (...args) => fetch(...args).then(res => res.json());

function GetPictures() {
  const [pageIndex, setpageIndex] = useState(0);
  const { data, error } = useSWR("http://"+process.env.NEXT_PUBLIC_BACKEND_URL + "/submission" + `?page=${pageIndex}&size=5`, fetcher)

  if (error) {
    return <div> <p>{`The kitties are gone, please tell the web owner to find them :<`}</p> </div>
  } else if (!data) {
    return <div> <p>{`Looking for kitties...`}</p></div>
  }

  //post.uploadDate

  return (
    <>
      <div className={styles.paginateContainer}>
        <button disabled={data.first} onClick={() => setpageIndex(pageIndex - 1)}> ← newer </button>
        <p> {pageIndex + 1} / {data.totalPages}</p>
        <button disabled={data.last} onClick={() => setpageIndex(pageIndex + 1)}> older → </button>
      </div>

      {data.content.map((post) =>
        <div key={post.fileKey}>
          <p>{new Date(post.uploadDate).toLocaleString(navigator.languages[0],Intl.DateTimeFormat().resolvedOptions().timeZone)}</p>
          <div className={styles.imageContainer}>
            <Image src={"http://" + process.env.NEXT_PUBLIC_BACKEND_URL + "/file/" + post.fileKey} layout="fill" objectFit={'contain'} alt={post.title} />
          </div>
          <div className={styles.seprator}></div>
        </div>)}

      <div className={styles.paginateContainer}>
        <button disabled={data.first} onClick={() => setpageIndex(pageIndex - 1)}> ← newer </button>
        <p> {pageIndex + 1} / {data.totalPages}</p>
        <button disabled={data.last} onClick={() => setpageIndex(pageIndex + 1)}> older → </button>
      </div>
    </>
  )
}

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Kitty Collector</title>
        <meta name="description" content="An app to view all the kittens collected." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>
          <h1 className={styles.title}>
            Kitty Collector
          </h1>
          <h2 className={styles.description}> The place to collect all the kittens. </h2>
          <div className={styles.seprator}></div>
          <GetPictures />
        </div>
      </main>
    </div>
  )
}
