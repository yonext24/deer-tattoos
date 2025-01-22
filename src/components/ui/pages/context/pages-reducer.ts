import { Page } from "@/lib/types/page"

export type UpdatePayload = Partial<Page> & { id: string }

export type ActionType = | {
  type: 'add', payload: Page
} | { type: 'delete', payload: string } | { type: 'update', payload: UpdatePayload }

type StateType = Page[]


export const PagesReducer = (state: StateType, action: ActionType) => {
  if (action.type === 'add') {
    return [...state, action.payload]
  }

  if (action.type === 'update') {
    const updateId = action.payload.id
    const stateItemIndex = state.findIndex(el => el.id === updateId)
    const newState = [...state]
    newState[stateItemIndex] = { ...newState[stateItemIndex], ...action.payload }

    return newState
  }

  if (action.type === 'delete') {
    return [...state].filter(el => el.id !== action.payload)
  }

  return state
}