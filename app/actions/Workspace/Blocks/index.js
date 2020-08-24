const {
  GetBlockHeightAPI,
  GetBlockDataAPI,
  GetAllBlockDataAPI,
  SearchBlocksApi,
} = require('./api.blocks');

const localnodeData = {
  chainId: '00',
  currentBlock: '00',
  gas_limit: '32311',
  gas_price: '0.1228',
  networkId: 'Localnode',
  rpcServer: 'http://localhost:18732',
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

const MainnetSmartpyData = {
  chainId: '1074097',
  currentBlock: '00',
  gas_limit: '61400',
  gas_price: '0.29392',
  networkId: 'Mainnet-Smartpy',
  rpcServer: 'https://mainnet.SmartPy.io',
};

export function getBlockHeadsAction(args) {
  const { networkId } = args.dashboardHeader;
  const networkName = networkId.split('-')[0];
  return (dispatch) => {
    dispatch({
      type: 'SET_SEARCH_TEXT',
      payload: '',
    });
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
      if (networkId === 'Mainnet-Smartpy') {
        dispatch({
          type: 'GET_DASHBOARD_HEADER',
          payload: MainnetSmartpyData,
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

export function searchBlocksAction(args) {
  return (dispatch) => {
    dispatch({
      type: 'GET_BLOCKS_SEARCH',
      payload: [],
    });
    dispatch({
      type: 'SET_SEARCH_TEXT',
      payload: '',
    });
    SearchBlocksApi(args, (error, response) => {
      if (error) {
        dispatch({
          type: 'TEZSTER_ERROR',
          payload: error,
        });
        dispatch({
          type: 'SET_SEARCH_TEXT',
          payload: args.SearchText,
        });
        dispatch({
          type: 'GET_BLOCKS_SEARCH',
          payload: [],
        });
        return setTimeout(() => {
          dispatch({
            type: 'TEZSTER_ERROR',
            payload: '',
          });
        }, 4000);
      }
      dispatch({
        type: 'SET_SEARCH_TEXT',
        payload: args.SearchText,
      });
      return dispatch({
        type: 'GET_BLOCKS_SEARCH',
        payload: response,
      });
    });
  };
}
export function resetSearchText() {
  return {
    type: 'SET_SEARCH_TEXT',
    payload: '',
  };
}
