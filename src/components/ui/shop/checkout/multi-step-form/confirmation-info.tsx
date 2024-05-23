/* eslint-disable react-hooks/exhaustive-deps */
import { UseFormReturn } from 'react-hook-form'
import { CheckoutFormType } from './multi-step-form'
import React, { useEffect } from 'react'
import { useCheckoutStore } from '@/store/checkout-store'
import { cn } from '@/lib/utils/utils'
import { methodMapper } from './payment-info'
import { useCartStore } from '@/store/shop-store'
import { Wallet, initMercadoPago } from '@mercadopago/sdk-react'

export function ConfirmationInfo({
  form,
  showing,
}: {
  form: UseFormReturn<CheckoutFormType>
  showing: boolean
}) {
  const setStage = useCheckoutStore((s) => s.setStage)
  const setPreference = useCheckoutStore(
    (s) => s.setCurrentMercadoPagoPreferenceId
  )
  const mercadoPagoPreferenceId = useCheckoutStore(
    (s) => s.currentMercadoPagoPreferenceId
  )
  const cart = useCartStore((s) => s.cart)

  const onSubmit = async () => {
    form.trigger(['paymentType']).then((isValid) => {
      if (isValid) {
        setStage('confirmation')
      }
    })
  }

  useEffect(() => {
    if (form.getValues('paymentType') === 'mp') {
      initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY ?? '')

      const parsedCart = cart.map((el) => {
        return {
          id: el.id,
          unit_price: el.price,
          variation: el.variation,
          quantity: el.quantity,
          title: el.name,
        }
      })
      fetch('http://localhost:3000/api/shop/checkout', {
        method: 'POST',
        body: JSON.stringify(parsedCart),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.preferenceId) setPreference(res.preferenceId)
        })
    }
  }, [form.getValues('paymentType')])

  const { getValues } = form

  const {
    name,
    lastname,
    email,
    dni,
    phone,
    province,
    city,
    note,
    paymentType,
    postalCode,
    street,
    streetNumber,
    floor,
  } = getValues()

  const renderCheckoutButton = (preferenceId: string | null) => {
    if (!preferenceId) return null

    return <Wallet initialization={{ preferenceId: preferenceId }} />
  }

  return (
    <div
      className={cn(
        'flex flex-col gap-1 transition-opacity animate-fadeIn',
        !showing && 'opacity-0'
      )}
    >
      <h2 className="text-2xl">Confirmación</h2>
      <span className="font-thin text-sm">Verificá los datos</span>
      <span className="mb-6 font-thin text-sm">
        El envío estandar dura entre 24 a 48 horas
      </span>
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-3">
          {[
            { info: name, key: 'Nombre' },
            { info: lastname, key: 'Apellido' },
            { info: email, key: 'Email' },
            { info: dni, key: 'DNI' },
            { info: phone, key: 'Phone' },
          ].map((el, i) => (
            <div className="flex flex-col" key={i}>
              <span className="font-thin text-sm text-center">{el.key}</span>
              <span className="text-center">{el.info}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          {[
            { info: street, key: 'Calle' },
            { info: streetNumber, key: 'Altura' },
            { info: floor, key: 'Piso' },
            { info: province, key: 'Provincia' },
            { info: city, key: 'Ciudad' },
            { info: postalCode, key: 'Código Postal' },
            { info: note, key: 'Nota' },
          ].map((el, i) => (
            <div className="flex flex-col" key={i}>
              <span className="font-thin text-sm text-center">{el.key}</span>
              <span className="text-center">{el.info}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-col">
          <span className="font-thin text-sm ">Método de pago</span>
          {/* @ts-ignore */}
          <span className="">{methodMapper[paymentType].name}</span>
        </div>
      </div>
      {renderCheckoutButton(mercadoPagoPreferenceId)}
    </div>
  )
}
