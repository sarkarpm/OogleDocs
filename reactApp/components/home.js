import React from 'react';
import { Button, ButtonGroup, Form, Modal, ModalHeader, ModalBody, Input } from 'reactstrap';
// import { User, Document } from '../../models';
import axios from 'axios';

class Home extends React.Component {
    constructor( props ) {
        super( props );
        this.state = {
            createModal: false,
            joinModal: false,
            buttonSet: []
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
        const self = this;
        axios.post( 'http://localhost:3000/newdoc', {
            password: document.getElementById( 'newPw' ).value,
            title: document.getElementById( 'title' ).value,
            userId: window.sessionStorage.getItem( 'userId' )
        } ).then(( res ) => {
            self.props.history.push( '/edit/' + res.data.resId );
        } );
    }
    joinDocument( event ) {
        event.preventDefault();
        const self = this;
        axios.post( 'http://localhost:3000/joindoc', {
            password: document.getElementById( 'joinPw' ).value,
            docId: document.getElementById( 'docId' ).value,
            userId: window.sessionStorage.getItem( 'userId' )
        } ).then(( res ) => {
            if ( res.data.success ) {
                self.props.history.push( '/edit/' + res.data.resId );
            }
        } );
    }
    logout() {
        axios.get( 'http://localhost:3000/logout' );
        window.sessionStorage.clear();
        this.props.history.push( '/login' );
    }

    componentDidMount() {
        const self = this;
        axios.post( 'http://localhost:3000/doclist', { UId: window.sessionStorage.getItem( 'userId' ) } )
            .then( res => {
                console.log( 'THIS IS YOUR LIST', res.data.val );
                const buttons = res.data.val.map( (doc, index) => <Button block key={ index } href={ "#/edit/" + doc._id }>{ doc.title }</Button> );
                self.setState( { buttonSet: buttons } );
            } )
            .catch(err => {
                console.log('error loading documents from database', err);
            });
    }

    render() {
        const toggleCreate = this.toggleCreate.bind( this );
        const toggleJoin = this.toggleJoin.bind( this );
        return (
            <div>
                <Button onClick={ this.logout.bind( this ) }>Logout</Button>
                <h1>Documents Home</h1>
                <Modal isOpen={ this.state.createModal } toggle={ toggleCreate } backdrop={ true }>
                    <ModalHeader toggle={ toggleCreate }>Create Document</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={ this.createDocument.bind( this ) }>
                            <Input
                                type="text"
                                id="title"
                                placeholder="Title"
                            />
                            <Input
                                type="text"
                                id="newPw"
                                placeholder="Password"
                            />
                            <Button type="submit">Create Document</Button>
                        </Form>
                    </ModalBody>
                </Modal>
                <Modal isOpen={ this.state.joinModal } toggle={ toggleJoin } backdrop={ true }>
                    <ModalHeader toggle={ toggleJoin }>Join Document</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={ this.joinDocument.bind(this) }>
                            <Input
                                type="text"
                                id="docId"
                                placeholder="Document ID"
                            />
                            <Input
                                type="text"
                                id="joinPw"
                                placeholder="Password"
                            />
                            <Button type="submit">Join Document</Button>
                        </Form>
                    </ModalBody>
                </Modal>
                <div className='homeDiv'>
                    <ButtonGroup vertical className='doclist'>
                        {
                            this.state.buttonSet
                        }
                    </ButtonGroup>
                    <div className="buttonSet">
                        <Button onClick={ toggleCreate }>Create Document</Button>
                        <Button onClick={ toggleJoin }>Join Document</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
