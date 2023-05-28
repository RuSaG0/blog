import styles from "./Button.module.css";
import {WithChildren} from '@extensions/components';

const Button = ({ children }: WithChildren) => {

  return (
      <>
          <button className={styles.button}>
              {children}
          </button>
      </>
  );
};

export default Button;