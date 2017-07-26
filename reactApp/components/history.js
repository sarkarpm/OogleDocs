import React from 'react';
import { Button } from 'reactstrap';

class History extends React.Component {
    constructor( props ) {
        super( props );
        this.state = {
            docId: this.props.match.params.docid,
            socket: this.props.socket
        };
    }

    render() {
        return (
            <div>
                <Button href={'#/edit/' + this.state.docId}>Back</Button>
            </div>
        );
    }
}

export default History;
