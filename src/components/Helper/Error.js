import React from 'react';
import styles from './Error.module.css';

const Error = ({ error }) => {
  if (!error) return null;
  return (
    <p className={styles.error}>
      {' '}
      {error.status && <span> Error {error.status}: </span>}
      {error.message}
    </p>
  );
};

export default Error;
