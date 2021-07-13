import { useEffect, useState } from 'react'
import { getImageList, ImageListProps, common } from 'services'
import { LazyLoadImg } from 'Utils'
import Pagination from 'components/Pagination'
import Image from 'components/Image'
import classes from 'classnames'
import './gallery.scss'
import Spinner from 'components/Spinner'

export default function GalleryPage() {
  const [page, setPage] = useState(0)
  const [images, setImages] = useState<ImageListProps[]>()

  useEffect(() => {
    setImages(undefined)
    fetchAPI(page + 1)
  }, [page])

  async function fetchAPI(page: number) {
    const item = await getImageList({ page })
    setImages(item)
  }

  return (
    <div className="gallery-container">
      <h1>Gallery - Alegion</h1>
      <div>Made with love, lmao</div>
      <Pagination
        className="pagination"
        onPageChange={(val) => setPage(val)}
        currentPage={page}
        totalPages={4}
      />
      <div className="gallery-grid">
        {!images && <Spinner />}
        {images?.map((image, idx) => {
          return <Images image={image} key={`image-${idx}`} />
        })}
      </div>
      <Pagination
        className="pagination"
        onPageChange={(val) => setPage(val)}
        currentPage={page}
        totalPages={4}
      />
    </div>
  )
}

const Images = ({ image }: { image: ImageListProps }) => {
  const { src, blur } = LazyLoadImg(
    `${common}/id/${image.id}/50`,
    `${common}/id/${image.id}/1000`
  )

  return (
    <>
      <Image
        src={src}
        className={classes({
          'load-photo': blur
        })}
      />
    </>
  )
}
