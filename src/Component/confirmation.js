import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import Moment from "react-moment";
import { useNavigate } from 'react-router-dom';
import "./cart.css"
import Header from './Layout/Header';
import Footer from "./Layout/Footer";

export default function Confirmation() {
  const [orderData, setOrderData] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [showCart, setShowCart] = useState(true);
  const userDataStr = localStorage.getItem("HGuserdata");
  const userid = JSON.parse(userDataStr)?._id;
  const navigate = useNavigate();

  useEffect(() => {
    if (userid) {
      getOrderData();
    }
  }, [userid]);

  const getOrderData = async () => {
    try {
      const response = await axios.get("https://api.healinggarden.co.in/api/order/getallorder");
      const ordersdata = response.data.data.filter((ele) => ele.userId === userid);

      const today = new Date();
      const cartItems = ordersdata.filter((ele) => isSameDay(new Date(ele.createdAt), today));
      const historyItems = ordersdata.filter((ele) => !isSameDay(new Date(ele.createdAt), today));

      setOrderData(cartItems.reverse());
      setOrderHistory(historyItems.reverse());

      if (cartItems.length === 0) {
        window.location.href = "/individual";
      }
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  const isSameDay = (date1, date2) =>
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate();

  const handleCheckout = () => {
    const checkoutData = {
      items: orderData.map(order => ({
        id: order._id,
        title: order?.OrderDetails?.item?.workshopTitle,
        price: order?.OrderDetails?.item?.OfferPrice,
        date: order?.OrderDetails?.SelectedDate,
        startTime: order?.OrderDetails?.startTime,
      })),
      totalAmount: orderData.reduce((acc, order) => acc + (order?.OrderDetails?.item?.OfferPrice || 0), 0),
    };

    navigate('/checkout', { state: { checkoutData } });
  }

  // Calculate total amount and discount for today's cart items
  const calculateTotals = () => {
    const totalAmount = orderData.reduce((acc, order) => acc + (order?.OrderDetails?.item?.OfferPrice || 0), 0);
    // Assuming discount logic is to be added here if needed
    const discount = 0; // Update this logic if you have a discount to apply
    const subtotal = totalAmount - discount;

    return { totalAmount, discount, subtotal };
  };

  const { totalAmount, discount, subtotal } = calculateTotals();

  return (
    <>    <Header />
      <div className="categoryview m-auto row">
        <hr className="row hr-line" style={{ borderColor: "white" }} />
        <p className="p-1">
          <a className="footertext" href="/">Home</a>{" "} {">"}{" "}
          <a className="footertext" href="about">Cart</a>
        </p>
      </div>

      <div className="row m-auto">
        <div className="col-md-8">

          <div className="row">
            {showCart
              ? orderData.map((order) => (
                <div className="row m-auto" key={order._id}>
                  {/* Cart Item */}
                  <div className="row">
                    <div className="col-md-6">
                      <p className="text_light m-auto">Day of Booking:</p>
                      <p className="text_light m-auto">
                        <Moment format="Do MMMM YYYY">{order?.createdAt}</Moment>
                      </p>
                    </div>
                    <div className="col-md-6">
                      <p className="text_light m-auto">Booking ID:</p>
                      <p className="text_light m-auto">{order?.OrderID}</p>
                    </div>
                  </div>
                  <div className="row mt-5">
                    <div className="col-md-4">
                      <img
                        src={`https://api.healinggarden.co.in/Product/${order?.OrderDetails?.item?.WorkshopImages?.[0]}`}
                        className="row"
                        style={{ borderRadius: "15px" }}
                        width={250}
                        alt=""
                      />
                    </div>
                    <div className="col-md-8">
                      <p>
                        <span className="textbold">Workshop/Item : </span>
                        <span className="textbold">
                          {order?.OrderDetails?.item?.workshopTitle}{" "}
                          {order?.OrderDetails?.item?.sessionAddress}
                        </span>
                      </p>

                      <p className="text_light">
                        <Moment format="ddd, Do MMMM YYYY | hh:mm A">
                          {order?.OrderDetails?.SelectedDate}
                        </Moment>{" "}
                        -{" "}
                        <Moment
                          add={{ minutes: order?.OrderDetails?.duration }}
                          format="hh:mm A"
                        >
                          {order?.OrderDetails?.startTime}
                        </Moment>
                      </p>
                      <div>
                        <p className="textbold m-auto">Ticket-{orderData.length + 1}: </p>
                        <span className="textbold">
                          Total Amount - Rs.{" "}
                          {order?.OrderDetails?.item?.OfferPrice} (Including taxes)
                        </span>
                      </div>
                    </div>
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
                            PRESTIGE SHANTINIKETAN, ITPL Main Rd, Thigalarapalya, Whitefield, Bengaluru, Karnataka 560048
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>
              ))
              : orderHistory.map((order) => (
                <div className="row m-auto" key={order._id}>
                  {/* Order History Item */}
                  <div className="row">
                    <div className="col-md-6">
                      <p className="text_light m-auto">Day of Booking:</p>
                      <p className="text_light m-auto">
                        <Moment format="Do MMMM YYYY">{order?.createdAt}</Moment>
                      </p>
                    </div>
                    <div className="col-md-6">
                      <p className="text_light m-auto">Booking ID:</p>
                      <p className="text_light m-auto">{order?.OrderID}</p>
                    </div>
                  </div>
                  <div className="row mt-5">
                    <div className="col-md-4">
                      <img
                        src={`https://api.healinggarden.co.in/Product/${order?.OrderDetails?.item?.WorkshopImages?.[0]}`}
                        className="row"
                        style={{ borderRadius: "15px" }}
                        width={250}
                        alt=""
                      />
                    </div>
                    <div className="col-md-8">
                      <p>
                        <span className="textbold">Workshop/Session : </span>
                        <span className="textbold">
                          {order?.OrderDetails?.item?.workshopTitle}{" "}
                          {order?.OrderDetails?.item?.sessionAddress}
                        </span>
                      </p>
                      <p className="text_light">
                        <Moment format="ddd, Do MMMM YYYY | hh:mm A">
                          {order?.OrderDetails?.SelectedDate}
                        </Moment>{" "}
                        -{" "}
                        <Moment
                          add={{ minutes: order?.OrderDetails?.duration }}
                          format="hh:mm A"
                        >
                          {order?.OrderDetails?.startTime}
                        </Moment>
                      </p>
                      <div>
                        <p className="textbold m-auto">Ticket-{orderData?.length + 1} : </p>
                        <span className="textbold">
                          Total Amount - Rs.{" "}
                          {order?.OrderDetails?.item?.OfferPrice} (Including taxes)
                        </span>
                      </div>
                    </div>
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
                            PRESTIGE SHANTINIKETAN, ITPL Main Rd, Thigalarapalya, Whitefield, Bengaluru, Karnataka 560048
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>
              ))}
          </div>
        </div>

        <div className="col-md-4">
          <Card className="cart-summary-card">
            <Card.Header className="cart-summary-header">
              <h5>Total for Today’s Cart</h5>
            </Card.Header>
            <Card.Body className="cart-summary-body">
              <div className="cart-summary-item">
                <span className="cart-summary-label">Subtotal:</span>
                <span className="cart-summary-value">₹{totalAmount.toFixed(2)}</span>
              </div>
              <div className="cart-summary-item">
                <span className="cart-summary-label">Discount:</span>
                <span className="cart-summary-value">₹{discount.toFixed(2)}</span>
              </div>
              <div className="cart-summary-item">
                <span className="cart-summary-label">Total Amount:</span>
                <span className="cart-summary-value">₹{subtotal.toFixed(2)}</span>
              </div>
              <hr />
              <div className="row">
                <button variant="primary" className="col-md-7 p-2 submt m-auto" onClick={handleCheckout}>
                  Checkout
                </button>
              </div>
            </Card.Body>
          </Card>

        </div>
      </div>
      <Footer />
    </>
  );
}
