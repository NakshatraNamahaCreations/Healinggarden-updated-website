import React from "react";
import { useNavigate } from "react-router-dom";

function PaymentSuccess() {
  const navigate = useNavigate();

  const goToHomePage = () => {
    navigate("/"); // Adjust the path to your home page route
  };

  return (
    <div
      className="container text-center d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="card shadow-lg p-5" style={{ maxWidth: "500px" }}>
        <div className="mb-4">
          <img
            src="./photos/paymentSuccess.jpg"
            width="130"
            height="130"
            fill="green"
            className="bi bi-check-circle"
            viewBox="0 0 16 16"
          />
        </div>
        <h2 className="mb-3">Payment Successful!</h2>
        <p className="lead">
          Thank you for your purchase! Your payment was successful and your
          order is being processed.
        </p>
        <button
          className="btn btn-primary mt-4"
          onClick={goToHomePage}
          style={{ padding: "10px 20px", fontSize: "1rem" }}
        >
          Go Back to Home Page
        </button>
      </div>
    </div>
  );
}

export default PaymentSuccess;
