import Head from 'next/head'
import { useWallet } from '@solana/wallet-adapter-react'
import { Connected } from '@/components/Connected';
import { NotConnected } from '@/components/NotConnected';
import { Container } from '@chakra-ui/react';
import styles from '../styles/Home.module.css'
import { NextPage } from 'next';


 const Home : NextPage = (props) => {
  
  const { connected } = useWallet();

  return (
    <div>
      <Head>
        <title>Pay Bill & Tax </title>
        <meta name="description" content="Pay Bills and Taxes" />
      </Head>
        {connected 
        ? <Connected />
        : <NotConnected/>
        }

    </div>
  )
}

export default Home;
