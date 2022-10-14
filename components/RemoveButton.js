import { useRef } from 'react'
import { mutate } from 'swr'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  IconButton,
  useDisclosure
} from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import { deleteFeedbackFromFireStore } from '@/lib/firestore'
import { useAuth } from '@/lib/auth'

function RemoveButton({ feedbackId }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()
  const auth = useAuth()

  const onDelete = () => {
    deleteFeedbackFromFireStore(feedbackId)
    mutate(
      ['/api/feedback', auth.user.token],
      async data => {
        return {
          feedback: data.feedback.filter(feedback => feedback.id !== feedbackId)
        }
      },
      false
    )
    onClose()
  }

  return (
    <>
      <IconButton
        variant="ghost"
        aria-label="Delete Feedback"
        icon={<DeleteIcon />}
        onClick={onOpen}
      />

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Feedback
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can&apos;t undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default RemoveButton
