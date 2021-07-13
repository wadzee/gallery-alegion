import { useEffect, useState } from 'react'
import Image from 'components/Image'
import { useLocation } from 'react-router'
import { getImageById, ImageListProps, getImageBlob } from 'services'
import Button from 'components/Button'
import './gallery.scss'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

export default function GalleryDetailPage() {
  const [image, setImage] = useState<ImageListProps>()
  const query = useQuery().get('id')

  useEffect(() => {
    fetchAPI()

    async function fetchAPI() {
      if (query) {
        const data = await getImageById(parseInt(query))
        setImage(data)
      }
    }
  }, [query])

  async function DownloadImage(url: string, author: string) {
    const blob = await getImageBlob(url)

    if (blob) {
      const downloadLink = window.URL.createObjectURL(new Blob([blob.data]))
      const link = document.createElement('a')
      link.href = downloadLink
      link.setAttribute('download', `${author}.jpg`)
      document.body.appendChild(link)
      link.click()
    }
  }

  return (
    <div className="gallery-item-container">
      {image && (
        <>
          <div className="imageContainer">
            <Image src={image.download_url} />
          </div>
          <div className="info-container">
            <h2>Image Information :</h2>
            <ul>
              <li>Author: {image?.author}</li>
              <li>{image?.height}</li>
              <li>{image?.width}</li>
              <li>{image?.url}</li>
            </ul>
          </div>
          <Button
            component="a"
            onClick={() => DownloadImage(image.download_url, image.author)}>
            Download
          </Button>
        </>
      )}
    </div>
  )
}
