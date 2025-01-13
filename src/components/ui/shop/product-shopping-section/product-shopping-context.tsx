/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter, useSearchParams } from 'next/navigation'
import { createContext, useContext, useMemo, useOptimistic } from 'react'

type ProductState = {
  [key: string]: string
} & {
  image?: string
}

export type ProductShoppingContextType = {
  state: ProductState
  updateOption: (name: string, value: string) => ProductState
  updateImage: (index: string) => ProductState
}

const ProductShoppingContext = createContext<
  ProductShoppingContextType | undefined
>(undefined)

export const ProductShoppingContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const searchParams = useSearchParams()

  const getInitialState = () => {
    const params: ProductState = {}
    for (const [key, value] of searchParams.entries()) {
      params[key] = value
    }
    return params
  }

  const [state, setOptimisticState] = useOptimistic(
    getInitialState(),
    (prevState: ProductState, update: ProductState) => ({
      ...prevState,
      ...update,
    })
  )
  console.log(state)

  const updateOption = (name: string, value: string) => {
    const newState = { [name]: value }
    setOptimisticState(newState)
    return { ...state, ...newState }
  }

  const updateImage = (index: string) => {
    const newState = { image: index }
    setOptimisticState(newState)
    return { ...state, ...newState }
  }

  const value = useMemo(
    () => ({
      state,
      updateOption,
      updateImage,
    }),
    [state]
  )

  return (
    <ProductShoppingContext.Provider value={value}>
      {children}
    </ProductShoppingContext.Provider>
  )
}

export function useProductShopping() {
  const context = useContext(ProductShoppingContext)
  if (context === undefined) {
    throw new Error('useProduct must be used within a ProductProvider')
  }
  return context
}

export function useUpdateURL() {
  const router = useRouter()

  return (state: ProductState) => {
    const newParams = new URLSearchParams(window.location.search)
    Object.entries(state).forEach(([key, value]) => {
      newParams.set(key, value)
    })
    router.push(`?${newParams.toString()}`, { scroll: false })
  }
}
