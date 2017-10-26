// @flow

import React from "react";
import { Modal, Button } from "react-bootstrap";

type Props = {
  showModal: boolean,
  modalTitle: string,
  modalBody: string,
  closeModal: Function
};

export default (props: Props) => {
  return (
    <Modal
      show={props.showModal}
      onHide={props.closeModal}
      aria-labelledby="contained-modal-title"
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title">{props.modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body dangerouslySetInnerHTML={{ __html: props.modalBody }} />
      <Modal.Footer>
        <Button onClick={props.closeModal}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
