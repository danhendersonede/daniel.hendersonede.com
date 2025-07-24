import { useState } from 'react';
import styles from './reveal-email.module.css';

const RevealEmail = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const email = 'daniel@hendersonede.com';
  const maskedEmail = 'Email hidden from bots';

  const handleReveal = () => {
    setIsRevealed(!isRevealed);
  };

  return (
    <div className={styles.container}>
      <div className={styles.emailDisplay}>
        <span
          className={`${styles.emailText} ${!isRevealed ? styles.masked : ''}`}
        >
          {isRevealed ? email : maskedEmail}
        </span>
      </div>

      <button
        className={styles.revealButton}
        onClick={handleReveal}
        type="button"
        aria-label={isRevealed ? 'Hide email address' : 'Reveal email address'}
      >
        {isRevealed ? 'Hide Email' : 'Reveal Email'}
      </button>
    </div>
  );
};

export default RevealEmail;
