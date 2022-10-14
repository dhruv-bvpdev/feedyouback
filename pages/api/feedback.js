import { getUserFeedback } from '@/lib/db-admin'
import admin from '@/lib/firebase-admin'

const auth = admin.auth()

const getFeedback = async (req, res) => {
  try {
    const { uid } = await auth.verifyIdToken(req.headers.token)
    const feedback = await getUserFeedback(uid)
    res.status(200).json(feedback)
  } catch (error) {
    res.status(500).json({ error })
  }
}

export default getFeedback
