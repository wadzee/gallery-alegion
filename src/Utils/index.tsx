import { useEffect, useState } from 'react'

export function LazyLoadImg(lowQualitySrc: string, highQualitySrc: string) {
  const [src, setSrc] = useState(lowQualitySrc)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setSrc(lowQualitySrc)
    setLoading(true)
    const img = new Image()
    img.src = highQualitySrc
    img.onload = () => {
      setSrc(highQualitySrc)
      setLoading(false)
    }
  }, [lowQualitySrc, highQualitySrc])

  return { src, loading }
}
