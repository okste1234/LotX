'use client'

import { ChakraProvider } from '@chakra-ui/react'

export function ChProviders({ children }: { children: React.ReactNode }) {
  return <ChakraProvider>{children}</ChakraProvider>
}