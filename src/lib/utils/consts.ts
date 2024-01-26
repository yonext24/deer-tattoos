export const isProduction = process.env.NODE_ENV === 'production'

export const devices = {
  desktop: 'PC',
  'mobile-android': 'Android',
  'mobile-ios': 'iOS',
  bot: 'Bots',
} as const

export const permitedMails = JSON.stringify(
  process.env.PERMITED_MAILS?.split(',')
)
