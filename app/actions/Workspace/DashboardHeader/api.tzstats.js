/* eslint-disable promise/always-return */
import axios from 'axios';

const Config = require('../../../db-config/helper.dbConfig');

export function GetBlockHeightAPI(args, callback) {
  const url = Config.GetLocalStorage().TzStatsApiEndpoint[
    args.dashboardHeader.networkId
  ];
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
  const url = Config.GetLocalStorage().TzStatsApiEndpoint[
    args.dashboardHeader.networkId
  ];
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
  const url = Config.GetLocalStorage().TzStatsApiEndpoint[
    args.dashboardHeader.networkId
  ];
  axios
    .get(`${url}/explorer/block/head/op`)
    .then((response) => {
      callback(null, response.data.ops);
    })
    .catch((exception) => {
      callback(exception, null);
    });
}
