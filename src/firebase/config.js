import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Valores padrão do projeto fullstackpetrobras (chaves públicas do app Web).
// O .env local sobrescreve; na Vercel use Environment Variables OU estes defaults.
const defaults = {
  apiKey: 'AIzaSyDoTd8hkytK1IwokdyHIHoddRhfd7aqxpw',
  authDomain: 'fullstackpetrobras.firebaseapp.com',
  projectId: 'fullstackpetrobras',
  storageBucket: 'fullstackpetrobras.firebasestorage.app',
  messagingSenderId: '368225749634',
  appId: '1:368225749634:web:72b9a6b3f828eef9c4429b',
}

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || defaults.apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || defaults.authDomain,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || defaults.projectId,
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || defaults.storageBucket,
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ||
    defaults.messagingSenderId,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || defaults.appId,
}

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
    firebaseConfig.projectId &&
    firebaseConfig.appId,
)

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export { app, auth, db }
