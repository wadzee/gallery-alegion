import { ChangeEvent, useEffect, useState } from 'react'
import Image from 'components/Image'
import { useLocation, useHistory } from 'react-router'
import { getImageById, ImageListProps, getImageBlob, common } from 'services'
import Spinner from 'components/Spinner'
import Card from 'components/Card'
import Button from 'components/Button'
import classes from 'classnames'
import './GalleryDetails.scss'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

export default function GalleryDetailPage() {
  const [image, setImage] = useState<ImageListProps>()
  const [srcUrl, setSrcUrl] = useState('')
  const [blurred, setBlurred] = useState<number | string>('')
  const [loading, setLoading] = useState(true)
  const query = useQuery().get('id')
  const history = useHistory()

  useEffect(() => {
    fetchAPI()

    async function fetchAPI() {
      if (query) {
        const data = await getImageById(parseInt(query))
        if (data) {
          setImage(data)
          setSrcUrl(`${common}/id/${data.id}/4000`)
        }
      }
    }
  }, [query])

  async function DownloadImage({ author, download_url }: ImageListProps) {
    const blob = await getImageBlob(
      blurred > 0 ? `${download_url}/?blur=${blurred}` : download_url
    )

    if (blob) {
      const downloadLink = window.URL.createObjectURL(new Blob([blob.data]))
      const link = document.createElement('a')
      link.href = downloadLink
      link.setAttribute('download', `${author}.jpg`)
      document.body.appendChild(link)
      link.click()
    }
  }

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value)
    if (isNaN(value)) {
      setBlurred('')
    }
    if (value <= 10) {
      setBlurred(value)
    } else {
      event.preventDefault()
    }
  }

  const onApplyBlur = (id: number) => {
    setLoading(true)
    if (blurred > 0) {
      setSrcUrl(`${common}/id/${id}/4000/?blur=${blurred}`)
    } else {
      setSrcUrl(`${common}/id/${id}/4000`)
    }
  }

  return (
    <div className="gallery-item">
      <h1>Gallery Item</h1>
      <div className="back-button">
        <Button variant="outlined" onClick={() => history.push('/')}>
          Go Back
        </Button>
        {image && (
          <Button onClick={() => DownloadImage(image)}>Download Image</Button>
        )}
      </div>
      {image && (
        <>
          <Card padding="sm" className="image-card">
            <div
              className={classes('spinner-container', {
                'spinner-hide': !loading
              })}>
              <Spinner />
            </div>
            <Image
              src={srcUrl}
              onLoad={() => setLoading(false)}
              className={classes({
                'image-hide': loading
              })}
            />
          </Card>
          <div className="info-card">
            <div>
              <h2>Image Information</h2>
              <Card padding="md">
                <p>
                  Author: <b>{image?.author}</b>
                </p>
                <p>
                  Width: <b>{image?.width}px</b>
                </p>
                <p>
                  Height: <b>{image?.height}px</b>
                </p>
              </Card>
            </div>
            <div>
              <h2>Apply Filter</h2>
              <Card padding="md">
                <p>Blur (0 - 10):</p>
                <input
                  value={blurred}
                  type="number"
                  onChange={onInputChange}
                  pattern="[0-9]*"
                  min={0}
                  max={10}
                />
                <div className="button-container">
                  <Button onClick={() => onApplyBlur(image.id)}>Apply</Button>
                </div>
              </Card>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
