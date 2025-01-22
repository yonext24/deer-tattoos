import { Separator } from '@/components/shadcn/ui/separator'
import { Back } from '@/components/ui/common/back'
import { Section } from '@/components/ui/common/section'
import React from 'react'

export default function Layout({
  children,
  recommendations,
}: {
  children: React.ReactNode
  recommendations: React.ReactNode
}) {
  return (
    <Section className="min-h-[var(--section-min-height)] flex flex-col justify-center items-start pb-12 mx-auto">
      <Back className="mb-6 mt-2" />
      {children}
      <Separator className="my-4 w-full sm:w-1/2" />
      {recommendations}
    </Section>
  )
}
