import type { WithChildren } from "@extensions/components";
import styles from "./Header.module.css";
import Link from 'next/link';

export const Header = ({ children }: WithChildren) => {
  return (
      <div className={styles.background}>
        <div className={styles.top}>
          <div className={styles.logo}>

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

          <div className={styles.subscribe}>

          </div>

        </div>
        <div className={styles.children}>{children}</div>
      </div>
  );
};
