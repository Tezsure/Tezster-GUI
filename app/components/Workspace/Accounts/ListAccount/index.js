/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import AccountsModal from '../AccountsInfoModal';

const DISABLED_LABELS = [
  'bootstrap1',
  'bootstrap2',
  'bootstrap3',
  'bootstrap4',
  'bootstrap5',
];

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalType: '',
      currentAccount: '',
    };
    this.handleModalToggle = this.handleModalToggle.bind(this);
    this.handleWalletModalShow = this.handleWalletModalShow.bind(this);
  }

  handleModalToggle(modalType) {
    this.setState({ modalType });
  }

  handleWalletModalShow({ ...args }) {
    const userState = { ...this.state };
    const currentAccount = {
      label: args.label,
      amount: args.balance,
      publicKey: args.pk,
      secretKey: args.sk,
      publicKeyHash: args.pkh,
    };
    userState.currentAccount = currentAccount;
    this.setState({ ...userState, modalType: 'show-user-wallet' });
  }

  render() {
    const { networkId } = this.props.dashboardHeader;
    const { userAccounts } = this.props;
    const Accounts = userAccounts.map((elem, index) => {
      const DISABLED_DELETE =
        DISABLED_LABELS.filter((label) => label === elem.label).length > 0;
      return (
        <tr className="table-row" key={elem.account + index}>
          <td className="table-body-cell">
            <div className="cards-header">
              <h4>LABEL</h4>
            </div>
            <div className="cards-contents">
              <p className="account-address-content">{elem.label}</p>
            </div>
          </td>
          <td className="table-body-cell">
            <div className="cards-header">
              <h4>ADDRESS</h4>
            </div>
            <div className="cards-contents">
              <p className="account-address-content">{elem.account}</p>
            </div>
          </td>
          <td className="table-body-cell">
            <div className="cards-header">
              <h4>BALANCE</h4>
            </div>
            <div className="cards-contents">
              <p className="account-address-content">
                {elem.balance} <span className="tezos-icon">ꜩ</span>
              </p>
            </div>
          </td>
          <td className="table-body-cell">
            <div className="cards-header">
              <h4>TX COUNT</h4>
            </div>
            <div className="cards-contents">
              <p className="account-address-content">0</p>
            </div>
          </td>
          <td className="table-body-cell">
            <span
              className="icon-key"
              style={{ marginTop: '5px' }}
              onClick={() => this.handleWalletModalShow(elem)}
            />
          </td>
          <td
            className="table-body-cell"
            style={
              DISABLED_DELETE
                ? {
                    cursor: 'not-allowed',
                    pointerEvents: 'none',
                    textAlign: 'center',
                  }
                : { textAlign: 'center' }
            }
            disabled={DISABLED_DELETE}
          >
            <span
              className="delete-icon"
              style={
                DISABLED_DELETE
                  ? {
                      cursor: 'not-allowed',
                      pointerEvents: 'none',
                      marginTop: '10px',
                    }
                  : { marginTop: '10px' }
              }
              disabled={DISABLED_DELETE}
              onClick={() =>
                this.props.deleteAccountAction({ ...this.props, ...elem })
              }
            />
          </td>
        </tr>
      );
    });
    if (this.props.userAccounts.length === 0) {
      let msg;
      if (networkId === 'Localnode') {
        msg = 'LocalNodes are not running please start the nodes.';
      } else if (networkId !== 'Localnode' && userAccounts.length === 0) {
        msg =
          'No accounts available on the selected network please add an account.';
      }
      return (
        <div className="accounts-table-container">
          <p>{msg}</p>
        </div>
      );
    }
    return (
      <div className="accounts-table-container" style={{ width: '100%' }}>
        <table className="table table-striped table-bordered">
          <tbody>{Accounts}</tbody>
        </table>
        {this.state.modalType === '' ? (
          <></>
        ) : (
          <AccountsModal
            {...this.state}
            {...this.props}
            modalType={this.state.modalType}
            handleModalToggle={this.handleModalToggle}
          />
        )}
      </div>
    );
  }
}

export default Table;
