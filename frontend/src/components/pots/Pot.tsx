import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
} from '@chakra-ui/react'
import { BsCoin } from 'react-icons/bs'

export default function Component() {
  return (
    <div className="w-full max-w-6xl mx-auto py-12 md:py-16 lg:py-20 text-gray-200">
      <div className="px-4 md:px-6 lg:px-8">
        <div className="mb-8 md:mb-10 lg:mb-12">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Win Big with Our Lottery!</h1>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Participate in rounds with 0.000015 ETH for a chance to win the grand prize.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-center justify-center">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-center">Purchase Ticket</h2>
            <Button type="submit" className="w-full" rightIcon={<BsCoin className='text-orange-600 text-2xl font-bold' />}>
              Purchase Tickets
            </Button>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Current Participants</h2>
            <div className="border rounded-lg overflow-hidden">
              <TableContainer>
                <Table>
                  <Thead>
                    <Tr>
                      <Th>Ticket #</Th>
                      <Th>Address</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>001</Td>
                      <Td>0x00..112</Td>
                    </Tr>
                    <Tr>
                      <Td>002</Td>
                      <Td>0x00..112</Td>
                    </Tr>
                    <Tr>
                      <Td>003</Td>
                      <Td>0x00..112</Td>
                    </Tr>
                    <Tr>
                      <Td>004</Td>
                      <Td>0x00..112</Td>
                    </Tr>
                    <Tr>
                      <Td>005</Td>
                      <Td>0x00..116</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </div>
            <div className="mt-4 text-right">
              <p className="text-lg font-medium">
                Total Prize: <span className="bg-gradient-to-l from-sky-400 to-emerald-400 text-transparent bg-clip-text">$50,000</span>
              </p>
            </div>
          </div>
        </div>
        <div className="border rounded-lg mt-24">
          <TableContainer>
            <Table>
              <Thead>
                <Tr>
                  <Th>Winners</Th>
                  <Th>Address</Th>
                  <Th>Prize</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>001</Td>
                  <Td>0x00..112</Td>
                  <Td>112ETH</Td>
                </Tr>
                <Tr>
                  <Td>002</Td>
                  <Td>0x00..112</Td>
                  <Td>102ETH</Td>
                </Tr>
                <Tr>
                  <Td>003</Td>
                  <Td>0x00..112</Td>
                  <Td>90ETH</Td>
                </Tr>
                <Tr>
                  <Td>004</Td>
                  <Td>0x00..112</Td>
                  <Td>11ETH</Td>
                </Tr>
                <Tr>
                  <Td>005</Td>
                  <Td>0x00..116</Td>
                  <Td>11ETH</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  )
}
