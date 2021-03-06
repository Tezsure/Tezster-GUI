/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-prototype-builtins */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable array-callback-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable promise/catch-or-return */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import swal from 'sweetalert';
import GetSampleEntryPoint from './GetSampleEntryPoint';

const conseiljs = require('conseiljs');

const {
  storageName,
} = require('../../../../db-config/helper.dbConfig').GetLocalStorage();

const LOCAL_STORAGE_NAME = storageName;

class InvokeContract extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: '0',
      selectedContracts: '0',
      entryPoints: [],
      contractLabel: '',
      storageValue: '',
      selectedEntryPoint: '0',
      error: '',
      enteredContract: '',
      contractAmount: '',
      entryPointInputType: '0',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInvokeContract = this.handleInvokeContract.bind(this);
    this.handleEntryPoints = this.handleEntryPoints.bind(this);
    this.getEntryPointsTable = this.getEntryPointsTable.bind(this);
    this.handleEntryPointsInputValues = this.handleEntryPointsInputValues.bind(
      this
    );
    this.handleEntryPointsView = this.handleEntryPointsView.bind(this);
  }

  componentDidMount() {
    this.setState({ entryPointInputType: '0' });
  }

  handleEntryPointsView(entryPointInputType) {
    this.setState({ entryPointInputType });
  }

  handleEntryPointsInputValues(event) {
    const entryPoints = this.state.entryPoints.map((elem) => {
      const temp = { ...elem };
      if (elem.name === this.state.selectedEntryPoint) {
        const stateValues = elem.stateValues.map((pp) => {
          if (event.target.name === Object.keys(pp)[0]) {
            return { [event.target.name]: `${event.target.value}` };
          }
          return pp;
        });
        temp.stateValues = stateValues;
        return temp;
      }
      return elem;
    });
    this.setState({ entryPoints });
  }

  handleEntryPoints() {
    const networkId = this.props.dashboardHeader.networkId.split('-')[0];
    const contract = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_NAME)
    ).contracts[networkId].filter(
      (elem) => elem.originated_contracts === this.state.selectedContracts
    );
    const entryPoints = conseiljs.TezosContractIntrospector.generateEntryPointsFromCode(
      contract[0].contract
    );
    const values = entryPoints.map((p) => {
      const parameter =
        p.parameters.map((pp) => pp.name)[0] === undefined
          ? ['X']
          : p.parameters.map((pp) => pp.name);
      const stateValues = p.parameters.map((pp) => {
        const variableName = pp.name ? pp.name : 'X';
        return { [variableName]: GetSampleEntryPoint(pp.type) };
      });
      return {
        name: p.name === undefined ? 'default' : p.name,
        structure: p.structure,
        parameter,
        stateValues,
        parameterTypes: p.parameters.map((pp) => pp.type),
      };
    });
    this.setState({ entryPoints: values });
  }

  handleInvokeContract() {
    let index = 0;
    // eslint-disable-next-line prefer-const
    let { contractAmount, entryPointInputType } = this.state;
    contractAmount = contractAmount === '' ? 0 : contractAmount;
    if (entryPointInputType === '1') {
      this.props.handleInvokeContractAction({
        ...this.props,
        ...this.state,
        contractAmount,
      });
      this.props.getAccountBalanceAction({
        ...this.props,
        pkh: this.state.accounts,
      });
    } else {
      this.state.entryPoints.some((elem) => {
        if (elem.name === this.state.selectedEntryPoint) {
          const storageValue = elem.structure
            .split('$')
            .map((pp) => {
              if (pp.indexOf('PARAM') === -1) {
                return pp;
              }
              const value = Object.values(elem.stateValues[index])[0];
              index += 1;
              return pp.replace('PARAM', value);
            })
            .join('');
          this.setState({ storageValue }, () => {
            this.props.handleInvokeContractAction({
              ...this.props,
              ...this.state,
              contractAmount,
            });
            this.props.getAccountBalanceAction({
              ...this.props,
              pkh: this.state.accounts,
            });
          });
          return true;
        }
        return false;
      });
    }
  }

  handleInputChange(event) {
    if (event.target.name === 'accounts') {
      this.setState({ [event.target.name]: event.target.value }, () => {
        this.props.getAccountBalanceAction({
          ...this.props,
          pkh: this.state.accounts,
        });
      });
    } else if (event.target.name === 'selectedContracts') {
      this.setState({ [event.target.name]: event.target.value }, () => {
        this.handleEntryPoints();
      });
    } else if (event.target.type === 'number') {
      if (event.target.value >= 0) {
        this.setState({ [event.target.name]: event.target.value });
      }
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
  }

  getEntryPointsTable() {
    const selectedEntryPoint = this.state.entryPoints.filter(
      (elem) => elem.name === this.state.selectedEntryPoint
    );
    const tableHeaders = selectedEntryPoint[0].parameter.map((elem, index) => (
      <th scope="col" className="table-column-header" key={elem + index}>
        {elem}
      </th>
    ));
    const tableBodyDataType = selectedEntryPoint[0].parameter.map(
      (elem, index) => {
        return (
          <td className="table-body-cell" key={elem + index}>
            {`type : ${selectedEntryPoint[0].parameterTypes[index]}`}
          </td>
        );
      }
    );
    const tableBody = selectedEntryPoint[0].parameter.map((elem, index) => {
      return (
        <td className="table-body-cell" key={elem + index}>
          <input
            type={
              selectedEntryPoint[0].parameterTypes[index] === 'nat'
                ? 'number'
                : 'text'
            }
            name={elem}
            value={selectedEntryPoint[0].stateValues[index][elem]}
            placeholder={`type - ${selectedEntryPoint[0].parameterTypes[index]}`}
            className="form-control"
            onChange={this.handleEntryPointsInputValues}
          />
        </td>
      );
    });

    return (
      <table className="table table-bordered">
        <thead>
          <tr className="thead-dark">{tableHeaders}</tr>
        </thead>
        <tbody>
          <tr className="table-row">{tableBodyDataType}</tr>
          <tr className="table-row">{tableBody}</tr>
        </tbody>
      </table>
    );
  }

  render() {
    const networkId = this.props.dashboardHeader.networkId.split('-')[0];
    const entryPoints = this.state.entryPoints.map((elem, index) => (
      <option key={elem.name + index} value={elem.name}>
        {elem.name}
      </option>
    ));
    const Accounts = this.props.userAccounts.map((elem, index) => (
      <option key={elem.account + index} value={elem.account}>
        {`${elem.label}-${elem.account}`}
      </option>
    ));
    let contracts = [];
    const __localStorage__ = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_NAME)
    );
    if (__localStorage__ && __localStorage__.hasOwnProperty('contracts')) {
      contracts = __localStorage__.contracts[networkId].map((elem, index) => (
        <option key={elem.name + index} value={elem.originated_contracts}>
          {`${elem.name} - ${elem.originated_contracts}`}
        </option>
      ));
    }
    if (this.state.error !== '') {
      swal('Error!', this.state.error, 'error').then(() => {
        return this.setState({ error: '' });
      });
    }
    return (
      <div className="transactions-contents contract-container">
        <div className="modal-input">
          <div className="input-container">Select Wallet* </div>
          <select
            className="custom-select"
            name="accounts"
            value={this.state.accounts}
            onChange={this.handleInputChange}
          >
            <option value="0" disabled>
              Select account to invoke contract
            </option>
            {Accounts}
          </select>
        </div>
        {this.state.accounts !== '0' ? (
          <div className="container-msg" style={{ marginLeft: '28%' }}>
            <b>
              &nbsp;Available balance in the account{' '}
              <span className="tezos-icon">
                {this.props.selectedContractAmountBalance} ꜩ
              </span>
            </b>
          </div>
        ) : (
          ''
        )}
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
        <div className="modal-input">
          <div className="input-container" style={{ width: '28%' }}>
            Contract Amount{' '}
          </div>
          <input
            type="number"
            min="0"
            name="contractAmount"
            className="form-control"
            placeholder="Enter amount to invoke contract"
            value={this.state.contractAmount}
            onChange={this.handleInputChange}
            style={{ width: '50%', marginRight: '10px' }}
          />
          <span className="tezos-icon">ꜩ</span>
        </div>
        <div className="modal-input">
          <div className="input-container">Entry Points* </div>
          <select
            className="custom-select"
            name="selectedEntryPoint"
            value={this.state.selectedEntryPoint}
            onChange={this.handleInputChange}
          >
            <option value="0" disabled>
              Select Entry Point
            </option>
            {entryPoints}
          </select>
        </div>
        {this.props.dashboardHeader.networkId !== 'Localnode' ? (
          <div className="transactions-contents">
            <div className="modal-input" style={{ paddingBottom: '0px' }}>
              <p style={{ marginBottom: '0px' }}>
                Note: It may take upto 1 minute for the contract to get commited
                on carthagenet network.
              </p>
            </div>
          </div>
        ) : (
          ''
        )}
        {this.state.selectedEntryPoint !== '0' && (
          <div className="modal-input" style={{ paddingBottom: '0rem' }}>
            <p>
              Note: please use quotes for string eg: &quot;hello world&quot;
            </p>
          </div>
        )}
        {this.state.selectedEntryPoint !== '0' && (
          <div className="modal-input" style={{ paddingBottom: '0rem' }}>
            <p>
              Note: We have generated an example initial storage for your
              purpose it&rsquo;s currently in beta state hence we recommend you
              to use it at your own risk.
            </p>
          </div>
        )}
        <div className="modal-input">
          <div className="input-container" style={{ width: '28%' }}>
            Select input type *
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio1"
              defaultValue="option1"
              checked={this.state.entryPointInputType === '0'}
              onChange={() => this.handleEntryPointsView('0')}
            />
            <label className="form-check-label" htmlFor="inlineRadio1">
              Enable simplified input
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio2"
              defaultValue="option2"
              checked={this.state.entryPointInputType === '1'}
              onChange={() => this.handleEntryPointsView('1')}
            />
            <label className="form-check-label" htmlFor="inlineRadio2">
              Enable textarea input
            </label>
          </div>
        </div>
        {this.state.selectedEntryPoint !== '0' ? (
          this.state.entryPointInputType === '0' ? (
            <div className="modal-input">{this.getEntryPointsTable()}</div>
          ) : (
            <div className="modal-input">
              <div className="input-container">Enter storage* </div>
              <textarea
                name="storageValue"
                className="form-control"
                placeholder="Initial value for account"
                value={this.state.storageValue}
                onChange={this.handleInputChange}
              />
            </div>
          )
        ) : (
          ''
        )}
        <div className="cards-container">
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
                  className="btn btn-success"
                  disabled={this.props.buttonState}
                  onClick={this.handleInvokeContract}
                >
                  Invoke Contract
                </button>
              )}
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
}

export default InvokeContract;
