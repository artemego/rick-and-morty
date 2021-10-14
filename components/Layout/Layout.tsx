import React from 'react';
import Head from 'next/head';
import styles from './Layout.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '../../common/hooks';
import { selectIsSearchOpen, setIsSearchOpen } from '../../state/optionsSlice';
import { useSelector } from 'react-redux';

interface LayoutProps {
  children: React.ReactChildren | React.ReactElement;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const isSearchOpen = useSelector(selectIsSearchOpen);

  const handleSearchButtonClick = (e: React.MouseEvent) => {
    console.log('button clicked');
    dispatch(setIsSearchOpen(!isSearchOpen));
  };

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
          <div className={styles.iconContainer}>
            <button
              className={styles.searchButton}
              onClick={handleSearchButtonClick}
            >
              <div className="imgContainer">
                <Image
                  width="35px"
                  height="35px"
                  alt="Search icon"
                  src="/static/search.svg"
                />
              </div>
            </button>

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
          </div>
        </header>
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
};
