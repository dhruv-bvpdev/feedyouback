import { useRef } from 'react'
import { mutate } from 'swr'
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
  useDisclosure,
  useToast
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { createSiteOnFireStore } from '@/lib/firestore'
import { useAuth } from '@/lib/auth'

export default function AddSiteModal({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = useRef(null)

  const { register, handleSubmit, watch } = useForm()

  const toast = useToast()
  const auth = useAuth()

  const createSite = handleSubmit(async ({ name, link }) => {
    const newSite = {
      authorId: auth.user.uid,
      createdAt: new Date().toISOString(),
      name,
      link
    }
    createSiteOnFireStore(newSite)
    toast({
      title: 'Success',
      description: "We've added you site",
      status: 'success',
      duration: 5000,
      isClosable: true
    })
    mutate(
      '/api/sites',
      async data => {
        console.log(data)
        console.log([...data.sites, newSite])
        return { sites: [...data.sites, newSite] }
      },
      false
    )
    onClose()
  })

  return (
    <>
      <Button
        onClick={onOpen}
        backgroundColor="gray.900"
        color="white"
        fontWeight="medium"
        _hover={{ bg: 'gray.700' }}
        _active={{
          bg: 'gray.800',
          transform: 'scale(0.95)'
        }}
      >
        {children}
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
                {...register('name', { required: true })}
                placeholder="My Site"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Link</FormLabel>
              <Input
                placeholder="https://www.website.com"
                {...register('link', { required: true })}
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
              disabled={!watch('name') || !watch('link')}
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
