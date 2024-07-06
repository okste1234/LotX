"use client"
import React, { useCallback, useEffect, useState } from 'react';
import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react';
import { useWalletInfo, useWeb3Modal, useWeb3ModalAccount } from '@web3modal/ethers/react';
import { useRouter } from 'next/navigation';

const page = () => {
    const [errorMessage, setErrorMessage] = useState<string>('');

    const { open } = useWeb3Modal()
    const { isConnected } = useWeb3ModalAccount()
    const { walletInfo } = useWalletInfo()

    const router = useRouter();
    
    const change = useCallback(async () => {
        if (isConnected) {
            router.push("/");
        }

    }, [isConnected, router]);

    useEffect(() => {
        change();
    }, [change, isConnected]);
    
    

    return (
       
        <Box 
        w="full" 
        h="80vh" 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        justifyContent="center"
        id="heroPattern"
        overflow="hidden"
    >
        <VStack spacing={8} alignItems="center">
            <Heading color="white" fontSize="4xl">
                Play With Us
            </Heading>
            <Text color="gray.300" fontSize="xl">
                Connect your wallet to get started with LotX.
            </Text>
            <Button colorScheme="teal" size="lg" onClick={() => open()}>
                Connect Wallet
            </Button>
            {errorMessage && (
                <Text color="red.400" fontSize="lg">
                    {errorMessage}
                </Text>
            )}
        </VStack>
        </Box>
     
    );
};

export default page;
