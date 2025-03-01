import { Style } from '@/lib/types/style'
import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from 'react'

type AdminCategoryAction =
  | { type: 'add-category'; payload: Style }
  | { type: 'remove-category'; payload: string }
  | { type: 'set-state'; payload: Style[] }

const AdminCategoryReducer = (
  state: Style[],
  action: AdminCategoryAction
): Style[] => {

  if (action.type === 'add-category') {
    return [...state, action.payload]
  }
  if (action.type === 'remove-category') {
    return state.filter((el) => el.name !== action.payload)
  }
  if (action.type === 'set-state') {
    return action.payload
  }

  return state
}

export const AdminCategoriesContext = createContext<{
  state: Style[]
  dispatch: Dispatch<AdminCategoryAction>
}>({ state: [], dispatch: () => { } })

export const AdminCategoriesProvider = ({
  children,
  styles,
}: {
  children: ReactNode
  styles: Style[]
}) => {
  const [state, dispatch] = useReducer(AdminCategoryReducer, styles)

  return (
    <AdminCategoriesContext.Provider value={{ state, dispatch }}>
      {children}
    </AdminCategoriesContext.Provider>
  )
}

export const useAdminCategoriesActions = () => {
  const context = useContext(AdminCategoriesContext)
  if (context === undefined) {
    throw new Error(
      'useAdminCategoriesActions must be used within a AdminCategoriesContextProvider'
    )
  }
  return context
}
