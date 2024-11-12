import React, { useState } from "react";
import { SiWhatsapp } from "react-icons/si";
import { BsFacebook } from "react-icons/bs";
import { SlSocialInstagram } from "react-icons/sl";
import { IoLogoYoutube } from "react-icons/io5";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { IoIosCall } from "react-icons/io";
import { TfiEmail } from "react-icons/tfi";
import { BiSolidCopyright } from "react-icons/bi";
import { useLocation } from "react-router-dom";
import RequestProposal from "../Request";

function Mobilefooter() {
  let location = useLocation();
  let hideSeoForAbout = false;

  if (location.pathname === "/about") {
    hideSeoForAbout = true;
  }
  if (location.pathname === "/terms") {
    hideSeoForAbout = true;
  }

  if (location.pathname === "/privacy") {
    hideSeoForAbout = true;
  }
  if (location.pathname === "/refund") {
    hideSeoForAbout = true;
  }
  if (location.pathname === "/cart") {
    hideSeoForAbout = true;
  }
  const [Proposal, setProposal] = useState(false);
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/919620520200", "_blank");
  };
  return (
    <div
      className="row mobile_footer"
      style={{ backgroundColor: "#1c4935", padding: "15px" }}
    >
      <img
        className=""
        src="../workshop/HealingGardenLogo.png"
        alt="Healing Garden Logo"
        style={{ width: "150px", height: "100px" }}
      />
      <div
        className="poppins-regular pt-2"
        style={{ color: "white", fontSize: "14px" }}
      >
        Reconnect With Yourself
      </div>

      <div className="row mt-2">
        <button
          className="col-10 col-md-9 join-btn p-2"
          onClick={handleWhatsAppClick}
        >
          <SiWhatsapp className="fs-3 me-2" />
          <span className="poppins-regular join-btn1">
            Join Our WhatsApp Channel
          </span>
        </button>
      </div>

      <div className="row mt-3">
        <a
          className="col-2 co-md-2 footer_icons footertext"
          href="https://www.facebook.com/HealingGardenForAll/photos/a.623622438104057/782822768850689/?type=3&_rdr"
        >
          <BsFacebook style={{ fontSize: "30px" }} />
        </a>
        <a
          className="col-2 co-md-2 footer_icons footertext"
          href="https://www.instagram.com/healinggardenindia/"
        >
          <SlSocialInstagram style={{ fontSize: "30px" }} />
        </a>
        <a
          className="col-2 co-md-2 footer_icons footertext"
          href="https://www.youtube.com/@HealingGardenIndia"
        >
          <IoLogoYoutube style={{ fontSize: "30px" }} />
        </a>
      </div>

      <div className="row mt-3">
        <div className="col-6">
          <p className="footertext">
            <a href="/" className="poppins-regular  footertext">
              Home
            </a>
          </p>
          <p className="footertext">
            <a href="/about" className="poppins-regular footertext">
              About Us
            </a>
          </p>
          <p className="footertext">
            <a href="/categorylist" className="poppins-regular footertext">
              Workshops Categories
            </a>
          </p>

          <p className="footertext">
            <a href="/gallery" className="poppins-regular footertext">
              Gallery
            </a>
          </p>
          <p className="footertext">
            <a href="/private-parties" className="poppins-regular footertext">
              Private Parties
            </a>
          </p>
          <p className="footertext">
            <a href="/individual" className="poppins-regular footertext">
              For Individuals
            </a>
          </p>
        </div>

        <div className="col-6">
          <p className="footertext">
            <a href="/client-served" className="poppins-regular footertext">
              Clients Served
            </a>
          </p>
          <p className="footertext">
            <a href="/testimonials" className="poppins-regular footertext">
              Testimonials
            </a>
          </p>
          <p className="footertext">
            <a href="/careers" className="poppins-regular footertext">
              Career
            </a>
          </p>
          <p className="footertext">
            <a href="/volunteer" className="poppins-regular footertext">
              Volunteer
            </a>
          </p>
          <p className="footertext">
            <a href="/blog" className="poppins-regular footertext">
              Blog
            </a>
          </p>

          <p className="footertext">
            <a href="/contact-us" className="poppins-regular footertext">
              Contact Us
            </a>
          </p>
        </div>
      </div>

      <div
        className="d-flex"
        style={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <a href="https://www.google.com/maps/place/Healing+Garden/@12.9915495,77.7278772,15z/data=!4m6!3m5!1s0x3bae11e0928abc31:0x26cb377d91920b6c!8m2!3d12.9915495!4d77.7278772!16s%2Fg%2F11svm994sb?entry=tts&g_ep=EgoyMDI0MDcwMS4wKgBIAVAD">
          <img
            className="img-fluid"
            src="../workshop/logo.png"
            alt="Logo"
            style={{ width: "100px", height: "100px" }}
          />
        </a>
        <div className=" footer-proposal " onClick={() => setProposal(true)}>
          <span
            className="footer-proposal1 me-2"
            style={{ color: "white", fontSize: "15px" }}
          >
            Request A Proposal
          </span>
          <MdOutlineKeyboardDoubleArrowRight className="skipp p-2" />
        </div>
      </div>

      <div className="row mt-3">
        <IoIosCall className="col-2 fs-3" style={{ color: "white" }} />
        <span className="col-10 footertext poppins-regular">9620520200</span>
      </div>
      <div className="row mt-3">
        <TfiEmail className="col-2 fs-3" style={{ color: "white" }} />
        <span className="col-10 footertext poppins-regular">
          Support@Healinggarden.co.in
        </span>
      </div>

      <div className="col-12">
        <hr className="mt-5" />
        <div className="row text-white ">
          <div className="col-md-10 ">
            {" "}
            <div className=" d-flex ">
              <li className="list linktext m-auto">
                <a
                  href="/terms-and-conditions"
                  className="poppins-regular anchortext"
                >
                  Terms & Condition
                </a>{" "}
              </li>
              <li className="list linktext me-1">|</li>
              <li className="list linktext m-auto">
                <a
                  className="poppins-regular anchortext"
                  href="/privacy-policy"
                >
                  Privacy Policy
                </a>
              </li>
              <li className="list linktext  me-1">|</li>
              <li className="list linktext m-auto">
                <a
                  className="anchortext poppins-regular"
                  href="/cancellation-and-refund-policy"
                >
                  Cancellation & Refund
                </a>
              </li>
              <li className="list linktext  me-1">|</li>
              <li className="list linktext m-auto">
                {" "}
                <BiSolidCopyright className="me-1 m-auto linktext" />
                <span className="m-auto linktext poppins-regular">
                  Healing Garden 2024 Developed by Nakshatra Namaha Creations
                </span>
              </li>
            </div>
          </div>
          <div className="col-md-3">
            <img
              width={30}
              height={30}
              className="stikylogo"
              src="../workshop/whatslogo.png"
            />
          </div>
        </div>
        <div className="row text-white p-2">
          <div className="col-12 text-end">
            <img
              width={50}
              height={50}
              className="stikylogo"
              src="../workshop/whatslogo.png"
              alt="Whatsapp Logo"
              onClick={handleWhatsAppClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mobilefooter;
