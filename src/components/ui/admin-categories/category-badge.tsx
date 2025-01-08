import { Badge } from '@/components/shadcn/ui/badge'
import { addModal } from 'react-modal-observer'
import { DeleteCategoryModal } from './modals/delete-category-modal'
import { useAdminCategoriesActions } from './use-admin-categories-page'
import { appFetch } from '@/lib/utils/appFetch'
import { toast } from 'sonner'

export function CategoryBadge({
  name,
  variants,
}: {
  name: string
  variants: string[]
}) {
  const { dispatch } = useAdminCategoriesActions()

  const onDelete = async () => {
    await appFetch('/api/categories', {
      method: 'DELETE',
      body: JSON.stringify({ name }),
    })
      .then(() => {
        dispatch({ type: 'remove-category', payload: name })
      })
      .catch((err) => {
        console.error(err)
        toast.error(`Ocurrió un error al borrar el estilo ${name}`)
      })
  }

  const handleClick = () => {
    addModal(DeleteCategoryModal, { onDelete })
  }

  return (
    <Badge
      className="flex flex-col cursor-pointer"
      onClick={handleClick}
      role="button"
    >
      <span>{name}</span>
      <div className="flex gap-1 text-[.65rem] font-extralight">
        {variants.map((el) => (
          <span key={el}>{el}</span>
        ))}
      </div>
    </Badge>
  )
}
