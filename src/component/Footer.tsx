import React from 'react';
import styles from './Footer.module.scss';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        <a href="/">Home</a> - <a href="https://github.com/heppokofrontend/copy.vtube.json">GitHub</a> - © heppokofrontend.
      </p>
    </footer>
  );
}
