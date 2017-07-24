import React from 'react';
import {
    Link
} from 'react-router-dom';

class Editor extends React.Component {
    constructor( props ) {
        super( props );
    }

    render() {
        return (
            <div className="editorPage">
                <div>
                    <Link to="/home">Docs Home</Link>
                </div>
                <div className="editorTitle">
                    <h1>{this.props.match.params.docid}</h1>
                    <p>ID: {this.props.match.params.docid}</p>
                </div>
                <div className="toolbar">
                    <p>Toolbar</p>
                </div>
            </div>
        );
    }
}

export default Editor;
