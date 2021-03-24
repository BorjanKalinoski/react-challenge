import React from 'react';
import firebase from "firebase";
import { Box, Center } from '@chakra-ui/react';
import RegisterForm from "./components/RegisterForm";

function App() {

    return (
        <Box w='35%' m='auto' mt={10} p={5}>
            <RegisterForm/>
        </Box>
    );
}

export default App;
