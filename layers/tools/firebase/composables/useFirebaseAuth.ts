import type { User } from 'firebase/auth'
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'

export const useFirebaseAuth = () => {
  const { auth } = useFirebase()

  const user = useState<User | null>('user', () => null)

  const registerUser = async (
    email: string,
    password: string,
  ): Promise<boolean> => {
    try {
      const userCreds = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      )
      if (userCreds) {
        user.value = userCreds.user
        return true
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        // handle error
      }
      return false
    }
    return false
  }

  const loginUser = async (email: string, password: string) => {
    return await signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        user.value = userCredential.user
        return userCredential
      })
      .catch((error) => {
        return error
      })
  }

  const logoutUser = async () => {
    return await signOut(auth)
      .then(() => {
        // Sign-out successful.
        return true
      })
      .catch((error) => {
        // An error happened.
        return error
      })
  }

  const recoverPassword = async (email: string) => {
    return await sendPasswordResetEmail(auth, email)
      .then(() => {
        // Email sent.
        return true
      })
      .catch((error: any) => {
        // An error happened.
        return error
      })
  }

  return {
    user,
    registerUser,
    logoutUser,
    loginUser,
    recoverPassword,
  }
}
