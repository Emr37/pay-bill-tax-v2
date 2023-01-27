import { FC } from 'react'
import styles from '../styles/Home.module.css'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import Image from 'next/image'
import { Text } from '@chakra-ui/react'

export const Header: FC = () => {
  return (
    <div className={styles.AppHeader}>
      <Image src="/solana.png" height={30} width={200} alt={'logo'} />
      <Text
        bgGradient='linear(to-l, #8f6ddf, #1ee1b0)'
        bgClip='text'
        fontSize='6xl'
        fontWeight='extrabold'
        
      >
        Pay Bills and Taxes
      </Text>            
      <WalletMultiButton className={styles.Wb} />
    </div>
  )

  /*
  <Flex minWidth='max-content' alignItems='center' gap='2'>
    <Box p='2'>
      <Heading size='md'>Chakra App</Heading>
    </Box>
    <Spacer />
    <ButtonGroup gap='2'>
      <Button colorScheme='teal'>Sign Up</Button>
      <Button colorScheme='teal'>Log in</Button>
    </ButtonGroup>
  </Flex> */



}