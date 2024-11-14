import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { Helmet } from "react-helmet";
import Mobileheader from "../Layout/Mobileheader";
import Mobilefooter from "../Layout/Mobilefooter";

export default function CancellationAndRefund() {
  return (
    <>
      {" "}
      <Helmet>
        <title>Cancellation & Refund Policy | Healing Garden India</title>
        <meta
          name="description"
          content="Please check our cancellation & refund policy for each end-user and corporate service."
        />
        <meta
          name="keywords"
          content="cancellation policy, refund policy, healing garden"
        />
        <meta
          property="og:title"
          content="Cancellation & Refund Policy | Healing Garden India"
        />
        <meta
          property="og:description"
          content="Please check our cancellation & refund policy for each end-user and corporate service."
        />
        <meta property="og:image" content="URL-to-your-image" />
        <link
          rel="canonical"
          href="http://www.healinggarden.co.in/cancellation-and-refund-policy"
        />
      </Helmet>
      <Header />
      <Mobileheader />
      <div className="categoryview m-auto row">
        <hr className="row hr-line" style={{ borderColor: "white" }}></hr>
        <div className="row m-auto ">
          <div className="d-flex p-3 ">
            <li className="headertext">
              <a className="poppins-regular headertext me-1" href="/">
                Home
              </a>
            </li>
            <li className="headertext me-1"> {">"} </li>
            <li className="headertext">
              <a className="poppins-regular headertext" href="/refund">
                {" "}
                Refund and Cancellation Policy
              </a>
            </li>
          </div>
        </div>
      </div>
      <div className="container  m-auto p-4">
        <div className="row text-center">
          <div
            className="m-auto poppins-regular  mb-3 mt-3"
            style={{ fontSize: "17px", fontWeight: "bold" }}
          >
            Shipping & Return Policy
          </div>
        </div>
        <div
          className="m-auto poppins-regular  mb-3 mt-3"
          style={{ fontSize: "17px", fontWeight: "bold" }}
        >
          Shipping Policy
        </div>
        <p className="poppins-regular" style={{ fontSize: "14px" }}>
          Orders are shipped via registered domestic courier companies or speed
          post only. Shipments are dispatched within 5 working days from the
          order/payment date or as per the agreed delivery date at the time of
          order confirmation. Delivery timelines are subject to courier
          company/postal authority norms. The Platform Owner is not responsible
          for delays caused by courier companies or postal authorities. All
          orders will be delivered to the address provided by the buyer during
          purchase. Shipping costs, if any, imposed by the seller or Platform
          Owner are non-refundable.
        </p>

        <div
          className="m-auto poppins-regular  mb-3 mt-3"
          style={{ fontSize: "17px", fontWeight: "bold" }}
        >
          Refund and Cancellation Policy
        </div>
        <p className="poppins-regular" style={{ fontSize: "14px" }}>
          Our refund and cancellation policy details how you can manage
          cancellations or refunds for products/services purchased through the
          Platform. Here are the guidelines:
        </p>

        <ul>
          <div
            className="poppins-regular"
            style={{ fontSize: "15px", fontWeight: "bold" }}
          >
            1. Cancellation Policy:
          </div>
          <ul>
            <li className="poppins-regular" style={{ fontSize: "14px" }}>
              {" "}
              <strong>Perishable Items:</strong> We do not accept cancellation
              requests for perishable items such as flowers and edibles, or for
              workshop tickets once purchased. However, if the product delivered
              is of unsatisfactory quality, a replacement can be arranged upon
              verification.
            </li>
            <li className="poppins-regular" style={{ fontSize: "14px" }}>
              {" "}
              <strong>Non-perishable items :</strong>such as glass containers
              and planters, cancellations are not assured. You may request
              cancellation by calling 96205 20200 on the same day the order is
              placed, and we will consider processing your request.
            </li>
            <li className="poppins-regular" style={{ fontSize: "14px" }}>
              {" "}
              <strong>Workshop tickets:</strong> Once a workshop ticket is
              purchased, it cannot be canceled, exchanged, or rescheduled to
              another date.
            </li>
          </ul>
          <div
            className="poppins-regular"
            style={{ fontSize: "15px", fontWeight: "bold" }}
          >
            2. Damaged or Defective Items:
          </div>
          <ul>
            <li className="poppins-regular" style={{ fontSize: "14px" }}>
              If you receive damaged or defective items, please contact our
              customer service team immediately. Requests will be processed
              after verification by the seller/merchant. For perishable items
              like plants, please report issues on the same day of delivery; for
              non-perishable products, within 48 hours. Our customer service
              team will assess your complaint and make a suitable decision.
            </li>
          </ul>

          <div
            className="poppins-regular"
            style={{ fontSize: "15px", fontWeight: "bold" }}
          >
            3. Refunds:{" "}
          </div>
          <ul>
            <li className="poppins-regular" style={{ fontSize: "14px" }}>
              Approved refunds by HEALING GARDEN will be processed within 7
              days.
            </li>
          </ul>
        </ul>

        <div
          className="poppins-regular mt-3"
          style={{ fontSize: "15px", fontWeight: "bold" }}
        >
          Return Policy
        </div>
        <div className="poppins-regular mt-1" style={{ fontSize: "14px" }}>
          We only offer replacements for damaged products; returns or refunds
          are not available.
        </div>
        {/* <p>
          <strong>Refunds</strong>
        </p>{" "}
        <p className="refund-text">
          Approved refunds by HEALING GARDEN will be processed within 7 days.
        </p> */}
        {/* <strong>Shipping Policy</strong>
        <p className="refund-text">
          Orders are shipped via registered domestic courier companies or speed
          post only. Shipments are dispatched within 5 days from the
          order/payment date or as per the agreed delivery date at the time of
          order confirmation. Delivery timelines are subject to courier
          company/postal authority norms. The Platform Owner is not responsible
          for delays caused by courier companies or postal authorities. All
          orders will be delivered to the address provided by the buyer during
          purchase. Shipping costs, if any, imposed by the seller or Platform
          Owner are non-refundable.
        </p> */}
      </div>
      <Footer />
      <Mobilefooter />
    </>
  );
}
