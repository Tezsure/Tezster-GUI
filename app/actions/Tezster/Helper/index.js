/* eslint-disable no-unused-vars */
import { exec } from 'child_process';
import Docker from 'dockerode';
import { RpcRequest } from '../../../apis/getAccountBalance';

const config = require('../../../apis/config');
const { __getBalance } = require('../../../apis/eztz.service');

const url = config.provider;
const testPkh = config.identities[0].pkh;

function executeCommandHelper(args, callback) {
  const { command } = args;
  exec(command, (err, stdout, stderr) => {
    if (err || stderr || stdout.toString().toLowerCase().includes('error')) {
      return callback(err, null);
    }
    return callback(null, stdout);
  });
}

export default async function checkConnectionStatus(args) {
  const docker = new Docker();
  return new Promise((resolve, reject) => {
    switch (args.connectionType) {
      case 'INTERNET':
        return resolve(navigator.onLine);
      case 'TEZSTER_RUNNING':
        RpcRequest.checkNodeStatus(url)
          .then((res) => {
            if (res.protocol.startsWith('PsCARTHAG')) {
              return resolve(true);
            } else {
              return resolve(false);
            }
          })
          .catch((exp) => {
            return resolve(false);
          });
        break;
      case 'DOCKER_INSTALL_STATUS':
        executeCommandHelper(args, (err, result) => {
          if (err) {
            return reject(err);
          }
          return resolve(true);
        });
        break;
      case 'CHECK_DOCKER_IMAGE':
        docker.listImages({ all: true }, (err, images) => {
          if (err) {
            return reject(err);
          }
          if (images.length === 0) {
            return resolve(false);
          }
          if (
            images.filter((elem) =>
              elem.RepoTags[0].includes('tezsureinc/tezster:1.0.2')
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
            return reject(err);
          }
          if (containers.length === 0) {
            return resolve(false);
          }
          if (
            containers.filter((elem) => elem.Names[0].includes('tezster'))
              .length > 0 ||
            containers.filter(
              (elem) =>
                elem.Image.includes('tezsureinc/tezster:1.0.2').length > 0
            )
          ) {
            return resolve(true);
          }
          return resolve(false);
        });
        break;
      case 'CHECK_CONTAINER_RUNNING':
        docker.listContainers({ all: false }, (err, containers) => {
          if (err) {
            return reject(err);
          }
          if (containers.length === 0) {
            return resolve(false);
          }
          if (
            containers.filter((elem) => elem.Names[0].includes('tezster'))
              .length > 0 ||
            containers.filter(
              (elem) =>
                elem.Image.includes('tezsureinc/tezster:1.0.2').length > 0
            )
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
