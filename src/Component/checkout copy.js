import React, { useState } from "react";
import { Button, Card, Form, Col, Row } from "react-bootstrap";
import Moment from "react-moment";
import { useLocation } from "react-router-dom";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import axios from "axios";

export default function Checkout() {
  const { state } = useLocation();
  const checkoutData = state?.checkoutData || null; // Get checkout data from navigation state
  const [isOrderConfirm, setIsOrderConfirm] = useState(false);
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
  console.log(checkoutData);

  const initiatePayment = async () => {
    try {
      const config = {
        url: "/payment/initiatepayment",
        method: "POST",
        baseURL: "https://api.healinggarden.co.in/api",
        headers: { "content-type": "application/json" },
        data: {
          order_id: checkoutData.order_id,
          amount: totalAmount,
          currency: "INR",
          payment_capture: true,

          description: "Healing Garden - Order Payment",
          shipping_address: shippingInfo,
        },
      };

      await axios(config).then(function (response) {
        if (response.status === 200) {
          console.log("received payment", response.data.redirectUrl);
        }
      });
    } catch (error) {}
  };

  return (
    <>
      <Header />
      {isOrderConfirm ? (
        <div className="row m-auto">
          <h2 className="mb-4 text-center shadow-sm sub_heading p-4">
            Order Confirmation
          </h2>
          <div className="col-md-8">
            <p className="main_heading grren">Thank you for placing order!</p>
            <div className="row">
              <p className="sub_heading">Order Details</p>
              <div className="col-md-3">
                <p className="text_light">Day of Booking:</p>
                <p className="text_light">
                  <Moment format="Do MMMM YYYY">{new Date()}</Moment>
                </p>
              </div>
              <div className="col-md-3">
                <p className="text_light">Booking ID:</p>
                <p className="text_light">
                  #{Math.floor(Math.random() * 1000000)}
                </p>
              </div>
            </div>

            <div className="row">
              {checkoutData.items.map((order) => {
                const {
                  id,
                  quantity,
                  title,
                  price,
                  duration,
                  Workshodate,
                  startTime,
                  endTime,
                  WorkshopImages,
                  sessionAddress,
                } = order || {};
                const formattedStartTime = startTime
                  ? new Date(`1970-01-01T${startTime}:00`)
                  : new Date();
                const formattedEndTime = endTime
                  ? new Date(`1970-01-01T${endTime}:00`)
                  : new Date();

                return (
                  <div className="row m-auto" key={order._id}>
                    <div className="row mt-5 mb-3">
                      <div className="col-md-4">
                        <img
                          src={`https://api.healinggarden.co.in/Product/${WorkshopImages?.[0]}`}
                          className="row"
                          style={{ borderRadius: "15px" }}
                          width={250}
                          alt=""
                        />
                      </div>
                      <div className="col-md-8">
                        <p>
                          <span className="textbold">Workshop/Session : </span>
                          <span className="textbold">{title}</span>{" "}
                          <span className="textbold">{sessionAddress}</span>
                        </p>

                        <p className="d-flex sub_heading">
                          <Moment format="ddd, Do MMMM YYYY">
                            {Workshodate}
                          </Moment>
                          <span className="mx-1 m-auto">|</span>
                          <Moment format="hh:mm A">{formattedStartTime}</Moment>
                          <span className="mx-1 m-auto">-</span>
                          <Moment format="hh:mm A">{formattedEndTime}</Moment>
                        </p>

                        <div>
                          <span className="textbold">
                            Amount - Rs. {price * quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                    <hr />
                  </div>
                );
              })}
              <div>
                <span className="textbold">
                  Total Amount - Rs. {checkoutData?.totalAmount} (Including
                  taxes)
                </span>
              </div>
              <div className="row mt-5 mb-5">
                <div className="row address p-3">
                  <div className="row">
                    <div className="col-md-6">
                      <p className="textbold">Registered address:</p>
                    </div>
                    <div className="col-md-6">
                      <p className="textbold">GSTIN: 29AYVPS1501R2ZF</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-8">
                      <p className="text_light m-auto">Healing Garden</p>
                      <p className="text_light m-auto">
                        PRESTIGE SHANTINIKETAN, ITPL Main Rd, Thigalarapalya,
                        Whitefield, Bengaluru, Karnataka 560048
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
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
                    // required
                  />
                </Form.Group>
                <Form.Group controlId="formCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    value={shippingInfo.city}
                    onChange={handleShippingChange}
                    // required
                  />
                </Form.Group>
                <Form.Group controlId="formState">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    type="text"
                    name="state"
                    value={shippingInfo.state}
                    onChange={handleShippingChange}
                    // required
                  />
                </Form.Group>
                <Form.Group controlId="formZip">
                  <Form.Label>Zip Code</Form.Label>
                  <Form.Control
                    type="text"
                    name="zip"
                    value={shippingInfo.zip}
                    onChange={handleShippingChange}
                    // required
                  />
                </Form.Group>
              </Card.Body>
            </Card>

            <Button className="submt w-100" onClick={initiatePayment}>
              Place Order
            </Button>
          </Form>
        </div>
      )}
      <Footer />
    </>
  );
}
