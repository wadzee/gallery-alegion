import styles from './Spinner.module.scss'

export interface SpinnerProps {
  variant?: 'circle' | 'dots'
}

export default function Spinner({ variant = 'circle' }: SpinnerProps) {
  return (
    <div className={styles.container}>
      {variant === 'circle' && <span className={styles.circle} />}
      {variant === 'dots' && (
        <span className={styles.dots}>
          <span />
          <span />
          <span />
        </span>
      )}
    </div>
  )
}
