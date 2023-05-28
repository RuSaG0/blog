import { Header } from '@entities/Header';
import styles from "./About.module.css";
const AboutPage = () => {

  return (
      <>
        <Header>
          <p className={styles.p}>👋 Привет</p>
          <h1 className={styles.h1}>Собираю опыт в  блоге и рассказываю о процессе и результатах работы.</h1>
        </Header>
        <div>
          Hi
        </div>
      </>
  );
};

export default AboutPage;