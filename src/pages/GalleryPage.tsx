import { useEffect, useState } from 'react'
import { getImageList, ImageListProps, common } from 'services'
import Pagination from 'components/Pagination'
import Image from 'components/Image'
import './gallery.scss'
import Spinner from 'components/Spinner'

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
          return <Images id={image.id} />
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

const Images = ({ id }: { id: number }) => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(false)
  }, [id])

  const onLoad = () => {
    setLoaded(true)
  }

  return (
    <>
      {!loaded && <Spinner variant="dots" />}
      <Image src={`${common}/id/${id}/200`} onLoad={onLoad} />
    </>
  )
}
