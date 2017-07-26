import React from 'react';
import { Link } from 'react-router-dom';
import { Editor, EditorState, RichUtils, convertFromRaw, convertToRaw } from 'draft-js';
import customStyleMap from '../customMaps/customStyleMap';
import Toolbar from './Toolbar';
import _ from 'underscore';
import extendedBlockRenderMap from '../customMaps/customBlockMap';
import axios from 'axios';

class DocEdit extends React.Component {
    constructor( props ) {
        super( props );
        this.state = {
            editorState: EditorState.createEmpty()
        };
        this.onChange = ( editorState ) => this.setState( { editorState } );
        this.focus = () => this.refs.editor.focus();
        _.bindAll( this, 'handleKeyCommand', 'onChange', '_saveDocument'  );
    }

    _saveDocument() {
        const rawDraftContentState = JSON.stringify( convertToRaw(this.state.editorState.getCurrentContent()) );
        axios.post("/" /*route needed*/, {
            contentState: rawDraftContentState //or something like it, depending on schema
            //TODO authentication details, etc...
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
        const userIsAuthenticated = true; /* TODO get user id, authentication info, etc  */
        if ( userIsAuthenticated ) {
            axios(/* route needed*/ {
              // TODO get the saved state from mongo
            })
            .then(rawContentState => {
                const loadedContentState = convertFromRaw( rawContentState );
                this.setState({editorState: EditorState.createWithContent(loadedContentState)});
            })
            .catch(err => {
                console.log('error loading document', err);
            });
        }
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
                <Toolbar
                  onSaveDocument={ this._saveDocument }
                  docEdit={ this }
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
