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
      GetBlockHeightAPI(args, (blockHeightError, blockHeightResponse) => {
        if (blockHeightError) {
          dispatch({
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
            dispatch({
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
          dispatch({
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
          dispatch({
            type: 'GET_BLOCKS',
            payload: blockDataError,
          });
        }
        // eslint-disable-next-line no-prototype-builtins
        const gasUsed = blockDataResponse.hasOwnProperty('gas_used')
          ? blockDataResponse.gas_used
          : '';
        dispatch({
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
