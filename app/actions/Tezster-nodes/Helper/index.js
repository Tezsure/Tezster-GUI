/* eslint-disable no-unused-vars */
import { exec } from 'child_process';
import Docker from 'dockerode';
import { RpcRequest } from '../../Workspace/Accounts/helper.accounts';

const config = require('../../../db-config/tezster.config');
const { GetBalanceAPI } = require('../../Workspace/Accounts/api.accounts');

const { TEZSTER_IMAGE } = require('../../../db-config/tezster.config');

const url = config.provider;
const testPkh = config.identities[0].pkh;

function executeCommandHelper(args, callback) {
  const { command } = args;
  exec(command, (err, stdout, stderr) => {
    if (err || stderr || stdout.toString().toLowerCase().includes('error')) {
      const dockerError = 'Error: docker not installed';
      return callback(dockerError, null);
    }
    return callback(null, stdout);
  });
}

export default async function CheckConnectionStatus(args) {
  const docker = new Docker();
  return new Promise((resolve) => {
    switch (args.connectionType) {
      case 'INTERNET':
        return resolve(navigator.onLine);
      case 'TEZSTER_RUNNING':
        RpcRequest.checkNodeStatus(url)
          .then((res) => {
            if (res.protocol.startsWith('PsCARTHAG')) {
              return resolve(true);
            }
            return resolve(false);
          })
          .catch((exp) => {
            return resolve(false);
          });
        break;
      case 'DOCKER_INSTALL_STATUS':
        executeCommandHelper(args, (err, result) => {
          if (err) {
            return resolve(false);
          }
          return resolve(true);
        });
        break;
      case 'CHECK_DOCKER_IMAGE':
        docker.listImages({ all: true }, (err, images) => {
          if (err) {
            if (
              err
                .toString()
                .includes('Error: connect EACCES /var/run/docker.sock')
            ) {
              return resolve({
                msg: 'docker-permission',
              });
            }
            return resolve({ msg: err });
          }
          if (images.length === 0) {
            return resolve(false);
          }
          if (
            images.filter((elem) =>
              elem.RepoTags[0].includes(`${TEZSTER_IMAGE}`)
            ).length > 0
          ) {
            return resolve(true);
          }
          return resolve(false);
        });
        break;
      case 'CHECK_CONTAINER_PRESENT':
        docker.listContainers({ all: true }, (err, containers) => {
          if (err) {
            return resolve(false);
          }
          if (containers.length === 0) {
            return resolve(false);
          }
          if (
            containers.filter((elem) => elem.Names[0].includes('tezster'))
              .length > 0 ||
            containers.filter((elem) => elem.Image.includes(`${TEZSTER_IMAGE}`))
              .length > 0
          ) {
            return resolve(true);
          }
          return resolve(false);
        });
        break;
      case 'CHECK_CONTAINER_RUNNING':
        docker.listContainers({ all: false }, (err, containers) => {
          if (err) {
            return resolve(false);
          }
          if (containers.length === 0) {
            return resolve(false);
          }
          if (
            containers.filter((elem) => elem.Names[0].includes('tezster'))
              .length > 0 ||
            containers.filter((elem) => elem.Image.includes(`${TEZSTER_IMAGE}`))
              .length > 0
          ) {
            return resolve(true);
          }
          return resolve(false);
        });
        break;
      default:
        return resolve(false);
    }
  });
}
