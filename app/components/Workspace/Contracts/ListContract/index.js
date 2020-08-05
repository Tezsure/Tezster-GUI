/* eslint-disable promise/catch-or-return */
/* eslint-disable no-prototype-builtins */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import swal from 'sweetalert';

const { storageName } = require('../../../../db-config/tezster.config');

const LOCAL_STORAGE_NAME = storageName;

export default class ListContract extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addContract: false,
      contractAddress: '',
      contractLabel: '',
      error: '',
    };
    this.handleAddContract = this.handleAddContract.bind(this);
    this.toggleAddContract = this.toggleAddContract.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  toggleAddContract() {
    const { addContract } = this.state;
    this.setState({ addContract: !addContract });
  }

  handleAddContract() {
    const { contractAddress, contractLabel } = this.state;
    let error = '';
    if (contractAddress === '') {
      error = 'Please enter contract address';
    } else if (contractLabel === '') {
      error = 'Please enter contract label';
    } else if (contractLabel !== '') {
      const networkId = this.props.dashboardHeader.networkId.split('-')[0];
      const contract = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME))
        .contracts[networkId];
      if (
        contract.filter((elem) => elem.name === this.state.contractLabel)
          .length > 0
      ) {
        error = 'Label already in use, please choose a different label';
      }
    }
    if (error === '') {
      this.props.handleAddContractAction({
        ...this.props,
        ...this.state,
      });
      this.setState({
        contractAddress: '',
        contractLabel: '',
        addContract: false,
      });
    }
    if (error !== '') {
      this.setState({ error });
    }
  }

  render() {
    if (this.state.error !== '') {
      swal('Error!', this.state.error, 'error').then(() => {
        return this.setState({ error: '' });
      });
    }
    const networkId = this.props.dashboardHeader.networkId.split('-')[0];
    const { contractAddress, contractLabel } = this.state;
    let contracts = [];
    const Localstorage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME));
    if (Localstorage && Localstorage.hasOwnProperty('contracts')) {
      contracts = Localstorage.contracts[networkId].map((elem, index) => (
        <tr className="table-row" key={elem.name + index}>
          <td className="table-body-cell">
            <div className="cards-header">
              <h4>LABEL</h4>
            </div>
            <div className="cards-contents">
              <p className="account-address-content">{elem.name}</p>
            </div>
          </td>
          <td className="table-body-cell">
            <div className="cards-header">
              <h4>CONTRACT ADDRESS</h4>
            </div>
            <div className="cards-contents">
              <p className="account-address-content">
                {elem.originated_contracts}
              </p>
            </div>
          </td>
          <td className="table-body-cell" style={{ textAlign: 'center' }}>
            <span
              className="delete-icon"
              style={{ marginTop: '10px' }}
              onClick={() =>
                this.props.deleteContractAction({ ...this.props, ...elem })
              }
            />
          </td>
        </tr>
      ));
    }
    return (
      <div className="accounts-table-container" style={{ width: '100%' }}>
        <div className="cards button-card accounts-button-container">
          <div className="button-accounts">
            {this.props.buttonState ? (
              <button className="btn btn-success" type="button" disabled>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                />
                &nbsp;Please wait...
              </button>
            ) : (
              <button
                type="button"
                className={
                  this.state.addContract ? 'btn btn-warning' : 'btn btn-success'
                }
                disabled={this.props.buttonState}
                style={{ borderRadius: '0px' }}
                onClick={() => this.toggleAddContract()}
              >
                {this.state.addContract ? 'Cancel' : 'Add Contract'}
              </button>
            )}
          </div>
        </div>
        <table className="table table-striped table-bordered">
          <tbody>
            {this.state.addContract ? (
              <tr className="table-row">
                <td className="table-body-cell">
                  <div className="cards-header">
                    <h4>LABEL</h4>
                  </div>
                  <div className="cards-contents">
                    <input
                      type="text"
                      className="form-control"
                      name="contractLabel"
                      onChange={(event) => this.handleInputChange(event)}
                      value={contractLabel}
                    />
                  </div>
                </td>
                <td className="table-body-cell">
                  <div className="cards-header">
                    <h4>CONTRACT ADDRESS</h4>
                  </div>
                  <div className="cards-contents">
                    <input
                      type="text"
                      className="form-control"
                      name="contractAddress"
                      onChange={(event) => this.handleInputChange(event)}
                      value={contractAddress}
                    />
                  </div>
                </td>
                <td className="table-body-cell" style={{ textAlign: 'center' }}>
                  <button
                    type="button"
                    className="btn btn-success"
                    disabled={this.props.buttonState}
                    style={{ borderRadius: '0px', marginTop: '15px' }}
                    onClick={() => this.handleAddContract()}
                  >
                    Save
                  </button>
                </td>
              </tr>
            ) : (
              ''
            )}
            {contracts}
          </tbody>
        </table>
      </div>
    );
  }
}
