import { useState, useEffect, useContext, createContext } from 'react'
import cookie from 'js-cookie'
import {
  getAuth,
  signInWithPopup,
  signOut,
  GithubAuthProvider,
  onAuthStateChanged
} from 'firebase/auth'
import app from './firebase'
import { createUser } from './firestore'

const authContext = createContext()
const auth = getAuth(app)

export function AuthProvider({ children }) {
  const firebaseAuth = useProvideAuth()
  return (
    <authContext.Provider value={firebaseAuth}>{children}</authContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(authContext)
}

function useProvideAuth() {
  const [user, setUser] = useState(null)

  const handleUser = rawUser => {
    if (rawUser) {
      const user = formatUser(rawUser)
      const { token, ...userDataWithoutToken } = user
      createUser(user.uid, userDataWithoutToken)
      setUser(user)

      cookie.set('feed-you-back-auth', true, { expires: 1 })
      return user
    } else {
      setUser(false)
      cookie.remove('feed-you-back-auth')
      return false
    }
  }

  const signInWithGithub = () => {
    return signInWithPopup(auth, new GithubAuthProvider())
      .then(response => {
        handleUser(response.user)
      })
      .catch(error => {
        console.log(error.code)
        console.log(error.message)
      })
  }

  const signOutWithGithub = () => {
    return signOut(auth).then(() => {
      handleUser()
    })
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      handleUser(user)
    })

    return () => unsubscribe()
  }, [])

  return {
    user,
    signInWithGithub,
    signOutWithGithub
  }
}

const formatUser = user => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    token: user.accessToken,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL
  }
}
