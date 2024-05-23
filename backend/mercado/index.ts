import { MercadoPagoConfig } from 'mercadopago'

export const mercadoClient = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN ?? '' })