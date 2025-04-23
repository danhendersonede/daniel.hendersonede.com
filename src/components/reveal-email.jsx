import { useState } from 'react';
import { motion } from 'motion/react';

const RevealEmail = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const email = 'daniel@hendersonede.com';
  const maskedEmail = "Email hidden from bots";

  return (
    <div className="reveal-email-container">
      <style jsx>{`
        .reveal-email-container {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          width: fit-content;
          margin: 0 ato;
        }

        .email-display {
          font-family: 'SF Mono', 'Menlo', monospace;
          font-size: 1.1rem;
          padding: 0.75rem 1.5rem;
          background: rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          min-width: 250px;
          text-align: center;
          position: relative;
          width: 35ch
        }

        .email-text {
          color: #333;
          font-weight: 500;
        }

        .email-text.masked {
          filter: blur(5px);
          transition: filter 0.3s ease;
        }

        .reveal-button {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .reveal-button:hover {
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
      `}</style>

      <div className="email-display">
        <motion.span
          key={isRevealed ? "revealed" : "masked"}
          initial={{ opacity: 0, y: isRevealed ? -10 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: isRevealed ? 10 : -10 }}
          className={`email-text ${!isRevealed ? 'masked' : ''}`}
        >
          {isRevealed ? email : maskedEmail}
        </motion.span>
      </div>
      
      <motion.button
        className="reveal-button"
        onClick={() => setIsRevealed(!isRevealed)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isRevealed ? 'Hide Email' : 'Reveal Email'}
      </motion.button>
    </div>
  );
};

export default RevealEmail;
