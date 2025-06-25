import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function MyModal({
  modalStatus,
  handleClose,
  handleSave,
  handleChange,
  startDate,
  endDate,
  eventInput,
  handleEditEvent,
  handleEdited,
  editStatus,
  handleDelete,
  handleColorChange,
  eventColor
}) {


  return (
    <>
      <Modal
        show={modalStatus}
        onHide={handleClose}
        centered
        className="my-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Create New Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => {
  e.preventDefault();
  editStatus ? handleEdited() : handleSave();
}}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Start time</Form.Label>
              <Form.Control
                type="email"
                placeholder={startDate.toLocaleString("en-US")}
                disabled
                style={{ wordSpacing: "3px" }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>End Time</Form.Label>
              <Form.Control
                type="email"
                placeholder={endDate.toLocaleString("en-US")}
                style={{ wordSpacing: "3px" }}
                disabled
              />
            </Form.Group>

            {/* for creating  new event */}
            {!editStatus && (
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Event title</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  onChange={handleChange}
                  style={{ boxShadow: "none" }}
                />
              </Form.Group>
              
            )}
<Form.Group className="mb-3" controlId="eventColor">
  <Form.Label>Event Color</Form.Label>
  <Form.Control
    type="color"
    value={eventColor}
    onChange={handleColorChange}
    style={{ width: "100%", height: "40px", border: "none" }}
  />
</Form.Group>
            {/* for editing created event  */}
            {editStatus && (
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Event title</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={eventInput}
                  onChange={handleEditEvent}
                  style={{ boxShadow: "none" }}
                />
              </Form.Group>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {/* for deleted created event  */}
          {editStatus && (
            <Button
              variant="secondary"
              onClick={handleDelete}
              style={{ boxShadow: "none" }}
            >
              <i className="fi fi-rr-trash"></i>
            </Button>
          )}

          <Button
            variant="secondary"
            onClick={handleClose}
            style={{ boxShadow: "none" }}
          >
            Close
          </Button>

          {/* for creating  new event */}
          {!editStatus && (
            <Button
              variant="success"
              type="submit"
              onClick={handleSave}
              style={{ boxShadow: "none" }}
            >
              Save Changes
            </Button>
          )}

          {/* for editing created event  */}
          {editStatus && (
            <Button
              variant="success"
              onClick={handleEdited}
              style={{ boxShadow: "none" }}
            >
              Save Changes
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MyModal;
