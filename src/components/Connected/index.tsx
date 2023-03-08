import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import React, { FC, useEffect, useState } from 'react'
import styles from './styles.module.css'
import base58 from "bs58";
import { Keypair, LAMPORTS_PER_SOL, Transaction, SystemProgram } from '@solana/web3.js'
import { companyData } from '@/pages/api/companyData';

import {
    useToast,
    Grid,
    GridItem,
    Heading,
    Button,
    Text,
    Badge,
    Container,
    Box,
    ButtonGroup,
    Center,
    useColorModeValue,
    Stack,
    Image,
    Flex
} from '@chakra-ui/react'


export const Connected: FC = () => {

    const [tx, setTx] = useState("");
    const [transactionState, setTransactionState] = useState(false);
    const [balance, setBalance] = useState(0);

    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();




    useEffect(() => {
        if (!connection || !publicKey) {
            return;
        }
        connection.getBalance(publicKey).then((e) => {
            if (!e) setBalance(0);
            setBalance(e);
        });
    }, [connection, publicKey, tx]);


    const toast = useToast();
    const resultToast = (status: any, title: any) => {
        return toast({
            position: "bottom",
            title: title,
            status: status,
            duration: 3000,
            isClosable: true,
        })
    }

    // private Key ile tx fonksiyonu...
    const clickPay = async (companyPrivateKey: any, cost: any) => {

        const payKeypair = Keypair.fromSecretKey(base58.decode(companyPrivateKey));

        console.log(payKeypair.secretKey)


        if (!publicKey) {
            return
        }
        const transaction = new Transaction();

        try {
            const instruction = SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: payKeypair!.publicKey,
                lamports: LAMPORTS_PER_SOL * cost
            });

            transaction.add(instruction);

            const sign = await sendTransaction(transaction, connection);
            setTransactionState(true);
            const latestBlockHash = await connection.getLatestBlockhash();

            await connection.confirmTransaction({
                blockhash: latestBlockHash.blockhash,
                lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
                signature: sign,
            });

            setTx(latestBlockHash.blockhash);
            setTransactionState(false);

            console.log(
                `Token Transaction: https://explorer.solana.com/tx/${sign}}?cluster=devnet`
            );

            resultToast("success", "Successful payment!");

        } catch (error) {

            console.error(error);

            resultToast("error", "Request rejected :(");
        }
    };


    // api'den gelen data...

    const billTax = companyData?.map((e, index) => {
        return (
            <Box key={index}
                role={'group'}
                p={6}
                maxW={'330px'}
                w={'100%'}
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow={'2xl'}
                rounded={'lg'}
                pos={'relative'}
                zIndex={1}
                m={20}

            >

                <Box
                    rounded={'lg'}
                    mt={-12}
                    pos={'relative'}
                    height={'230px'}
                    _after={{
                        transition: 'all .3s ease',
                        content: '""',
                        w: 'full',
                        h: 'full',
                        pos: 'absolute',
                        top: 5,
                        left: 0,
                        filter: 'blur(15px)',
                        zIndex: -1,
                    }}
                    _groupHover={{
                        _after: {
                            filter: 'blur(20px)',
                        },
                    }}>

                    <Image
                        rounded={'lg'}
                        height={256}
                        width={282}
                        objectFit={'cover'}
                        bg={'gray.200'}
                        loading='lazy'
                        src='/sol-logo.png'
                    />
                </Box>
                <Stack pt={10} align={'center'}>
                    <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                        {e.product}
                    </Text>
                    <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                        {e.period}
                    </Heading>
                    <Stack direction={'row'} align={'center'}>
                        <Text fontWeight={800} fontSize={'xl'}>
                            {e.cost} sol
                        </Text>
                    </Stack>
                    <Button onClick={() => clickPay(e.companyPrivateKey, e.cost)}>Pay</Button>

                </Stack>
            </Box>

        )
    });

    // public key ile tx fonksiyonu.
    const clickPayNew = async (companyPublicKey: any, cost: any) => {


        if (!publicKey) {
            return
        }
        const transaction = new Transaction();

        try {
            const instruction = SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: companyPublicKey,
                lamports: LAMPORTS_PER_SOL * cost,
            });

            transaction.add(instruction);

            const sign = await sendTransaction(transaction, connection);
            setTransactionState(true);
            const latestBlockHash = await connection.getLatestBlockhash();

            await connection.confirmTransaction({
                blockhash: latestBlockHash.blockhash,
                lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
                signature: sign,
            });

            setTx(latestBlockHash.blockhash);
            setTransactionState(false);

            console.log(
                `Token Transaction: https://explorer.solana.com/tx/${sign}}?cluster=devnet`
            );

            resultToast("success", "Successful payment!");

        } catch (error) {

            console.error(error);

            resultToast("error", "Request rejected :(");
        }
    };



    // localStorage'dan gelen data...

    const value: any = localStorage.getItem('productsList')
    const billList = JSON.parse(value)

    const cardList = billList?.map((e: any, index: any) => {
    
        return (
            <Box key={index}
                role={'group'}
                p={6}
                maxW={'330px'}
                w={'100%'}
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow={'2xl'}
                rounded={'lg'}
                pos={'relative'}
                zIndex={1}
                m={20}
            >

                <Box
                    rounded={'lg'}
                    mt={-12}
                    pos={'relative'}
                    height={'230px'}
                    _after={{
                        transition: 'all .3s ease',
                        content: '""',
                        w: 'full',
                        h: 'full',
                        pos: 'absolute',
                        top: 5,
                        left: 0,
                        filter: 'blur(15px)',
                        zIndex: -1,
                    }}
                    _groupHover={{
                        _after: {
                            filter: 'blur(20px)',
                        },
                    }}>

                    <Image
                        rounded={'lg'}
                        height={256}
                        width={282}
                        objectFit={'cover'}
                        bg={'gray.200'}
                        loading='lazy'
                        src='/sol-logo.png'
                    />
                </Box>
                <Stack pt={10} align={'center'}>
                    <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                        {e.product}
                    </Text>
                    <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                        {e.period}
                    </Heading>
                    <Stack direction={'row'} align={'center'}>
                        <Text fontWeight={800} fontSize={'xl'}>
                            {e.cost} sol
                        </Text>
                    </Stack>
                    <Button onClick={() => clickPayNew(e.comPublicKey,  e.cost)}>Pay</Button>
                </Stack>
            </Box>

        )
    })



    return (
        <Flex bgGradient={useColorModeValue('linear(to-r, green.200, pink.500)', 'linear(to-l, green.200, pink.500)')}
        >
            <Grid templateColumns='repeat(3, 1fr)' gap={5} my={50}>

                {
                    billTax
                }
                {
                    cardList
                }

            </Grid>

        </Flex>

    )

}
