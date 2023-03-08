import React, { FC } from 'react'
import { useFormik } from "formik";
import validationSchema from './validations'
import {
  Box,
  Button,
  Flex,
  Input,
  VStack,
  useColorModeValue,
  useBreakpointValue,
  FormControl,
  FormLabel,
  FormErrorMessage,
  useToast
} from "@chakra-ui/react";


export const Form: FC = () => {


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


  const { handleSubmit, handleChange, handleBlur, values, errors, touched, resetForm } = useFormik({
    initialValues: {
      comPublicKey: "",
      product: "",
      period: "",
      cost: ""
    },
    onSubmit: (items) => {

      let itemsList = []

      const getStorage = localStorage.getItem('productsList')

      if (getStorage) {
        itemsList = JSON.parse(getStorage)
        itemsList.push(items)
        localStorage.setItem('productsList', JSON.stringify(itemsList))
      } else {
        itemsList.push(items)
        localStorage.setItem('productsList', JSON.stringify(itemsList))
      }

      resetForm()

      resultToast('success', 'Your instruction has been added succesfully')

    },

    validationSchema,

  });
  return (
    <Flex bg={useColorModeValue('gray.100', 'gray.800')} align="start" justify="center" h="90vh"  >
      <Box bg={useColorModeValue('white', 'gray.500')} p={5} my={5} rounded="md" w={useBreakpointValue({ base: '100%', md: '50%' })}>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="flex-start">

            <FormControl isInvalid={Boolean(errors.comPublicKey && touched.comPublicKey)}>
              <FormLabel htmlFor="comPublicKey">Company Public Key</FormLabel>
              <Input
                id="comPublicKey"
                name="comPublicKey"
                type="text"
                variant="filled"
                onChange={handleChange}
                value={values.comPublicKey}
                onBlur={handleBlur}
              />
              <FormErrorMessage position={'absolute'} mt={0} pt={0} fontSize={'0.8rem'}>{errors.comPublicKey}</FormErrorMessage>

            </FormControl>

            <FormControl isInvalid={Boolean(errors.product && touched.product)}>
              <FormLabel htmlFor="product">Product</FormLabel>
              <Input
                id="product"
                name="product"
                type="text"
                variant="filled"
                onChange={handleChange}
                value={values.product}
                onBlur={handleBlur}
              />
              <FormErrorMessage position={'absolute'} mt={0} pt={0} fontSize={'0.8rem'}>{errors.product}</FormErrorMessage>

            </FormControl>

            <FormControl isInvalid={Boolean(errors.period && touched.period)}>
              <FormLabel htmlFor="period">Period</FormLabel>
              <Input
                id="period"
                name="period"
                type="text"
                variant="filled"
                onChange={handleChange}
                value={values.period}
                onBlur={handleBlur}
              />
              <FormErrorMessage position={'absolute'} my={0} py={0} fontSize={'0.8rem'}>{errors.period}</FormErrorMessage>

            </FormControl>

            <FormControl isInvalid={Boolean(errors.cost && touched.cost)}>
              <FormLabel htmlFor="cost">Cost</FormLabel>
              <Input
                id="cost"
                name="cost"
                type="number"
                variant="filled"
                onChange={handleChange}
                value={values.cost}
                onBlur={handleBlur}
              />
              <FormErrorMessage position={'absolute'} mt={0} pt={0} fontSize={'0.8rem'}>{errors.cost}</FormErrorMessage>

            </FormControl>

            <Button type="submit" colorScheme="purple" width="full">
              Send
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
}

