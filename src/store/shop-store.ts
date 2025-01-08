import { create } from 'zustand'

export type CartItemType = {
  id: string
  name: string
  price: string
  variation: string
  quantity: number
  image: string
}

export type CartStore = {
  cart: CartItemType[]
  open: boolean
  openCart: () => void
  closeCart: () => void
  setCart: (cart: CartItemType[]) => void
  addToCart: (item: CartItemType) => void
  quantityDown: (id: string, variation: string) => void
  quantityUp: (id: string, variation: string) => void
  removeFromCart: (id: string, variation: string) => void
  clearCart: () => void
}

export const useCartStore = create<CartStore>(set => ({
  cart: [],
  open: false,

  openCart: () => set({ open: true }),
  closeCart: () => set({ open: false }),


  setCart: (cart) => set({ cart }),
  addToCart: (item) => set((state) => {
    const itemIndex = state.cart.findIndex((cartItem) => compareUniqueIds(cartItem, item))
    if (itemIndex === -1) {
      const updatedCart = [...state.cart, item]
      return server({ cart: updatedCart })
    }
    const updatedCart = [...state.cart]
    updatedCart[itemIndex].quantity += 1

    return server({ cart: updatedCart })
  }
  ),
  quantityDown: (id, variation) => set((state) => {
    const itemIndex = state.cart.findIndex((cartItem) => getUniqueId(cartItem) === generateUniqueId(id, variation))
    if (itemIndex === -1) {
      return { cart: state.cart }
    }
    if (state.cart[itemIndex].quantity <= 1) {
      return { cart: state.cart }
    }
    const updatedCart = [...state.cart]
    updatedCart[itemIndex].quantity -= 1


    return server({ cart: updatedCart })
  }
  ),
  quantityUp: (id, variation) => set((state) => {
    const itemIndex = state.cart.findIndex((cartItem) => getUniqueId(cartItem) === generateUniqueId(id, variation))
    if (itemIndex === -1) {
      return { cart: state.cart }
    }
    const updatedCart = [...state.cart]
    updatedCart[itemIndex].quantity += 1


    return server({ cart: updatedCart })
  }
  ),
  removeFromCart: (id, variation) => set((state) => {
    const updatedCart = { cart: state.cart.filter((cartItem) => getUniqueId(cartItem) !== generateUniqueId(id, variation)) }

    return server(updatedCart)
  })
  ,
  clearCart: () => {
    return set(server({ cart: [] }))
  },
}))

function server(state: CartStore | Partial<CartStore>) {
  fetch('/api/shop/cart', {
    method: 'POST',
    credentials: 'same-origin',
    body: JSON.stringify({ cart: state.cart?.map(({ image, ...rest }) => rest) })
  })

  return state
}

const generateUniqueId = (id: string, variation: string) => {
  return `${id}-${variation}`
}
const getUniqueId = (item: CartItemType) => {
  return generateUniqueId(item.id, item.variation)
}
const compareUniqueIds = (item1: CartItemType, item2: CartItemType): boolean => {
  return getUniqueId(item1) === getUniqueId(item2)
}