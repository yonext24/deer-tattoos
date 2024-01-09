import * as admin from 'firebase-admin'
import { initializeApp } from 'firebase-admin/app'
import { getStorage } from 'firebase-admin/storage'

const serviceAccount = {
  type: process.env.TYPE,
  project_id: process.env.PROJECT_ID,
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: (process.env.PRIVATE_KEY ?? '').replace(/\\n/g, '\n'),
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.CLIENT_ID,
  auth_uri: process.env.AUTH_URI,
  token_uri: process.env.TOKEN_URI,
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
}

const app = admin.apps.length
  ? admin.apps[0]
  : initializeApp({
      credential: admin.credential.cert(serviceAccount as any),
      storageBucket: 'deer-dev-3384f.appspot.com',
    })

export const storage = getStorage(app as any)
export const bucket = storage.bucket('deer-dev-3384f.appspot.com')
