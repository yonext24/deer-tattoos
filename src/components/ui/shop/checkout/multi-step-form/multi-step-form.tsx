/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { Form } from '@/components/shadcn/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { PersonalInfo } from './personal-info'
import { useCheckoutStore } from '@/store/checkout-store'
import { ShipmentInfo } from './shipment-info'
import { CSSTransition } from '@/components/cssTransition/cssTransition'
import { useEffect } from 'react'
import { PaymentInfo } from './payment-info'
import { ConfirmationInfo } from './confirmation-info'

const required_error = 'Este campo es obligatorio'
const formSchema = z.object({
  email: z.string({ required_error }).email(),
  name: z.string({ required_error }),
  lastname: z.string({ required_error }),
  dni: z.string({ required_error }).refine((v) => !isNaN(Number(v))),
  phone: z.string({ required_error }).refine((v) => !isNaN(Number(v))),
  street: z.string({ required_error }),
  streetNumber: z.string({ required_error }),
  floor: z.string({ required_error }).optional(),
  province: z.string({ required_error }),
  city: z.string({ required_error }),
  postalCode: z.string({ required_error }),
  note: z.string({ required_error }),
  paymentType: z.enum(['mp', 'paypal', 'bank']),
})

export type CheckoutFormType = z.infer<typeof formSchema>

export function MultiStepForm() {
  const { stage, setStage, setLatestStage } = useCheckoutStore()

  const form = useForm<CheckoutFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      name: '',
      lastname: '',
      dni: '',
      phone: '',
      street: '',
      streetNumber: '',
      floor: '',
      province: '',
      city: '',
      postalCode: '',
      note: '',
      paymentType: 'mp',
    },
  })
  const { handleSubmit } = form
  const onSubmit = () => {}

  useEffect(() => {
    setStage('info')
    setLatestStage('info')
  }, [])

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CSSTransition isIn={stage === 'info'} transitionDuration={200}>
          <PersonalInfo showing={stage === 'info'} form={form} />
        </CSSTransition>
        <CSSTransition isIn={stage === 'shipment'} transitionDuration={200}>
          <ShipmentInfo showing={stage === 'shipment'} form={form} />
        </CSSTransition>
        <CSSTransition isIn={stage === 'payment'} transitionDuration={200}>
          <PaymentInfo showing={stage === 'payment'} form={form} />
        </CSSTransition>
        <CSSTransition isIn={stage === 'confirmation'} transitionDuration={200}>
          <ConfirmationInfo showing={stage === 'confirmation'} form={form} />
        </CSSTransition>
      </form>
    </Form>
  )
}
