import app from './firebase'
import {
  doc,
  setDoc,
  getFirestore,
  collection,
  addDoc
} from 'firebase/firestore'

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

export function createSiteOnFireStore({ authorId, createdAt, name, link }) {
  const dbRef = collection(db, 'sites')
  addDoc(dbRef, { name, link, author: authorId, createdAt })
}

export function createFeedbackOnFireStore(newFeedback) {
  const dbRef = collection(db, 'feedback')
  addDoc(dbRef, newFeedback)
}
