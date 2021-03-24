import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './redux/store';
import { ChakraProvider } from "@chakra-ui/react"
import { Provider } from 'react-redux';
import './config/firebase';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ChakraProvider>
                <App/>
            </ChakraProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
