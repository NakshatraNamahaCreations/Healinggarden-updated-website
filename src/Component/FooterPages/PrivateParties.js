import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { Helmet } from "react-helmet";

import { TfiEmail } from "react-icons/tfi";
import Mobileheader from "../Layout/Mobileheader";
import Mobilefooter from "../Layout/Mobilefooter";
export default function PrivateParties() {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/919620520200", "_blank");
  };
  return (
    <>
      <Helmet>
        <title>
          Workshops in Private Parties & Gatherings | Healing Garden India
        </title>
        <meta
          name="description"
          content="We organize creative workshops for private events such as children's birthday parties, special occasions like festivals, baby showers, weddings, & anniversaries."
        />
        <meta
          name="keywords"
          content="private parties, creative workshops, children's birthday parties, festivals, baby showers, weddings, anniversaries"
        />
        <meta
          property="og:title"
          content="Workshops in Private Parties & Gatherings | Healing Garden India"
        />
        <meta
          property="og:description"
          content="We organize creative workshops for private events such as children's birthday parties, special occasions like festivals, baby showers, weddings, & anniversaries."
        />
        {/* <meta 
          property="og:image" 
          content="URL-to-your-image" // Update this to an appropriate image URL related to your private parties
        /> */}
        <link
          rel="canonical"
          href="http://www.healinggarden.co.in/private-parties"
        />
      </Helmet>
      <Header />
      <Mobileheader />

      <div className="categoryview m-auto row">
        <hr className="row hr-line" style={{ borderColor: "white" }}></hr>
        <div className="row m-auto ">
          <div className="d-flex p-3 ">
            <li className="headertext">
              <a className="headertext poppins-regular me-1" href="/">
                Home
              </a>
            </li>
            <li className="headertext me-1"> {">"} </li>
            <li className="headertext">
              <a className="headertext poppins-regular" href="/private-parties">
                {" "}
                Private Parties
              </a>
            </li>
          </div>
        </div>
      </div>

      <div className="row m-auto p-2 ">
        <p
          className="about-us poppins-regular mt-2"
          style={{ fontSize: "17px", fontWeight: "bold" }}
        >
          Private Parties
        </p>
      </div>
      <div className="col-md-12 ">
        <img
          className="d-block w-100 PositionR"
          height="100%"
          src="../clients/team/party.png"
          alt="banner"
        />
      </div>
      <div className="container">
        <div className="row">
          <div className="poppins-regular mt-3" style={{ fontSize: "15px" }}>
            Transform Your Private Party with Our Unique Workshops & Bulk
            Gifting!
          </div>
        </div>

        <div className="row m-auto">
          <div className="col-md-6 m-auto">
            <div className="row mt-4">
              <img
                className="col-md-4 m-auto p-image"
                src="./Party/party (6).png"
              />
              <img
                className="col-md-4 m-auto p-image"
                src="./Party/party (10).png"
              />
            </div>
            <div className="row mt-3">
              <img
                className="col-md-4 m-auto p-image"
                src="./Party/party (7).png"
              />
              <img
                className="col-md-4 m-auto p-image"
                src="./Party/party (4).png"
              />
            </div>
          </div>
          <div className="col-md-6 m-auto">
            <p className="poppins-regular mt-3" style={{ fontSize: "14px" }}>
              Looking to add a special touch to your next private party? Our
              exclusive workshops are the perfect way to engage and entertain
              your guests while creating unforgettable memories. Whether it's a
              birthday celebration, bridal shower, or any special occasion, we
              offer a variety of hands-on experiences tailored to your event.
              From art and crafts, terrarium & fairy garden making to magic
              shows and wellness sessions, our expert instructors will guide
              your guests through fun and interactive activities. Book our
              workshops today and turn your private party into an extraordinary
              experience filled with creativity, learning, and laughter!
            </p>
          </div>
        </div>
        <div className="row m-auto mt-3">
          <img
            className="col-md-2 m-auto p-image"
            src="./Party/party (1).png"
          />
          <img
            className="col-md-2 m-auto p-image"
            src="./Party/party (3).png"
          />
          <img
            className="col-md-2 m-auto p-image"
            src="./Party/party (5).png"
          />
        </div>
        <div className="row m-auto mt-3">
          <img
            className="col-md-2 m-auto p-image"
            src="./Party/party (2).png"
          />
          <img
            className="col-md-2 m-auto p-image"
            src="./Party/party (8).png"
          />
          <img
            className="col-md-2 m-auto p-image"
            src="./Party/party (9).png"
          />
        </div>

        <div className="row m-auto text-center mt-5">
          <a
            href="https://www.healinggarden.co.in/categorylist"
            className="m-auto"
          >
            <button
              style={{ fontSize: "14px" }}
              className="poppins-regular col-md-4 p-3 m-auto request-corporat"
            >
              Check Out Workshop Categories
            </button>
          </a>
        </div>
        <div className="row">
          <div
            className="poppins-regular mt-3"
            style={{ fontSize: "17px", fontWeight: "bold" }}
          >
            Contact Us
          </div>
          <div className="poppins-regular mt-2" style={{ fontSize: "14px" }}>
            Contact us to create customized workshops & bulk gifting for your
            private parties. We are happy to curate the program based on your
            requirements.
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-md-4">
            <div className="d-flex mb-3">
              <div className="col-md-1">
                <TfiEmail className="fs_15 " />
              </div>
              <div
                className="col-md-8 mx-1 d-flex"
                style={{ alignItems: "center" }}
              >
                <p className="sub_sub_heading m-auto poppins-regular">
                  HealingGarden4All@gmaill.com
                </p>
              </div>
            </div>
            <div className="d-flex mb-3">
              <div className="col-md-1">
                <img
                  width={30}
                  className=""
                  onClick={handleWhatsAppClick}
                  src="../photos/icons8-whatsapp-48.png"
                  alt="WhatsApp"
                />
              </div>
              <div
                className="col-md-8 mx-1 d-flex"
                style={{ justifyContent: "center" }}
              >
                <p className="sub_sub_heading m-auto poppins-regular">
                  +91 96205 20200
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-8"></div>
        </div>
      </div>
      <Footer />
      <Mobilefooter />
    </>
  );
}
