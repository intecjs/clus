import styles from './UserIcon.module.css';

export type UserIconProps = {
  image: string;
  height?: number;
  width?: number;
};

export const UserIcon: React.FC<UserIconProps> = ({ image, height, width }) => {
  return (
    // To use public OAuth Provider's image
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={styles.avatar}
      src={image ?? ''}
      alt="user icon image"
      height={height ?? 100}
      width={width ?? 100}
    ></img>
  );
};
