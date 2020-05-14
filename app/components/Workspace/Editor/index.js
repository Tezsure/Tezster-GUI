/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
/* eslint-disable block-scoped-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable no-plusplus */
import React, { Component } from 'react';
import MonacoEditor from 'react-monaco-editor';
import * as nearley from 'nearley';
import JSONPretty from 'react-json-pretty';
import * as Grammer from './Grammer.ts';
import preProcessMichelsonScript from './preProcessMichelsonScript';

const fs = require('fs');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sucessMsg: '',
      parseError: '',
      michelsonCode: '',
      uploadedContract: '',
      uploadedContractName: '',
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.compileContract = this.compileContract.bind(this);
    this.handleEditorCodeOnChange = this.handleEditorCodeOnChange.bind(this);
  }

  async compileContract() {
    const { michelsonCode } = this.state;
    let parseError = '';
    let sucessMsg = '';
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
      const commentsRegex = /\s+(#.*)/g;
      const codeSection = michelsonCode.replace(commentsRegex, '');
      let row;
      let col;
      let michelsonCodeRow;
      codeSection.split('\n').some((elem, elemIndex) => {
        if (elem.indexOf(parseError.token.value) !== -1) {
          row = elemIndex + 1;
          col = elem.indexOf(parseError.token.value);
          return true;
        }
        return false;
      });
      michelsonCode.split('\n').some((elem, elemIndex) => {
        if (elem.indexOf(parseError.token.value) !== -1) {
          michelsonCodeRow = elemIndex + 1;
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
      sucessMsg = 'Code compiled sucessfully without any errors.';
    }
    this.setState(
      {
        parseError: '',
        sucessMsg: 'Please wait while we compile your code...',
      },
      () => {
        setTimeout(() => {
          this.setState({ parseError, sucessMsg });
        }, 2000);
      }
    );
  }

  handleOnChange(event) {
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
      michelsonCode,
    });
  }

  render() {
    const { parseError, sucessMsg } = this.state;
    const compilerOutput = parseError === '' ? sucessMsg : parseError;
    return (
      <div className="editor-container">
        <MonacoEditor
          width="100%"
          height="50vh"
          language="text"
          value={this.state.michelsonCode}
          onChange={(e) => this.handleEditorCodeOnChange(e)}
        />
      </div>
    );
  }
}

export default App;
