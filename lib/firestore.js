import app from './firebase'
import {
  doc,
  setDoc,
  getFirestore,
  collection,
  addDoc,
  deleteDoc
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
  const newSiteRef = doc(collection(db, 'sites'))
  setDoc(newSiteRef, { name, link, author: authorId, createdAt })
  return newSiteRef
}

export function createFeedbackOnFireStore(newFeedback) {
  const dbRef = collection(db, 'feedback')
  addDoc(dbRef, newFeedback)
}

export function deleteFeedbackFromFireStore(id) {
  const docRef = doc(db, 'feedback', id)
  deleteDoc(docRef)
}
