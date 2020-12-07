const config = require('../../../db-config/helper.dbConfig');

const { GetBlockHeightAPI, GetAllBlockDataAPI } = require('./api.tzstats');

const localnodeData = {
  chainId: '00',
  currentBlock: '00',
  gas_limit: '32311',
  gas_price: '0.1228',
  networkId: 'Localnode',
  rpcServer: 'http://localhost:18732',
};

const DelphinetTezsterData = {
  chainId: '516790',
  currentBlock: '00',
  gas_limit: '42601',
  gas_price: '0.12002',
  networkId: 'Delphinet-Tezster',
  rpcServer: 'https://testnet.tezster.tech',
};

const DelphinetSmartpyData = {
  chainId: '516790',
  currentBlock: '00',
  gas_limit: '42601',
  gas_price: '0.12002',
  networkId: 'Delphinet-Smartpy',
  rpcServer: 'https://delphinet-tezos.giganode.io',
};

const MainnetSmartpyData = {
  chainId: '1074097',
  currentBlock: '00',
  gas_limit: '61400',
  gas_price: '0.29392',
  networkId: 'Mainnet-Smartpy',
  rpcServer: 'https://mainnet-tezos.giganode.io',
};

export function getDashboardHeaderAction(args) {
  const { apiEndPoints } = config.GetLocalStorage();
  return (dispatch) => {
    if (args.dashboardHeader.networkId === 'Localnode') {
      return dispatch({
        type: 'GET_DASHBOARD_HEADER',
        payload: localnodeData,
      });
    }
    GetBlockHeightAPI(args, (blockHeightError, blockHeightResponse) => {
      if (blockHeightError) {
        return dispatch({
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
          return dispatch({
            type: 'GET_DASHBOARD_HEADER_ERR',
            payload: blockDataError,
          });
        }
        return dispatch({
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
  };
}

export function handleNetworkChangeAction(args) {
  const { apiEndPoints } = config.GetLocalStorage();
  const { networkId } = args.dashboardHeader;
  const networkName = networkId.split('-')[0];
  return (dispatch) => {
    if (networkName === 'Localnode') {
      return dispatch({
        type: 'GET_DASHBOARD_HEADER',
        payload: localnodeData,
      });
    }
    if (networkName === 'Delphinet-Smartpy') {
      dispatch({
        type: 'GET_DASHBOARD_HEADER',
        payload: DelphinetSmartpyData,
      });
    }
    if (networkName === 'Delphinet-Tezster') {
      dispatch({
        type: 'GET_DASHBOARD_HEADER',
        payload: DelphinetTezsterData,
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
        return dispatch({
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
          return dispatch({
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
