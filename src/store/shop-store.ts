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
  quantityDown: (id: string) => void
  quantityUp: (id: string) => void
  removeFromCart: (id: string) => void
  clearCart: () => void
}

export const useCartStore = create<CartStore>(set => ({
  cart: [],
  open: false,

  openCart: () => set({ open: true }),
  closeCart: () => set({ open: false }),


  setCart: (cart) => set({ cart }),
  addToCart: (item) => set((state) => {
    const itemIndex = state.cart.findIndex((cartItem) => cartItem.id === item.id)
    if (itemIndex === -1) {
      const updatedCart = [...state.cart, item]
      return server({ cart: updatedCart })
    }
    const updatedCart = [...state.cart]
    updatedCart[itemIndex].quantity += 1

    return server({ cart: updatedCart })
  }
  ),
  quantityDown: (id) => set((state) => {
    const itemIndex = state.cart.findIndex((cartItem) => cartItem.id === id)
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
  quantityUp: (id) => set((state) => {
    const itemIndex = state.cart.findIndex((cartItem) => cartItem.id === id)
    if (itemIndex === -1) {
      return { cart: state.cart }
    }
    const updatedCart = [...state.cart]
    updatedCart[itemIndex].quantity += 1


    return server({ cart: updatedCart })
  }
  ),
  removeFromCart: (id) => set((state) => {
    const updatedCart = { cart: state.cart.filter((item) => item.id !== id) }

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