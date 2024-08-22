import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import Style from './Style.css';
import { HelmetProvider } from 'react-helmet-async';




const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode>
    <HelmetProvider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </HelmetProvider>
  </StrictMode>
);

