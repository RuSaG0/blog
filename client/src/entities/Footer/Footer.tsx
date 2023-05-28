import styles from "./Footer.module.css";

export const Footer = () => {
  return (
        <footer className={styles.container}>
            <hr className={styles.hr} />
            <p className={styles.text}>Copyright 2023 - Mirzoev Ruslan</p>
        </footer>
  );
};
