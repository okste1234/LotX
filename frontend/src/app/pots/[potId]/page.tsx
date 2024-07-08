"use client"
import React from 'react'
import Pot from "@/components/pots/Pot";
import { Box, Text } from '@chakra-ui/react';
import useLotteryInfo from '@/hooks/useLotteryInfo';

const page = ({ params }: { params: { potId: string } }) => {
  const { listing: lotteries, loading, error } = useLotteryInfo();
  
  const lottery = lotteries[Number(params.potId)- 1]
  return (
       <Box 
        w="full" 
        minHeight={"100vh"}
        display="flex" 
        flexDirection="column"
        gap={6} 
        alignItems="center" 
        justifyContent="center"
        id="heroPattern"
        overflow="hidden"
    >
      {loading ? <Text fontSize='18px' color='teal'>Loading...</Text> : (
         <Pot lottery={lottery} />
      )}
         
    </Box>
  )
}

export default page

