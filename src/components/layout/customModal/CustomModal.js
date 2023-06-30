// import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setmodalShow } from "../../../pages/system-state/SystemSlice";

export const CustomModal = (props) => {
  const { modalShow } = useSelector((state) => state.systemState);
  //   console.log(modalShow);
  const dispatch = useDispatch();
  return (
    <Modal
      {...props}
      show={modalShow}
      onHide={() => dispatch(setmodalShow(false))}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={() => props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
};
