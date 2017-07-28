import React from 'react';
import { Button } from 'reactstrap';
import { Editor, EditorState, convertFromRaw, convertToRaw, SelectionState, Modifier } from 'draft-js';
import customStyleMap from '../customMaps/customStyleMap';
import Toolbar from './Toolbar';
import extendedBlockRenderMap from '../customMaps/customBlockMap';
import axios from 'axios';

class DocEdit extends React.Component {
    constructor( props ) {
        super( props );
        this.state = {
            editorState: EditorState.createEmpty(),
            docId: this.props.match.params.docid,
            documentTitle: '',
            userColor: null
        };
        this.onChange = ( editorState ) => {
            this.setState( { editorState } );
            const rawDraftContentState = JSON.stringify( convertToRaw(editorState.getCurrentContent()) );
            this.props.socket.emit('madeChange', rawDraftContentState);
            const newSelection = editorState.getSelection();
            if (newSelection) {
                let selectionInfo = {
                    selectionState: {
                        anchorKey: newSelection.getAnchorKey(),
                        anchorOffset: newSelection.getAnchorOffset(),
                        focusKey: newSelection.getFocusKey(),
                        focusOffset: newSelection.getFocusOffset(),
                        isBackward: newSelection.isBackward
                    },
                    docId: this.state.docId,
                    userColor: this.state.userColor
                };
                this.props.socket.emit('madeSelection', JSON.stringify(selectionInfo));
            }
        };
        this.focus = () => this.refs.editor.focus();
    }

    componentWillMount() {
        var self = this;
        this.props.socket.emit('joinDocument', this.state.docId);
        this.props.socket.on('roomStatus', (roomStatus) => {
            console.log('room status', roomStatus);
        });
        this.props.socket.on('userColor', (userColor) => {
            this.state.userColor = userColor;
        });
        this.props.socket.on('changeListener', (changedDoc) => {
            self.updateContentFromSocket(changedDoc);
        });
        this.props.socket.on('renderSelection', (selectionInfo) => {

            selectionInfo = JSON.parse(selectionInfo);
            console.log('newSI', selectionInfo);
            if (selectionInfo.userColor !== this.state.userColor) {
                let newSelection = selectionInfo.selectionState;
                const userColor = 'cursor' + selectionInfo.userColor;
                const updateSelection = new SelectionState({
                    anchorKey: newSelection.anchorKey,
                    anchorOffset: newSelection.anchorOffset,
                    focusKey: newSelection.focusKey,
                    focusOffset: Math.abs(newSelection.anchorOffset !== newSelection.focusOffset) ? newSelection.focusOffset : newSelection.anchorOffset + 1,
                    isBackward: newSelection.isBackward
                });
                let newEditorState = EditorState.acceptSelection(this.state.editorState, updateSelection);
                newEditorState = EditorState.forceSelection(newEditorState, newEditorState.getSelection());
                let contentWithCursor = newEditorState.getCurrentContent();
                console.log('userColor', userColor);
                contentWithCursor = Modifier.applyInlineStyle(
                contentWithCursor,
                updateSelection,
                userColor
              );
                console.log(contentWithCursor);
                this.setState({editorState: EditorState.createWithContent(contentWithCursor)});
            }
        });

        this.props.socket.on('currentState', (currentState) => {
            axios.post( "http://localhost:3000/loadDocument", {
                docId: this.state.docId
            })
          .then(response => {
              let loadedContentState = convertFromRaw( JSON.parse(response.data.doc.contentState) );
              if (currentState) {
                  loadedContentState = convertFromRaw( JSON.parse(currentState) );
              } else {
                  loadedContentState = convertFromRaw( JSON.parse(response.data.doc.contentState) );
              }
              this.setState({
                  editorState: EditorState.createWithContent(loadedContentState),
                  documentTitle: response.data.doc.title
              });
          })
          .catch(err => {
              console.log('error loading document', err);
          });

        });
    }

    updateContentFromSocket(changedDoc) {
        changedDoc = convertFromRaw( JSON.parse(changedDoc) );
        this.setState({editorState: EditorState.createWithContent(changedDoc)});
    }

    componentWillUnmount() {
        this.props.socket.emit( 'leaveDocument', this.state.docId );
        this.props.socket.removeListener('changeListener');
        this.props.socket.removeListener('message ');
        this.props.socket.removeListener('docInfo');
        this.props.socket.removeListener('userColor');
        this.props.socket.removeListener('renderSelection');
    }

    render() {
        customStyleMap['cursor' + this.state.userColor] = {};
        console.log('customStyleMap', customStyleMap);

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
