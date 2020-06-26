const {
  GetBlockHeightAPI,
  GetBlockDataAPI,
  GetAllBlockDataAPI,
} = require('./api.blocks');

const localnodeData = {
  chainId: '00',
  currentBlock: '00',
  gas_limit: '32311',
  gas_price: '0.1228',
  networkId: 'Localnode',
  rpcServer: 'http://localhost:18731',
};

const CarthagenetTezsterData = {
  chainId: '516790',
  currentBlock: '00',
  gas_limit: '42601',
  gas_price: '0.12002',
  networkId: 'Carthagenet-Tezster',
  rpcServer: 'https://testnet.tezster.tech',
};

const CarthagenetSmartpyData = {
  chainId: '516790',
  currentBlock: '00',
  gas_limit: '42601',
  gas_price: '0.12002',
  networkId: 'Carthagenet-Smartpy',
  rpcServer: 'https://carthagenet.SmartPy.io',
};

export function getBlockHeadsActions(args) {
  const { networkId } = args.dashboardHeader;
  const networkName = networkId.split('-')[0];
  return (dispatch) => {
    if (networkName === 'Localnode') {
      dispatch({
        type: 'GET_DASHBOARD_HEADER',
        payload: localnodeData,
      });
      dispatch({
        type: 'GET_BLOCKS',
        payload: localnodeData,
      });
    } else {
      if (networkId === 'Carthagenet-Smartpy') {
        dispatch({
          type: 'GET_DASHBOARD_HEADER',
          payload: CarthagenetSmartpyData,
        });
      }
      if (networkId === 'Carthagenet-Tezster') {
        dispatch({
          type: 'GET_DASHBOARD_HEADER',
          payload: CarthagenetTezsterData,
        });
      }
      GetBlockHeightAPI(args, (blockHeightError, blockHeightResponse) => {
        if (blockHeightError) {
          dispatch({
            type: 'GET_BLOCKS',
            payload: [],
          });
          return dispatch({
            type: 'GET_BLOCKS_ERR',
            payload: blockHeightError,
          });
        }
        const payload = {
          blockId: blockHeightResponse.height,
          ...args,
        };
        GetAllBlockDataAPI(payload, (blockDataError, blockDataResponse) => {
          if (blockDataError) {
            return dispatch({
              type: 'GET_BLOCKS_ERR',
              payload: blockDataError,
            });
          }
          dispatch({
            type: 'GET_BLOCKS_SEARCH',
            payload: {
              searchBlockResponse: [],
              gas_used: '',
            },
          });
          return dispatch({
            type: 'GET_BLOCKS',
            payload: {
              blockDataResponse,
              ...blockHeightResponse,
            },
          });
        });
      });
    }
  };
}

export function searchBlockHead(args) {
  return (dispatch) => {
    if (args.dashboardHeader.networkId === 'Localnode') {
      dispatch({
        type: 'GET_DASHBOARD_HEADER',
        payload: localnodeData,
      });
      dispatch({
        type: 'GET_BLOCKS',
        payload: localnodeData,
      });
    } else {
      const payload = {
        blockId: args.searchData,
        ...args,
      };
      GetBlockDataAPI(payload, (blockDataError, blockDataResponse) => {
        if (blockDataError) {
          return dispatch({
            type: 'GET_BLOCKS',
            payload: [],
          });
        }
        // eslint-disable-next-line no-prototype-builtins
        const gasUsed = blockDataResponse.hasOwnProperty('gas_used')
          ? blockDataResponse.gas_used
          : '';
        return dispatch({
          type: 'GET_BLOCKS_SEARCH',
          payload: {
            searchBlockResponse: [blockDataResponse],
            gas_used: gasUsed,
          },
        });
      });
    }
  };
}
