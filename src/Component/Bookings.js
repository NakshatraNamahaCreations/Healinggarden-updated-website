import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Container, Alert, Spinner } from "react-bootstrap";
import Header from "./Layout/Header";

function Bookings() {
  const userData = JSON.parse(localStorage.getItem("HGuserdata"));
  const [data, setdata] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userData) return;
    getMyBookings();
  }, [userData]);

  const getMyBookings = async () => {
    try {
      let res = await axios.get(
        "https://api.healinggarden.co.in/api/order/getorderbyuser/" +
          userData?._id
      );
      if (res.status === 200) {
        setdata(res.data?.data);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <Container className="mt-5">
        <h2 className="text-center mb-4">My Bookings</h2>

        {/* Show spinner while loading data */}
        {loading ? (
          <div className="d-flex justify-content-center">
            <Spinner animation="border" />
          </div>
        ) : data.length === 0 ? (
          // Show alert if no bookings are available
          <Alert variant="warning" className="text-center">
            No bookings available.
          </Alert>
        ) : (
          // Display booking data in a table format
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Workshop Title</th>
                <th>Date</th>
                <th>Time</th>
                <th>Duration (mins)</th>
                <th>Amount</th>
                <th>Payment Status</th>
                <th>Payment Method</th>
              </tr>
            </thead>
            <tbody>
              {data.map((booking, index) => (
                <tr key={booking._id}>
                  <td>{index + 1}</td>
                  <td>{booking.OrderDetails?.items[0]?.title || "N/A"}</td>
                  <td>
                    {booking.OrderDetails?.items[0]?.Workshodate || "N/A"}
                  </td>
                  <td>
                    {booking.OrderDetails?.items[0]?.startTime || "N/A"} -{" "}
                    {booking.OrderDetails?.items[0]?.endTime || "N/A"}
                  </td>
                  <td>{booking.OrderDetails?.items[0]?.duration || "N/A"}</td>
                  <td>₹{booking.amount || "N/A"}</td>
                  <td>{booking.paymentStatus || "N/A"}</td>
                  <td>{booking.paymentMethod || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </>
  );
}

export default Bookings;
