import store from "../app/store";
import {Provider} from "react-redux";
import {useEffect} from "react";
import {ChakraProvider} from '@chakra-ui/react'

import { extendTheme } from '@chakra-ui/react'

const colors = {
    brand: {
        900: '#1a365d',
        800: '#153e75',
        700: '#2a69ac',
    },
}

const theme = extendTheme({ colors })

function MyApp({Component, pageProps}) {
    useEffect(() => {
        const threeScript = document.createElement("script");
        threeScript.setAttribute("id", "threeScript");
        threeScript.setAttribute(
            "src",
            "https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js"
        );
        document.getElementsByTagName("head")[0].appendChild(threeScript);
        return () => {
            if (threeScript) {
                threeScript.remove();
            }
        };
    }, []);
    return (
        <ChakraProvider theme={theme}>
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </ChakraProvider>
    );
}

export default MyApp;
