import admin from '@/lib/firebase-admin'

const getSites = async (_, res) => {
  const firebase = admin.firestore()
  const snapshot = await firebase.collection('sites').get()

  const sites = []

  snapshot.forEach(doc => {
    sites.push({ id: doc.id, ...doc.data() })
  })

  res.status(200).json({ sites })
}

export default getSites
