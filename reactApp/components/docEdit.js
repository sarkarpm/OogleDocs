import React from 'react';
import {
    Link
} from 'react-router-dom';
import {Editor, EditorState, RichUtils} from 'draft-js';

class DocEdit extends React.Component {
    constructor( props ) {
        super( props );
        this.state = { editorState: EditorState.createEmpty() };
        this.onChange = ( editorState ) => this.setState( { editorState } );
        this.handleKeyCommand = this.handleKeyCommand.bind( this );
    }

    _onBoldClick() {
        this.onChange( RichUtils.toggleInlineStyle( this.state.editorState, 'BOLD' ) );
    }

    handleKeyCommand( command ) {
        const newState = RichUtils.handleKeyCommand( this.state.editorState, command );
        if ( newState ) {
            this.onChange( newState );
            return 'handled';
        }
        return 'not-handled';
    }
    render() {
        return (
            <div className="container">
                <div>
                    <Link to="/home">Docs Home</Link>
                </div>
                <div className="editorTitle">
                    <h1>{ this.props.match.params.docid }</h1>
                    <p>ID: { this.props.match.params.docid }</p>
                </div>
                <div className="toolbar">
                    <button onClick={ this._onBoldClick.bind( this ) }>Bold</button>
                    <button onClick={ this._onLeftClick.bind( this ) }>Left</button>
                </div>
                <div className="editorBox">
                    <Editor
                        editorState={ this.state.editorState }
                        handleKeyCommand={ this.handleKeyCommand }
                        onChange={ this.onChange }
                    />
                </div>
            </div>
        );
    }
}

export default DocEdit;
