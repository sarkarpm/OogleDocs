import React from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Editor, EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import customStyleMap from '../customMaps/customStyleMap';
import Toolbar from './Toolbar';
import extendedBlockRenderMap from '../customMaps/customBlockMap';
import axios from 'axios';
//import SaveModal from './saveModal'

class DocEdit extends React.Component {
    constructor( props ) {
        super( props );
        this.state = {
            editorState: EditorState.createEmpty(),
            socket: this.props.socket,
            docId: this.props.match.params.docid,
            documentTitle: '',
            createModal: false,
            setInterval: ""
        };
        this.onChange = ( editorState ) => {
            this.setState( { editorState } );
            //console.log('editor state in on change', editorState);
            const rawDraftContentState = JSON.stringify( convertToRaw(editorState.getCurrentContent()) );
            this.state.socket.emit('madeChange', rawDraftContentState);
        };
        this.focus = () => this.refs.editor.focus();
        
    }


    toggleCreate() {
        this.setState( {
            createModal: !this.state.createModal,
        } );
    }

    _saveDocument() {
        const rawDraftContentState = JSON.stringify( convertToRaw(this.state.editorState.getCurrentContent()) );
        //console.log("this.state", this.state)
        //console.log("this.state.editorstate", this.state.editorState)
        //console.log("contentState", rawDraftContentState)
        console.log('is saving every 30 seconds')
        axios.post('http://localhost:3000/save', {
            contentState: rawDraftContentState,
            docId: this.state.docId
        })
        .then(response => {
            console.log('Document successfully saved');
            //TODO implement a popup window alerting the user that doc has been saved
        })
        .catch(err => {
            console.log('error saving document', err);
        });
    }

    componentWillMount() {
        axios.post( "http://localhost:3000/loadDocument", {
            docId: this.state.docId
        })
        .then(response => {
            const loadedContentState = convertFromRaw( JSON.parse(response.data.doc.contentState[response.data.doc.contentState.length - 1]) );
            //console.log('loadedContentState', loadedContentState);
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
        var self = this;
        // this.state.socket.on('roomIsReady', (ready) => {
        //     saveInterval = setInterval(this._saveDocument.bind(this), 30000)
        // })
        this.setState({saveInterval: setInterval(this._saveDocument.bind(this), 30000)});
        //console.log('saveinterval', this.state.saveInterval)
    }

    componentDidMount(){
        var self = this;
        this.state.socket.on('changeListener', (changedDoc) => {
            self.updateContentFromSocket(changedDoc);
        });
    }

    updateContentFromSocket(changedDoc) {
        //console.log('changedDoc', changedDoc);
        changedDoc = convertFromRaw( JSON.parse(changedDoc) );
        //console.log('changedDoc', changedDoc);
        this.setState({editorState: EditorState.createWithContent(changedDoc)});
    }

    componentWillUnmount() {
        //console.log("editorState WHEN U LEAVE", this.state.editorState)
        //this._saveDocument();
        clearInterval(this.state.saveInterval);
        //console.log('clearInterval', this.state.saveInterval)
        this.state.socket.emit( 'leftDocument', this.state.docId );
    }

    render() {
        const toggleCreate = this.toggleCreate.bind( this );
        return (
            <div>
                <Modal isOpen={ this.state.createModal } toggle={ toggleCreate } backdrop={ true }>
                    <ModalHeader toggle={ toggleCreate }>Do you want to save?</ModalHeader>
                    <ModalBody>
                        <Button href="#/home" type="submit" onClick={ this._saveDocument.bind(this) }>Save</Button>
                        <Button href="#/home" type="submit">Leave without Saving</Button>
                    </ModalBody>
                </Modal>
                <div>
                    <Button onClick={ toggleCreate }>Docs Home</Button>
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
