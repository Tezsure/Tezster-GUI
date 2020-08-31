/* eslint-disable no-unused-vars */
import Docker from 'dockerode';
import { RpcRequest } from '../../Workspace/Accounts/helper.accounts';
const config = require('../../../db-config/helper.dbConfig').GetLocalStorage();
const { TEZSTER_IMAGE, TEZSTER_CONTAINER_NAME } = config;
const url = config.provider;

const ip = require('docker-ip');

export default async function CheckConnectionStatus(args) {
  const docker = new Docker({ host: `http://${ip()}` });
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
        docker.version((err, result) => {
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
          const TezsterOldImages = images.filter(
            (elem) =>
              elem.RepoTags[0].includes('tezsureinc') &&
              !elem.RepoTags[0].includes(`${TEZSTER_IMAGE}`)
          );
          const TezsterMainImage = images.filter((elem) =>
            elem.RepoTags[0].includes(`${TEZSTER_IMAGE}`)
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
              elem.Names[0].includes(`${TEZSTER_CONTAINER_NAME}`) &&
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
              elem.Names[0].includes(`${TEZSTER_CONTAINER_NAME}`) &&
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
