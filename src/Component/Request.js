import React, { useState } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap"; // Import Spinner
import axios from "axios";
import { toast } from "react-hot-toast";

const RequestProposal = ({ open, setOpen }) => {
  const [errors, setErrors] = useState({});
  const [mobileno, setMobileno] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [requestData, setRequestData] = useState({
    companyname: "",
    email: "",
    workshop: "",
    max: "",
    message: "",
    fullname: "",
  });
  const [workshopDate, setWorkshopDate] = useState("");

  const validateForm = () => {
    const formErrors = {};
    if (!requestData.fullname) formErrors.fullname = "Full Name is required";
    if (!mobileno) formErrors.mobileno = "Phone Number is required";
    else if (!/^\d{10}$/.test(mobileno))
      formErrors.mobileno = "Phone Number must be exactly 10 digits";
    if (!requestData.message) formErrors.message = "Message is required";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleRequestSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true); // Start loader

    try {
      const response = await axios.post(
        "https://api.healinggarden.co.in/api/proposal/addproposal",
        {
          fullname: requestData.fullname,
          companyname: requestData.companyname,
          mobileno,
          email: requestData.email,
          workshop: requestData.workshop,
          max: requestData.max,
          message: requestData.message,
          workshopDate,
        }
      );

      if (response.status === 200) {
        toast.success(
          "Thank you for contacting us. We will reply to you shortly."
        );
        setOpen(false);
        setErrors({});
        setRequestData({
          companyname: "",
          email: "",
          workshop: "",
          max: "",
          message: "",
          fullname: "",
        });
        setMobileno("");
        setWorkshopDate("");
      } else {
        toast.error("Submission failed. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred during submission. Please try again.");
    } finally {
      setIsLoading(false); // Stop loader
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setRequestData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="row m-auto">
      <Modal show={open} onHide={() => setOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Request A Proposal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Full name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Full name"
              name="fullname"
              value={requestData.fullname}
              onChange={handleChange}
              isInvalid={!!errors.fullname}
            />
            <Form.Control.Feedback type="invalid">
              {errors.fullname}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Mobile number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Mobile number"
              name="mobileno"
              value={mobileno}
              onChange={(e) => setMobileno(e.target.value)}
              isInvalid={!!errors.mobileno}
            />
            <Form.Control.Feedback type="invalid">
              {errors.mobileno}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Company name (optional)</Form.Label>
            <Form.Control
              type="text"
              placeholder="Company name"
              name="companyname"
              value={requestData.companyname}
              onChange={handleChange}
              isInvalid={!!errors.companyname}
            />
            <Form.Control.Feedback type="invalid">
              {errors.companyname}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Company email address (optional)</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              name="email"
              value={requestData.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tentative Workshop Date (optional)</Form.Label>
            <Form.Control
              type="date"
              value={workshopDate}
              onChange={(e) => setWorkshopDate(e.target.value)}
              isInvalid={!!errors.workshopDate}
            />
            <Form.Control.Feedback type="invalid">
              {errors.workshopDate}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Select
              name="max"
              value={requestData.max}
              onChange={handleChange}
              isInvalid={!!errors.max}
            >
              <option>Tentative Participant Count (optional)</option>
              <option value="20-50">20-50</option>
              <option value="50-100">50-100</option>
              <option value="100-200">100-200</option>
              <option value="200-300">200-300</option>
              <option value="300+">300+</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.max}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              name="message"
              rows={3}
              value={requestData.message}
              onChange={handleChange}
              isInvalid={!!errors.message}
            />
            <Form.Control.Feedback type="invalid">
              {errors.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleRequestSubmit}
            disabled={isLoading} // Disable when loading
          >
            {isLoading ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              "Submit"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RequestProposal;
