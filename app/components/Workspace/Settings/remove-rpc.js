/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import swal from 'sweetalert';

const Config = require('../../../db-config/helper.dbConfig');

class RemoveRpc extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleRemoveRpc = this.handleRemoveRpc.bind(this);
  }

  handleRemoveRpc(node) {
    const DBconfig = Config.GetDbConfig();
    const LocalStorage = Config.GetLocalStorage();
    const LOCAL_STORAGE_NAME = DBconfig.storageName;

    DBconfig.Nodes = DBconfig.Nodes.filter((elem) => elem !== node);
    delete DBconfig.apiEndPoints[node];
    delete DBconfig.TzStatsApiEndpoint[node];
    delete DBconfig.accounts[node];
    delete DBconfig.contracts[node];
    delete DBconfig.transactions[node];

    LocalStorage.Nodes = LocalStorage.Nodes.filter((elem) => elem !== node);
    delete LocalStorage.apiEndPoints[node];
    delete LocalStorage.TzStatsApiEndpoint[node];
    delete LocalStorage.accounts[node];
    delete LocalStorage.contracts[node];
    delete LocalStorage.transactions[node];
    delete LocalStorage.userAccounts[node];

    localStorage.setItem('db-config', JSON.stringify(DBconfig));
    localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(LocalStorage));

    this.props.getLocalConfigAction();
    this.props.getBlockHeadsAction({ ...this.props });
    swal('Success!', 'Rpc node deleted successfully', 'success');
  }

  render() {
    const { localConfig } = this.props;
    const ListRpcServer = localConfig.Nodes.map((elem) => {
      let DISABLED_DELETE = false;
      if (
        elem === 'Localnode' ||
        elem === 'Carthagenet-Tezster' ||
        elem === 'Carthagenet-Smartpy' ||
        elem === 'Mainnet-Smartpy'
      ) {
        DISABLED_DELETE = true;
      }
      return (
        <tr className="table-row" key={elem}>
          <td className="table-body-cell">
            <div className="cards-header">
              <h4>LABEL</h4>
            </div>
            <div className="cards-contents">
              <p className="account-address-content">{elem}</p>
            </div>
          </td>
          <td className="table-body-cell">
            <div className="cards-header">
              <h4>NETWORK RPC</h4>
            </div>
            <div className="cards-contents">
              <p className="account-address-content">
                {localConfig.apiEndPoints[elem]}
              </p>
            </div>
          </td>
          <td className="table-body-cell">
            <div className="cards-header">
              <h4>TZSTATS EXPLORER ENDPOINT</h4>
            </div>
            <div className="cards-contents">
              <p className="account-address-content">
                {localConfig.TzStatsApiEndpoint[elem]}
              </p>
            </div>
          </td>
          <td className="table-body-cell">
            <div className="cards-header">
              <h4>NETWORK TYPE</h4>
            </div>
            <div className="cards-contents">
              <p className="account-address-content">{elem.split('-')[0]}</p>
            </div>
          </td>
          <td className="table-body-cell" style={{ textAlign: 'center' }}>
            <span
              className="delete-icon"
              style={
                DISABLED_DELETE
                  ? { marginTop: '10px', pointerEvents: 'none', cursor: 'none' }
                  : { marginTop: '10px' }
              }
              onClick={() => this.handleRemoveRpc(elem)}
            />
          </td>
        </tr>
      );
    });
    return (
      <div className="accounts-table-container" style={{ width: '100%' }}>
        <table className="table table-striped table-bordered">
          <tbody>{ListRpcServer}</tbody>
        </table>
      </div>
    );
  }
}

export default RemoveRpc;
