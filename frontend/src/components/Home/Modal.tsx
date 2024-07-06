"use client"
import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
} from '@chakra-ui/react'

const ModalHandle = () => {
   const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
        <button className="text-gray-100 text-sm font-barlow px-4 py-2 flex justify-center items-center gap-1 hover:bg-sky-600 bg-emerald-500" onClick={onOpen}>
            Create Pot
        </button>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Lottery Jackpot</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired>
                <FormLabel>Pick Play Duration</FormLabel>
                <Input type='time' />
                <FormHelperText>We'll add extra 1 minute by default, to ensure there's game time.</FormHelperText>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalHandle