export const isProduction = process.env.NODE_ENV === 'production'

export const APP_URL = isProduction
  ? process.env.PRODUCTION_URL
  : 'http://localhost:3000'

export const MARCA = '<MARCA>'
export const LOGO = '<LOGO>'

export const devices = {
  desktop: 'PC',
  'mobile-android': 'Android',
  'mobile-ios': 'iOS',
  bot: 'Bots',
} as const

export const permitedMails = JSON.stringify(
  process.env.PERMITED_MAILS?.split(',')
)
