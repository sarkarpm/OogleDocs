import React from 'react';
import { Link } from 'react-router-dom';
import { Editor, EditorState } from 'draft-js';
import customStyleMap from '../customMaps/customStyleMap';
import Toolbar from './Toolbar';
import { _onBoldClick, _onItalicClick, _onUnderlineClick, _toggleColor, _toggleBlockType } from '../functions/toolbarClicks';
import { handleKeyCommand } from '../functions/handleKeyCommand';
import extendedBlockRenderMap from '../customMaps/customBlockMap';

class DocEdit extends React.Component {
    constructor( props ) {
        super( props );
        this.state = {
            editorState: EditorState.createEmpty(),
            _toggleColor,
            _onBoldClick,
            _onItalicClick,
            _onUnderlineClick,
            _toggleBlockType,
            handleKeyCommand
        };
        this.onChange = ( editorState ) => this.setState( { editorState } );
        this.state.handleKeyCommand = this.state.handleKeyCommand.bind( this );

        this.focus = () => this.refs.editor.focus();
        this.state._toggleColor = this.state._toggleColor.bind( this );
        this.state._toggleBlockType = this.state._toggleBlockType.bind( this );
        this.state._onBoldClick = this.state._onBoldClick.bind( this );
        this.state._onItalicClick = this.state._onItalicClick.bind( this );
        this.state._onUnderlineClick = this.state._onUnderlineClick.bind( this );
    }

    render() {
        return (
            <div>
                <div>
                    <Link to="/home">Docs Home</Link>
                </div>
                <div className="editorTitle">
                    <h1>{ this.props.match.params.docid }</h1>
                    <p>ID: { this.props.match.params.docid }</p>
                </div>
                <Toolbar
                    onBoldClick={ this.state._onBoldClick }
                    onItalicClick={ this.state._onItalicClick }
                    onUnderlineClick={ this.state._onUnderlineClick }
                    toggleColor={ this.state._toggleColor }
                    toggleBlockType={ this.state._toggleBlockType }
                />
                <div className='editor' onClick={ this.focus }>
                    <Editor
                        customStyleMap={ customStyleMap }
                        editorState={ this.state.editorState }
                        onChange={ this.onChange }
                        handleKeyCommand={ this.handleKeyCommand }
                        placeholder="Write something colorful..."
                        ref="editor"
                        blockRenderMap={ extendedBlockRenderMap }
                    />
                </div>
            </div>
        );
    }
}

export default DocEdit;
