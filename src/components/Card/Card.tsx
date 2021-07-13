import styles from './Card.module.scss'
import classes from 'classnames'

export interface CardProps {
  className?: string
  padding?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export default function Card({
  padding = 'sm',
  children,
  className = ''
}: CardProps) {
  return (
    <div
      data-component="Card"
      className={classes(styles.card, className, {
        [styles[`card--${padding}`]]: padding !== 'sm'
      })}>
      {children}
    </div>
  )
}
