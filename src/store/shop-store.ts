import { Cart, CartItem, Product, ProductVariant } from '@/lib/shopify/types'
import { create } from 'zustand'

export type CartStore = {
  cart: Cart
  open: boolean
  openCart: () => void
  closeCart: () => void
  setCart: (cart: Cart) => void
  addToCart: (item: Product, variant: ProductVariant) => void
  quantityDown: (variant: string) => void
  quantityUp: (variant: string) => void
  removeFromCart: (variant: string) => void
  clearCart: () => void
}

function calculateItemCost(quantity: number, price: string | number): string {
  return (Number(price) * quantity).toString();
}

function generateItemFromProduct(product: Product, variant: ProductVariant, amount: string): CartItem {
  return {
    id: product?.id,
    quantity: 1,
    cost: {
      totalAmount: {
        amount,
        currencyCode: variant.price.currencyCode
      }
    },
    merchandise: {
      id: variant.id,
      title: variant.title,
      selectedOptions: variant.selectedOptions,
      quantityAvailable: variant.quantityAvailable,
      product: {
        id: product.id,
        handle: product.handle,
        title: product.title,
        featuredImage: product.featuredImage
      }
    }
  }
}

export const useCartStore = create<CartStore>(set => ({
  cart: createEmptyCart(),
  open: false,

  openCart: () => set({ open: true }),
  closeCart: () => set({ open: false }),


  setCart: (cart) => set({ cart }),

  addToCart: (product, variant) => set((state) => {
    const existingProductIndex = state.cart.lines.findIndex(el => el.merchandise.id === variant.id)

    if (existingProductIndex === -1) {
      const newProduct = generateItemFromProduct(product, variant, calculateItemCost(1, variant.price.amount));
      const updatedCartLines = [newProduct, ...state.cart?.lines]

      return generateCartFromNewLines(state, updatedCartLines)
    }

    const updatedCartLines = [...state.cart.lines]
    updatedCartLines[existingProductIndex].quantity++

    return generateCartFromNewLines(state, updatedCartLines)
  }
  ),
  quantityDown: (variantId) => set((state) => {
    const itemIndex = state.cart.lines.findIndex((item) => item.merchandise.id === variantId)
    if (itemIndex === -1) {
      return state
    }
    const item = state.cart.lines[itemIndex]

    if (item.quantity <= 1) {
      return state
    }
    const originalItemPrice = Number(item.cost.totalAmount.amount) / item.quantity

    const updatedCartLines = [...state.cart.lines]
    updatedCartLines[itemIndex].quantity--
    const newItemPrice = originalItemPrice * updatedCartLines[itemIndex].quantity
    updatedCartLines[itemIndex].cost.totalAmount = {
      ...updatedCartLines[itemIndex].cost.totalAmount,
      amount: generateNewAmountString(String(newItemPrice))
    }

    return generateCartFromNewLines(state, updatedCartLines)
  }
  ),
  quantityUp: (variantId) => set((state) => {
    const itemIndex = state.cart.lines.findIndex((item) => item.merchandise.id === variantId)
    if (itemIndex === -1) {
      return state
    }
    const item = state.cart.lines[itemIndex]

    const originalItemPrice = Number(item.cost.totalAmount.amount) / item.quantity

    const updatedCartLines = [...state.cart.lines]
    updatedCartLines[itemIndex].quantity++
    const newItemPrice = originalItemPrice * updatedCartLines[itemIndex].quantity
    updatedCartLines[itemIndex].cost.totalAmount = {
      ...updatedCartLines[itemIndex].cost.totalAmount,
      amount: generateNewAmountString(String(newItemPrice))
    }

    return generateCartFromNewLines(state, updatedCartLines)
  }
  ),
  removeFromCart: (variantId) => set((state) => {
    const updatedCartLines = state.cart.lines.filter((item) => item.merchandise.id !== variantId)

    return generateCartFromNewLines(state, updatedCartLines)
  })
  ,
  clearCart: () => {
    return set(s => server({ cart: createEmptyCart(s.cart.id) }))
  },
}))

function server(state: CartStore | Partial<CartStore>) {

  return state
}


function updateCartTotals(lines: CartItem[]): Pick<Cart, 'totalQuantity' | 'cost'> {
  const totalQuantity = lines.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = lines.reduce((sum, item) => sum + Number(item.cost.totalAmount.amount), 0);
  const currencyCode = lines[0]?.cost.totalAmount.currencyCode ?? 'ARS';

  return {
    totalQuantity,
    cost: {
      isLoading: true,
      subtotalAmount: { amount: totalAmount.toString(), currencyCode },
      totalAmount: { amount: totalAmount.toString(), currencyCode },
      totalTaxAmount: { amount: '0', currencyCode }
    }
  };
}

function generateCartFromNewLines(state: CartStore, newLines: CartItem[]): CartStore {
  const cart = state.cart

  if (newLines.length === 0) {
    return {
      ...state,
      cart: {
        ...state.cart,
        lines: [],
        totalQuantity: 0,
        cost: {
          ...cart.cost,
          totalAmount: { ...cart.cost.totalAmount, amount: '0' }
        },
      }

    };
  }


  return { ...state, cart: { ...state.cart, lines: newLines, ...updateCartTotals(newLines) } }
}

function createEmptyCart(id?: string): Cart {
  return {
    id: id,
    checkoutUrl: '',
    totalQuantity: 0,
    lines: [],
    cost: {
      subtotalAmount: { amount: '0', currencyCode: 'ARS' },
      totalAmount: { amount: '0', currencyCode: 'ARS' },
      totalTaxAmount: { amount: '0', currencyCode: 'ARS' }
    }
  };
}

function generateNewAmountString(price: string) {
  const hasDecimals = price.split('.').length > 1

  return hasDecimals ?
    price
    : price + '.0'
}
