import React from 'react';
import Modal from 'react-bootstrap/Modal';

export default function ModalQA() { 
    return ( 
        <div className='modal show'
        style={{ display: 'block', position: 'initial' }}>
            <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title> Log a shift </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>ABC</p>
                </Modal.Body>

                <Modal.Footer> 
                    <Button variant="secondary"> CLose </Button>
                    <Button variant="primary"> Save changes </Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    );
} 