import { useState } from "react";
import { FaList } from "react-icons/fa";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_PROJECT } from "../mutations/ProjectMutations";
import { GET_PROJECTS } from "../queries/projectQuries";
import { GET_CLIENTS } from "../queries/clientQueries";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export default function AddClientModal() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [clientId, setClientId] = useState("");
  const [status, setStatus] = useState("new");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, description, status, clientId },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });

      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] },
      });
    },
  });

  const { loading, error, data } = useQuery(GET_CLIENTS);

  const onSubmit = (e) => {
    e.preventDefault();

    if (name === "" || clientId === "" || status === "") {
      return alert("Please fill in all fields");
    }

    addProject(name, description, status, clientId);

    setName("");
    setDescription("");
    setClientId("");
    setStatus("new");
    handleClose();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <div className="d-flex align-items-center">
          <FaList className="icon" />
          <div>New Project</div>
        </div>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmit}>
            <div className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as={"textarea"}
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </div>
            <div className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="new">New</option>
                <option value="progress">In Progress</option>
                <option value="compleated">Completed</option>
              </Form.Select>
            </div>
            <div className="mb-3">
              <Form.Label>Client</Form.Label>
              <Form.Select
                id="client"
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
              >
                <option value="">Select Client</option>
                {loading ? (
                  <option value="">Loading...</option>
                ) : error ? (
                  <option value="">Error</option>
                ) : (
                  data.clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.name}
                    </option>
                  ))
                )}
              </Form.Select>
            </div>

            <Button
              type="submit"
              data-bs-dismiss="modal"
              className="btn btn-secondary"
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
