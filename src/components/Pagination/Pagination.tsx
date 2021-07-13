import Button from '../Button'
import styles from './Pagination.module.scss'
import classes from 'classnames'

export interface PaginationProps {
  currentPage?: number
  totalPages?: number
  onPageChange: (value: number) => void
  className?: string
}

export default function Pagination({
  currentPage = 0,
  totalPages = 4,
  className,
  onPageChange
}: PaginationProps) {
  const lastPage = totalPages - 1

  return (
    <nav>
      <ul className={classes(styles.container, className)}>
        <Button
          variant="outlined"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 0}>
          Previous
        </Button>
        {Array.from({
          length: totalPages
        }).map((_value, index: number) => {
          return (
            <Button
              key={`button-${index}`}
              className={styles.button}
              variant={currentPage === index ? 'contained' : 'outlined'}
              onClick={() => onPageChange(index)}>
              {index + 1}
            </Button>
          )
        })}
        <Button
          variant="outlined"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === lastPage}>
          Next
        </Button>
      </ul>
    </nav>
  )
}
