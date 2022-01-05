import React from 'react';
import styles from './Footer.module.scss';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        <a href="https://github.com/heppokofrontend/copy.vtube.json">Source on GitHub</a>
      </p>
    </footer>
  );
}
