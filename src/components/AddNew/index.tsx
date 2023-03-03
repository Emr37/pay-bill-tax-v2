import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import React, { FC, useEffect, useState } from 'react'
import styles from './styles.module.css'
import { useToast, Card, CardHeader, CardBody, CardFooter, Grid, Heading, Button, Text, Badge, Spacer, Stack, Box} from '@chakra-ui/react'
import base58 from "bs58";
import { Keypair, LAMPORTS_PER_SOL, Transaction, SystemProgram } from '@solana/web3.js'
import { companyData } from '@/pages/api/companyData';
import { Form } from '../Form';


export const AddNewBill: FC = () => {



    return (
            <div>
                <Form/>               
            </div>
    )
}