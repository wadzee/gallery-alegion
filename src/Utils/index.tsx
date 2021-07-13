import { useEffect, useState } from 'react'

export function LazyLoadImg(lowQualitySrc: string, highQualitySrc: string) {
  const [src, setSrc] = useState(lowQualitySrc)

  useEffect(() => {
    setSrc(lowQualitySrc)
    const img = new Image()
    img.src = highQualitySrc
    img.onload = () => {
      setSrc(highQualitySrc)
    }
  }, [lowQualitySrc, highQualitySrc])

  return { src, blur: src === lowQualitySrc }
}
