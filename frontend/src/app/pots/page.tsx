import React from 'react'
import Pot from "@/components/pots/Pot";
import { Box } from '@chakra-ui/react';

const page = () => {
  return (
       <Box 
        w="full" 
        
        display="flex" 
        flexDirection="column"
        gap={6} 
        alignItems="center" 
        justifyContent="center"
        id="heroPattern"
        overflow="hidden"
    >
          <Pot />
    </Box>
  )
}

export default page

