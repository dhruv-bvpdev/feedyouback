import { getAllFeedback } from '@/lib/db-admin'

const getFeedback = async (req, res) => {
  const siteId = req.query.siteId
  const { feedback, error } = await getAllFeedback(siteId)

  if (error) {
    res.status(500).json({ error })
  }

  res.status(200).json({ feedback })
}

export default getFeedback
