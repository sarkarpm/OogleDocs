import React, { Component, PropTypes } from 'react';
import {Editor, EditorState, RichUtils, textAlignment} from 'draft-js';

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      alignment: 'left'
    };
    this.onChange = (editorState) => this.setState({editorState});
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }

  _onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }
  _onRightClick() {
    this.setState({alignment: 'right'});
  }

  _onLeftClick() {
    this.setState({alignment: 'left'});
  }

  _onCenterClick() {
    this.setState({alignment: 'center'});
  }

  myBlockStyleFn(contentBlock) {
    if(this.state.alignment === 'left'){
      return 'leftBlock'
    }
    if(this.state.alignment === 'right'){
      return 'rightBlock'
    }
    if(this.state.alignment === 'center'){
      return 'centerBlock'
    }
    return 'superFancyBlockquote';
  
}

  handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }
  render() {
    return (
    	<div className="container">
      <h1>Document Title</h1>
    	<button onClick={this._onBoldClick.bind(this)}>Bold</button>
      <button onClick={this._onLeftClick.bind(this)}>Left</button>
      <button onClick={this._onCenterClick.bind(this)}>Center</button>
      <button onClick={this._onRightClick.bind(this)}>Right</button>
      <div className="editorBox">
      <Editor
        blockStyleFn={this.myBlockStyleFn.bind(this)}
        editorState={this.state.editorState}
        handleKeyCommand={this.handleKeyCommand}
        onChange={this.onChange}
      />
      </div>
      </div>
    );
  }
}



export default MyEditor