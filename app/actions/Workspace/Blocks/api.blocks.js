/* eslint-disable promise/always-return */
import axios from 'axios';

import { TzStatsApiEndpoint } from '../../../db-config/tezster.config';

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
        end_height: response[1].data.end_height,
        blocks_per_cycle: response[2].data.blocks_per_cycle,
      };
      callback(null, payload);
    })
    .catch((exception) => {
      callback(exception, null);
    });
}

export function SearchBlocksApi(args, callback) {
  let url = TzStatsApiEndpoint[args.dashboardHeader.networkId];
  switch (true) {
    case args.SearchText.startsWith('KT'):
      url += `/explorer/contract/${args.SearchText}`;
      break;
    case args.SearchText.startsWith('tz'):
      url += `/explorer/account/${args.SearchText}`;
      break;
    case args.SearchText.startsWith('op'):
      url += `/explorer/op/${args.SearchText}`;
      break;
    case args.SearchText.startsWith('BM'):
      url += `/explorer/block/${args.SearchText}`;
      break;
    case args.SearchText.startsWith('oo'):
      url += `/explorer/op/${args.SearchText}`;
      break;
    case args.SearchText.startsWith('BK'):
      url += `/explorer/block/${args.SearchText}`;
      break;
    case args.SearchText.startsWith('BL'):
      url += `/explorer/block/${args.SearchText}`;
      break;
    default:
      callback('Invalid search text provided', null);
  }
  axios
    .get(url)
    .then((response) => {
      callback(null, response.data);
    })
    .catch((exception) => {
      callback(exception, null);
    });
}
