import { getUserSites } from '@/lib/db-admin'
import admin from '@/lib/firebase-admin'
import logger from '@/utils/logger'

const auth = admin.auth()

const getSites = async (req, res) => {
  try {
    const { uid } = await auth.verifyIdToken(req.headers.token)
    const sites = await getUserSites(uid)
    res.status(200).json(sites)
  } catch (error) {
    logger.error(
      {
        request: {
          headers: req.headers,
          url: req.url,
          method: req.method
        },
        response: {
          statusCode: res.statusCode
        }
      },
      error.message
    )
    res.status(500).json({ error })
  }
}

export default getSites
