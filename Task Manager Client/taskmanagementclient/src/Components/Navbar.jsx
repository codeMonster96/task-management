import { Avatar, Box, Button, Flex, HStack, Heading, Spacer, Text, useToast } from '@chakra-ui/react'
import React from 'react'

export default function Navbar() {
    const toast = useToast()
    const showToast = () => {
        toast({
            title: "Logged Out",
            description: "Logged Out Successfully",
            duration: 5000,
            isClosable: "true",
            status: "success",
            position: 'top'
        })
    }
    return (
        <Flex as="nav" p="10px" alignItems="center">
            <Heading as="h1" fontSize="1.5em"> Tasks</Heading>
            <Spacer />

            <HStack spacing="20px">
                <Avatar src='./img/mario.png' />

                <Text>abhinav@abhinavjagtap.dev</Text>
                <Button colorScheme="purple" onClick={showToast}>Logout</Button>
            </HStack>
        </Flex>
    )
}