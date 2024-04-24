/* eslint-disable @next/next/no-img-element */
import { UseFormReturn } from 'react-hook-form'
import { CheckoutFormType } from './multi-step-form'
import { FormControl, FormField, FormItem } from '@/components/shadcn/ui/form'
import React from 'react'
import { Button } from '@/components/shadcn/ui/button'
import { useCheckoutStore } from '@/store/checkout-store'
import { cn } from '@/lib/utils/utils'

export function PaymentInfo({
  form,
  showing,
}: {
  form: UseFormReturn<CheckoutFormType>
  showing: boolean
}) {
  const setStage = useCheckoutStore((s) => s.setStage)

  const onSubmit = async () => {
    form.trigger(['paymentType']).then((isValid) => {
      if (isValid) {
        setStage('confirmation')
      }
    })
  }

  return (
    <div
      className={cn(
        'flex flex-col gap-1 transition-opacity animate-fadeIn',
        !showing && 'opacity-0'
      )}
    >
      <h2 className="text-2xl">Método de pago</h2>
      <span className="mb-6 font-thin text-sm">
        Elegí uno de los métodos de pago
      </span>
      <div className="flex flex-col gap-5">
        <FormField
          control={form.control}
          name="paymentType"
          render={({ field: { onChange, value } }) => {
            return (
              <FormItem className="flex flex-col items-start">
                <FormControl>
                  <div className="flex flex-col gap-2">
                    <PaymentRadio
                      name="paymentType"
                      value="mp"
                      isSelected={value === 'mp'}
                      defaultChecked
                      onChange={onChange}
                    />
                    <PaymentRadio
                      name="paymentType"
                      value="paypal"
                      isSelected={value === 'paypal'}
                      onChange={onChange}
                    />
                    <PaymentRadio
                      name="paymentType"
                      value="bank"
                      isSelected={value === 'bank'}
                      onChange={onChange}
                    />
                  </div>
                </FormControl>
              </FormItem>
            )
          }}
        />

        <Button
          type="button"
          variant={'default'}
          className="self-end"
          onClick={() => onSubmit()}
        >
          Continuar con el pago
        </Button>
      </div>
    </div>
  )
}

export const methodMapper = {
  mp: {
    image: '/mplogo.webp',
    name: 'Mercado Pago',
  },
  paypal: {
    image: '/paypallogo.webp',
    name: 'Paypal',
  },
  bank: {
    image: '/bank.png',
    name: 'Transferencia bancaria',
  },
}

function PaymentRadio({
  name,
  value,
  onChange,
  defaultChecked = false,
  isSelected,
}: {
  name: string
  isSelected: boolean
  value: string
  onChange: any
  defaultChecked?: boolean
}) {
  // @ts-ignore
  const data = methodMapper[value] as any

  return (
    <label
      className={cn(
        'gap-2 cursor-pointer border border-border rounded-md w-full h-24 items-center justify-center flex p-5 md:min-w-[500px] transition-[box-shadow,border-color]',
        isSelected &&
          '[box-shadow:0_0_22px_2px_rgba(255,255,255,.3)_inset] border-white'
      )}
    >
      <input
        className="hidden"
        type="radio"
        defaultChecked={defaultChecked}
        name={name}
        value={value}
        onChange={onChange}
      />
      <img
        src={data.image}
        alt={data.name}
        className={cn(
          'object-contain w-full h-full transition-transform select-none',
          isSelected && 'scale-90'
        )}
      />
    </label>
  )
}
