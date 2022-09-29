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

export function createSiteOnFireStore({
  authorId,
  createdAt,
  siteName,
  siteLink
}) {
  const dbRef = collection(db, 'sites')
  addDoc(dbRef, { name: siteName, link: siteLink, author: authorId, createdAt })
}
