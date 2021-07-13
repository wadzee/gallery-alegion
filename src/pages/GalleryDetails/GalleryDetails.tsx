import { ChangeEvent, useEffect, useState } from 'react'
import Image from 'components/Image'
import { useLocation, useHistory } from 'react-router'
import { getImageById, ImageListProps, getImageBlob, common } from 'services'
import { LazyLoadImg } from 'Utils'
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
  const [blurred, setBlurred] = useState(0)
  const [applyBlur, setApplyBlur] = useState(false)
  const [loading, setLoading] = useState(false)
  const query = useQuery().get('id')
  const history = useHistory()

  useEffect(() => {
    fetchAPI()

    async function fetchAPI() {
      if (query) {
        const data = await getImageById(parseInt(query))
        setImage(data)
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
    if (value <= 10) {
      setBlurred(value)
    } else {
      event.preventDefault()
    }
  }

  const onApplyBlur = () => {
    setApplyBlur(true)
  }

  const onLoad = (val: boolean) => {
    setLoading(val)
    setApplyBlur(false)
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
            {loading && (
              <div className="spinner-container">
                <Spinner />
              </div>
            )}
            <Images
              {...image}
              onLoad={onLoad}
              blurred={applyBlur ? blurred : 0}
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
                  onChange={onInputChange}
                  type="number"
                  pattern="[0-9]*"
                  min={0}
                  max={10}
                />
                <div className="button-container">
                  <Button onClick={onApplyBlur}>Apply</Button>
                </div>
              </Card>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

const Images = ({
  id,
  blurred = 0,
  onLoad
}: ImageListProps & {
  blurred?: string | number
  onLoad: (val: boolean) => void
}) => {
  const { src, loading } = LazyLoadImg(
    `${common}/id/${id}/50`,
    `${common}/id/${id}/4000/${blurred > 0 ? `?blur=${blurred}` : ''}`
  )

  useEffect(() => {
    onLoad(loading)
    console.log('hihi')
  }, [loading, onLoad])

  return (
    <>
      {!loading && (
        <Image
          src={src}
          className={classes({
            'load-photo': loading
          })}
        />
      )}
    </>
  )
}
