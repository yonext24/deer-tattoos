import { handler } from "@backend/middlewares/helpers";
import { mercadoClient } from "@backend/mercado";
import { checkoutCartValidator, checkoutCartValidatorSchemaType } from "@backend/middlewares/validators/checkout-cart-validator";
import { NextResponse } from "next/server";
import { Preference } from "mercadopago";

export const GET = handler(

)
export const POST = handler(
  checkoutCartValidator,
  async (request) => {
    const body = await request.parsedBody() as checkoutCartValidatorSchemaType


    const preference = new Preference(mercadoClient)
    const res = await preference.create({

      body: {
        items: body,
        purpose: 'wallet_purchase',
        payment_methods: {
          excluded_payment_types: [
            {
              id: "ticket"
            }
          ],
          installments: 1
        },
        back_urls: {
          success: 'http:localhost:3000/shop/success',
          failure: 'http:localhost:3000/shop/failure',
          pending: 'http:localhost:3000/shop/pending',

        }
      }
    })

    return NextResponse.json({ preferenceId: res.id })
  }
) 