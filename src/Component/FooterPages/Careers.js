import { TfiEmail } from "react-icons/tfi";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { Helmet } from "react-helmet";
import Mobileheader from "../Layout/Mobileheader";
import Mobilefooter from "../Layout/Mobilefooter";
export default function Careers() {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/919620520200", "_blank");
  };
  return (
    <>
      <Helmet>
        <title>
          Full-time & Part-Time Job & Internship openings | Healing Garden India
        </title>
        <meta
          name="description"
          content="Explore full-time, part-time, and internship opportunities at Healing Garden India. Work remotely/online or from our office. Openings in Bangalore. Discover your career with us."
        />
        <meta
          name="keywords"
          content="career opportunities, job openings, internships, part-time jobs, full-time jobs, healing garden"
        />
        <meta
          property="og:title"
          content="Full-time & Part-Time Job & Internship openings | Healing Garden India"
        />
        <meta
          property="og:description"
          content="Explore full-time, part-time, and internship opportunities at Healing Garden India. Work remotely/online or from our office. Openings in Bangalore. Discover your career with us."
        />
        <meta property="og:image" content="URL-to-your-image" />
        <link rel="canonical" href="http://www.healinggarden.co.in/career" />
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
              <a className="headertext poppins-regular" href="/careers">
                {" "}
                Careers
              </a>
            </li>
          </div>
        </div>
      </div>
      <div className="row m-auto p-2 ">
        <p
          className="about-us poppins-regular"
          style={{ fontSize: "17px", fontWeight: "bold" }}
        >
          Careers
        </p>
      </div>
      <img
        className="d-block w-100 PositionR"
        height="100%"
        src="../clients/team/career.png"
        alt="banner"
      />
      <div className="container">
        <div className="row">
          <p
            className="poppins-regular mt-2"
            style={{ fontSize: "14px", color: "grey" }}
          >
            Career Opportunities
          </p>
        </div>

        <div className="row">
          <div
            className="poppins-regular"
            style={{ fontSize: "15px", fontWeight: "bold" }}
          >
            Social Media Intern
          </div>
          <div className="poppins-regular mt-2" style={{ fontSize: "14px" }}>
            Duration: 3 Months
          </div>
          <div className="poppins-regular mt-2" style={{ fontSize: "14px" }}>
            Location: Whitefield, Bangalore
          </div>
          <div className="poppins-regular mt-2" style={{ fontSize: "14px" }}>
            Mode: In-Person; 5 days work from office
          </div>
        </div>

        <div className="row">
          <div
            className="poppins-regular mt-3"
            style={{ fontSize: "15px", fontWeight: "bold" }}
          >
            Job Description
          </div>
          <li className="poppins-regular mt-2" style={{ fontSize: "14px" }}>
            Create posts & reels for social media channels like Instagram,
            YouTube, Pinterest etc
          </li>
          <li className="poppins-regular mt-2" style={{ fontSize: "14px" }}>
            Handle customer enquiries{" "}
          </li>
          <li className="poppins-regular mt-2" style={{ fontSize: "14px" }}>
            Take photos & videos during workshop / events
          </li>
          <li className="poppins-regular mt-2" style={{ fontSize: "14px" }}>
            Assist in workshop management
          </li>
        </div>

        <div className="row">
          <div
            className="poppins-regular mt-3"
            style={{ fontSize: "15px", fontWeight: "bold" }}
          >
            Requirement{" "}
          </div>
          <li className="poppins-regular mt-2" style={{ fontSize: "14px" }}>
            Must have good design skills and competency on tool like canva.
          </li>
          <li className="poppins-regular mt-2" style={{ fontSize: "14px" }}>
            Understanding of the strategies and best practices needed to
            effectively manage and expand social media presence.{" "}
          </li>
        </div>

        <div className="row">
          <div
            className="poppins-regular mt-3"
            style={{ fontSize: "15px", fontWeight: "bold" }}
          >
            Contact Us
          </div>
          <div className="poppins-regular mt-2" style={{ fontSize: "14px" }}>
            WhatsApp or email us your resume if you find yourself relevant for
            the above listed opportunity.{" "}
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-4">
            <div className="d-flex mb-3">
              <div className="col-md-1">
                <TfiEmail className="fs_15 m-auto" />
              </div>
              <div className="col-md-8 mx-3">
                <p className="sub_heading m-auto">
                  HealingGarden4All@gmaill.com
                </p>
              </div>
            </div>
            <div className="d-flex">
              <div className="col-md-1">
                <img
                  width={30}
                  className="m-auto"
                  onClick={handleWhatsAppClick}
                  src="../photos/icons8-whatsapp-48.png"
                  alt="WhatsApp"
                />
              </div>
              <div className="col-md-8 mx-3">
                <p className="sub_heading m-auto">+91 96205 20200</p>
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
