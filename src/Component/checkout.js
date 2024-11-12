import React, { useState } from "react";
import { Button, Card, Form, Col, Row } from "react-bootstrap";
import Moment from "react-moment";
import { useLocation } from "react-router-dom";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import axios from "axios";
import { useSelector } from "react-redux";

export default function Checkout() {
  const { state } = useLocation();
  const checkoutData = state?.checkoutData || null; // Get checkout data from navigation state
  const [isOrderConfirm, setIsOrderConfirm] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState(""); // State to store the payment URL
  const cartItems = useSelector((state) => state.cart.cartItems);
  const userData = JSON.parse(localStorage.getItem("HGuserdata"));
  console.log("userData", userData?._id);

  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  if (!checkoutData) {
    return <p>No data available</p>;
  }

  const totalAmount = checkoutData?.items?.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsOrderConfirm(true);
  };

  console.log("checkoutData", checkoutData);
  console.log("cartItems", cartItems);

  const initiatePayment = async () => {
    try {
      const config = {
        url: "/payment/initiatepayment",
        method: "POST",
        baseURL: "https://api.healinggarden.co.in/api",
        headers: { "content-type": "application/json" },
        data: {
          order_id: checkoutData.order_id,
          OrderDetails: checkoutData,
          amount: totalAmount,
          currency: "INR",
          userId: userData?._id,
          username: userData?.username,
          payment_capture: true,
          description: "Healing Garden - Order Payment",
          shipping_address: shippingInfo,
        },
      };

      const response = await axios(config);
      if (response.status === 200) {
        const { redirectUrl } = response.data;
        window.location.href = redirectUrl; // Redirect user to payment page
      }
    } catch (error) {
      console.error("Payment initiation failed", error);
    }
  };

  return (
    <>
      <Header />

      <div className="col-md-6 m-auto">
        <h2 className="mb-4 text-center">Checkout</h2>

        <Form onSubmit={handleSubmit}>
          <Card className="mb-3">
            <Card.Header as="h5">Cart Summary</Card.Header>
            <Card.Body>
              {checkoutData.items.length > 0 ? (
                <>
                  {checkoutData.items.map((item, index) => (
                    <Row key={index} className="mb-2">
                      <Col md={6}>
                        <p>
                          <strong>{item.title}</strong>
                        </p>
                        <p>Price: Rs. {item.price.toFixed(2)}</p>
                        <p>Quantity: {item.quantity}</p>
                      </Col>
                      <Col md={6} className="text-end">
                        <p>
                          <strong>
                            Subtotal: Rs.{" "}
                            {(item.price * item.quantity).toFixed(2)}
                          </strong>
                        </p>
                      </Col>
                    </Row>
                  ))}
                  <hr />
                  <Row>
                    <Col md={6}>
                      <p>
                        <strong>Total Amount:</strong>
                      </p>
                    </Col>
                    <Col md={6} className="text-end">
                      <p>
                        <strong>Rs. {totalAmount.toFixed(2)}</strong>
                      </p>
                    </Col>
                  </Row>
                </>
              ) : (
                <p>No items in the cart.</p>
              )}
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Header as="h5">
              Shipping Info (Required only for product or kit purchase)
            </Card.Header>
            <Card.Body>
              <Form.Group controlId="formAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={shippingInfo.address}
                  onChange={handleShippingChange}
                />
              </Form.Group>
              <Form.Group controlId="formCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  value={shippingInfo.city}
                  onChange={handleShippingChange}
                />
              </Form.Group>
              <Form.Group controlId="formState">
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  name="state"
                  value={shippingInfo.state}
                  onChange={handleShippingChange}
                />
              </Form.Group>
              <Form.Group controlId="formZip">
                <Form.Label>Zip Code</Form.Label>
                <Form.Control
                  type="text"
                  name="zip"
                  value={shippingInfo.zip}
                  onChange={handleShippingChange}
                />
              </Form.Group>
            </Card.Body>
          </Card>

          <Button className="submit w-100" onClick={initiatePayment}>
            Place Order
          </Button>

          {paymentUrl && (
            <div className="mt-3 text-center">
              <p>Payment URL:</p>
              <a href={paymentUrl} target="_blank" rel="noopener noreferrer">
                {paymentUrl}
              </a>
            </div>
          )}
        </Form>
      </div>

      <Footer />
    </>
  );
}
