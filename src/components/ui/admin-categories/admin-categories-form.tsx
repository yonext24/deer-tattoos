'use client'

import { AddCategoryModal } from './modals/add-category-modal'
import { Style } from '@/lib/types/style'
import { CategoryBadge } from './category-badge'
import {
  AdminCategoriesProvider,
  useAdminCategoriesActions,
} from './use-admin-categories-page'

function AdminCategories() {
  const { state } = useAdminCategoriesActions()

  // ye i kinda fucked up with all the categories/styles naming, they are the same but i wanna end this quick
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-1 w-full flex-wrap">
        {state.map((el) => (
          <CategoryBadge key={el.name} {...el} />
        ))}
      </div>
      <AddCategoryModal />
    </div>
  )
}

export const AdminCategoriesForm = ({
  categories,
}: {
  categories: Style[]
}) => {
  return (
    <AdminCategoriesProvider styles={categories}>
      <AdminCategories />
    </AdminCategoriesProvider>
  )
}
