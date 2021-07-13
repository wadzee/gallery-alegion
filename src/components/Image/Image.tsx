export interface ImageProps {
  src: string
  alt?: string
  className?: string
  styles?: React.CSSProperties
  children?: React.ReactNode
  onClick?: () => void
}

const noop = () => {}

export default function Image({
  alt = '',
  onClick = noop,
  ...rest
}: ImageProps) {
  return <img data-component="Image" alt={alt} {...rest} onClick={onClick} />
}
