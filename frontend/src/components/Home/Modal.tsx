"use client"
import React, { useState, ChangeEvent, MouseEvent } from 'react';
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
} from '@chakra-ui/react';
import useCreateLottery from '@/hooks/useCreateLottery';
import { toast } from 'react-toastify';

const ModalHandle = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const createLottery = useCreateLottery();
  const [time, setTime] = useState('');

  const handleTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
  };

  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (time) {
      const [hours, minutes] = time.split(':').map(Number);

      const currentTime = new Date();
      const futureTime = new Date(currentTime);
      futureTime.setHours(hours);
      futureTime.setMinutes(minutes);

      const timeDifferenceInMinutes = (futureTime.getTime() - currentTime.getTime()) / (1000 * 60);

      if (timeDifferenceInMinutes > 0) {
        
        console.log("timeDifferenceInMinutes ", timeDifferenceInMinutes);
        
        await createLottery(timeDifferenceInMinutes);
        onClose();
      } else {
        toast.error("Please pick a future time.");
      }
    } else {
      toast.error("Please pick a valid time.");
    }
  };

  return (
    <>
      <button
        className="text-gray-100 text-sm font-barlow px-4 py-2 flex justify-center items-center gap-1 hover:bg-sky-600 bg-emerald-500"
        onClick={onOpen}
      >
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
              <Input type="time" value={time} onChange={handleTimeChange} />
              <FormHelperText>Pick enough minutes for game time.</FormHelperText>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleClick}>
              Create
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalHandle;
