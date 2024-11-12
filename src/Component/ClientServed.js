import React, { useEffect } from "react";
import { Clients } from "./data";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import { Helmet } from "react-helmet";
import Mobileheader from "./Layout/Mobileheader";
import Mobilefooter from "./Layout/Mobilefooter";

export default function ClientServed() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Helmet>
        <title>
          Clients served through corporate workshops | Healing Garden India
        </title>
        <meta
          name="description"
          content="Checkout our valued corporate clients whom we’ve been serving through our corporate workshops and corporate gifting services."
        />
        <meta
          name="keywords"
          content="corporate clients, corporate workshops, corporate gifting services"
        />
        <meta
          property="og:title"
          content="Clients served through corporate workshops | Healing Garden India"
        />
        <meta
          property="og:description"
          content="Checkout our valued corporate clients whom we’ve been serving through our corporate workshops and corporate gifting services."
        />
        <meta property="og:image" content="URL-to-your-image" />
        <link
          rel="canonical"
          href="hhttp://www.healinggarden.co.in/clients-served"
        />
      </Helmet>

      <Header />
      <Mobileheader />
      <div className="categoryview m-auto row">
        <hr className="row hr-line" style={{ borderColor: "white" }}></hr>
        <p className="p-1 poppins-regular"> Home {">"} Clients</p>
      </div>
      <div className="row m-auto p-2 ">
        <p
          className="about-us poppins-regular"
          style={{ fontSize: "17px", fontWeight: "bold" }}
        >
          Clients Served
        </p>
      </div>
      <div className="row " style={{ justifyContent: "center" }}>
        {Clients?.map((Ele) => {
          return (
            <div className="col-md-4">
              <div className="d-flex" style={{ justifyContent: "center" }}>
                <img
                  className="m-auto mt-5 "
                  width={`${Ele.type === "ge2" ? "80" : "200"}`}
                  src={Ele.logo}
                />
              </div>
            </div>
          );
        })}{" "}
      </div>
      <div className="row m-auto seo mt-3">
        <p className="sub_sub_heading p-3 m-auto text-white">
          Checkout our valued clients whom we've been serving through our
          corporate workshops and corporate gifting services. We are grateful
          for the trust they've placed in us and are committed to enhancing our
          services for them in the future, ensuring long-term satisfaction.
        </p>
      </div>

      <Footer />
      <Mobilefooter />
    </>
  );
}
