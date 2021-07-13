export interface ImageProps {
  src: string
  alt?: string
  className?: string
  styles?: React.CSSProperties
  children?: React.ReactNode
}

export default function Image({ alt = '', ...rest }: ImageProps) {
  return <img data-component="Image" alt={alt} {...rest} />
}
