const btcPriceReducer = (state, action) => {

    switch(action.type){

        default:
            return state;

        case 'GET_BTC_PRICE':
            return {
                ...state,
                btcPrice: action.payload.BTC,
                increased: action.payload.increased,
                decreased: action.payload.decreased,
                loading: false
            };
    };
};

export default btcPriceReducer;