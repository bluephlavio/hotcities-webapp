import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Toggler from './components/Toggler';
import styles from './Header.module.scss';

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleToggle = React.useCallback(() => {
    setIsOpen(!isOpen);
  }, [setIsOpen, isOpen]);

  const router = useRouter();

  React.useEffect(() => {
    const handleRouteChange = () => {
      handleToggle();
    };
    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, []);

  return (
    <div className={styles.container}>
      <header>
        <div className={styles.wrapper}>
          <Link href="/" passHref>
            <a aria-label="home" className={styles.brand} href="dummy">
              <h1 className={styles.title}>HOT CITIES</h1>
              <p className={styles.slogan}>world&#39;s hottest city, now</p>
            </a>
          </Link>
          <Toggler toggle={handleToggle} />
          <nav className={styles.desktop}>
            <Link href="/">Live</Link>
            <Link href="/about">About</Link>
          </nav>
        </div>
        {isOpen && (
          <nav className={styles.mobile}>
            <Link href="/">Live</Link>
            <Link href="/about">About</Link>
          </nav>
        )}
      </header>
      <hr />
    </div>
  );
};

export default Header;
