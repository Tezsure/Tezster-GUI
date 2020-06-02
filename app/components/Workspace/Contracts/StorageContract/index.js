/* eslint-disable no-shadow */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import JSONPretty from 'react-json-pretty';
const { storageName } = require('../../../../apis/config');
const LOCAL_STORAGE_NAME = storageName;

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contractAmount: '',
      selectedContracts: '0',
      storageValue: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const networkId = this.props.dashboardHeader.networkId.split('-')[0];
    const __localStorage__ = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_NAME)
    ).contracts;
    const contracts = __localStorage__[networkId].map((elem, index) => (
      <option key={elem.name + index} value={elem.originated_contracts}>
        {`${elem.name} - ${elem.originated_contracts}`}
      </option>
    ));
    return (
      <div className="transactions-contents contract-container">
        <div className="modal-input">
          <div className="input-container">Select Contract* </div>
          <select
            className="custom-select"
            name="selectedContracts"
            value={this.state.selectedContracts}
            onChange={this.handleInputChange}
          >
            <option value="0" disabled>
              Select contracts
            </option>
            {contracts}
          </select>
        </div>
        <div className="cards-container">
          <div className="cards button-card accounts-button-container">
            <div className="button-accounts">
              <button
                type="button"
                className="btn btn-success"
                disabled={this.props.buttonState}
                onClick={() => {
                  this.props.getContractStorageAction({
                    ...this.props,
                    ...this.state,
                  });
                }}
              >
                {this.props.buttonState ? 'Please wait....' : 'Show Storage'}
              </button>
            </div>
          </div>
        </div>
        <div className="modal-input">
          {this.props.selectedContractStorage === '' ||
          this.props.selectedContractStorage === 'Not Found' ? (
            ''
          ) : (
            <div className="input-container">Initial Storage* </div>
          )}
        </div>
        <div className="modal-input">
          {this.props.selectedContractStorage === '' ||
          this.props.selectedContractStorage === 'Not Found' ? (
            ''
          ) : (
            <JSONPretty
              id="json-pretty"
              style={{ width: '100%', height: '100%' }}
              data={this.props.selectedContractStorage}
            />
          )}
        </div>
        <br />
        <br />
        <br />
      </div>
    );
  }
}

export default index;
