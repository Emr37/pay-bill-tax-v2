import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import React, { FC, useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import { useToast, Card, CardHeader, CardBody, CardFooter, Grid, Heading, Button, Text, Badge, Spacer, Stack} from '@chakra-ui/react'
import base58 from "bs58";
import { Keypair, LAMPORTS_PER_SOL, Transaction, SystemProgram } from '@solana/web3.js'
import { companyData } from '@/pages/api/companyData';


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
    

    const clickPay = async (companyPrivateKey: any, cost: any) => {
              
        const payKeypair = Keypair.fromSecretKey(base58.decode(companyPrivateKey));
       

        if (!publicKey) {
            return
        }
        const transaction = new Transaction();

        try {
            const instruction = SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: payKeypair!.publicKey,
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

    
 
    const billTax = companyData?.map((e, index) => {
        return (
            <Card key={index} boxShadow='lg' p='6' rounded='md' bg='white'>
                <CardHeader>
                    <Heading size='md'>{e.product}</Heading>
                </CardHeader>
                <CardBody>
                    <Text>{e.period}</Text>
                </CardBody>
                <CardFooter>
                    <Button>{e.cost} SOL</Button>
                    <Spacer />
                    <Button onClick={() => clickPay(e.companyPrivateKey, e.cost)}>Pay</Button>
                </CardFooter>
            </Card>
        )
    });


    return (
            <div className={styles.Connected}>
                <Badge>
                    {balance / LAMPORTS_PER_SOL} SOL
                </Badge>
                <Stack justifyContent={"center"} alignItems={"center"}>
                    <Grid paddingX={10} gap={8} >
                        {billTax}
                    </Grid>
                </Stack>
            </div>
    )
}