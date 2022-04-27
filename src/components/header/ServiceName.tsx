import styles from './ServiceName.module.scss';

type ServiceNameProps = {
  className?: string;
};
export const ServiceName: React.FC<ServiceNameProps> = ({ className }) => {
  return <span className={className + ' ' + styles.title}>CLUS 🥕</span>;
};
