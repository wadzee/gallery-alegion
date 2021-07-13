import { useEffect, useState } from 'react'
import { getImageList, ImageListProps, common } from 'services'
import { LazyLoadImg } from 'Utils'
import Pagination from 'components/Pagination'
import Image from 'components/Image'
import classes from 'classnames'
import './gallery.scss'

export default function GalleryPage() {
  const [page, setPage] = useState(0)
  const [images, setImages] = useState<ImageListProps[]>()

  useEffect(() => {
    setImages([])
    fetchAPI(page + 1)
  }, [page])

  async function fetchAPI(page: number) {
    const item = await getImageList({ page })
    setImages(item)
  }

  return (
    <div>
      <h1>Gallery - Alegion</h1>
      <div>Made with love, lmao</div>
      <Pagination
        className="pagination"
        onPageChange={(val) => setPage(val)}
        currentPage={page}
        totalPages={4}
      />
      <div className="gallery-grid">
        {images?.map((image, idx) => {
          return <Images id={image.id} key={`image-${idx}`} />
        })}
      </div>
      {images && images.length > 0 && (
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

const Images = ({ id }: { id: number }) => {
  const { src, blur } = LazyLoadImg(
    `${common}/id/${id}/50`,
    `${common}/id/${id}/1000`
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
