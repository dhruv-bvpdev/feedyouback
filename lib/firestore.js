import app from './firebase'
import { doc, setDoc, getFirestore } from 'firebase/firestore'

const db = getFirestore(app)

export function createUser(uid, data) {
  return setDoc(
    doc(db, 'users', uid),
    {
      uid,
      ...data
    },
    { merge: true }
  )
}
