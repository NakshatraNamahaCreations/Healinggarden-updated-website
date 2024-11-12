import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Banner } from "../data";
import axios from "axios";
import { LineWave } from "react-loader-spinner";
import Header from "./Header";
import Footer from "./Footer";

const capitalizeWords = (str) => {
  return str
    ?.split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default function CategoryView() {
  const [workshopData, setWorkshopData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { category } = useParams();
  const [allWorkshops, setAllWorkshops] = useState([]);
  const [selectedBanner, setSelectedBanner] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getSubcategories();
        if (category) {
          const formattedCategory = capitalizeWords(category);
          const fullServiceName = allWorkshops.find(
            (ele) => ele?.category.toLowerCase() === formattedCategory.toLowerCase()
          );

          if (fullServiceName) {

            await getWorkshops(fullServiceName.category);
          } else {
            console.error("Workshop not found");
          }
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category, allWorkshops]);

  const getWorkshops = async (category) => {
   
    try {
      const res = await axios.post(
        `https://api.healinggarden.co.in/api/workshop/postcategory`,
        { category: category }
      );
      if (res.status === 200) {
        setWorkshopData(res.data.workshop);
      }
    } catch (err) {
      console.error("Error fetching workshops:", err);
    } finally {
      setLoading(false); 
    }
  };



  const getSubcategories = async () => {
    try {
      const response = await axios.get(
        `https://api.healinggarden.co.in/api/workshop/getallworkshop`
      );
     
      const formattedCategory = capitalizeWords(category);
      const filtered = response.data.data.filter(
        (Ele) => Ele.category?.toLowerCase() === formattedCategory?.toLowerCase()
      );
      const bannerData = Banner.find(
        (Ele) => Ele.category?.toLowerCase() === formattedCategory?.toLowerCase()
      );
      setAllWorkshops(filtered);

      setSelectedBanner(bannerData);
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };

  const generatePathname = (data) => {
    return {
      pathname: `/corporate-view/${data.workshopTitle.toLowerCase().replace(/ /g, "-")}`,
      search: `?id=${data._id}`
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
      <Header />
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
              {workshopData.map((Ele) => (
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

        <img className="svg_6" src="../workshop/img6.svg" width={400} height={400} />
        <img className="svg_3" src="../workshop/img3.svg" width={300} height={300} />
        <img className="svg_5" src="../workshop/img5.svg" width={300} height={300} />
      </div>

      <img className="svg_2" src="../workshop/img2.svg" width={350} height={450} />

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
      <Footer />
    </>
  );
}
