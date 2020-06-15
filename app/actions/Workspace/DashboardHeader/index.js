const config = require('../../../config/tezster.config');

const { GetBlockHeightAPI, GetAllBlockDataAPI } = require('./api.tzstats');

const localnodeData = {
  chainId: '00',
  currentBlock: '00',
  gas_limit: '32311',
  gas_price: '0.1228',
  networkId: 'Localnode',
  rpcServer: 'http://localhost:18731',
};
const { apiEndPoints } = config;

export function getDashboardHeaderAction(args) {
  return (dispatch) => {
    if (args.dashboardHeader.networkId === 'Localnode') {
      dispatch({
        type: 'GET_DASHBOARD_HEADER',
        payload: localnodeData,
      });
    } else {
      GetBlockHeightAPI(args, (blockHeightError, blockHeightResponse) => {
        if (blockHeightError) {
          dispatch({
            type: 'GET_DASHBOARD_HEADER_ERR',
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
              type: 'GET_DASHBOARD_HEADER_ERR',
              payload: blockDataError,
            });
          }
          dispatch({
            type: 'GET_DASHBOARD_HEADER',
            payload: {
              currentBlock: blockHeightResponse.height,
              chainId: blockHeightResponse.height,
              networkId: args.dashboardHeader.networkId,
              rpcServer: apiEndPoints[args.dashboardHeader.networkId],
              ...blockDataResponse,
              ...blockHeightResponse,
            },
          });
        });
      });
    }
  };
}

export function handleNetworkChangeAction(args) {
  const { networkId } = args.dashboardHeader;
  const networkName = networkId.split('-')[0];
  return (dispatch) => {
    if (networkName === 'Localnode') {
      return dispatch({
        type: 'GET_DASHBOARD_HEADER',
        payload: localnodeData,
      });
    }
    GetBlockHeightAPI(args, (blockHeightError, blockHeightResponse) => {
      if (blockHeightError) {
        dispatch({
          type: 'GET_DASHBOARD_HEADER_ERR',
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
            type: 'GET_DASHBOARD_HEADER_ERR',
            payload: blockDataError,
          });
        }
        return dispatch({
          type: 'GET_DASHBOARD_HEADER',
          payload: {
            currentBlock: blockHeightResponse.height,
            chainId: blockHeightResponse.height,
            rpcServer: apiEndPoints[networkId],
            networkId,
            ...blockDataResponse,
            ...blockHeightResponse,
          },
        });
      });
    });
  };
}
