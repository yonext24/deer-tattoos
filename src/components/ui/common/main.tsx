/* eslint-disable react/display-name */
import { cn } from '@/lib/utils/utils'
import Script from 'next/script'
import { ForwardedRef, HTMLAttributes, forwardRef } from 'react'
import { isProduction } from '@/lib/utils/consts'

type MainProps = {
  withMarginOnTop?: boolean
  withAnalytics?: boolean
} & HTMLAttributes<HTMLElement>

export const Main = forwardRef<HTMLElement, MainProps>(
  (
    { withMarginOnTop, withAnalytics = true, ...props },
    ref: ForwardedRef<HTMLElement>
  ) => {
    return (
      <main
        ref={ref}
        className={cn(
          'flex-1 flex flex-col w-full gap-4',
          withMarginOnTop && 'mt-1',
          props.className
        )}
        {...props}
      >
        {withAnalytics && isProduction && (
          <Script
            defer
            strategy="lazyOnload"
            src="https://unpkg.com/@tinybirdco/flock.js"
            data-host="https://api.tinybird.co"
            data-token="p.eyJ1IjogIjM3MWMyYWNmLWM2ODgtNGVmNy1iNTIyLTk2MWU0ZWVkMDlmNSIsICJpZCI6ICIzYmM5NDY5YS1jNTM1LTQyNmUtOTkwNS1lZWZjYmU4YzljYTIiLCAiaG9zdCI6ICJldV9zaGFyZWQifQ.UGYLJ3KrzuCfX-WA8SyLF1INyfxpFU3lB07Ch1Nwvts"
          />
        )}
        {props.children}
      </main>
    )
  }
)
