

import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.text}>© {new Date().getFullYear()} Lauanderson Rael. Todos os direitos reservados.</p>
      <ul className={styles.socialLinks}>
        <li><a href="https://github.com/lauanderson-rael" target="_blank" rel="noopener noreferrer">GitHub</a></li>
        <li><a href="https://www.linkedin.com/in/lauanderson-rael-a68b2b16a/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
      </ul>
    </footer>
  );
};

export default Footer;
