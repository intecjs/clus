import { NextPage } from 'next';
import { Header } from '../header';
import styles from './Layout.module.scss';

const Layout: React.FC = ({ children }) => {
  return (
    <div className={styles.container}>
      <Header></Header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
