import React from 'react';
import { Link } from 'react-router-dom';
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
            console.log('editor state in on change', editorState);
            const rawDraftContentState = JSON.stringify( convertToRaw(editorState.getCurrentContent()) );
            this.state.socket.emit('madeChange', rawDraftContentState);
        };
        this.focus = () => this.refs.editor.focus();
    }

    componentWillMount() {
        axios.post("http://localhost:3000/loadDocument", {
            docId: this.state.docId
        })
        .then(response => {
            const loadedContentState = convertFromRaw( JSON.parse(response.data.doc.contentState) );
            console.log('loadedContentState', loadedContentState);
            this.setState({
                editorState: EditorState.createWithContent(loadedContentState),
                documentTitle: response.data.doc.title
            });
            this.state.socket.emit('joinedDocument', this.state.docId);
        })
        .catch(err => {
            console.log('error loading document', err);
        });

        this.state.socket.on('message', message => {
            console.log('message in doc: ', message);
        });


    }

    componentDidMount(){
        var self = this;
        this.state.socket.on('changeListener', (changedDoc) => {
            self.updateContentFromSocket(changedDoc);
        });
    }

    updateContentFromSocket(changedDoc) {
        console.log('changedDoc', changedDoc);
        changedDoc = convertFromRaw( JSON.parse(changedDoc) );
        console.log('changedDoc', changedDoc);
        this.setState({editorState: EditorState.createWithContent(changedDoc)});
    }

    componentWillUnmount() {
        this.state.socket.emit('leftDocument', this.state.docId);
    }

    render() {
        return (
            <div>
                <div>
                    <Link to="/home">Docs Home</Link>
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
