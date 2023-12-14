const { REACT_APP_MEMPOOL_API_URL } = process.env;

export const mempoolRequest = ({resource, v1 = false}) => v1 
? `${REACT_APP_MEMPOOL_API_URL}/v1/${resource}` 
: `${REACT_APP_MEMPOOL_API_URL}/${resource}`;

export default class MempoolAPI {
    static GET_DIFF_ADJ = mempoolRequest({resource: 'difficulty-adjustment', v1: true})
    static GET_MEMPOOL_BLOCKS = mempoolRequest({resource: 'blocks', v1: true});
    static GET_MEMPOOL_LATEST_BLOCK_HSH = mempoolRequest({resource: 'blocks/tip/hash'});
    static GET_MEMPOOL_LST_10_TXS = mempoolRequest({resource: 'mempool/recent'});
    static GET_MEMPOOL_RCMND_FEES = mempoolRequest({resource: 'fees/recommended', v1: true});
    static GET_MEMPOOL_LTNW_STATS_LATEST = mempoolRequest({resource: 'lightning/statistics/latest', v1: true});
    static GET_MEMPOOL_LTNW_STATS_3D = mempoolRequest({resource: 'lightning/statistics/3d', v1: true});
};

class CoinCapAPI {

    static GET_BTC_INFO = 'api.coincap.io/v2/assets/bitcoin'
}