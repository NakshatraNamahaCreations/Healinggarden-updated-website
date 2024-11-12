import React, { useEffect } from "react";
import { Button, Card, Form } from "react-bootstrap";
import Moment from "react-moment";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  updateItemQuantity,
  removeItemFromCart,
} from "../DataManagement/Cartaction";
import "./cart.css";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
export default function Cart() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const calculateTotals = () => {
    const totalAmount = cartItems.reduce((acc, item) => {
      const quantity = item?.quantity || 1;
      const price = item?.item?.OfferPrice || 0;
      return acc + price * quantity;
    }, 0);
    const discount = 0;
    const subtotal = totalAmount - discount;

    return { totalAmount, discount, subtotal };
  };

  const { totalAmount, discount, subtotal } = calculateTotals();

  const handleQuantityChange = (uniqueId, change) => {
    const item = cartItems.find((item) => item.uniqueId === uniqueId);
    if (item) {
      const currentQuantity = item.quantity || 1;
      const newQuantity = Math.max(1, currentQuantity + change);
      dispatch(updateItemQuantity({ uniqueId, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (index) => {
    dispatch(removeItemFromCart(index));
  };

  const handleCheckout = () => {
    const checkoutData = {
      items: cartItems.map((item) => ({
        id: item.uniqueId,
        title: item?.item?.workshopTitle,
        price: item?.item?.OfferPrice,
        Workshodate: item?.SelectedDate?.Workshodate,
        startTime: item?.SelectedDate?.startTime,
        endTime: item?.SelectedDate?.endTime,
        duration: item?.SelectedDate?.duration,
        quantity: item?.quantity || 1,
        WorkshopImages: item?.item?.WorkshopImages,
        sessionAddress: item?.item?.sessionAddress,
      })),
      totalAmount: subtotal,
    };

    navigate("/checkout", { state: { checkoutData } });
  };

  console.log(cartItems, "cartItems");

  return (
    <>
      <Header />
      <div className="categoryview m-auto row">
        <hr className="row hr-line" style={{ borderColor: "white" }} />
        <div className="p-1">
          <a className="footertext" href="/">
            Home
          </a>{" "}
          {">"}{" "}
          <a className="footertext" href="about">
            Cart
          </a>
        </div>
      </div>
      <div className="row text-center sub_heading shadow-sm m-auto">
        <p>Cart</p>
      </div>

      {cartItems.length === 0 ? (
        <div className="row text-center m-auto p-5">
          <p className="main_heading m-auto p-5">Your cart is empty</p>
        </div>
      ) : (
        <div className="row m-auto mt-3">
          <div className="col-md-8">
            <div className="row">
              {cartItems.map((item, index) => {
                const { Workshodate, startTime, endTime, duration } =
                  item?.SelectedDate || {};
                const formattedStartTime = startTime
                  ? new Date(`1970-01-01T${startTime}:00`)
                  : new Date();
                const formattedEndTime = endTime
                  ? new Date(`1970-01-01T${endTime}:00`)
                  : new Date();

                return (
                  <div className="col-md-12 mb-4" key={item.uniqueId}>
                    <Card className="cart-item-card">
                      <div className="row no-gutters">
                        <div className="col-md-4">
                          <img
                            src={`https://api.healinggarden.co.in/Product/${item?.item?.WorkshopImages?.[0]}`}
                            className="card-img m-auto"
                            alt={item?.item?.workshopTitle}
                          />
                        </div>
                        <div className="col-md-8">
                          <Card.Body>
                            <Card.Title>{item?.item?.workshopTitle}</Card.Title>
                            <Card.Text>
                              <p className="sub_heading">
                                Workshop Date:{" "}
                                <Moment format="ddd, Do MMMM YYYY">
                                  {Workshodate}
                                </Moment>
                              </p>
                              <p className="sub_sub_heading">
                                Workshop Slot:
                                <Moment format="hh:mm A">
                                  {formattedStartTime}
                                </Moment>{" "}
                                -
                                <Moment format="hh:mm A">
                                  {formattedEndTime}
                                </Moment>
                                <span>
                                  {" "}
                                  (Duration: {duration || 0} minutes)
                                </span>
                              </p>
                              <p className="sub_sub_heading">
                                <span className="textbold inter me-2">
                                  Price:
                                </span>
                                <span className="textbold inter me-2 offerprice">
                                  Rs.{item?.item?.WFeePerParticipant}
                                </span>
                                <span className="textbold inter">
                                  Rs.{item?.item?.OfferPrice}
                                </span>
                                <span
                                  className="textbold inter mx-2"
                                  style={{ color: "red" }}
                                >
                                  {item?.item?.discount}%
                                </span>
                              </p>
                            </Card.Text>
                            <div className="row">
                              <div className="col-md-9">
                                <div className="d-flex align-items-center">
                                  <Button
                                    variant="outline-secondary"
                                    onClick={() =>
                                      handleQuantityChange(item.uniqueId, -1)
                                    }
                                  >
                                    -
                                  </Button>
                                  <Form.Control
                                    type="text"
                                    value={item?.quantity || 1}
                                    readOnly
                                    className="mx-2 text-center"
                                    style={{ width: "60px" }}
                                  />
                                  <Button
                                    variant="outline-secondary"
                                    onClick={() =>
                                      handleQuantityChange(item.uniqueId, 1)
                                    }
                                  >
                                    +
                                  </Button>
                                </div>
                              </div>
                              <div className="col-md-3 mx-0 sub_heading">
                                Rs.
                                {(
                                  item?.item?.OfferPrice * (item?.quantity || 1)
                                ).toFixed(2)}
                              </div>
                              <div className="col-md-12 mt-2">
                                <Button
                                  variant="danger"
                                  onClick={() => handleRemoveItem(index)}
                                >
                                  Remove
                                </Button>
                              </div>
                            </div>
                          </Card.Body>
                        </div>
                      </div>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="col-md-4">
            <Card className="cart-summary-card">
              <Card.Header className="cart-summary-header">
                <h5>Order Summary</h5>
              </Card.Header>
              <Card.Body className="cart-summary-body">
                {/* <div className="cart-summary-item">
                  <span className="cart-summary-label">Subtotal:</span>
                  <span className="cart-summary-value">
                    ₹{totalAmount.toFixed(2)}
                  </span>
                </div> */}
                {/* <div className="cart-summary-item">
                  <span className="cart-summary-label">Discount:</span>
                  <span className="cart-summary-value">
                    ₹{discount.toFixed(2)}
                  </span>
                </div> */}
                <div className="cart-summary-item">
                  <span className="cart-summary-label">Total Amount:</span>
                  <span className="cart-summary-value">
                    ₹{subtotal.toFixed(2)}
                  </span>
                </div>
                <hr />
                <div className="row">
                  <button
                    className="col-md-7 p-2 submt m-auto"
                    onClick={handleCheckout}
                  >
                    Checkout
                  </button>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
