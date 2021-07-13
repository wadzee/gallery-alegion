import React from 'react'
import classes from 'classnames'
import styles from './Button.module.scss'

export interface ButtonProps {
  onClick?: () => void
  children: React.ReactNode
  variant?: 'outlined' | 'contained'
  className?: string
  disabled?: boolean
}

const noop = () => {}

export default function Button({
  variant = 'contained',
  onClick = noop,
  className,
  children,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      data-component="Button"
      onClick={onClick}
      className={classes(
        styles.button,
        {
          [styles[`button--${variant}`]]: variant,
          [styles[`button--disabled`]]: disabled
        },
        className
      )}
      disabled={disabled}
      {...rest}>
      {children}
    </button>
  )
}
