import type { WithChildren } from "@extensions/components";
import styles from "./Header.module.css";
import Link from 'next/link';
import Button from '@entities/Button/Button';

export const Header = ({ children }: WithChildren) => {
  return (
      <div className={styles.background}>
        <div className={styles.top}>
          <div className={styles.logo}>
            <h4>RuSaG0</h4>
          </div>
          <div className={styles.links}>
            <Link className={styles.link} href="/">
              Home
            </Link>
            <Link className={styles.link} href="/all">
              All
            </Link>
            <Link className={styles.link} href="/about">
              About
            </Link>
          </div>

          <Button>
            Subscribe
          </Button>

        </div>
        <div className={styles.children}>{children}</div>
      </div>
  );
};
