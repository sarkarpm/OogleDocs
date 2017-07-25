import React from 'react';
import { Button, ButtonGroup, Input, Form, Modal, ModalHeader, ModalBody } from 'reactstrap';
// import { User, Document } from '../../models';

class Home extends React.Component {
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
    createDocument( event ) {
        event.preventDefault();
    }
    joinDocument( event ) {
        event.preventDefault();
    }

    render() {
        // return User.findById( userId )
        //     .then(( user ) => {
        //         const docids = user.documents;
        const toggleCreate = this.toggleCreate.bind( this );
        const toggleJoin = this.toggleJoin.bind( this );
        return (
            <div>
                <Button href='#/login'>Logout</Button>
                <h1>Documents Home</h1>
                <Modal isOpen={ this.state.createModal } toggle={ toggleCreate } backdrop={ true }>
                    <ModalHeader toggle={ toggleCreate }>Create Document</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={ this.createDocument }>
                            <Input placeholder='Document Title' />
                            <Input placeholder='Document Password' />
                            <Button type="submit">Create Document</Button>
                        </Form>
                    </ModalBody>
                </Modal>
                <Modal isOpen={ this.state.joinModal } toggle={ toggleJoin } backdrop={ true }>
                    <ModalHeader toggle={ toggleJoin }>Join Document</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={ this.joinDocument }>
                            <Input placeholder='Document ID' />
                            <Input placeholder='Document Password' />
                            <Button type="submit">Join Document</Button>
                        </Form>
                    </ModalBody>
                </Modal>
                <div className='homeDiv'>
                    <ButtonGroup vertical className='doclist'>
                        {/* { docids.map(( id ) => {
                                return Document.findByid( id )
                                    .then(( doc ) => {
                                        return <Button block href={ "#/edit/" + doc._id }>{ doc.title }</Button>;
                                    } );
                            } ) } */}
                    </ButtonGroup>
                    <div className="buttonSet">
                        <Button onClick={ toggleCreate }>Create Document</Button>
                        <Button onClick={ toggleJoin }>Join Document</Button>
                    </div>
                </div>
            </div>
        );
        // } );
    }
}

export default Home;
