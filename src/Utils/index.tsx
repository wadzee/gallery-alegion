import { useEffect, useState } from 'react'

export function LazyLoadImg(lowQualitySrc: string, highQualitySrc: string) {
  const [src, setSrc] = useState(lowQualitySrc)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    setSrc(lowQualitySrc)
    const img = new Image()
    img.src = highQualitySrc
    img.onload = () => {
      setSrc(highQualitySrc)
      setLoading(false)
    }
  }, [lowQualitySrc, highQualitySrc])

  return { src, loading }
}
