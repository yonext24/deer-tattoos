'use client'

import { Page } from '@/lib/types/page'
import React, { createContext, Dispatch, useContext, useReducer } from 'react'
import { ActionType, PagesReducer } from './pages-reducer'
import { PageCard } from '../page-card/page-card'

type PageContext = {
  state: Page[]
  dispatch: Dispatch<ActionType>
}

const pageContext = createContext<PageContext>({
  state: [],
  dispatch: () => {},
})

export const PageContextProvider = ({
  children,
  data,
}: {
  children: React.ReactNode
  data: Page[]
}) => {
  const [state, dispatch] = useReducer(PagesReducer, data)

  return (
    <pageContext.Provider value={{ state, dispatch }}>
      {children}
    </pageContext.Provider>
  )
}

export const usePagesContext = () => {
  return useContext(pageContext)
}

export const RenderPages = () => {
  const { state, dispatch } = usePagesContext()

  return (
    <div className="flex flex-col mt-6 gap-2">
      {state.map((el) => (
        <PageCard key={el.id} page={el} />
      ))}
    </div>
  )
}
