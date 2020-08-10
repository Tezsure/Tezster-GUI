/* eslint-disable no-unused-vars */
/* eslint-disable no-case-declarations */
/* eslint-disable no-prototype-builtins */
const { apiEndPoints } = JSON.parse(localStorage.getItem('db-config'));

const request = require('request');

export function ContractDeployedStatusHelper(args, callback) {
  const { networkId } = args.dashboardHeader;
  const networkName = networkId.split('-')[0];
  const contract = args.selectedContracts;
  const END_POINT_URL = apiEndPoints[networkId];
  let URL;

  if (networkName === 'Localnode') {
    URL = `${END_POINT_URL}/chains/main/blocks/head/context/contracts/${contract}`;
  } else {
    URL = `${END_POINT_URL}/explorer/contract/${contract}`;
  }
  request(URL, (error, response, body) => {
    switch (true) {
      case error !== null:
        return callback(error.toString(), null);
      case response.hasOwnProperty('errors'):
        const errorMsg = `Invalid contract address`;
        return callback(errorMsg, null);
      default:
        const msg = `valid-contract`;
        return callback(null, msg);
    }
  });
}

export function HandleContractErrorsHelper(error) {
  const EMPTY_IMPLICIT_CONTRACT =
    'Account is not yet revealed on the blockchain.\n You can reveal the account by sending some tezos to the account.';
  const EMPTY_TRANSACTION = `please wait.\n contract might take some time to get deployed on the tezos network`;
  const NOT_FOUND_404 = `make sure current network is same as the network smart contract got deployed.`;
  const CONNECT_ECONNREFUSED =
    'Error occurred while establishing the connection with node provider.';
  const ABSOLUTE_URL_ARE_SUPPORTED =
    'Current provider URL is not supported by network provider.';
  const GETADDRINFO_ENOTFOUND =
    'Current provider URL is not supported by network provider.';
  const HTTP_PROTOCOL =
    'Current provider URL is not supported by network provider.';
  const CANNOT_READ_PROPERTY =
    'Current provider URL is not supported by network provider.';
  const CHECKSUM = `Account doesn't  exists or not revealed on the network.\n To list down all accounts run 'tezster list-accounts'.`;
  const INVALID = 'Current provider URL is not supported by network provider.';
  const UNEXPECTED_END_OF_JSON_INPUT =
    'Make sure account is revealed on the current provider.';
  const INVALID_CONTRACT_PARAMETER =
    '\n Invalid parameter value provided for the given parameter type';
  const CONTRACT_DOESNOT_EXISTS = `Contract no longer exists on the selected network type`;
  const ACCOUNT_ALREADY_ACTIVATED = `Account has already been activated please restore the account`;
  const GAS_LIMIT_ERROR =
    '\nNot enough gas provided please increase the gas limit.\nWe recommend to increase it to 500000';
  switch (true) {
    case error.toString().includes('Unexpected word token'):
      return error.toString().replace(/(?:\r\n|\r|\n|\s\s+)/g, ' ');
    case error.toString().includes('empty_implicit_contract'):
      return EMPTY_IMPLICIT_CONTRACT;
    case error.toString().includes('empty_transaction'):
      return EMPTY_TRANSACTION;
    case error.toString().includes('with 404 and Not Found'):
      return `with 404 and Not Found`;
    case error.toString().includes('connect ECONNREFUSED'):
      return CONNECT_ECONNREFUSED;
    case error.toString().includes('Only absolute URLs are supported'):
      return ABSOLUTE_URL_ARE_SUPPORTED;
    case error.toString().includes('getaddrinfo ENOTFOUND'):
      return GETADDRINFO_ENOTFOUND;
    case error.toString().includes('Only HTTP(S) protocols are supported'):
      return HTTP_PROTOCOL;
    case error.toString().includes(`Cannot read property '0' of undefined`):
      return CANNOT_READ_PROPERTY;
    case error
      .toString()
      .includes(`proto.006-PsCARTHA.michelson_v1.bad_contract_parameter`):
      return INVALID_CONTRACT_PARAMETER;
    case error
      .toString()
      .includes(`temporary: proto.006-PsCARTHA.michelson_v1.script_rejected`):
      return INVALID_CONTRACT_PARAMETER;
    case error
      .toString()
      .includes(`proto.006-PsCARTHA.operation.invalid_activation`):
      return ACCOUNT_ALREADY_ACTIVATED;
    case error.toString().includes(`non_existing_contract`):
      return CONTRACT_DOESNOT_EXISTS;
    case error
      .toString()
      .includes(`proto.006-PsCARTHA.gas_exhausted.operation`):
      return GAS_LIMIT_ERROR;
    default:
      return error.toString().replace(/(?:\r\n|\r|\n|\s\s+)/g, ' ');
  }
}
