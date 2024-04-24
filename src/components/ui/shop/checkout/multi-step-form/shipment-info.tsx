import { UseFormReturn } from 'react-hook-form'
import { CheckoutFormType } from './multi-step-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/shadcn/ui/form'
import { Input } from '@/components/shadcn/ui/input'
import React from 'react'
import { Button } from '@/components/shadcn/ui/button'
import { useCheckoutStore } from '@/store/checkout-store'
import { cn } from '@/lib/utils/utils'

export function ShipmentInfo({
  form,
  showing,
}: {
  form: UseFormReturn<CheckoutFormType>
  showing: boolean
}) {
  const setStage = useCheckoutStore((s) => s.setStage)

  const onSubmit = async () => {
    form
      .trigger([
        'street',
        'streetNumber',
        'floor',
        'province',
        'city',
        'postalCode',
        'note',
      ])
      .then((isValid) => {
        if (isValid) {
          setStage('payment')
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
      <h2 className="text-2xl">Datos de entrega</h2>
      <span className="mb-6 font-thin text-sm">
        Completá tus datos acá abajo
      </span>
      <div className="flex flex-col gap-5">
        <FormField
          control={form.control}
          name="street"
          render={({ field: { onChange, value } }) => {
            return (
              <FormItem className="flex flex-col items-start">
                <FormLabel>Calle</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="w-full"
                    value={value}
                    onChange={onChange}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )
          }}
        />
        <TwoGrid>
          <FormField
            control={form.control}
            name="streetNumber"
            render={({ field: { onChange, value } }) => {
              return (
                <FormItem className="flex flex-col items-start">
                  <FormLabel>Altura</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="w-full"
                      value={value}
                      onChange={onChange}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )
            }}
          />
          <FormField
            control={form.control}
            name="floor"
            render={({ field: { onChange, value } }) => {
              return (
                <FormItem className="flex flex-col items-start">
                  <FormLabel>Piso/Depto</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="w-full"
                      value={value}
                      onChange={onChange}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )
            }}
          />
        </TwoGrid>
        <FormField
          control={form.control}
          name="province"
          render={({ field: { onChange, value } }) => {
            return (
              <FormItem className="flex flex-col items-start">
                <FormLabel>Provincia</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="w-full"
                    value={value}
                    onChange={onChange}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )
          }}
        />
        <TwoGrid>
          <FormField
            control={form.control}
            name="city"
            render={({ field: { onChange, value } }) => {
              return (
                <FormItem className="flex flex-col items-start">
                  <FormLabel>Localidad/Ciudad</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="w-full"
                      value={value}
                      onChange={onChange}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )
            }}
          />
          <FormField
            control={form.control}
            name="postalCode"
            render={({ field: { onChange, value } }) => {
              return (
                <FormItem className="flex flex-col items-start">
                  <FormLabel>Codigo Postal</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="w-full"
                      value={value}
                      onChange={onChange}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )
            }}
          />
        </TwoGrid>
        <FormField
          control={form.control}
          name="note"
          render={({ field: { onChange, value } }) => {
            return (
              <FormItem className="flex flex-col items-start">
                <FormLabel>Nota de pedido</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="w-full"
                    value={value}
                    onChange={onChange}
                  />
                </FormControl>

                <FormMessage />
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

function TwoGrid({ children }: { children: React.ReactNode }) {
  return <div className="flex gap-2 [&>*]:flex-1">{children}</div>
}
