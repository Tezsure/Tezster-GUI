/* eslint-disable prettier/prettier */
/* eslint-disable no-case-declarations */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import Docker from 'dockerode';
import { RpcRequest } from '../../Workspace/Accounts/helper.accounts';

const config = require('../../../db-config/helper.dbConfig').GetLocalStorage();

const { TEZSTER_IMAGE } = config;

const ip = require('docker-ip');

export default async function CheckConnectionStatus(args) {
  let ProcessConfig;
  if (process.platform.includes('win')) {
    ProcessConfig = {
      host: `http://${ip()}`,
    };
  } if (process.platform.includes('darwin')) {
    ProcessConfig = {
      socketPath: '/var/run/docker.sock',
    };
  } else {
    ProcessConfig = {
      socketPath: '/var/run/docker.sock',
      hosts: 'tcp://0.0.0.0:2376',
    };
  }
  const docker = new Docker(ProcessConfig);
  return new Promise((resolve) => {
    switch (args.connectionType) {
      case 'INTERNET':
        return resolve(navigator.onLine);
      case 'TEZSTER_RUNNING':
        const URL = process.platform.includes('win') || process.platform.includes('darwin')
          ? `http://${ip()}:18732`
          : 'http://localhost:18732';
        RpcRequest.checkNodeStatus(URL)
          .then((res) => {
            if (res.protocol.startsWith('PsDELPH1')) {
              return resolve(true);
            }
            return resolve(false);
          })
          .catch((exp) => {
            return resolve(false);
          });
        break;
      case 'DOCKER_INSTALL_STATUS':
        docker.version((error, result) => {
          if (error) {
            return resolve(false);
          }
          return resolve(true);
        });
        break;
      case 'CHECK_DOCKER_IMAGE':
        const Error = 'Error: connect EACCES /var/run/docker.sock';
        docker.listImages({ all: true }, (err, images) => {
          if (err) {
            if (err.toString().includes(Error)) {
              return resolve({
                msg: 'docker-permission',
              });
            }
            return resolve({ msg: err });
          }
          const TezsterOldImages = images.filter(
            (elem) =>
              elem.RepoTags[0].includes('tezsureinc') &&
              elem.RepoTags[0] !== args.command
          );
          const TezsterMainImage = images.filter((elem) =>
            elem.RepoTags[0] === args.command
          );
          if (images.length === 0) {
            return resolve(false);
          }
          if (TezsterMainImage.length > 0) {
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
          const TezsterMainContainer = containers.filter((elem) =>
            elem.Image.includes(`${TEZSTER_IMAGE}`)
          );
          const TezsterOldContainer = containers.filter(
            (elem) =>
              elem.Names[0] === args.command &&
              !elem.Image.includes(`${TEZSTER_IMAGE}`)
          );
          const TezsterContainers = containers.filter((elem) =>
            elem.Image.includes(`${TEZSTER_IMAGE}`)
          );
          if (containers.length === 0) {
            return resolve(false);
          }
          if (TezsterOldContainer.length > 0) {
            docker
              .getContainer(TezsterOldContainer[0].Id)
              .remove({ force: true })
              .then((res) => {
                if (TezsterMainContainer.length > 0) {
                  return resolve(true);
                }
                return resolve(false);
              })
              .catch((exp) => {
                return resolve(false);
              });
          }
          if (
            TezsterOldContainer.length === 0 &&
            TezsterMainContainer.length > 0
          ) {
            return resolve(true);
          }
        });
        break;
      case 'CHECK_CONTAINER_RUNNING':
        docker.listContainers({ all: false }, (err, containers) => {
          if (err) {
            return resolve(false);
          }
          const TezsterMainContainer = containers.filter((elem) =>
            elem.Image.includes(`${TEZSTER_IMAGE}`)
          );
          const TezsterContainers = containers.filter((elem) =>
            elem.Image.includes(`${TEZSTER_IMAGE}`)
          );
          const TezsterOldContainer = containers.filter(
            (elem) =>
              elem.Names[0] === args.command &&
              !elem.Image.includes(`${TEZSTER_IMAGE}`)
          );
          if (containers.length === 0) {
            return resolve(false);
          }
          if (TezsterOldContainer.length > 0) {
            docker
              .getContainer(TezsterOldContainer[0].Id)
              .remove({ force: true })
              .then((res) => {
                if (TezsterMainContainer.length > 0) {
                  return resolve(true);
                }
                return resolve(false);
              })
              .catch((exp) => {
                return resolve(false);
              });
          }
          if (
            TezsterOldContainer.length === 0 &&
            TezsterMainContainer.length > 0
          ) {
            return resolve(true);
          }
        });
        break;
      default:
        return resolve(false);
    }
  });
}
