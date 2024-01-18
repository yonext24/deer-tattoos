/* eslint-disable react/display-name */
import { Button, buttonVariants } from '@/components/shadcn/ui/button'
import React, { forwardRef } from 'react'
import Spinner from './spinner'
import { VariantProps } from 'class-variance-authority'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean
  text: string
} & VariantProps<typeof buttonVariants>

export const SubmitButton = forwardRef<HTMLButtonElement, Props>(
  ({ loading, text, disabled, ...props }, ref) => {
    return (
      <Button ref={ref} {...props} disabled={loading || disabled}>
        {loading ? <Spinner /> : text}
      </Button>
    )
  }
)
