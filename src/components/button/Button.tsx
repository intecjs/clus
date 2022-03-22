import styles from './Button.module.scss';

type Theme = {
  color?: 'primary' | 'secondary';
};

export type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> &
  Theme;

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  const primeSecond = rest.color === 'secondary' ? styles.secondary : styles.primary;

  return (
    <button className={styles.button + ' ' + primeSecond} {...rest}>
      {children}
    </button>
  );
};

export default Button;
