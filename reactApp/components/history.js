import React from 'react';
import { Button, DropdownMenu, DropdownItem, DropdownToggle, Dropdown } from 'reactstrap';
import axios from 'axios';
import customStyleMap from '../customMaps/customStyleMap';
import extendedBlockRenderMap from '../customMaps/customBlockMap';
import { Editor, EditorState, convertFromRaw, convertToRaw } from 'draft-js';

class History extends React.Component {
    constructor( props ) {
        super( props );
        this.state = {
            docId: this.props.match.params.docid,
            socket: this.props.socket,
            history: [],
            title: '',
            dropdownOpen: false,
            selected: 'Document History',
            editorState: EditorState.createEmpty()
        };
    }

    toggle() {
        this.setState( {
            dropdownOpen: !this.state.dropdownOpen
        } );
    }

    changeSelected( index, save ) {
        const loadedContentState = convertFromRaw( JSON.parse( save ) );
        this.setState( {
            selected: this.createName( index ),
            editorState: EditorState.createWithContent( loadedContentState )
        } );
    }

    createName( index ) {
        return index === 0 ? 'Beginning' : 'Save ' + index;
    }

    changeToHistory() {
        const rawDraftContentState = JSON.stringify( convertToRaw( this.state.editorState.getCurrentContent() ) );
        this.state.socket.emit( 'madeChange', rawDraftContentState );
        axios.post( 'http://localhost:3000/save', {

            contentState: rawDraftContentState,
            docId: this.state.docId
        } )
            .then( response => {
                console.log( 'Document successfully saved' );
                //TODO implement a popup window alerting the user that doc has been saved
            } )
            .catch( err => {
                console.log( 'error saving document', err );
            } );
    }

    componentWillMount() {
        const self = this;
        axios.post( 'http://localhost:3000/historylist', { docId: this.state.docId } )
            .then( res => {
                const buttons = res.data.history.map(( save, index ) =>
                    <DropdownItem key={ index } onClick={ () => this.changeSelected( index, save ) }>{ self.createName( index ) }</DropdownItem>
                );
                self.setState( { history: buttons, title: res.data.title } );
            } );
        this.state.socket.emit( 'joinedDocument', this.state.docId );
    }

    componentWillUnmount() {
        this.state.socket.emit( 'leftDocument', this.state.docId );
    }

    render() {
        return (
            <div>
                <Button className="backButton" href={ '#/edit/' + this.state.docId }>Back</Button>
                <h1>{ this.state.title } History</h1>
                <div className="body">
                    <Dropdown isOpen={ this.state.dropdownOpen } toggle={ this.toggle.bind( this ) }>
                        <DropdownToggle caret>
                            { this.state.selected }
                        </DropdownToggle>
                        <DropdownMenu>
                            <div className="d">
                                { this.state.history }
                            </div>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <div id="editor">
                    <Editor
                        readOnly
                        customStyleMap={ customStyleMap }
                        editorState={ this.state.editorState }
                        blockRenderMap={ extendedBlockRenderMap }
                    />
                </div>
                <div className="buttonLine">
                    <Button onClick={ this.changeToHistory.bind( this ) }>Save to Current</Button>
                </div>
            </div>
        );
    }
}

export default History;
