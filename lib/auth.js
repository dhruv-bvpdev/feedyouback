import { useState, useEffect, useContext, createContext } from 'react'
import {
  getAuth,
  signInWithPopup,
  signOut,
  GithubAuthProvider
} from 'firebase/auth'
import app from './firebase'

const authContext = createContext()
const auth = getAuth(app)

export function ProvideAuth({ children }) {
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

  const signInWithGithub = () => {
    return signInWithPopup(auth, new GithubAuthProvider())
      .then(response => {
        setUser(response.user)
        return response.user
      })
      .catch(error => {
        console.log(error.code)
        console.log(error.message)
      })
  }

  const signOutWithGithub = () => {
    return signOut(auth).then(() => {
      return false
    })
  }

  /* useEffect(() => {
    const unsubscribe = app.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user)
      } else {
        setUser(false)
      }
    })

    return () => unsubscribe()
  }, []) */

  return {
    user,
    signInWithGithub,
    signOutWithGithub
  }
}
