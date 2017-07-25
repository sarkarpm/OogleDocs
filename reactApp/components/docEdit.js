import React from 'react';
import {
    Link
} from 'react-router-dom';
import { Editor, EditorState, RichUtils, Modifier } from 'draft-js';
import customStyleMap from '../customStyleMap/customStyleMap';
import colorStyleMap from '../customStyleMap/colorStyleMap';
import Toolbar from './Toolbar';

class DocEdit extends React.Component {
    constructor( props ) {
        super( props );
        this.state = {
            editorState: EditorState.createEmpty()
        };
        this.onChange = ( editorState ) => this.setState( { editorState } );
        this.handleKeyCommand = this.handleKeyCommand.bind( this );

        this.focus = () => this.refs.editor.focus();
        this.toggleColor = ( toggledColor ) => this._toggleColor( toggledColor );
        this._onBoldClick = this._onBoldClick.bind( this );
        this._onItalicClick = this._onItalicClick.bind( this );
        this._onUnderlineClick = this._onUnderlineClick.bind( this );
    }

    _onBoldClick() {
        this.onChange( RichUtils.toggleInlineStyle( this.state.editorState, 'BOLD' ) );
    }
    _onItalicClick() {
        this.onChange( RichUtils.toggleInlineStyle( this.state.editorState, 'ITALIC' ) );
    }

    _onUnderlineClick() {
        this.onChange( RichUtils.toggleInlineStyle( this.state.editorState, 'UNDERLINE' ) );
    }

    handleKeyCommand( command ) {
        const newState = RichUtils.handleKeyCommand( this.state.editorState, command );
        if ( newState ) {
            this.onChange( newState );
            return 'handled';
        }
        return 'not-handled';
    }

    _toggleColor( toggledColor ) {

        const { editorState } = this.state;
        const selection = editorState.getSelection();

        const nextContentState = Object.keys( colorStyleMap )
            .reduce(( contentState, color ) => {
                return Modifier.removeInlineStyle( contentState, selection, color );
            }, editorState.getCurrentContent() );

        let nextEditorState = EditorState.push(
            editorState,
            nextContentState,
            'change-inline-style'
        );

        const currentStyle = editorState.getCurrentInlineStyle();

        // Unset style override for current color.
        if ( selection.isCollapsed() ) {
            nextEditorState = currentStyle.reduce(( state, color ) => {
                return RichUtils.toggleInlineStyle( state, color );
            }, nextEditorState );
        }

        // If the color is being toggled on, apply it.
        if ( !currentStyle.has( toggledColor ) ) {
            nextEditorState = RichUtils.toggleInlineStyle(
                nextEditorState,
                toggledColor
            );
        }

        this.onChange( nextEditorState );
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
                <Toolbar
									onBoldClick={this._onBoldClick}
									onItalicClick={this._onItalicClick}
									onUnderlineClick={this._onUnderlineClick}
									toggleColor={this.toggleColor}
								/>
                <div className='editor' onClick={ this.focus }>
                    <Editor
                        customStyleMap={ customStyleMap }
                        editorState={ this.state.editorState }
                        onChange={ this.onChange }
                        handleKeyCommand={ this.handleKeyCommand }
                        placeholder="Write something colorful..."
                        ref="editor"
                    />
                </div>
            </div>
        );
    }
}

export default DocEdit;
