import React, { FC } from 'react'
import { Flex, useColorModeValue } from '@chakra-ui/react'
import styles from './styles.module.css'


export const NotConnected: FC = () => {


    return (
            <Flex bg={useColorModeValue('gray.100', 'gray.800')} justify="center" minHeight='520px' className={styles.welcome}>

                Welcome. Please connect your Solana Wallet...
                
            </Flex>
    )
}