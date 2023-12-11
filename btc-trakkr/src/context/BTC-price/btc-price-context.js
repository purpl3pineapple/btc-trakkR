import { createContext, useReducer } from "react";
import useWebSocket from 'react-use-websocket';
import btcPriceReducer from "./btc-price-reducer";

const BtcPriceContext = createContext();

const BTC_WS_URL = process.env.REACT_APP_BTC_WS_URL;


export const BtcPriceProvider = ({children}) => {

    const init = {
        btcPrice: null,
        increased: null,
        decreased: null,
        loading: true
    };

    const [state, dispatch] = useReducer(btcPriceReducer, init);

    useWebSocket(BTC_WS_URL, {

        onMessage: msg => {

            try {

                const currentPrice = state.btcPrice === null 
                ? state.btcPrice 
                : Number(state.btcPrice.replace(/,/g, ''));

                const { bitcoin } = JSON.parse(msg.data);

                const increased = currentPrice === null ? currentPrice : Number(bitcoin) > currentPrice;

                const decreased = currentPrice === null ? currentPrice : Number(bitcoin) < currentPrice;

                const dollars = bitcoin
                .split('.')[0]
                .split(/(\d{3})$/g)
                .filter(item => item !== '')
                .join(',');

                const cents = /\.[0-9]+$/.exec(bitcoin)[0];

                const BTC = dollars.concat(cents);
                

                dispatch({
                    type: 'GET_BTC_PRICE',
                    payload: {
                        BTC,
                        increased,
                        decreased
                    }
                });

            } catch(error){

                console.log({error});
            };
        },

        shouldReconnect: () => true,
    });


    return <BtcPriceContext.Provider value={{ 
        btcPrice: state.btcPrice,
        increased: state.increased,
        decreased: state.decreased,
        loading: state.loading
    }}>
        {children}
    </BtcPriceContext.Provider>;
};

export default BtcPriceContext;