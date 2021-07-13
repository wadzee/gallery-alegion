import React from 'react'
import classes from 'classnames'
import styles from './Button.module.scss'

export interface ButtonProps {
  component?: React.ElementType
  onClick?: () => void
  children: React.ReactNode
  variant?: 'outlined' | 'contained'
  className?: string
  disabled?: boolean
  download?: boolean
  href?: string
  target?: '_blank' | '_self' | '_parent' | '_top'
}

const noop = () => {}

export default function Button({
  component = 'button',
  variant = 'contained',
  onClick = noop,
  className,
  children,
  disabled,
  ...rest
}: ButtonProps) {
  const ButtonComponent = component
  return (
    <ButtonComponent
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
    </ButtonComponent>
  )
}
