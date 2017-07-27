import React from 'react';
import { Button, DropdownMenu, DropdownItem, DropdownToggle, Dropdown } from 'reactstrap';
import axios from 'axios';
import customStyleMap from '../customMaps/customStyleMap';
import extendedBlockRenderMap from '../customMaps/customBlockMap';
import { Editor, EditorState, convertFromRaw } from 'draft-js';

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

    componentWillMount() {
        const self = this;
        axios.post( 'http://localhost:3000/historylist', { docId: this.state.docId } )
            .then( res => {
                const buttons = res.data.history.map(( save, index ) =>
                    <DropdownItem key={ index } onClick={ () => this.changeSelected( index, save ) }>{ self.createName( index ) }</DropdownItem>
                );
                self.setState( { history: buttons, title: res.data.title } );
            } );
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
                            { this.state.history }
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <div className="editor">
                    <Editor
                        readOnly
                        customStyleMap={ customStyleMap }
                        editorState={ this.state.editorState }
                        blockRenderMap={ extendedBlockRenderMap }
                    />
                </div>
            </div>
        );
    }
}

export default History;
