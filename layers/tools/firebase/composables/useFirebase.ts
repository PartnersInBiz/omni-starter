import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
let firebaseApp: any
let analytics: any
let auth: any
let firestore: any
let storage: any
let host: string
export const useFirebase = () => {
  if (!firebaseApp) {
    const config = useRuntimeConfig()
    const test = process.env.NODE_ENV === 'development'
    const firebaseConfig: any = test
      ? config.public.FIREBASE_CONFIG_TEST
      : config.public.FIREBASE_CONFIG

    firebaseApp = initializeApp(firebaseConfig)
    //  analytics = getAnalytics(firebaseApp)
    auth = getAuth(firebaseApp)
    firestore = getFirestore(firebaseApp)
    storage = getStorage(firebaseApp)
    host =
      (firestore.toJSON() as { settings?: { host?: string } }).settings?.host ??
      ''
  }
  return {
    firebaseApp,
    firestore,
    auth,
    // analytics,
    storage,
  }
}
