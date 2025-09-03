import styles from './EWProgressBar.module.css';

interface EWProgressBarProps {
  label: string;
  value: number;
  max?: number;
  variant?: 'success' | 'danger' | 'default';
}

const EWProgressBar = ({
  label,
  value,
  max = 100,
  variant = 'default',
}: EWProgressBarProps) => {
  const percentage = (value / max) * 100;

  return (
    <div className={styles.container}>
      <div className={styles.label}>
        {`${label}: ${value}${max !== 100 ? `/${max}` : '%'}`}
      </div>
      <div className={`${styles.progressBar} ${styles[variant]}`}>
        <div
          className={styles.progressFill}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={`${label}: ${value}${max !== 100 ? ` out of ${max}` : ' percent'}`}
        />
      </div>
    </div>
  );
};

export default EWProgressBar;
