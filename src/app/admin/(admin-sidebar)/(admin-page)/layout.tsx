import { DatePickerWithRange } from '@/components/shadcn/date-picker'
import { Separator } from '@/components/shadcn/ui/separator'
import { Main } from '@/components/ui/common/main'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Main withAnalytics={false} className="flex flex-col px-3 py-5">
      <div className="grid grid-cols-[auto_300px]">
        <h1 className="text-2xl font-extralight">Panel de administración</h1>
        <DatePickerWithRange />
      </div>
      <Separator className="my-4" />
      {children}
    </Main>
  )
}
