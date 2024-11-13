import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Banner } from "../data";
import axios from "axios";
import { LineWave } from "react-loader-spinner";
import Header from "./Header";
import Footer from "./Footer";
import Mobileheader from "./Mobileheader";
import Mobilefooter from "./Mobilefooter";
// import { Helmet } from "react-helmet";

const capitalizeWords = (str) => {
  return str
    ?.split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default function CategoryView() {
  const [loading, setLoading] = useState(true);
  const { category } = useParams();
  const [allWorkshops, setAllWorkshops] = useState([]);
  const [selectedBanner, setSelectedBanner] = useState(null);

  useEffect(() => {
    getWorkshops();
  }, [category, allWorkshops]);

  const getWorkshops = async () => {
    try {
      const response = await axios.get(
        `https://api.healinggarden.co.in/api/workshop/getallworkshop`
      );

      const formattedCategory = capitalizeWords(category);
      const filtered = response.data.data.filter(
        (Ele) =>
          Ele.category?.toLowerCase() === formattedCategory?.toLowerCase()
      );
      const bannerData = Banner.find(
        (Ele) =>
          Ele.category?.toLowerCase() === formattedCategory?.toLowerCase()
      );
      setAllWorkshops(filtered);
      setSelectedBanner(bannerData);
    } catch (error) {
      console.error("Error fetching category data:", error);
    } finally {
      setLoading(false);
    }
  };

  const generatePathname = (data) => {
    return {
      pathname: `/corporate-view/${data.workshopTitle
        .toLowerCase()
        .replace(/ /g, "-")}`,
      search: `?id=${data._id}`,
    };
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <LineWave
          visible={true}
          height="100"
          width="100"
          color="#4fa94d"
          ariaLabel="line-wave-loading"
        />
      </div>
    );
  }

  return (
    <>
      {/* <Helmet>
        {selectedBanner && (
          <>
            <title>{selectedBanner.metatitle}</title>
            <meta name="description" content={selectedBanner.metadesc} />
            <meta name="keywords" content={selectedBanner.seotext} />
            <meta property="og:title" content={selectedBanner.metatitle} />
            <meta property="og:description" content={selectedBanner.metadesc} />
            <meta property="og:image" content={selectedBanner.img} />
            <link rel="canonical" href={`https://healinggarden.co.in/category/${category}`} />
          </>
        )}
      </Helmet> */}
      <Header />
      <Mobileheader />
      <div className="web_category">
        <div className="categoryview m-auto row">
          <hr className="row hr-line" style={{ borderColor: "white" }}></hr>
          <div className="row m-auto">
            <div className="d-flex p-3">
              <li className="headertext">
                <Link to="/" className="headertext me-1">
                  Home
                </Link>
              </li>
              <li className="headertext me-1"> {">"} </li>
              <li className="headertext">
                <Link to="/categorylist" className="headertext">
                  {capitalizeWords(category)}
                </Link>
              </li>
            </div>
          </div>
        </div>

        <div className="row text-center m-auto p-2">
          <p className="main_heading">{capitalizeWords(category)}</p>
        </div>

        <div className="col-md-12">
          {selectedBanner && (
            <div className="col-md-12 p-0 PositionR">
              <img
                className="col-md-12 p-0 PositionR"
                height={430}
                src={selectedBanner.img}
                alt="banner"
              />
              <p className="main_heading fs-1 text-white banner-text sourc">
                {selectedBanner.info}
              </p>
            </div>
          )}
        </div>

        <div className="row text-center m-auto mt-5">
          <p className="main_heading">Workshop Categories</p>
        </div>

        <img
          className="svg_1"
          src="../workshop/img4.svg"
          width={300}
          height={300}
        />
        <div
          className="col-md-11 m-auto"
          style={{ color: "green", border: "1px solid #d2bca0" }}
        ></div>
        <div className="container index_value">
          <div className="row m-auto text-center">
            <div className="col-md-12 m-auto">
              <div className="row category-main index_value">
                {allWorkshops.map((Ele) => (
                  <div className="col-md-4 mt-4 text-center" key={Ele._id}>
                    <Link
                      to={generatePathname(Ele)}
                      className="text-decoration-none text-black"
                      style={{ cursor: "pointer" }}
                    >
                      <div className="row">
                        <img
                          className="col-md-9 m-auto cursor p-0"
                          width={220}
                          height={220}
                          style={{
                            borderRadius: "40px",
                            border: "5px solid #a77a43",
                          }}
                          src={`https://api.healinggarden.co.in/Product/${Ele.WorkshopImages?.[0]}`}
                        />
                      </div>
                    </Link>
                    <div className="row">
                      <p className="col-md-8 text-center m-auto sub_heading p-3">
                        {Ele.workshopTitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <img
            className="svg_6"
            src="../workshop/img6.svg"
            width={400}
            height={400}
          />
          <img
            className="svg_3"
            src="../workshop/img3.svg"
            width={300}
            height={300}
          />
          <img
            className="svg_5"
            src="../workshop/img5.svg"
            width={300}
            height={300}
          />
        </div>

        <img
          className="svg_2"
          src="../workshop/img2.svg"
          width={350}
          height={450}
        />

        <div className="row text-center m-auto mt-5">
          <p className="main_heading fs-2 categorytext textbold">
            To book workshops for your employees or private groups.
          </p>
        </div>
        <div className="row text-center m-auto mt-2">
          <Link to="/contact-us" className="cursor">
            <button className="col-md-2 m-auto mb-5 p-2 contact-us textbold sourc">
              Contact Us
            </button>
          </Link>
        </div>
        <div className="row m-auto seo mt-3">
          <p className="sub_sub_heading p-3 m-auto text-white">
            {selectedBanner?.seotext}
          </p>
        </div>
      </div>

      <div className="mobile_category">
        <div className="categoryview m-auto ">
          <hr className=" hr-line" style={{ borderColor: "white" }}></hr>
          <div className="row m-auto">
            <div className="d-flex p-3">
              <li className="headertext">
                <Link to="/" className="poppins-regular headertext me-1">
                  Home
                </Link>
              </li>
              <li className="headertext me-1"> {">"} </li>
              <li className="headertext">
                <Link to="/categorylist" className="poppins-regular headertext">
                  {capitalizeWords(category)}
                </Link>
              </li>
            </div>
          </div>
        </div>

        <div
          className="poppins-regular  text-center main_heading mt-3"
          style={{ fontSize: "15px", fontWeight: "bold" }}
        >
          {capitalizeWords(category)}
        </div>

        <div className="">
          {selectedBanner && (
            <div className=" p-0 ">
              <img
                className=" p-0 "
                src={selectedBanner.img}
                alt="banner"
                style={{ width: "100%", height: "150px", objectFit: "cover" }}
              />
              <p
                className="poppins-regular mt-5  mb-5 text-white banner-text "
                style={{ fontSize: "19px" }}
              >
                {selectedBanner.info}
              </p>
            </div>
          )}
        </div>

        <div className="">
          <p
            className="poppins-regular text-center mt-3 main_heading"
            style={{ fontSize: "15px", fontWeight: "bold" }}
          >
            Workshop Categories
          </p>

          {/* <img
            className="svg_1"
            src="../workshop/img4.svg"
            width={300}
            height={300}
          /> */}

          <div className="row" style={{ justifyContent: "center" }}>
            {allWorkshops.map((Ele) => (
              <div className="col-6 mt-1 text-center" key={Ele._id}>
                <Link
                  to={generatePathname(Ele)}
                  className="text-decoration-none text-black"
                  style={{
                    cursor: "pointer",
                  }}
                >
                  <img
                    className=""
                    style={{
                      width: "110px",
                      height: "110px",
                      borderRadius: "50%",
                    }}
                    src={`https://api.healinggarden.co.in/Product/${Ele.WorkshopImages?.[0]}`}
                  />
                </Link>

                <p
                  className="poppins-regular pt-2"
                  style={{ fontSize: "14px", color: "#a77a43" }}
                >
                  {Ele.workshopTitle}
                </p>
              </div>
            ))}
          </div>

          {/* <img
            className="svg_6"
            src="../workshop/img6.svg"
            width={400}
            height={400}
          />
          <img
            className="svg_3"
            src="../workshop/img3.svg"
            width={300}
            height={300}
          />
          <img
            className="svg_5"
            src="../workshop/img5.svg"
            width={300}
            height={300}
          /> */}
        </div>

        {/* <img
          className="svg_2"
          src="../workshop/img2.svg"
          width={350}
          height={450}
        /> */}

        <div
          className="text-center mt-3 poppins-regular categorytext textbold"
          style={{ fontSize: "16px" }}
        >
          To book workshops for your employees or private groups.
        </div>

        <div className="row text-center m-auto mt-4">
          <Link
            to="/contact-us"
            className="cursor"
            style={{ textDecoration: "none" }}
          >
            <div
              className="col-md-2 poppins-regular  mb-3 p-2 contact-us textbold "
              style={{ fontSize: "17px" }}
            >
              Contact Us
            </div>
          </Link>
        </div>
        <div className="row seo mt-3">
          <div
            className="poppins-regular  p-3  text-white"
            style={{ fontSize: "14px" }}
          >
            {selectedBanner?.seotext}
          </div>
        </div>
      </div>

      <Footer />
      <Mobilefooter />
    </>
  );
}
