import { Story, Meta } from '@storybook/react'
import { useState } from 'react'
import Pagination, { PaginationProps } from './Pagination'

export default {
  title: 'Components/Pagination',
  component: Pagination
} as Meta

const Template: Story<PaginationProps> = ({ currentPage, totalPages }) => {
  const [page, setPage] = useState(currentPage)

  const onPageChange = (val: number) => {
    setPage(val)
  }

  return (
    <Pagination
      currentPage={page}
      onPageChange={onPageChange}
      totalPages={totalPages}
    />
  )
}

export const Default = Template.bind({})
Default.args = {
  currentPage: 0,
  totalPages: 4
}
