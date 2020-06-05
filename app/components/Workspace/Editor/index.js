/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
/* eslint-disable block-scoped-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable no-plusplus */
import React, { Component } from 'react';
import * as nearley from 'nearley';
import JSONPretty from 'react-json-pretty';
import * as Grammer from './Grammer';
import preProcessMichelsonScript from './preProcessMichelsonScript';
import DeployContract from './Deploy';

const conseiljs = require('conseiljs');

const fs = require('fs');
const { storageName } = require('../../../apis/config');

const LOCAL_STORAGE_NAME = storageName;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sucessMsg: '',
      parseError: '',
      michelsonCode: '',
      storageFormat: '',
      uploadedContract: '',
      uploadedContractName: '',
      selectedContractFromDropdown: '0',
    };
    this.compileContract = this.compileContract.bind(this);
    this.handleUploadContract = this.handleUploadContract.bind(this);
    this.fetchSelectedContract = this.fetchSelectedContract.bind(this);
    this.handleGetInitialStorage = this.handleGetInitialStorage.bind(this);
    this.handleEditorCodeOnChange = this.handleEditorCodeOnChange.bind(this);
  }

  componentDidMount() {
    this.props.handleContractsTabChangeAction('Output');
  }

  fetchSelectedContract(event) {
    const contractLabel = event.target.value;
    const { contracts } = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME));
    const { networkId } = this.props.dashboardHeader;
    const networkName = networkId.split('-')[0];
    const selectedContract = contracts[networkName].filter(
      (elem) => contractLabel === elem.originated_contracts
    )[0];
    const michelsonCode = selectedContract.contract;
    this.setState({
      michelsonCode,
      selectedContractFromDropdown: contractLabel,
    });
  }

  async compileContract() {
    const { michelsonCode } = this.state;
    let parseError = '';
    let sucessMsg = '';
    let storageFormat = '';
    this.props.handleContractsTabChangeAction('Output');
    const parser = new nearley.Parser(
      nearley.Grammar.fromCompiled(Grammer.default)
    );
    const result = await preProcessMichelsonScript(michelsonCode);

    for (var index = 0; index < result.length; index++) {
      try {
        parser.feed(result[index]);
      } catch (error) {
        parseError = error;
        break;
      }
    }
    if (parseError !== '') {
      var commentsRegex = /\s+(#.*)/g;
      var codeSection = michelsonCode.replace(commentsRegex, '');
      var row;
      var col;
      var michelsonCodeRow;
      codeSection.split('\n').some((elem, codeIndex) => {
        if (elem.indexOf(parseError.token.value) !== -1) {
          row = codeIndex + 1;
          col = elem.indexOf(parseError.token.value);
          return true;
        }
        return false;
      });
      michelsonCode.split('\n').some((elem, michelsonIndex) => {
        if (elem.indexOf(parseError.token.value) !== -1) {
          michelsonCodeRow = michelsonIndex + 1;
          return true;
        }
        return false;
      });
      if (michelsonCodeRow !== row) {
        row += michelsonCodeRow - row;
      }
      const errorLine1 = `Error: Syntax error at line ${row} col ${col}:`;
      const errorLine2 = `Unexpected ${parseError.token.type} ${parseError.token.text}`;
      const errorLine3 = `${Array(
        errorLine2.length - parseError.token.text.length - 1
      )
        .fill('\xa0')
        .join('')} ^^`;
      parseError = `${errorLine1}\n${errorLine2}\n${errorLine3}`;
    }

    if (index === result.length && parseError === '') {
      storageFormat = await this.handleGetInitialStorage(michelsonCode);
      sucessMsg = 'Code compiled sucessfully without any errors.';
    }
    this.setState(
      {
        parseError: '',
        sucessMsg: 'Please wait while we compile your code...',
      },
      () => {
        setTimeout(() => {
          this.setState({ parseError, sucessMsg, storageFormat });
        }, 2000);
      }
    );
  }

  async handleGetInitialStorage(contract) {
    const storageFormat = await conseiljs.TezosLanguageUtil.preProcessMichelsonScript(
      contract
    );
    return storageFormat[1].slice(8);
  }

  handleUploadContract(event) {
    const uploadedContract = fs
      .readFileSync(event.target.files[0].path)
      .toString('utf-8');
    this.setState({
      uploadedContractName: event.target.files[0].name,
      uploadedContract,
      michelsonCode: uploadedContract,
    });
  }

  handleEditorCodeOnChange(event) {
    const michelsonCode = event.target.value;
    this.setState({
      parseError: '',
      sucessMsg: '',
      michelsonCode,
    });
  }

  render() {
    const networkId = this.props.dashboardHeader.networkId.split('-')[0];
    const CurrentTab = this.props.selectedContractsTab;
    const { parseError, sucessMsg } = this.state;
    const compilerOutput = parseError === '' ? sucessMsg : parseError;
    const __localStorage__ = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_NAME)
    ).contracts;
    const contracts = __localStorage__[networkId].map((elem, index) => (
      <option key={elem.name + index} value={elem.originated_contracts}>
        {`${elem.name} - ${elem.originated_contracts}`}
      </option>
    ));
    return (
      <div className="editor-container">
        <div className="code-editor">
          <div className="code-editor-navbar">
            <div className="select-contract-container">
              <select
                className="custom-select"
                onChange={this.fetchSelectedContract}
                value={this.state.selectedContractFromDropdown}
              >
                <option value="0" disabled>
                  {' '}
                  Select contract{' '}
                </option>
                {contracts}
              </select>
            </div>
            <div className="">
              <div
                className="btn-group"
                role="group"
                aria-label="Basic example"
              >
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="inputGroupFile03"
                    accept=".tz"
                    onChange={(event) => this.handleUploadContract(event)}
                    aria-describedby="inputGroupFileAddon03"
                  />
                  <label
                    className="custom-file-label"
                    htmlFor="inputGroupFile03"
                    style={{ borderRadius: '0px' }}
                  >
                    {this.state.uploadedContractName || 'Upload michelson code'}
                  </label>
                </div>
                <button
                  type="button"
                  onClick={this.compileContract}
                  className="btn btn-secondary"
                >
                  Compile
                </button>
              </div>
            </div>
          </div>
          <textarea
            value={this.state.michelsonCode}
            onChange={(e) => this.handleEditorCodeOnChange(e)}
            placeholder="Enter your michelson contract here"
            className="editor"
            rows="10"
            cols="4000"
            wrap="off"
          />
        </div>
        <div className="code-editor-deploy">
          <nav>
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
              <span
                className={
                  CurrentTab === 'Output' ? 'nav-link active' : 'nav-link'
                }
                id="nav-michelson-tab"
                data-toggle="tab"
                role="tab"
                onClick={() =>
                  this.props.handleContractsTabChangeAction('Output')
                }
              >
                Output
              </span>
              <span
                className={
                  CurrentTab === 'Deploy' ? 'nav-link active' : 'nav-link'
                }
                id="nav-deploy-tab"
                data-toggle="tab"
                role="tab"
                onClick={() =>
                  this.props.handleContractsTabChangeAction('Deploy')
                }
              >
                Deploy
              </span>
            </div>
          </nav>
          <div className="tab-content" id="nav-tabContent">
            <div
              className={
                CurrentTab === 'Output'
                  ? 'tab-pane fade show active'
                  : 'tab-pane fade'
              }
              id="nav-michelson"
              role="tabpanel"
              style={
                CurrentTab === 'Output'
                  ? { display: 'flex' }
                  : { display: 'none' }
              }
              aria-labelledby="nav-michelson-tab"
            >
              <JSONPretty
                id="json-pretty"
                data={compilerOutput}
                className="parseError"
              />
            </div>
            <div
              className={
                CurrentTab === 'Deploy'
                  ? 'tab-pane fade show active'
                  : 'tab-pane fade'
              }
              id="nav-deploy"
              role="tabpanel"
              aria-labelledby="nav-deploy-tab"
            >
              <DeployContract {...this.state} {...this.props} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
