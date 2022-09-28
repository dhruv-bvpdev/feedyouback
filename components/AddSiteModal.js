import { useRef } from 'react'
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { createSiteOnFireStore } from '@/lib/firestore'

export default function AddSiteModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = useRef(null)

  const { register, handleSubmit, watch } = useForm()

  const createSite = handleSubmit(async formData => {
    console.table(formData)
    createSiteOnFireStore(formData)
  })

  return (
    <>
      <Button
        onClick={onOpen}
        fontWeight="medium"
        maxW="200px"
        variant="solid"
        size="md"
      >
        Add Your First Site
      </Button>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={createSite}>
          <ModalHeader fontWeight="bold">Add Site</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                ref={initialRef}
                {...register('siteName', { required: true })}
                placeholder="My Site"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Link</FormLabel>
              <Input
                placeholder="https://www.website.com"
                {...register('siteLink', { required: true })}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose} fontWeight="medium">
              Cancel
            </Button>

            <Button
              fontWeight="medium"
              backgroundColor="#99FFFE"
              color="#194D4C"
              disabled={!watch('siteName') || !watch('siteLink')}
              type="submit"
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
