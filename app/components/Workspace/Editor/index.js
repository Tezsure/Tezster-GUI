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
import AceEditor from 'react-ace';
import * as Grammer from './Grammer';
import preProcessMichelsonScript from './preProcessMichelsonScript';
import DeployContract from './Deploy';
import GetExampleStorage from './GetExampleStorage';

import 'ace-builds/src-noconflict/mode-elixir';
import 'ace-builds/src-noconflict/theme-xcode';
import 'ace-builds/src-noconflict/theme-kuroir';
import 'ace-builds/src-noconflict/theme-twilight';
import 'ace-builds/src-noconflict/theme-solarized_light';
import 'ace-builds/src-noconflict/theme-solarized_dark';

import 'ace-builds/src-noconflict/ext-language_tools';

import EditorSettings from './EditorSettings';

const conseiljs = require('conseiljs');

const fs = require('fs');
const { storageName } = require('../../../db-config/tezster.config');

const LOCAL_STORAGE_NAME = storageName;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wordWrap: true,
      currentFont: '16',
      currentTheme: 'solarized_light',
      liveAutoCompletion: true,
      siderBarCollapsed: false,
      sucessMsg: '',
      parseError: '',
      michelsonCode: '',
      storageFormat: '',
      exampleStorage: '',
      uploadedContract: '',
      uploadedContractName: '',
      selectedContractFromDropdown: '0',
    };
    this.compileContract = this.compileContract.bind(this);
    this.handleEditorConfigChange = this.handleEditorConfigChange.bind(this);
    this.handleUploadContract = this.handleUploadContract.bind(this);
    this.fetchSelectedContract = this.fetchSelectedContract.bind(this);
    this.handleGetInitialStorage = this.handleGetInitialStorage.bind(this);
    this.handleEditorCodeOnChange = this.handleEditorCodeOnChange.bind(this);
    this.handleSidebarToggle = this.handleSidebarToggle.bind(this);
  }

  componentDidMount() {
    this.props.handleContractsTabChangeAction('Output');
  }

  handleSidebarToggle() {
    const isSiderBarCollapsed = this.state.siderBarCollapsed;
    this.setState({ siderBarCollapsed: !isSiderBarCollapsed });
  }

  handleEditorConfigChange(event) {
    if (event.target.type === 'checkbox') {
      this.setState({ [event.target.name]: event.target.checked });
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
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
    this.setState({ siderBarCollapsed: false });
    const { michelsonCode } = this.state;
    let parseError = '';
    let sucessMsg = '';
    let storageFormat = '';
    let exampleStorage = '';
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
      exampleStorage = GetExampleStorage(storageFormat);
      sucessMsg = 'Code compiled sucessfully without any errors.';
    }
    this.setState(
      {
        parseError: '',
        sucessMsg: 'Please wait while we compile your code...',
        exampleStorage,
      },
      () => {
        setTimeout(() => {
          this.setState({
            parseError,
            sucessMsg,
            storageFormat,
            exampleStorage,
          });
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

  handleEditorCodeOnChange(michelsonCode) {
    this.setState({
      parseError: '',
      sucessMsg: '',
      michelsonCode,
    });
  }

  render() {
    const { siderBarCollapsed } = this.state;
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
      <div className="accounts-container editor-container">
        <span
          className="ace-editor-container"
          style={siderBarCollapsed ? { width: '100%' } : { width: '70%' }}
        >
          <span className="editor-navbar">
            <span className="left-navbar-container">
              <span className="navbar-select-contract">
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
              </span>
            </span>
            <span className="right-navbar-container">
              <span className="navbar-upload-contract">
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
                      {this.state.uploadedContractName ||
                        'Upload michelson code'}
                    </label>
                  </div>
                  <button
                    type="button"
                    onClick={this.compileContract}
                    className="btn btn-secondary"
                  >
                    Compile
                  </button>
                  <button
                    type="button"
                    onClick={this.handleSidebarToggle}
                    title="Expand/Collapse sidebar"
                    style={{ marginLeft: '1%' }}
                    className="btn btn-secondary"
                  >
                    {siderBarCollapsed ? '<<<' : '>>>'}
                  </button>
                </div>
              </span>
            </span>
          </span>
          <span className="ace-editor">
            <AceEditor
              placeholder="Enter your michelson contract here"
              mode="elixir"
              width="100%"
              height="90%"
              theme={this.state.currentTheme}
              name="editor"
              onChange={this.handleEditorCodeOnChange}
              fontSize={parseInt(this.state.currentFont, 10)}
              showPrintMargin
              showGutter
              highlightActiveLine
              wrapEnabled={this.state.wordWrap}
              value={this.state.michelsonCode}
              setOptions={{
                autoScrollEditorIntoView: true,
                showLineNumbers: true,
                enableLiveAutocompletion: this.state.liveAutoCompletion,
                enableBasicAutocompletion: true,
                enableSnippets: true,
                tabSize: 2,
              }}
            />
          </span>
        </span>
        <div
          className="code-editor-deploy"
          style={siderBarCollapsed ? { display: 'none' } : { display: 'block' }}
        >
          <nav>
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
              <span
                className={
                  CurrentTab === 'Output'
                    ? 'editor-siderbar-nav nav-link active'
                    : 'editor-siderbar-nav nav-link'
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
                  CurrentTab === 'Deploy'
                    ? 'editor-siderbar-nav nav-link active'
                    : 'editor-siderbar-nav nav-link'
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
              <span
                className={
                  CurrentTab === 'EditorSettings'
                    ? 'editor-siderbar-nav nav-link active'
                    : 'editor-siderbar-nav nav-link'
                }
                id="nav-deploy-tab"
                data-toggle="tab"
                role="tab"
                onClick={() =>
                  this.props.handleContractsTabChangeAction('EditorSettings')
                }
              >
                Settings
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
              <p className="parseError mnemonics-container">
                <code className="mnemonics">{compilerOutput}</code>
              </p>
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
            <div
              className={
                CurrentTab === 'EditorSettings'
                  ? 'tab-pane fade show active'
                  : 'tab-pane fade'
              }
              id="nav-deploy"
              role="tabpanel"
              aria-labelledby="nav-deploy-tab"
            >
              <EditorSettings
                {...this.state}
                handleEditorConfigChange={this.handleEditorConfigChange}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
