import { ServiceName } from '@components/header/ServiceName';
import React from 'react';
import styles from './Loading.module.scss';

export const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.card}>
        <ServiceName className={styles.serviceName} />

        <div className={styles.loader}></div>
      </div>
    </div>
  );
};
