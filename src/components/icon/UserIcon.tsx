import Image from 'next/image';
import styles from './UserIcon.module.css';

type UserIconProps = {
  image: string;
  height?: number;
  width?: number;
};

export const UserIcon: React.FC<UserIconProps> = ({ image, height, width }) => {
  return (
    <Image
      className={styles.avatar}
      src={image ?? ''}
      alt="user icon image"
      height={height ?? 100}
      width={width ?? 100}
    ></Image>
  );
};
