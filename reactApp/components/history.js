import React from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import axios from 'axios';

class History extends React.Component {
    constructor( props ) {
        super( props );
        this.state = {
            docId: this.props.match.params.docid,
            socket: this.props.socket,
            history: [],
            title: ''
        };
    }

    componentWillMount() {
        const self = this;
        axios.post( 'http://localhost:3000/historylist', { docId: this.state.docId } )
            .then( res => {
                const buttons = res.data.history.map(( save, index ) => <Button block key={ index }>{ index }</Button> );
                self.setState( { history: buttons, title: res.data.title } );
            } );
    }

    render() {
        return (
            <div>
                <Button href={ '#/edit/' + this.state.docId }>Back</Button>
                <h1>{this.state.title} History</h1>
                <div className="homeDiv">
                    <ButtonGroup className="doclist" vertical>
                        { this.state.history }
                    </ButtonGroup>
                </div>
            </div>
        );
    }
}

export default History;
