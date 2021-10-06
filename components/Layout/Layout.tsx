import React from 'react';
import Head from 'next/head';
import styles from './Layout.module.scss';
import Link from 'next/link';
import Image from 'next/image';

interface LayoutProps {
  children: React.ReactChildren | React.ReactElement;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Head>
        <title>Rick and morty table</title>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <div className="wrapper">
        <header className={styles.headerBar}>
          <div>Rick and morty characters table</div>

          <Link passHref href="https://github.com/artemego">
            <div className="imgContainer">
              <Image
                width="35px"
                height="35px"
                alt="Github logo"
                src="/static/github.svg"
              />
            </div>
          </Link>
        </header>
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
};
