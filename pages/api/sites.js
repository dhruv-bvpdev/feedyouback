import firebaseAdmin from '@/lib/firebase-admin'
import { collection, query, getDocs, getFirestore } from 'firebase/firestore'

const adminDB = getFirestore(firebaseAdmin)

const getSites = async (_, res) => {
  const q = query(collection(adminDB, 'sites'))

  const querySnapshot = await getDocs(q)
  let sites = []
  querySnapshot.forEach(doc => {
    sites.push({ id: doc.id, ...doc.data() })
  })

  res.status(200).json({ sites })
}

export default getSites
