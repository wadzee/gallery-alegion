export interface ImageProps {
  src: string
  alt?: string
  className?: string
  styles?: React.CSSProperties
  children?: React.ReactNode
  onLoad?: () => void
}

const noop = () => {}

export default function Image({
  alt = '',
  onLoad = noop,
  ...rest
}: ImageProps) {
  return <img data-component="Image" alt={alt} {...rest} onLoad={onLoad} />
}
