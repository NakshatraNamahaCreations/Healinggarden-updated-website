import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import axios from "axios";
import { Banner } from "../data";
import Footer from "./Footer";
import Header from "./Header";
import Mobileheader from "./Mobileheader";
import Mobilefooter from "./Mobilefooter";
export default function Categorylist() {
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    getAllCategory();
  }, []);

  const getAllCategory = async () => {
    try {
      const response = await axios.get(
        "https://api.healinggarden.co.in/api/category/getcategory"
      );
      let data = response.data.data.sort((a, b) => a.order - b.order);
      setCategoryData(data);
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };
  const navigate = useNavigate();
  const handlenavigate = (data) => {
    navigate(`/category/${data.category.toLowerCase().replace(/ /g, "-")}`, {
      state: { category: data.category, idd: data._id },
    });
  };
  return (
    <>
      <Header />
      <Mobileheader />
      <div className="categoryview m-auto row">
        <hr className="row hr-line" style={{ borderColor: "white" }}></hr>
        <div className="row m-auto ">
          <div className="d-flex p-3 ">
            <li className="headertext poppins-regular">
              <a className="headertext me-1" href="/">
                Home
              </a>
            </li>
            <li className="headertext me-1"> {">"} </li>
            <li className="headertext poppins-regular">
              <a className="headertext" href="/categorylist">
                {" "}
                Categories
              </a>
            </li>
          </div>
        </div>
      </div>
      <div className="col-md-12">
        <Carousel data-bs-theme="dark">
          {Banner.map((Ele, index) => (
            <Carousel.Item key={index} interval={800}>
              <img
                className="col-md-12 p-0 PositionR"
                height={460}
                src={Ele.img}
                alt={`Banner ${index}`}
              />
              <p className="main_heaidng fs-1 text-white banner-text">
                {Ele.info}
              </p>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      <div className="row text-center m-auto mt-3">
        <p
          className="poppins-regular"
          style={{ fontSize: "17px", fontWeight: "bold" }}
        >
          Workshops All Categories
        </p>
      </div>

      <div
        className="col-md-11 m-auto"
        style={{ color: "green", border: "1px solid #d2bca0" }}
      ></div>

      <div className="container">
        <div className="row m-auto mt-2 text-center">
          <div className="col-md-12 m-auto">
            <div className="row category-main">
              {categoryData.map((Ele) => (
                <div
                  className="col-md-4 col-6 mt-4 text-center"
                  key={Ele.category}
                >
                  <img
                    onClick={() => handlenavigate(Ele)}
                    className="row m-auto p-0 cursor category-i"
                    width={200}
                    height={200}
                    src={`https://api.healinggarden.co.in/Category/${Ele.categoryImage}`}
                    alt={Ele.category}
                  />

                  <div
                    className="poppins-regular text-center"
                    style={{ fontSize: "12px" }}
                  >
                    {Ele.category}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Mobilefooter />
    </>
  );
}
