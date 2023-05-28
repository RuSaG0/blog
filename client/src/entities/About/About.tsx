import { Header } from '@entities/Header';
import styles from "./About.module.css";
const AboutPage = () => {

  return (
      <>
        <Header>
          <p className={styles.p}>👋 Hi!</p>
          <h1 className={styles.h1}>I collect experience in my blog and write about the process and results of my work, explain various technical problems and their possible solutions.</h1>
        </Header>
        <div>
          Hi
        </div>
      </>
  );
};

export default AboutPage;