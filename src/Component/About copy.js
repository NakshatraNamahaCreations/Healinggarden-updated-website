import React, { useEffect, useState } from "react";
import { TeamMembers } from "./data";
import { IoIosCall } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import { Helmet } from "react-helmet";
import Mobileheader from "./Layout/Mobileheader";
import Mobilefooter from "./Layout/Mobilefooter";

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          About Us - Healing Garden India | Employee Engagement Workshops
        </title>
        <meta
          name="description"
          content="About Us - Employee engagement workshops, corporate wellness day, family day, healing sessions, terrarium making workshops, pottery, art& craft, life-coaching"
        />
        <meta
          name="keywords"
          content="employee engagement workshops, corporate wellness day, family day, healing sessions, terrarium making workshops, pottery, art & craft, life-coaching"
        />
        <meta name="author" content="Your Name" />
        <meta
          property="og:title"
          content="About Us - Healing Garden India | Employee Engagement Workshops"
        />
        <meta
          property="og:description"
          content="About Us - Employee engagement workshops, corporate wellness day, family day, healing sessions, terrarium making workshops, pottery, art& craft, life-coaching"
        />
        <meta
          property="og:url"
          content="http://www.healinggarden.co.in/about"
        />
        <meta property="og:image" content="URL_TO_IMAGE" />
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
              <a className="headertext poppins-regular" href="/about">
                {" "}
                About Us
              </a>
            </li>
          </div>
        </div>
      </div>
      <div className="row m-auto p-2 ">
        <div
          className="about-us poppins-regular"
          style={{ fontSize: "17px", fontWeight: "bold" }}
        >
          About Us
        </div>
      </div>

      <div className="web-about">
        <div className="row m-auto aboubanner text-center">
          <div className="row m-auto">
            <p className="col-md-5 m-auto main_heading fs_40 text-white">
              ABOUT US
            </p>
            <div className="row m-auto">
              <p className="col-md-10 m-auto sub_heading ">
                {" "}
                We are dedicated to enhancing mental & social wellness of
                individuals and corporates
              </p>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row mt-5 p-4 m-auto PositionR">
            <div className="col-md-5 col-12 m-auto PositionR">
              <img src="./workshop/abot4.png" className="aboutImg" alt="" />
              <img
                className="about-grap"
                alt=""
                src="./workshop/HG asset 1.png"
              />

              <img
                className="about_svg3"
                src="../photos/icons (16).png"
                alt=""
              />
              <img
                className="about_svg4herat"
                src="../photos/icons (15).png"
                alt=""
              />
            </div>

            <div className="col-md-2 d-none d-md-block">
              <img className="about_svg1" src="../workshop/img5.svg" alt="" />
            </div>

            <div className="col-md-5 col-12 m-auto ">
              <p className="main_heaidng">ABOUT US</p>

              <img
                className="about_svg2"
                src="../photos/icons (9).png"
                alt=""
              />

              <p className="sub_heading">
                Healing Garden is dedicated to enhancing mental &
                social-wellness through a diverse array of online & offline
                therapeutic experiences, counselling & healing sessions.
              </p>
              <p className="sub_heading">
                We have a network of 70+ artists , therapists and relevant
                service providers with whom we carefully curate activities in
                following broad categories:
              </p>
              <div className="d-flex mt-4">
                <div className="me-3 p-1 col-6 about-cate">
                  Nature & Gardening
                </div>
                <div className="p-1 col-6 about-cate">Art & Craft</div>
              </div>
              <div className="d-flex mt-4">
                <div className="col-md-6 me-2 col-6 p-1 about-cate">
                  Mindfulness & Healing{" "}
                </div>
                <div className="col-md-7 col-6  p-1 about-cate">
                  Curated Social Experiences{" "}
                </div>
              </div>
              <div className="d-flex mt-4">
                <div className="col-md-7 col-12 p-1 about-cate">
                  Life-Coaching & Counselling{" "}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row  m-auto about-us mt-5">
          <p className="main_heading text-center">WHAT WE DO</p>
          <div>
            <img
              className="about_svg4"
              width={160}
              height={160}
              src="../photos/icons (10).png"
            />
          </div>
          <div className="col-md-8 m-auto">
            <img
              src="./aboutimg/HG asset 2.png"
              width={900}
              // className="col-md-10 m-auto p-0"
              alt=""
            />
            <div>
              <img
                className="whatwedo"
                width={160}
                height={160}
                src="../photos/icons (12).png"
              />
            </div>
            <div>
              <img
                className="meet-svg1"
                width={200}
                height={200}
                src="../photos/icons (13).png"
              />
            </div>
          </div>
        </div>

        <div className="row mt-5 m-auto meet-founder ">
          <div className="row p-5 meet-founder-content PositionR">
            <div className="col-md-4 ">
              <div className="row text-center">
                <div>
                  <img
                    height={300}
                    width={300}
                    className=""
                    he
                    src="../aboutimg/team (6).png"
                  />
                </div>
                <p className="sub_heading text-white m-auto">Saloni Kumar</p>
                <p className="fs-5 m-auto text-white ">Founder</p>
              </div>

              <div className="row mt-3">
                <div className="col-md-2">
                  <IoIosCall className="icons" />
                </div>
                <p className="col-md-10 text_light">+91-9620520200</p>
              </div>
              <div className="row">
                <div className="col-md-2">
                  <IoIosMail className="icons" />
                </div>
                <p className="col-md-10 text_light">
                  Saloni@HealingGarden.co.in
                </p>
              </div>
              <div className="row">
                <div className="col-md-2">
                  <FaInstagram className="icons" />
                </div>
                <p className="col-md-10 text_light">HealingGardenIndia</p>
              </div>
              <div className="row">
                <div className="col-md-2">
                  <FaLinkedin className="icons" />
                </div>
                <p className="col-md-10 text_light">
                  {" "}
                  https://www.linkedin.com/in/saloni-k/
                </p>
              </div>
            </div>
            <div className="col-md-8">
              <div className="row ">
                <p className="main_heaidng text-white">MEET THE FOUNDER</p>
                <p className="sub_heading text-white">
                  Saloni, a nature enthusiast, initiated Healing Garden as a
                  therapeutic gardening endeavour, which organically evolved to
                  encompass additional realms of wellness, including art
                  therapy, sound healing, dance / movement therapy, life
                  coaching, and more.
                </p>
                <p className="sub_heading text-white">
                  {" "}
                  Saloni discovered her profound connection with plants in 2019
                  when she started crafting and nurturing terrariums, the
                  magical little ecosystems. Inspired by this newfound passion,
                  she delved into the field of horticultural therapy,
                  volunteering her time to work with children on the autism
                  spectrum disorder. Since then, her mission is to forge
                  connections between individuals and alternative therapies,
                  enabling them to derive benefits and experience healing from
                  within. Saloni has a background in software product management
                  for 12+ years.
                </p>
              </div>
              <img
                className="meet-svg2"
                width={200}
                height={200}
                src="../photos/icons (12).png"
              />
            </div>
          </div>
        </div>

        <div className="row mt-5 m-auto journy-so-far PositionR">
          <p className="main_heading text-center">JOURNEY SO FAR</p>
          <div className="col-md-4 m-auto">
            <img
              className="hg-image1"
              width={220}
              height={220}
              src="../aboutimg/HG asset 5.png"
              alt="HG asset 5"
            />
          </div>
          <div className="col-md-8 m-auto">
            <div className="d-flex justify-content-center">
              <ul className="timeline">
                <li className="event" data-date="Launched End-user Workshop">
                  <p className="row textbold">June 2023</p>
                </li>
                <li
                  className="event"
                  data-date="Expanded Workshop Categories from 1-6"
                >
                  <p className="row textbold">Jan 2024</p>
                </li>
                <li
                  className="event"
                  data-date="Launched Corporate Wellness Programs"
                >
                  <p className="row textbold">Feb 2024</p>
                </li>
                <li className="event" data-date="Cities Covered">
                  <p className="row textbold">Bangalore, Mumbai, Delhi</p>
                </li>
                <li className="event" data-date="Workshops Conducted">
                  <p className="textbold">55 - End-user</p>
                  <p className="textbold">15 - Corporates</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-4 m-auto">
            <img
              className="hg-image2"
              width={150}
              height={150}
              src="../aboutimg/HG asset 6.png"
              alt="HG asset 6"
            />
            <img
              className="hg-image3"
              width={150}
              height={150}
              src="../aboutimg/HG asset 4.png"
              alt="HG asset 4"
            />
            <img
              className="journey-svg1"
              width={200}
              height={200}
              src="../photos/icons.png"
            />
            <img
              className="journey-svg2"
              width={200}
              height={200}
              src="../photos/icons (9).png"
            />
            <img
              className="journey-svg3"
              width={150}
              height={150}
              src="../photos/icons (14).png"
            />
          </div>
        </div>

        <div className="row mt-5 m-auto journy-so-far PositionR">
          <p className="main_heading text-center">OUR APPROACH</p>
          <div className="row m-auto">
            <img
              // width={300}
              // height={300}
              src="../aboutimg/HG asset 3.png"
              alt="HG asset 3"
            />
          </div>
        </div>

        <div className="row m-auto  PositionR">
          <div>
            <img
              className="team-svg1"
              width={200}
              height={200}
              src="../photos/icons.png"
            />
          </div>
          <div className="col-md-11 m-auto PositionR">
            <div className="row m-auto team-main   text-center">
              <h3 className="inter mt-5 mb-5 m-auto">OUR TEAM</h3>
              {TeamMembers.map((Ele) => {
                return (
                  <div className="col-md-3  m-4 ">
                    <img className="object_img p-3" src={Ele.img} />
                    <p className="team-name m-0">{Ele.name}</p>
                    <p className="team-position m-0 ">{Ele.position}</p>
                  </div>
                );
              })}
            </div>
            <img
              className="team-svg2"
              width={200}
              height={200}
              src="../photos/icons (16).png"
            />
            <img
              className="team-svghear"
              width={120}
              height={120}
              src="../photos/icons (15).png"
            />
          </div>
        </div>

        <div className="row m-auto  PositionR">
          <img
            className="team-svg1"
            width={100}
            height={100}
            src="../workshop/img5.svg"
          />
          <div className="col-md-10 m-auto PositionR">
            <div>
              <img
                className="team-svg5"
                width={160}
                height={160}
                src="../photos/icons (12).png"
              />
            </div>
            <div className="row m-auto">
              <h3 className="inter main_heading textbold mt-5 mb-5 text-center m-auto">
                LOCATION
              </h3>

              <div className="col-md-6">
                <div className="row">
                  <p className="sub_heading textbold">Address:</p>
                  <p className="sub_heading textbold">
                    Tower 2, PRESTIGE SHANTINIKETAN, ITPL Main Rd,
                    Thigalarapalya, Whitefield, Bengaluru, Karnataka 560048
                  </p>
                </div>
                <div className="row">
                  <p className="sub_heading textbold">Our Headquarter:</p>
                  <p className="sub_heading textbold">
                    Our head quarter is located in Whitefield, and Bangalore,
                    and we extend our services across Bangalore, Mumbai, Delhi
                    NCR and Hyderabad.
                  </p>
                </div>
              </div>

              <img
                className="col-md-4 m-auto"
                src="../photos/Address-bro.png"
              />
            </div>
            <img
              className="team-svg2"
              width={120}
              height={120}
              src="../photos/icons (9).png"
            />
          </div>
        </div>
      </div>
      <div className="mobile-about">
        <div className="row m-auto aboubanner text-center">
          <div className="row m-auto">
            <p
              className="col-md-5 poppins-regular m-auto  fs_40 text-white"
              style={{ fontSize: "18px" }}
            >
              ABOUT US
            </p>
            <div className="row m-auto">
              <p
                className="poppins-regular col-md-10 m-auto  mt-2"
                style={{ fontSize: "14px" }}
              >
                {" "}
                We are dedicated to enhancing mental & social wellness of
                individuals and corporates
              </p>
            </div>
          </div>
        </div>

        <div className="row mt-5 p-4 m-auto PositionR">
          <div className="col-md-5 col-12 m-auto PositionR">
            <img src="./workshop/abot4.png" className="aboutImg" alt="" />
            <img
              className="about-grap"
              alt=""
              src="./workshop/HG asset 1.png"
            />

            <img className="about_svg3" src="../photos/icons (16).png" alt="" />
            <img
              className="about_svg4herat"
              src="../photos/icons (15).png"
              alt=""
            />
          </div>

          <div className="col-md-2 d-none d-md-block">
            <img className="about_svg1" src="../workshop/img5.svg" alt="" />
          </div>

          <div className="col-md-5 col-12 m-auto ">
            <p
              className="poppins-regular mt-3"
              style={{ fontSize: "17px", fontWeight: "bold" }}
            >
              ABOUT US
            </p>

            <img className="about_svg2" src="../photos/icons (9).png" alt="" />

            <p className="poppins-regular" style={{ fontSize: "14px" }}>
              Healing Garden is dedicated to enhancing mental & social-wellness
              through a diverse array of online & offline therapeutic
              experiences, counselling & healing sessions.
            </p>
            <p className="poppins-regular" style={{ fontSize: "14px" }}>
              We have a network of 70+ artists , therapists and relevant service
              providers with whom we carefully curate activities in following
              broad categories:
            </p>
            <div className="d-flex mt-4">
              <div
                className="me-3 p-1 col-6 poppins-regular about-cate"
                style={{ fontSize: "11px" }}
              >
                Nature & Gardening
              </div>
              <div
                className="p-1 poppins-regular col-6 about-cate"
                style={{ fontSize: "11px" }}
              >
                Art & Craft
              </div>
            </div>
            <div className="d-flex mt-4">
              <div
                className="col-md-6 me-2 poppins-regular col-6 p-1 about-cate"
                style={{ fontSize: "11px" }}
              >
                Mindfulness & Healing{" "}
              </div>
              <div
                className="col-md-7 col-6 poppins-regular p-1 about-cate"
                style={{ fontSize: "11px" }}
              >
                Curated Social Experiences{" "}
              </div>
            </div>
            <div className="d-flex mt-4">
              <div
                className="col-md-7 poppins-regular col-12 p-1 about-cate"
                style={{ fontSize: "11px" }}
              >
                Life-Coaching & Counselling{" "}
              </div>
            </div>
          </div>
        </div>

        <div className="row  m-auto about-us mt-3">
          <p
            className="poppins-regular text-center"
            style={{ fontSize: "17px", fontWeight: "bold" }}
          >
            WHAT WE DO
          </p>

          <div className="col-md-8 m-auto">
            <img
              src="./aboutimg/HG asset 2.png"
              style={{ width: "100%" }}
              // className="col-md-10 m-auto p-0"
              alt=""
            />
          </div>
        </div>

        <div className="row mt-3 m-auto meet-founder ">
          <div className="row p-3 meet-founder-content PositionR">
            <div className="col-md-4 ">
              <div className="row text-center">
                <div>
                  <img
                    className=""
                    he
                    src="../aboutimg/team (6).png"
                    style={{ width: "150px", height: "150px" }}
                  />
                </div>
                <p className="poppins-regular pt-2 text-white m-auto">
                  Saloni Kumar
                </p>
                <p
                  className=" m-auto text-white poppins-regular pt-1"
                  style={{ fontSize: "13px" }}
                >
                  Founder
                </p>
              </div>

              <div className="row mt-3">
                <div className="col-md-2 col-2">
                  <IoIosCall className="icons" />
                </div>
                <p
                  className="col-md-10 col-10 poppins-regular text_light d-flex"
                  style={{ alignItems: "center" }}
                >
                  +91-9620520200
                </p>
              </div>
              <div className="row">
                <div className="col-md-2 col-2">
                  <IoIosMail className="icons" />
                </div>
                <p
                  className="col-md-10 col-10 text_light d-flex"
                  style={{ alignItems: "center" }}
                >
                  Saloni@HealingGarden.co.in
                </p>
              </div>
              <div className="row">
                <div className="col-md-2 col-2">
                  <FaInstagram className="icons" />
                </div>
                <p
                  className="col-md-10 col-10 text_light d-flex"
                  style={{ alignItems: "center" }}
                >
                  HealingGardenIndia
                </p>
              </div>
              <div className="row">
                <div className="col-md-2 col-2">
                  <FaLinkedin className="icons" />
                </div>
                <p
                  className="col-md-10 col-10 text_light d-flex"
                  style={{ alignItems: "center" }}
                >
                  {" "}
                  https://www.linkedin.com/in/saloni-k/
                </p>
              </div>
            </div>
            <div className="col-md-8">
              <div className="row ">
                <p className="poppins-regular text-white">MEET THE FOUNDER</p>
                <p className="poppins-regular text-white">
                  Saloni, a nature enthusiast, initiated Healing Garden as a
                  therapeutic gardening endeavour, which organically evolved to
                  encompass additional realms of wellness, including art
                  therapy, sound healing, dance / movement therapy, life
                  coaching, and more.
                </p>
                <p className="poppins-regular text-white">
                  {" "}
                  Saloni discovered her profound connection with plants in 2019
                  when she started crafting and nurturing terrariums, the
                  magical little ecosystems. Inspired by this newfound passion,
                  she delved into the field of horticultural therapy,
                  volunteering her time to work with children on the autism
                  spectrum disorder. Since then, her mission is to forge
                  connections between individuals and alternative therapies,
                  enabling them to derive benefits and experience healing from
                  within. Saloni has a background in software product management
                  for 12+ years.
                </p>
              </div>
              <img
                className="meet-svg2"
                width={200}
                height={200}
                src="../photos/icons (12).png"
              />
            </div>
          </div>
        </div>

        {/* <div className="row mt-3 m-auto journy-so-far PositionR">
          <p
            className="poppins-regular text-center"
            style={{ fontSize: "17px", fontWeight: "bold" }}
          >
            JOURNEY SO FAR
          </p>
          <div className="col-md-4 m-auto">
            <img
              className="hg-image1"
              // width={220}
              // height={220}
              src="../aboutimg/HG asset 5.png"
              alt="HG asset 5"
            />
          </div>
          <div className="col-md-8 m-auto">
            <div
              className="d-flex justify-content-center"
              style={{ width: "100%" }}
            >
              <ul className="timeline">
                <li className="event" data-date="Launched End-user Workshop">
                  <p className="row textbold">June 2023</p>
                </li>
                <li
                  className="event"
                  data-date="Expanded Workshop Categories from 1-6"
                >
                  <p className="row textbold">Jan 2024</p>
                </li>
                <li
                  className="event"
                  data-date="Launched Corporate Wellness Programs"
                >
                  <p className="row textbold">Feb 2024</p>
                </li>
                <li className="event" data-date="Cities Covered">
                  <p className="row textbold">Bangalore, Mumbai, Delhi</p>
                </li>
                <li className="event" data-date="Workshops Conducted">
                  <p className="textbold">55 - End-user</p>
                  <p className="textbold">15 - Corporates</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-4 m-auto">
            <img
              className="hg-image2"
              width={150}
              height={150}
              src="../aboutimg/HG asset 6.png"
              alt="HG asset 6"
            />
            <img
              className="hg-image3"
              width={150}
              height={150}
              src="../aboutimg/HG asset 4.png"
              alt="HG asset 4"
            />
            <img
              className="journey-svg1"
              width={200}
              height={200}
              src="../photos/icons.png"
            />
            <img
              className="journey-svg2"
              width={200}
              height={200}
              src="../photos/icons (9).png"
            />
            <img
              className="journey-svg3"
              width={150}
              height={150}
              src="../photos/icons (14).png"
            />
          </div>
        </div> */}

        <div className="row mt-3 m-auto journy-so-far PositionR">
          <p
            className="poppins-regular text-center"
            style={{ fontSize: "17px", fontWeight: "bold" }}
          >
            OUR APPROACH
          </p>
          <div className="row m-auto">
            <img
              style={{ width: "342px", height: "200px" }}
              // height={200}
              src="../aboutimg/HG asset 3.png"
              alt="HG asset 3"
            />
          </div>
        </div>

        <div className="row m-auto  PositionR">
          <div>
            <img
              className="team-svg1"
              width={200}
              height={200}
              src="../photos/icons.png"
            />
          </div>
          <div className="col-md-11 m-auto PositionR">
            <div className="row m-auto team-main   text-center">
              <h3
                className="poppins-regular mt-3 mb-2 m-auto"
                style={{ fontSize: "17px", fontWeight: "bold" }}
              >
                OUR TEAM
              </h3>
              {TeamMembers.map((Ele) => {
                return (
                  <div className="col-md-3 ">
                    <div
                      className="d-flex"
                      style={{ justifyContent: "center" }}
                    >
                      <img
                        className="object_img p-1"
                        src={Ele.img}
                        style={{ width: "100px", height: "100px" }}
                      />
                    </div>
                    <p
                      className="poppins-regular text-center m-0"
                      style={{ fontSize: "14px" }}
                    >
                      {Ele.name}
                    </p>
                    <p
                      className="poppins-regular mb-3 m-0 text-center "
                      style={{ fontSize: "14px" }}
                    >
                      {Ele.position}
                    </p>
                  </div>
                );
              })}
            </div>
            <img
              className="team-svg2"
              width={200}
              height={200}
              src="../photos/icons (16).png"
            />
            <img
              className="team-svghear"
              width={120}
              height={120}
              src="../photos/icons (15).png"
            />
          </div>
        </div>

        <div className="row m-auto  PositionR">
          <img
            className="team-svg1"
            width={100}
            height={100}
            src="../workshop/img5.svg"
          />
          <div className="col-md-10 m-auto PositionR">
            <div>
              <img
                className="team-svg5"
                width={160}
                height={160}
                src="../photos/icons (12).png"
              />
            </div>
            <div className="row m-auto">
              <div
                className="poppins-regular text-center main_heading textbold mt-3  text-center m-auto"
                style={{ fontSize: "17px", fontWeight: "bold" }}
              >
                LOCATION
              </div>

              <div className="col-md-6">
                <div className="row">
                  <p
                    className="poppins-regular"
                    style={{ fontSize: "14px", fontWeight: "bold" }}
                  >
                    Address:
                  </p>
                  <p
                    className="poppins-regular"
                    style={{ fontSize: "14px", color: "grey" }}
                  >
                    Tower 2, PRESTIGE SHANTINIKETAN, ITPL Main Rd,
                    Thigalarapalya, Whitefield, Bengaluru, Karnataka 560048
                  </p>
                </div>
                <div className="row">
                  <p
                    className="poppins-regular"
                    style={{ fontSize: "14px", fontWeight: "bold" }}
                  >
                    Our Headquarter:
                  </p>
                  <p
                    className="poppins-regular"
                    style={{ fontSize: "14px", color: "grey" }}
                  >
                    Our head quarter is located in Whitefield, and Bangalore,
                    and we extend our services across Bangalore, Mumbai, Delhi
                    NCR and Hyderabad.
                  </p>
                </div>
              </div>

              <img
                className="col-md-4 m-auto"
                src="../photos/Address-bro.png"
              />
            </div>
            <img
              className="team-svg2"
              width={120}
              height={120}
              src="../photos/icons (9).png"
            />
          </div>
        </div>
      </div>

      <Footer />
      <Mobilefooter />
    </>
  );
}
