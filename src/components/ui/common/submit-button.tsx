/* eslint-disable react/display-name */
import { Button } from '@/components/shadcn/ui/button'
import React, { forwardRef } from 'react'
import Spinner from './spinner'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean
  text: string
}

export const SubmitButton = forwardRef<HTMLButtonElement, Props>(
  ({ loading, text, ...props }, ref) => {
    return (
      <Button ref={ref} {...props} disabled={loading}>
        {loading ? <Spinner /> : text}
      </Button>
    )
  },
)
