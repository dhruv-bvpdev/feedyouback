import { useRef, useState } from 'react'
import { useRouter } from 'next/router'
import Feedback from '@/components/Feedback'
import { useAuth } from '@/lib/auth'
import { getAllFeedback, getAllSites } from '@/lib/db-admin'
import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react'
import { createFeedbackOnFireStore } from '@/lib/firestore'

export async function getStaticProps(context) {
  const siteId = context.params.siteId
  const { feedback } = await getAllFeedback(siteId)
  return {
    props: {
      initialFeedback: feedback
    },
    revalidate: 1
  }
}

export async function getStaticPaths() {
  const { sites } = await getAllSites()
  const paths = sites.map(site => ({
    params: {
      siteId: site.id.toString()
    }
  }))
  return {
    paths,
    fallback: false
  }
}

export default function SiteFeedback({ initialFeedback }) {
  const auth = useAuth()
  const router = useRouter()
  const inputElement = useRef(null)
  const [allFeedback, setAllFeedback] = useState(initialFeedback)

  const onSubmit = e => {
    e.preventDefault()
    const newFeedback = {
      author: auth.user.name,
      authorId: auth.user.uid,
      siteId: router.query.siteId,
      text: inputElement.current.value,
      createdAt: new Date().toISOString(),
      provider: auth.user.provider,
      status: 'pending'
    }
    setAllFeedback([newFeedback, ...allFeedback])
    createFeedbackOnFireStore(newFeedback)
    inputElement.current.value = ''
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="full"
      maxWidth="700px"
      margin="0 auto"
    >
      <Box as="form" onSubmit={onSubmit}>
        <FormControl my={8}>
          <FormLabel htmlFor="comment">Comment</FormLabel>
          <Input ref={inputElement} type="comment" />
          <Button mt={2} type="submit" fontWeight="medium">
            Add Comment
          </Button>
        </FormControl>
      </Box>
      {allFeedback.map(feedback => (
        <Feedback key={feedback.createdAt} {...feedback} />
      ))}
    </Box>
  )
}
