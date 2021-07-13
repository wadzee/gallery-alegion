import styles from './Spinner.module.scss'

export interface SpinnerProps {
  variant?: 'circle' | 'dots'
}

export default function Spinner({ variant = 'circle' }: SpinnerProps) {
  return (
    <div data-component="Spinner">
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
