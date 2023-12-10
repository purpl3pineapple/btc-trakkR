const btcPriceReducer = (state, action) => {

    switch(action.type){

        default:
            return state;

        case 'GET_BTC_PRICE':
            return {
                ...state,
                btcPrice: action.payload,
                loading: false
            };
    };
};

export default btcPriceReducer;