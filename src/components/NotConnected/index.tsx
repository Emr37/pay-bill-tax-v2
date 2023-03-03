import React, { FC } from 'react'
import { Container, Flex, useColorModeValue } from '@chakra-ui/react'


export const NotConnected: FC = () => {


    return (
            <Flex bg={useColorModeValue('gray.100', 'gray.800')} justify="center" minHeight='520px'>
                Welcome. Please connect your Solana Wallet...
                
            </Flex>
    )
}