import axios from 'axios'

export const common = 'https://picsum.photos'

interface ListProps {
  page: number
  limit?: number
}

export interface ImageListProps {
  id: number
  author: string
  width: number
  height: number
  url: string
  download_url: string
}

export async function getImageList({ page, limit = 30 }: ListProps) {
  try {
    return await axios
      .get<ImageListProps[]>(`${common}/v2/list?page=${page}&limit=${limit}`)
      .then((res) => res.data)
  } catch (err) {
    console.log('err')
  }
}

// export async function getImageById (id: number) {
//   const images
// }
