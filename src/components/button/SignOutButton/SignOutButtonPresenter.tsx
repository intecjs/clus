import Button, { ButtonProps } from '../Button';
import styles from './SignOutButton.module.scss';

export const SignOutButtonPresenter: React.FC<ButtonProps> = (props) => {
  return (
    <Button {...props}>
      <span className={styles.text}>Sign out</span>
    </Button>
  );
};
