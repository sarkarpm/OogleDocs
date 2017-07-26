import React from 'react';
import { Button } from 'reactstrap';
import { Editor, EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import customStyleMap from '../customMaps/customStyleMap';
import Toolbar from './Toolbar';
import extendedBlockRenderMap from '../customMaps/customBlockMap';
import axios from 'axios';

class DocEdit extends React.Component {
    constructor( props ) {
        super( props );
        this.state = {
            editorState: EditorState.createEmpty(),
            socket: this.props.socket,
            docId: this.props.match.params.docid,
            documentTitle: ''
        };
        this.onChange = ( editorState ) => {
            this.setState( { editorState } );
            const rawDraftContentState = JSON.stringify( convertToRaw( this.state.editorState.getCurrentContent() ) );
            this.state.socket.emit( 'madeChange', { rawDraftContentState } );
        };
        this.focus = () => this.refs.editor.focus();
    }

    componentWillMount() {
        axios.post( "http://localhost:3000/loadDocument", {
            docId: this.state.docId
        } )
            .then( response => {
                const loadedContentState = convertFromRaw( JSON.parse( response.data.doc.contentState ) );
                this.setState( {
                    editorState: EditorState.createWithContent( loadedContentState ),
                    documentTitle: response.data.doc.title
                } );
                this.state.socket.emit( 'joinedDocument', this.state.docId );
            } )
            .catch( err => {
                console.log( 'error loading document', err );
            } );
    }

    componentWillUnmount() {
        this.state.socket.emit( 'leftDocument', this.state.docId );
    }

    render() {
        return (
            <div>
                <div>
                    <Button href="#/home">Docs Home</Button>
                    <Button href={ `#/history/${this.state.docId}` }>Doc History</Button>
                </div>
                <div className="editorTitle">
                    <h1>{ this.state.documentTitle }</h1>
                    <p>ID: { this.state.docId }</p>
                </div>
                <Toolbar onSaveDocument={ this._saveDocument } docEdit={ this } />
                <div className='editor' onClick={ this.focus }>
                    <Editor customStyleMap={ customStyleMap } editorState={ this.state.editorState } onChange={ this.onChange }
                        placeholder="Write something colorful..."
                        ref="editor" blockRenderMap={ extendedBlockRenderMap }
                    />
                </div>
            </div>
        );
    }
}

export default DocEdit;
