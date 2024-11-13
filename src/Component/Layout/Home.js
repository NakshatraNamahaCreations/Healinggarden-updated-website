import React, { useEffect, useState } from "react";

import {
  Banners,
  Team,
  Clients,
  testimonialsvid,
  testimonialsReview,
  PopularEvents,
} from "../data";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Carousel from "react-bootstrap/Carousel";
import axios from "axios";
import RequestProposal from "../Request";
import Header from "./Header";
import Footer from "./Footer";
import Mobileheader from "./Mobileheader";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import { FreeMode, Pagination, Autoplay, Navigation } from "swiper/modules";
import Mobilefooter from "./Mobilefooter";

export default function Home() {
  const [categoryData, setcategoryData] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  useEffect(() => {
    getAllCategory();
  }, []);
  const [Proposal, setProposal] = useState(false);
  const getAllCategory = async () => {
    let response = await axios.get(
      "https://api.healinggarden.co.in/api/category/getcategory"
    );
    let data = response.data.data.sort((a, b) => a.order - b.order);
    setcategoryData(data);
  };

  const generatePathname = (category) => {
    return `/category/${category.toLowerCase().replace(/ /g, "-")}`;
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          Corporate Workshops For Employee Engagement & Mental Wellness
        </title>
        <meta
          name="description"
          content="Workshops & healing sessions to improve employee engagement, morale, team bonding & mental wellness. Suitable for corporates & private parties."
        />
        <meta
          name="keywords"
          content="corporate workshops, employee engagement, mental wellness, team bonding, healing sessions"
        />
        <meta name="author" content="Your Name" />
        <meta
          property="og:title"
          content="Corporate Workshops For Employee Engagement & Mental Wellness"
        />
        <meta
          property="og:description"
          content="Workshops & healing sessions to improve employee engagement, morale, team bonding & mental wellness. Suitable for corporates & private parties."
        />
        <meta property="og:url" content="http://www.healinggarden.co.in" />
        <meta property="og:image" content="URL_TO_IMAGE" />
      </Helmet>
      <Header />
      <Mobileheader />

      <div className="web_homepage">
        <div className="col-12">
          <Carousel data-bs-theme="dark">
            {Banners.map((Ele, index) => (
              <Carousel.Item key={index}>
                {index === 0 && Ele.video ? (
                  <video
                    className="vid-img d-block w-100 "
                    autoPlay
                    loop={true}
                    src={Ele.video}
                    muted
                  />
                ) : (
                  <img
                    className="d-block w-100 carosel-img"
                    src={`${Ele.img}`}
                    alt="banner"
                  />
                )}
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
        <div className="row m-auto">
          <div className="row  text-center mt-5">
            <p className="main_heaidng ">Our Workshops Objectives</p>
            <p className="sub_heading">
              We Collaborate With You To Achieve Desired Objectives & Outcomes!
            </p>
          </div>
        </div>
        <div
          className="col-md-11 m-auto"
          style={{ color: "green", border: "1px solid #d2bca0" }}
        ></div>
        <div className="row m-auto objective-main p-5  mt-5 text-center">
          {Team.map((Ele) => {
            return (
              <div className="col-lg-3 col-md-4 col-sm-6 m-5 object-contianer p-0 ">
                <img
                  className="p-0 m-0 object_img"
                  height={200}
                  src={Ele.img}
                />
                <p className="categorytext p-3">{Ele.title}</p>
              </div>
            );
          })}
        </div>

        <div className="row m-auto text-center mt-5">
          <button
            className="col-md-2 col-sm-7 col-7 mx-auto sub_heading request-pr p-md-2  shadow"
            onClick={() => setProposal(true)}
          >
            Request A Proposal
          </button>
        </div>
        <div className="row m-auto text-center mt-5">
          <p className="main_heaidng  sourc">
            Let's Create A Personalized Program For Your Team Members!
          </p>
        </div>

        <div className="row m-auto text-center mt-5">
          <p className="main_heaidng">Our Workshops Categories</p>
        </div>
        <div
          className="col-md-11 m-auto "
          style={{ color: "green", border: "1px solid #d2bca0" }}
        ></div>
        <div className="row m-auto  mt-2 text-center ">
          <div className="col-md-10 m-auto ">
            <div className="row  category-main">
              {categoryData?.slice(0, 6).map((Ele) => {
                return (
                  <div
                    className="col-md-4 mt-4 text-center cursor"
                    key={Ele._id}
                  >
                    <Link
                      to={{
                        pathname: generatePathname(Ele.category),
                      }}
                      className="text-decoration-none text-black"
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        height={200}
                        width={200}
                        className="p-0 m-auto"
                        src={`https://api.healinggarden.co.in/Category/${Ele?.categoryImage}`}
                        alt={Ele.category}
                      />
                      <p className="categorytext col-md-7 m-auto">
                        {Ele.category}
                      </p>
                    </Link>
                  </div>
                );
              })}
            </div>

            <div className="row ">
              <div className="col-md-1"></div>
              <p className="col-8 col-md-9  main_heaidng textindex "></p>
              <div className="col-4 col-md-2">
                <a href="/categorylist">
                  <button className="col-12 col-md-7 p-1 text-white viewall">
                    View All {">>>"}
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* clients */}

        <div className="row m-auto clients-main mt-5 ">
          <div className="row mt-3">
            <div className="col-md-1"></div>
            <p className="col-7 col-md-9 p-1 client_heaidng textindex ">
              Clients Served
            </p>
            <div className="col-5 col-md-2">
              <a href="/client-served">
                <button className="col-12 col-md-7 p-1 text-white viewallclient">
                  View All {">>>"}
                </button>
              </a>
            </div>
          </div>
          <div
            className="col-md-10 m-auto textindex"
            style={{ color: "green", border: "1px solid black" }}
          ></div>

          <div className="col-md-10 m-auto">
            <div className="row  mb-4">
              {Clients.slice(0, 6).map((Ele) => {
                return (
                  <div className="col-md-4 ">
                    <img
                      className="m-auto mt-5 row"
                      width={`${Ele.type === "ge2" ? "80" : "200"}`}
                      src={Ele.logo}
                      style={{ width: "100px", height: "100px" }}
                    />
                  </div>
                );
              })}{" "}
            </div>
          </div>
        </div>
        {/* Testimonials */}

        <div className="row m-auto padd-main  mt-5">
          <div className="row ">
            <div className="col-md-1"></div>
            <p className="col-7 col-md-9  client_heaidng textindex ">
              Testimonials
            </p>
            <div className="col-5 col-md-2">
              <a href="/testimonials">
                <button className="col-12 col-md-7 p-1 text-white viewallclient">
                  View All {">>>"}
                </button>
              </a>
            </div>
          </div>
          <div
            className="col-md-11 m-auto"
            style={{ color: "green", border: "1px solid black" }}
          ></div>

          <div className="row m-auto  mt-5 text-center">
            {testimonialsvid.slice(0, 3).map((Ele, index) => {
              return (
                <div
                  key={index}
                  className="col-12 col-sm-6 col-md-3 mb-5 m-auto 
                object-contianer testi_contianer "
                >
                  <iframe
                    className="row m-auto mt-4 video rounded"
                    src={Ele.video}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                  <div className="row m-auto text-center p-2">
                    {/* <p className="categorytext m-auto">{Ele.name}</p> */}
                    <p className=" testimontext m-auto text-center">
                      {" "}
                      {Ele.companyname}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div class="row m-auto  text-center">
            {testimonialsReview.slice(0, 3).map((Ele) => {
              return (
                <div class="col-lg-4 col-md-6 mt-5">
                  <div className="review review2 PositionR ">
                    <img
                      className="m-auto testimonal-image shadow-sm"
                      height={140}
                      src={Ele.Image}
                    />
                    <div className="row mt-5 m-2 text-center">
                      <p className=" categorytext text-white m-auto mt-5">
                        {Ele.name}
                      </p>
                      <p className=" testimontext text-white m-auto">
                        {Ele.companyname}
                      </p>
                      <p className="reviws m-auto m-1 p-1">
                        {Ele.Reviews.length > 350
                          ? Ele.Reviews.substring(0, 350)
                          : Ele.Reviews}
                        {Ele.Reviews.length > 350 && (
                          <a href="/testimonials">View More</a>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {Proposal && <RequestProposal open={Proposal} setOpen={setProposal} />}

        <div className="row m-auto padd-main mt-1">
          <div
            className="col-md-11 m-auto"
            style={{ color: "green", border: "1px solid black" }}
          ></div>

          <div className="container-fluid">
            <div className="row justify-content-center mt-2">
              <p className="main_heading text-center">Popular Events</p>
            </div>

            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-4 mt-2">
              {PopularEvents.map((Ele, index) => {
                return (
                  <div className="col" key={index}>
                    <div className="card h-100">
                      <img
                        src={Ele.img}
                        alt={Ele.eventname}
                        className="img-fluid"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="row m-auto seo mt-3">
          <p className="sub_sub_heading p-3 m-auto text-white">
            Enhance your team's engagement and morale with our transformative
            corporate workshops and healing sessions. We manage small to large
            scale corporate events with the network of our 75+ serivce
            providers. Our services are available in Bangalore, Mumbai,
            Hyderabad, Pune, and Delhi-NCR.
          </p>
        </div>
      </div>

      <div className="mobile_homepage">
        <div className="col-12">
          <Carousel data-bs-theme="dark">
            {Banners.map((Ele, index) => (
              <Carousel.Item key={index}>
                {index === 0 && Ele.video ? (
                  <video
                    className="vid-img d-block "
                    autoPlay
                    loop={true}
                    src={Ele.video}
                    muted
                    style={{ objectFit: "cover", width: "100%" }}
                  />
                ) : (
                  <img
                    className="d-block w-100 carosel-img"
                    src={`${Ele.img}`}
                    alt="banner"
                  />
                )}
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
        <div className="container">
          <div
            className="poppins-medium text-center mt-3"
            style={{ fontSize: "15px", fontWeight: 600 }}
          >
            Our Workshops Objectives
          </div>
          <div
            className="poppins-regular text-center pt-1"
            style={{ fontSize: "12px", color: "grey" }}
          >
            We Collaborate With You To Achieve Desired Objectives & Outcomes!
          </div>
          <div className="row mt-3" style={{ justifyContent: "center" }}>
            {Team.map((Ele) => {
              return (
                <div className="col-6 mb-3">
                  <div
                    className=""
                    style={{
                      // backgroundColor: "#a77a43",
                      backgroundColor: "#98c9de30",
                      padding: "10px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      className="d-flex"
                      style={{ justifyContent: "center" }}
                    >
                      <img
                        className="p-0 m-0 object_img"
                        style={{ width: "120px", height: "100px" }}
                        src={Ele.img}
                      />
                    </div>
                    <div
                      className="poppins-regular text-center pt-1"
                      style={{ color: "black", fontSize: "12px" }}
                    >
                      {Ele.title}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div
            className="row m-auto text-center mt-2"
            style={{ justifyContent: "center" }}
          >
            <div
              className="poppins-medium"
              style={{
                backgroundColor: "#a77a43",
                padding: "5px",
                fontSize: "14px",
                color: "white",
                borderRadius: "20px",
                width: "250px",
              }}
              onClick={() => setProposal(true)}
            >
              Request A Proposal
            </div>
          </div>
          <div className="row m-auto text-center mt-3">
            <div className="poppins-semibold-italic">
              Let's Create A Personalized Program For Your Team Members!
            </div>
          </div>
          <div className="row m-auto text-center mt-4">
            <p className="poppins-medium" style={{ fontSize: "15px" }}>
              Our Workshops Categories
            </p>
          </div>
          <div
            className="col-md-11 m-auto "
            style={{ color: "green", border: "1px solid #d2bca0" }}
          ></div>
          <div className="row   mt-2">
            {categoryData?.slice(0, 6).map((Ele) => {
              return (
                <div className="col-6 mt-4 text-center cursor" key={Ele._id}>
                  <Link
                    to={{
                      pathname: generatePathname(Ele.category),
                    }}
                    className="text-decoration-none text-black"
                    style={{ cursor: "pointer" }}
                  >
                    <div
                      className="d-flex"
                      style={{ justifyContent: "center" }}
                    >
                      <img
                        className="p-0 m-auto"
                        src={`https://api.healinggarden.co.in/Category/${Ele?.categoryImage}`}
                        alt={Ele.category}
                        style={{ width: "130px", height: "130px" }}
                      />
                    </div>

                    <div
                      className="poppins-regular text-center "
                      style={{ fontSize: "13px", color: "#a77a43" }}
                    >
                      {Ele.category}
                    </div>
                  </Link>
                </div>
              );
            })}

            <div
              className="d-flex mb-3 mt-3"
              style={{ justifyContent: "center" }}
            >
              <a href="/categorylist">
                <button
                  className="col-12 poppins-regular  p-1 text-white viewall"
                  style={{ width: "150px" }}
                >
                  View All {">>>"}
                </button>
              </a>
            </div>
          </div>
          <div
            className="d-flex mt-3"
            style={{ justifyContent: "space-between" }}
          >
            <div
              className="poppins-regular"
              style={{ fontSize: "17px", fontWeight: 600 }}
            >
              Clients Served
            </div>
            <a href="/client-served">
              <button className=" text-white viewallclient">
                View All {">>>"}
              </button>
            </a>
          </div>

          <div className="row mt-3">
            {Clients.slice(0, 6).map((Ele) => {
              return (
                <div className="col-6 mb-4">
                  <div className="d-flex" style={{ justifyContent: "center" }}>
                    <img
                      className=" mt-2 "
                      width={`${Ele.type === "ge2" ? "100px" : "140px"}`}
                      height={`${Ele.type === "ge2" ? "100px" : ""}`}
                      // style={{ width: "140px", height: "50px" }}
                      src={Ele.logo}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="row m-auto padd-main  mt-5">
            <div className="row ">
              <div className="col-md-1"></div>
              <p className="col-7 col-md-9  client_heaidng textindex ">
                Testimonials
              </p>
              <div className="col-5 col-md-2">
                <a href="/testimonials">
                  <button className="col-12 col-md-7 p-1 text-white viewallclient">
                    View All {">>>"}
                  </button>
                </a>
              </div>
            </div>
            <div
              className="col-md-11 m-auto"
              style={{ color: "green", border: "1px solid black" }}
            ></div>

            <div className="row m-auto  mt-3 text-center">
              {testimonialsvid.slice(0, 3).map((Ele, index) => {
                return (
                  <div
                    key={index}
                    className="col-12 col-sm-6 col-md-3 mb-3  m-auto 
                object-contianer testi_contianer "
                  >
                    <iframe
                      className="row m-auto mt-4 video rounded"
                      src={Ele.video}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    ></iframe>
                    <div className="row m-auto text-center p-2">
                      {/* <p className="categorytext m-auto">{Ele.name}</p> */}
                      <div className="poppins-regular testimontext m-auto text-center">
                        {" "}
                        {Ele.companyname}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div class="row m-auto  text-center">
              {testimonialsReview.slice(0, 3).map((Ele) => {
                return (
                  <div class="col-lg-4 col-md-6 mt-5">
                    <div className="review review2 PositionR ">
                      <img
                        className="m-auto testimonal-image shadow-sm"
                        height={140}
                        src={Ele.Image}
                      />
                      <div className="row mt-5 m-2 text-center">
                        <p className="poppins-regular categorytext text-white m-auto mt-5">
                          {Ele.name}
                        </p>
                        <p className="poppins-regular testimontext text-white m-auto">
                          {Ele.companyname}
                        </p>
                        <p className="poppins-regular reviws m-auto m-1 p-1">
                          {Ele.Reviews.length > 350
                            ? Ele.Reviews.substring(0, 350)
                            : Ele.Reviews}
                          {Ele.Reviews.length > 350 && (
                            <a href="/testimonials">View More</a>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {Proposal && (
            <RequestProposal open={Proposal} setOpen={setProposal} />
          )}

          <p
            className="poppins-medium text-center"
            style={{ fontSize: "17px" }}
          >
            Popular Events
          </p>

          <div className="row">
            {PopularEvents.map((Ele, index) => {
              return (
                <div className="col-6 mb-3" key={index}>
                  <div className="card h-100">
                    <img
                      src={Ele.img}
                      alt={Ele.eventname}
                      className="img-fluid"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* <div className="mt-4" style={{ position: "relative" }}>
            <Swiper
              slidesPerView={2}
              spaceBetween={30}
              freeMode={true}
              pagination={{
                clickable: true,
                el: ".swiper-pagination-cleaning",
              }}
              autoplay={
                isMobile ? { delay: 2500, disableOnInteraction: true } : false
              }
              navigation={{
                nextEl: ".swiper-button-next-cleaning",
                prevEl: ".swiper-button-prev-cleaning",
              }}
              modules={[FreeMode, Pagination, Autoplay, Navigation]}
              className="mySwiper"
            >
              {Clients.slice(0, 6).map((Ele) => (
                <SwiperSlide
                  key={Ele._id}
                  style={{
                    backgroundColor: "white",
                    padding: "0px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <img
                    className="m-auto mt-5 row"
                    // width={Ele.type === "ge2" ? "80" : "200"}
                    src={Ele.logo}
                    alt="Client Logo"
                    style={{ width: "168px", height: "100px" }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="swiper-button-prev swiper-button-prev-cleaning">
              <i className="fa-solid fa-arrow-left left-icon"></i>
            </div>
            <div className="swiper-button-next swiper-button-next-cleaning">
              <i className="fa-solid fa-arrow-right right-icon"></i>
            </div>
            <div className="swiper-pagination swiper-pagination-cleaning"></div>
          </div> */}
        </div>
      </div>

      <Footer />
      <Mobilefooter />
    </>
  );
}
