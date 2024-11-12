import React, { useEffect, useState } from "react";
import { testimonialsvid, testimonialsReview } from "./data";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import { Helmet } from "react-helmet";
import Mobileheader from "./Layout/Mobileheader";
import Mobilefooter from "./Layout/Mobilefooter";

export default function Testimonials() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Helmet>
        <title>
          Employees & end-users’ testimonials on workshops | Healing Garden
          India
        </title>
        <meta
          name="description"
          content="Checkout the testimonials from our corporate clients, their employees, and end-users who have participated in our workshops and sessions."
        />
        <meta
          name="keywords"
          content="testimonials, client reviews, workshop feedback"
        />
        <meta
          property="og:title"
          content="Employees & end-users’ testimonials on workshops | Healing Garden India"
        />
        <meta
          property="og:description"
          content="Checkout the testimonials from our corporate clients, their employees, and end-users who have participated in our workshops and sessions."
        />
        <meta property="og:image" content="URL-to-your-image" />
        <link
          rel="canonical"
          href="http://www.healinggarden.co.in/testimonials"
        />
      </Helmet>
      <Header />
      <Mobileheader />
      <div className="categoryview m-auto row">
        <hr className="row hr-line" style={{ borderColor: "white" }}></hr>
        <p className="p-1 poppins-regular"> Home {">"} Testimonial </p>
      </div>
      <div className="row m-auto mt-3">
        <p
          className="about-us poppins-regular"
          style={{ fontSize: "17px", fontWeight: "bold" }}
        >
          Testimonial{" "}
        </p>
      </div>

      <div class="container">
        <div class="row">
          {testimonialsvid.map((Ele) => {
            return (
              <div class="col-lg-4 col-md-6">
                <div className=" mt-4  m-3 testi_contianerm testi_contianer ">
                  <iframe
                    className="row m-auto  mt-2 video rounded"
                    style={{ width: "100%" }}
                    src={Ele.video}
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                  ></iframe>{" "}
                  <div className="row m-auto p-4 text-center">
                    {/* <p className="categorytext m-auto">{Ele.name}</p> */}
                    <p className="testimontext m-auto poppins-regular">
                      {Ele.companyname}
                    </p>{" "}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div class="container">
        <div class="row">
          {testimonialsReview.map((Ele) => {
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
                    <p className="row poppins-regular reviws m-auto m-1 p-1">
                      {Ele.Reviews}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="row m-auto seo mt-3">
        <p className="sub_sub_heading p-3 m-auto text-white">
          Checkout the testimonials and reviews of our valued clients to gain an
          insight into the exceptional experiences we offer. We're deeply
          appreciative of their willingness to share their comments and
          experiences.
        </p>
      </div>
      <Footer />
      <Mobilefooter />
    </>
  );
}
