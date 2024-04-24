import { UseFormReturn } from 'react-hook-form'
import { CheckoutFormType } from './multi-step-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormMessageGlobal,
} from '@/components/shadcn/ui/form'
import { Input } from '@/components/shadcn/ui/input'
import React from 'react'
import { Button } from '@/components/shadcn/ui/button'
import { useCheckoutStore } from '@/store/checkout-store'
import { cn } from '@/lib/utils/utils'
import { useCartStore } from '@/store/shop-store'

export function PersonalInfo({
  form,
  showing,
}: {
  form: UseFormReturn<CheckoutFormType>
  showing: boolean
}) {
  const setStage = useCheckoutStore((s) => s.setStage)
  const cart = useCartStore((s) => s.cart)

  const onSubmit = async () => {
    if (!cart || cart.length <= 0) {
      form.setError('root', {
        message:
          'No hay productos en el carrito, no puedes seguir con el proceso',
      })
      return
    }
    form
      .trigger(['name', 'lastname', 'email', 'dni', 'phone'])
      .then((isValid) => {
        if (isValid) {
          setStage('shipment')
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
      <h2 className="text-2xl">Datos personales</h2>
      <span className="mb-6 font-thin text-sm">
        Completá tus datos acá abajo
      </span>
      <div className="flex flex-col gap-5">
        <TwoGrid>
          <FormField
            control={form.control}
            name="name"
            render={({ field: { onChange, value } }) => {
              return (
                <FormItem className="flex flex-col items-start">
                  <FormLabel>Nombre</FormLabel>
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
            name="lastname"
            render={({ field: { onChange, value } }) => {
              return (
                <FormItem className="flex flex-col items-start">
                  <FormLabel>Apellido</FormLabel>
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
          name="email"
          render={({ field: { onChange, value } }) => {
            return (
              <FormItem className="flex flex-col items-start">
                <FormLabel>Email</FormLabel>
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
            name="dni"
            render={({ field: { onChange, value } }) => {
              return (
                <FormItem className="flex flex-col items-start">
                  <FormLabel>DNI</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
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
            name="phone"
            render={({ field: { onChange, value } }) => {
              return (
                <FormItem className="flex flex-col items-start">
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
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
        <FormMessageGlobal />
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
