import { compareDesc, parseISO } from 'date-fns'
import admin from './firebase-admin'

export async function getAllFeedback(siteId) {
  try {
    const firebase = admin.firestore()
    const snapshot = await firebase
      .collection('feedback')
      .where('siteId', '==', siteId)
      .get()

    const feedback = []

    snapshot.forEach(doc => {
      feedback.push({ id: doc.id, ...doc.data() })
    })

    feedback.sort((a, b) =>
      compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
    )

    return { feedback }
  } catch (error) {
    return { error }
  }
}

export async function getAllSites() {
  try {
    const firebase = admin.firestore()
    const snapshot = await firebase.collection('sites').get()

    const sites = []

    snapshot.forEach(doc => {
      sites.push({ id: doc.id, ...doc.data() })
    })

    return { sites }
  } catch (error) {
    return { error }
  }
}

export async function getUserSites(userId) {
  const firebase = admin.firestore()
  const snapshot = await firebase
    .collection('sites')
    .where('author', '==', userId)
    .get()

  const sites = []

  snapshot.forEach(doc => {
    sites.push({ id: doc.id, ...doc.data() })
  })

  return { sites }
}

export async function getUserFeedback(userId) {
  const firebase = admin.firestore()
  const snapshot = await firebase
    .collection('feedback')
    .where('authorId', '==', userId)
    .get()

  const feedback = []

  snapshot.forEach(doc => {
    feedback.push({ id: doc.id, ...doc.data() })
  })

  return { feedback }
}
