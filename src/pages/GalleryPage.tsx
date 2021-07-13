import { useEffect, useState } from 'react'
import { getImageList, ImageListProps, common } from 'services'
import { LazyLoadImg } from 'Utils'
import { useHistory } from 'react-router'
import Pagination from 'components/Pagination'
import Image from 'components/Image'
import Spinner from 'components/Spinner'
import classes from 'classnames'
import './gallery.scss'

export default function GalleryPage() {
  const [page, setPage] = useState(0)
  const [images, setImages] = useState<ImageListProps[]>()
  const history = useHistory()

  useEffect(() => {
    setImages(undefined)
    fetchAPI(page + 1)
  }, [page])

  async function fetchAPI(page: number) {
    const item = await getImageList({ page })
    setImages(item)
  }

  const onImageClick = (id: ImageListProps['id']) => {
    history.push(`/image?id=${id}`)
  }

  return (
    <div className="gallery-container">
      <h1>Gallery - Alegion</h1>
      <Pagination
        className="pagination"
        onPageChange={(val) => setPage(val)}
        currentPage={page}
        totalPages={4}
      />
      <div className="gallery-grid">
        {!images && <Spinner />}
        {images?.map((image, idx) => {
          return (
            <Images
              {...image}
              key={`image-${idx}`}
              onClick={() => onImageClick(image.id)}
            />
          )
        })}
      </div>
      {images && (
        <Pagination
          className="pagination"
          onPageChange={(val) => setPage(val)}
          currentPage={page}
          totalPages={4}
        />
      )}
    </div>
  )
}

const Images = ({ id, onClick }: ImageListProps & { onClick: () => void }) => {
  const { src, blur } = LazyLoadImg(
    `${common}/id/${id}/50`,
    `${common}/id/${id}/1000`
  )

  return (
    <>
      <Image
        src={src}
        onClick={onClick}
        className={classes({
          'load-photo': blur
        })}
      />
    </>
  )
}
