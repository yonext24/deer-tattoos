import type {
  ComponentPropsWithoutRef,
  ElementType,
  PropsWithChildren,
} from 'react'

export type SearchParamsType = { [key: string]: string | string[] | undefined }

export type WithPagination<T> = {
  page: number
  total: number
  data: T
}

type PolymorphicAsProp<E extends ElementType> = {
  as?: E
}

type PolymorphicProps<E extends ElementType> = PropsWithChildren<
  ComponentPropsWithoutRef<E> & PolymorphicAsProp<E>
>

