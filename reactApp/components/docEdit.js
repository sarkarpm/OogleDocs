import React from 'react';
import { Link } from 'react-router-dom';
import { Editor, EditorState, RichUtils} from 'draft-js';
import customStyleMap from '../customMaps/customStyleMap';
import Toolbar from './Toolbar';
import _ from 'underscore';
import extendedBlockRenderMap from '../customMaps/customBlockMap';

class DocEdit extends React.Component {
    constructor( props ) {
        super( props );
        this.state = {
            editorState: EditorState.createEmpty(),
            background: '#fff'
        };
        this.onChange = ( editorState ) => this.setState( { editorState } );

        this.focus = () => this.refs.editor.focus();

        _.bindAll(this, 'handleKeyCommand', '_onBoldClick', '_onItalicClick',
        '_onUnderlineClick', '_toggleColor', '_toggleFontSize', '_toggleBlockType', 'onChange');
    }

    handleKeyCommand( command ) {
        const newState = RichUtils.handleKeyCommand( this.state.editorState, command );
        if ( newState ) {
            this.onChange( newState );
            return 'handled';
        }
        return 'not-handled';
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

    _toggleColor( toggledColor ) {
        this.onChange( RichUtils.toggleInlineStyle( this.state.editorState, toggledColor ) );
    }

    _toggleFontSize( toggledFontSize ) {
        this.onChange( RichUtils.toggleInlineStyle( this.state.editorState, toggledFontSize ) );
    }

    _toggleBlockType(blockType) {
        this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
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
									onToggleColor={this._toggleColor}
                  toggleFontSize={this._toggleFontSize}
									toggleBlockType={this._toggleBlockType}
								/>
                <div className='editor' onClick={ this.focus }>
                  <Editor
                      customStyleMap={ customStyleMap }
                      editorState={ this.state.editorState }
                      onChange={ this.onChange }
                      handleKeyCommand={ this.handleKeyCommand }
                      placeholder="Write something colorful..."
                      ref="editor"
											blockRenderMap={extendedBlockRenderMap}
                  />
                </div>
            </div>
        );
    }
}

export default DocEdit;
