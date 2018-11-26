import React from 'react';
import styles from './Container.scss';

export default ({ children }) => (
  <div className={styles.wrapper}>
    {children}
  </div>
);
