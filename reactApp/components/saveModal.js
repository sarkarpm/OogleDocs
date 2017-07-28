import React from 'react';
import { Button, Modal } from 'reactstrap';

class SaveModal extends React.component{
	constructor( props ) {
        super( props );
        this.state = {
            createModal: false,
            joinModal: false
        };
    }

    toggleCreate() {
        this.setState( {
            createModal: !this.state.createModal,
        } );
    }
    toggleJoin() {
        this.setState( {
            joinModal: !this.state.joinModal,
        } );
    }

	render() {
		return (
			<Modal isOpen={ this.state.createModal } toggle={ toggleCreate } backdrop={ true }>
                    <ModalHeader toggle={ toggleCreate }>Do you want to save?</ModalHeader>
                    <ModalBody>
                       <Button type="submit" onClick={this.props._saveDocument.bind(this)}>Save Document</Button>
                       <Button type="submit" onClick={() => this.setState({this.state.createModal: !this.state.createModal})}>cancel</Button>
                    </ModalBody>
               </Modal>
		);
	}
}

export default SaveModal