/* eslint-disable promise/always-return */
import axios from 'axios';

const {
  TzStatsApiEndpoint,
} = require('../../../db-config/helper.dbConfig').GetLocalStorage();

export function GetBlockHeightAPI(args, callback) {
  const url = TzStatsApiEndpoint[args.dashboardHeader.networkId];
  axios
    .get(`${url}/explorer/block/head`)
    .then((response) => {
      callback(null, response.data);
    })
    .catch((exception) => {
      callback(exception, null);
    });
}

export function GetBlockDataAPI(args, callback) {
  const url = TzStatsApiEndpoint[args.dashboardHeader.networkId];
  axios
    .get(`${url}/explorer/block/${args.blockId}`)
    .then((response) => {
      callback(null, response.data);
    })
    .catch((exception) => {
      callback(exception, null);
    });
}

export function GetAllBlockDataAPI(args, callback) {
  const url = TzStatsApiEndpoint[args.dashboardHeader.networkId];
  const blockHeadAPI = axios.get(`${url}/explorer/block/head/op`);
  const blockCycleAPI = axios.get(`${url}/explorer/cycle/head`);
  const blockChainConfigAPI = axios.get(`${url}/explorer/config/head`);

  axios
    .all([blockHeadAPI, blockCycleAPI, blockChainConfigAPI])
    .then((response) => {
      const payload = {
        ops: response[0].data.ops,
        endorsement_reward: response.fee,
        cycle: response[1].data.cycle,
        progress: response[1].data.progress,
        height: response[0].data.height,
        blocks_per_cycle: response[2].data.blocks_per_cycle,
      };
      callback(null, payload);
    })
    .catch((exception) => {
      callback(exception, null);
    });
}

function GetBlockHeightURL(Height) {
  return `/tables/op?height=${Height}&columns=row_id,sender,receiver,type,hash,volume,fee,reward,is_success,is_contract&type.in=transaction,activate_account,endorsement,delegation,origination,reveal,seed_nonce_revelation,double_baking_evidence,double_endorsement_evidence,proposals,ballot&limit=50`;
}

export function SearchBlocksApi(args, callback) {
  let url = TzStatsApiEndpoint[args.dashboardHeader.networkId];
  let BlockHeightURL = TzStatsApiEndpoint[args.dashboardHeader.networkId];
  switch (true) {
    case args.dashboardHeader.networkId === 'Localnode':
      return callback(null, []);
    case args.SearchText.startsWith('KT'):
      url += `/explorer/contract/${args.SearchText}`;
      axios
        .get(url)
        .then((response) => {
          return callback(null, response.data);
        })
        .catch((exception) => {
          return callback(exception, null);
        });
      break;
    case args.SearchText.startsWith('tz'):
      url += `/explorer/account/${args.SearchText}`;
      axios
        .get(url)
        .then((response) => {
          return callback(null, response.data);
        })
        .catch((exception) => {
          return callback(exception, null);
        });
      break;
    case args.SearchText.startsWith('op') || args.SearchText.startsWith('oo'):
      url += `/explorer/op/${args.SearchText}`;
      axios
        .get(url)
        .then((response) => {
          return callback(null, response.data);
        })
        .catch((exception) => {
          return callback(exception, null);
        });
      break;
    case args.SearchText.startsWith('BL') ||
      args.SearchText.startsWith('BK') ||
      args.SearchText.startsWith('BM'):
      BlockHeightURL += `/explorer/block/${args.SearchText}`;
      axios
        .get(BlockHeightURL)
        .then((BlockResponse) => {
          url += GetBlockHeightURL(BlockResponse.data.height);
          axios
            .get(url)
            .then((response) => {
              return callback(null, response.data);
            })
            .catch((exception) => {
              return callback(exception, null);
            });
        })
        .catch((exception) => {
          return callback(exception, null);
        });
      break;
    default:
      return callback('Invalid search text provided', null);
  }
}
