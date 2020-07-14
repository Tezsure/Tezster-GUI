/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';

const themes = [
  'solarized_light',
  'solarized_dark',
  'xcode',
  'kuroir',
  'twilight',
];

const fontSize = ['12', '14', '16', '18', '20'];

function EditorSettings(props) {
  const editorThemesOptions = themes.map((elem, index) => (
    <option key={index} value={elem}>
      {elem}
    </option>
  ));
  const fontSizeOptions = fontSize.map((elem, index) => (
    <option key={index} value={elem}>
      {elem}
    </option>
  ));
  return (
    <div className="deploy-contents">
      <div className="modal-input">
        <div className="input-container">Select Theme* </div>
        <select
          className="custom-select"
          name="currentTheme"
          value={props.currentTheme}
          onChange={(event) => props.handleEditorConfigChange(event)}
        >
          <option value="0" disabled>
            Select editor theme
          </option>
          {editorThemesOptions}
        </select>
      </div>
      <div className="modal-input">
        <div className="input-container">Select Font Size* </div>
        <select
          className="custom-select"
          name="currentFont"
          value={props.currentFont}
          onChange={(event) => props.handleEditorConfigChange(event)}
        >
          <option value="0" disabled>
            Select editor font size
          </option>
          {fontSizeOptions}
        </select>
      </div>
      <div className="modal-input">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            name="wordWrap"
            className="custom-control-input"
            id="customCheck1"
            checked={props.wordWrap}
            onChange={(event) => props.handleEditorConfigChange(event)}
          />
          <label className="custom-control-label" htmlFor="customCheck1">
            Enable word wrap
          </label>
        </div>
      </div>
      <div className="modal-input">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            name="liveAutoCompletion"
            className="custom-control-input"
            id="customCheck2"
            checked={props.liveAutoCompletion}
            onChange={(event) => props.handleEditorConfigChange(event)}
          />
          <label className="custom-control-label" htmlFor="customCheck2">
            Enable live auto-completion
          </label>
        </div>
      </div>
    </div>
  );
}

export default EditorSettings;
