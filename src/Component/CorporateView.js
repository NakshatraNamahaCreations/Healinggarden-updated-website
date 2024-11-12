import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import RequestProposal from "./Request";
import Carousel from "react-bootstrap/Carousel";
import { Form } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { LineWave } from "react-loader-spinner";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import Mobileheader from "./Layout/Mobileheader";
import Mobilefooter from "./Layout/Mobilefooter";
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
const capitalizeWords = (str) => {
  return str
    ?.split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default function CorporateView() {
  const { workshoptitle } = useParams();

  const query = useQuery();
  const id = query.get("id");
  const [FilteredWorkshop, setFilteredWorkshop] = useState([]);
  const [RecentlyVisited, setRecentlyVisited] = useState([]);
  const [open, setOpen] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [ShowFullReasonToJoin, setShowFullReasonToJoin] = useState(false);
  const [FilteredCategory, setFilteredCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [DataById, setDataById] = useState(null);
  const [categoryData, setcategoryData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getAllCategory();
        if (id && workshoptitle) {
          await getWorkshops(id);
        } else {
          console.error("Workshop not found");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [workshoptitle, id]);

  const getWorkshops = async () => {
    try {
      const res = await axios.get(
        `https://api.healinggarden.co.in/api/workshop/getworkshopbyid/${id}`
      );
      if (res.status === 200) {
        setDataById(res.data.data);
      }
    } catch (err) {
      console.error("Error fetching workshops:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCategory();
    getAllWorkShop();
  }, []);

  const getAllCategory = async () => {
    try {
      let response = await axios.get(
        "https://api.healinggarden.co.in/api/category/getcategory"
      );
      let FilterCate = response.data.data.filter(
        (ele) => ele.category !== DataById?.category
      );
      setFilteredCategory(FilterCate);
    } catch (error) {
      console.error("Error fetching workshops:", error);
    } finally {
      setLoading(false);
    }
  };

  const getAllWorkShop = async () => {
    try {
      let response = await axios.get(
        "https://api.healinggarden.co.in/api/workshop/getallworkshop"
      );
      let filtred = response.data.data.filter(
        (ele) =>
          ele.Live === "Live" &&
          ele.clientType === "Corporate" &&
          ele.category === DataById?.category &&
          ele._id !== id
      );

      setRecentlyVisited(filtred);
      setFilteredWorkshop(filtred);
    } catch (error) {
      console.error("Error fetching workshops:", error);
    } finally {
      setLoading(false);
    }
  };
  const navigate = useNavigate();
  const primaryObjective = DataById?.primaryObjective || [];
  const SuitableFors = DataById?.SuitableFor || [];

  console.log("DataById", DataById);

  const handlebreadCrumbworkshop = (data) => {
    navigate(
      `/corporate-view/${data.workshopTitle?.toLowerCase().replace(/ /g, "-")}`,
      { state: { category: categoryData._id, data: data } }
    );
  };
  const handleSimilarWorkshop = (data) => {
    return {
      pathname: `/corporate-view/${data.workshopTitle
        .toLowerCase()
        .replace(/ /g, "-")}`,
      search: `?id=${data._id}`,
    };
  };

  const handleCategoryview = (data) => {
    navigate(`/category/${data.category.toLowerCase().replace(/ /g, "-")}`, {
      state: { category: data.category, idd: data._id },
    });
  };

  const handlebreadCrumb = () => {
    navigate(
      `/category/${categoryData?.category
        ?.toLowerCase()
        .replace(/ /g, "-")}?id=${categoryData.category}`
    );
  };

  const safeJsonParse = (jsonString) => {
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return [];
    }
  };
  const mode = safeJsonParse(DataById?.mode);
  const videoLinks = DataById?.YouTubeLink
    ? safeJsonParse(DataById?.YouTubeLink)
    : [];

  const [errors, setErrors] = useState({});
  const [mobileno, setMobileno] = useState("");
  const [requestData, setRequestData] = useState({
    companyname: "",
    email: "",
    workshop: "",
    max: "",
    message: "",
    fullname: "",
  });
  const [MessageLimit, setMessageLimit] = useState(false);
  const [workshopDate, setWorkshopDate] = useState("");

  const validateForm = () => {
    const formErrors = {};
    if (!requestData.fullname) formErrors.fullname = "Full Name is required";
    if (!mobileno) formErrors.mobileno = "Phone Number is required";
    else if (!/^\d{10}$/.test(mobileno))
      formErrors.mobileno = "Phone Number must be exactly 10 digits";
    if (!requestData.message) formErrors.message = "Message is required";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleRequestSubmit = async () => {
    if (!validateForm()) return;

    try {
      const response = await axios.post(
        "https://api.healinggarden.co.in/api/proposal/addproposal",
        {
          fullname: requestData.fullname,
          companyname: requestData.companyname,
          mobileno,
          email: requestData.email,
          workshop: requestData.workshop,
          max: requestData.max,
          message: requestData.message,
          workshopDate,
        }
      );

      if (response.status === 200) {
        toast.success(
          "Thank you for contacting us. We will reply to you shortly."
        );
        setOpen(false);
        setErrors({});
      } else {
        toast.error("Submission failed. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred during submission. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    if (name === "message") {
      if (value.length > 3000) {
        setMessageLimit("Message limit should be less than 3000 characters");
        return;
      } else {
        setMessageLimit(false);
      }
    }

    setRequestData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
      <Mobileheader />
      <div className="web_corporateview">
        <div className="categoryview m-auto row">
          <hr className="row hr-line" style={{ borderColor: "white" }}></hr>
          <div className="row m-auto ">
            <div className="d-flex p-3 ">
              <li className="headertext">
                <a className="headertext me-1" href="/">
                  Home
                </a>
              </li>
              <li className="headertext me-1"> {">"} </li>
              <li className="headertext me-1">
                <a
                  className="headertext"
                  onClick={() =>
                    handlebreadCrumb(categoryData?.category, DataById)
                  }
                >
                  {" "}
                  {DataById?.category}
                </a>
              </li>
              <li className="headertext me-1"> {">"} </li>
              <li className="headertext">
                <a
                  className="headertext"
                  onClick={() => handlebreadCrumbworkshop(DataById)}
                >
                  {" "}
                  {capitalizeWords(workshoptitle)}
                </a>
              </li>
            </div>
          </div>
        </div>
        <div className="row m-auto p-2 mt-5 ">
          <div className="col-md-5 ">
            <div className="row">
              <div className="viewimg p-1">
                <div className="video-wrapper ">
                  <iframe
                    className="video"
                    src={videoLinks?.[0]}
                    title={`YouTube video player`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>

            <img
              className="viewsvg1"
              width={250}
              height={250}
              src="../workshop/img4.svg"
            />
          </div>

          <div className="col-md-6 m-auto">
            <p className="main_heading categorycolor m-auto sourc">
              {capitalizeWords(workshoptitle)}
            </p>

            <p className="main_heading textbold inter m-auto">About</p>
            <ul>
              <div
                className="sub_heading"
                dangerouslySetInnerHTML={{
                  __html: showFullDescription
                    ? DataById?.discription?.[0]
                    : `${DataById?.discription?.[0]?.substring(0, 400)}...`,
                }}
              />
              <a
                className="readmore cursor"
                style={{ position: "relative", zIndex: "6" }}
                onClick={() => setShowFullDescription(!showFullDescription)}
              >
                {!showFullDescription ? " Read More..." : " Read Less"}
              </a>
            </ul>
            <div className="row">
              <button
                className="col-md-6 request-corporat p-2"
                onClick={() => setOpen(true)}
              >
                Request A Proposal
              </button>
            </div>
            <img
              className="viewsvg2"
              width={300}
              height={300}
              src="../workshop/img6.svg"
            />
          </div>
        </div>

        <div className="row m-auto view-reason p-5 mt-3">
          <div className="row PositionR">
            <img
              className="viewsvg3"
              width={250}
              height={250}
              src="../workshop/img6.svg"
            />

            <p className="main_heading subtext text_light">Benefits</p>
            <ul>
              <div
                className="reason"
                style={{ fontWeight: "bold" }}
                dangerouslySetInnerHTML={{
                  __html: ShowFullReasonToJoin
                    ? DataById?.reasonToJoin?.[0]
                    : `${DataById?.reasonToJoin?.[0]?.substring(0, 600)}`,
                }}
              />
            </ul>
            <a
              className=" readmore cursor"
              style={{ position: "relative", zIndex: "1", textAlign: "end" }}
              onClick={() => setShowFullReasonToJoin(!ShowFullReasonToJoin)}
            >
              {!ShowFullReasonToJoin ? " Read More..." : " Read Less"}
            </a>
          </div>
        </div>

        <div className="row m-auto  mt-5">
          <div className="col-md-3 m-auto col-2 corporate-detal shadow m-auto">
            <div className="row text-center p-2">
              <p className="m-auto sub_heading ">Details</p>
            </div>
            <div className="row">
              <span className="sub_sub_heading">
                <img src="../category/view (1).png" width={55} />{" "}
                {DataById?.Corporateduration?.min} mins -{" "}
                {DataById?.Corporateduration?.max} {""}mins
              </span>
              <span className="sub_sub_heading">
                <img src="../category/view (2).png" width={55} />
                <span className="me-1">{mode.online && "Online"}</span>
                {mode.online && mode.offline && <span className="me-1">/</span>}
                <span>{mode.offline && "Offline"}</span>
              </span>
              <span className="sub_sub_heading">
                <img src="../category/view (3).png" width={55} />{" "}
                {DataById?.Minparticipant} - {DataById?.Maxparticipant}
              </span>
            </div>
          </div>
          <div className="col-md-3 m-auto col-2 corporate-detal shadow m-auto">
            <div className="row text-center p-2">
              <p className="m-auto sub_heading ">Primary Objectives</p>
            </div>
            <div className="row">
              {primaryObjective?.map((objective, index) => (
                <div key={index} className="col-md-12 corporate-sub">
                  <i className="fa-solid fa-circle-check"></i>
                  <span
                    className="sub_sub_heading"
                    dangerouslySetInnerHTML={{ __html: objective }}
                  ></span>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-3 m-auto col-2 corporate-detal shadow m-auto">
            <div className="row text-center p-2">
              <p className="m-auto sub_heading ">Suitable For</p>
            </div>
            <div className="row">
              {SuitableFors?.map((objective, index) => (
                <div key={index} className="col-md-12 corporate-sub">
                  <i className="fa-solid fa-circle-check"></i>
                  <span
                    className="sub_sub_heading"
                    dangerouslySetInnerHTML={{ __html: objective }}
                  ></span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-md-8 m-auto mt-4">
          <p className="main_heading">Request A Proposal</p>
          <div
            className="row  p-5 "
            style={{
              borderRadius: "20px",
              border: "3px solid #a77a43",
            }}
          >
            <Form.Group className="mb-3 col-md-6">
              <Form.Label className="form_label inter">Full name</Form.Label>
              <Form.Control
                type="text"
                name="fullname"
                value={requestData.fullname}
                onChange={handleChange}
                isInvalid={!!errors.fullname}
              />
              <Form.Control.Feedback type="invalid">
                {errors.fullname}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3 col-md-6">
              <Form.Label className="form_label inter">
                Mobile number
              </Form.Label>
              <Form.Control
                type="text"
                name="mobileno"
                value={mobileno}
                onChange={(e) => setMobileno(e.target.value)}
                isInvalid={!!errors.mobileno}
              />
              <Form.Control.Feedback type="invalid">
                {errors.mobileno}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3 col-md-6">
              <Form.Label className="form_label inter">
                Company name (optional)
              </Form.Label>
              <Form.Control
                type="text"
                name="companyname"
                value={requestData.companyname}
                onChange={handleChange}
                isInvalid={!!errors.companyname}
              />
              <Form.Control.Feedback type="invalid">
                {errors.companyname}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3 col-md-6">
              <Form.Label className="form_label inter">
                Company email address (optional)
              </Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={requestData.email}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3 col-md-6 m-auto">
              <Form.Label className="form_label inter">
                Tentative Workshop Date (optional)
              </Form.Label>
              <Form.Control
                type="date"
                value={workshopDate}
                onChange={(e) => setWorkshopDate(e.target.value)}
                isInvalid={!!errors.workshopDate}
              />
              <Form.Control.Feedback type="invalid">
                {errors.workshopDate}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3 row">
              <Form.Label className="form_label inter">
                Message ({requestData?.message?.length})
              </Form.Label>
              <Form.Control
                as="textarea"
                name="message"
                className="p-4 placehol"
                rows={3}
                value={requestData.message}
                readOnly={requestData.message?.length >= 3000}
                onChange={handleChange}
                isInvalid={!!errors.message || !!MessageLimit}
                placeholder="Message Limit: 3000 characters"
              />
              <Form.Control.Feedback type="invalid">
                {errors.message} {MessageLimit}
              </Form.Control.Feedback>
            </Form.Group>

            <div className="row m-auto">
              <button
                className="submit mt-3 sub_heading  m-auto"
                onClick={handleRequestSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
        <div className="row m-auto">
          {FilteredWorkshop?.length > 0 && (
            <div className="row m-auto  mt-3 ">
              <div className="row m-auto d-flex">
                <div className="col-md-3 ">
                  <p className="sub_heading textbold">Similar Workshop</p>
                </div>
                <div className="col-md-7"></div>
                <div className="col-5 col-md-2">
                  <Link to="/category">
                    <button className="col-12 col-md-7 p-1 text-white viewallclient">
                      View All {">>>"}
                    </button>
                  </Link>
                </div>
              </div>
              <div className="col-md-11 m-auto">
                <div className="row   index_value">
                  {FilteredWorkshop?.map((Ele) => {
                    return (
                      <div className="col-md-4  mt-4 text-center ">
                        <Link
                          to={handleSimilarWorkshop(Ele)}
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
                          <p className="col-md-8 text-center m-auto sub_heading p-3 ">
                            {Ele.workshopTitle}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* <img
              className="viewsvg5"
              width={250}
              height={250}
              src="../workshop/img6.svg"
            /> */}
                <img
                  className="viewsvg6"
                  width={250}
                  height={250}
                  src="../workshop/img3.svg"
                />
              </div>
            </div>
          )}
          {FilteredCategory?.length > 0 && (
            <div className="row m-auto  mt-5 ">
              <div className="row m-auto d-flex">
                <div className="col-md-4 ">
                  <p className="sub_heading textbold">
                    Our Workshop Categories
                  </p>
                </div>
                <div className="col-md-6"></div>
                <div className="col-5 col-md-2">
                  <Link to="/categorylist">
                    <button className="col-12 col-md-7 p-1 text-white viewallclient">
                      View All {">>>"}
                    </button>
                  </Link>
                </div>
              </div>
              <div className="col-md-11 m-auto">
                <div className="row">
                  {FilteredCategory?.slice(0, 3).map((Ele) => {
                    return (
                      <div
                        className="col-md-4  mt-4 text-center"
                        onClick={() => handleCategoryview(Ele)}
                      >
                        <img
                          height={200}
                          width={200}
                          className="row  p-0   m-auto cursor"
                          src={`https://api.healinggarden.co.in/Category/${Ele?.categoryImage}`}
                        />
                        <p className="categorytext col-md-7 m-auto ">
                          {Ele.category}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <img
                  className="viewsvg6"
                  width={250}
                  height={250}
                  src="../workshop/img3.svg"
                />
              </div>
            </div>
          )}
          {RecentlyVisited?.length > 0 && (
            <div className="row m-auto  mt-3 ">
              <div className="row m-auto d-flex">
                <div className="col-md-3 ">
                  <p className="sub_heading textbold">Recently Visited</p>
                </div>
                <div className="col-md-7"></div>
                {/* <div className="col-5 col-md-2">
                <Link to="/category">
                  <button className="col-12 col-md-7 p-1 text-white viewallclient">
                    View All {">>>"}
                  </button>
                </Link>
              </div> */}
              </div>
              <div className="col-md-11 m-auto">
                <div className="row">
                  {RecentlyVisited?.slice(0, 3)?.map((Ele) => {
                    return (
                      <div className="col-md-4  mt-4 text-center ">
                        <Link
                          to={handleSimilarWorkshop(Ele)}
                          className="text-decoration-none text-black"
                          style={{ cursor: "pointer" }}
                        >
                          <div className="row">
                            <img
                              className="col-md-9 m-auto cursor p-0 "
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
                          <p className="col-md-8 text-center m-auto sub_heading p-3 ">
                            {Ele.workshopTitle}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* <img
                className="viewsvg5"
                width={250}
                height={250}
                src="../workshop/img6.svg"
              /> */}
                <img
                  className="viewsvg6"
                  width={250}
                  height={250}
                  src="../workshop/img3.svg"
                />
              </div>
            </div>
          )}
        </div>
        {open && <RequestProposal open={open} setOpen={setOpen} />}
      </div>

      <div className="mobile_corporateview">
        <div className="categoryview m-auto row">
          <hr className="row hr-line" style={{ borderColor: "white" }}></hr>
          <div className="row m-auto ">
            <div className="d-flex p-3 ">
              <li className="headertext">
                <a className="poppins-regular headertext me-1" href="/">
                  Home
                </a>
              </li>
              <li className="headertext me-1"> {">"} </li>
              <li className="headertext me-1">
                <a
                  className="headertext poppins-regular"
                  onClick={() =>
                    handlebreadCrumb(categoryData?.category, DataById)
                  }
                >
                  {" "}
                  {DataById?.category}
                </a>
              </li>
              <li className="headertext me-1"> {">"} </li>
              <li className="headertext">
                <a
                  className="headertext poppins-regular"
                  onClick={() => handlebreadCrumbworkshop(DataById)}
                >
                  {" "}
                  {capitalizeWords(workshoptitle)}
                </a>
              </li>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row  ">
            <div className="col-md-5 mt-4">
              <iframe
                className="video"
                src={videoLinks?.[0]}
                title={`YouTube video player`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>

              <img
                className="viewsvg1"
                width={250}
                height={250}
                src="../workshop/img4.svg"
              />
            </div>

            <div className="col-md-6 m-auto">
              <div
                className="poppins-regular main_heading categorycolor "
                style={{ fontSize: "16px", fontWeight: "bold" }}
              >
                {capitalizeWords(workshoptitle)}
              </div>

              <div className="poppins-regular textbold ">About</div>
              <ul>
                <div
                  className="poppins-regular"
                  style={{ fontSize: "14px", color: "grey" }}
                  dangerouslySetInnerHTML={{
                    __html: showFullDescription
                      ? DataById?.discription?.[0]
                      : `${DataById?.discription?.[0]?.substring(0, 400)}...`,
                  }}
                />
                <a
                  className="readmore cursor poppins-regular"
                  style={{ position: "relative", zIndex: "6" }}
                  onClick={() => setShowFullDescription(!showFullDescription)}
                >
                  {!showFullDescription ? " Read More..." : " Read Less"}
                </a>
              </ul>
              <div className="row p-3">
                <button
                  className="col-md-6 request-corporat p-2 poppins-regular"
                  style={{ fontSize: "15px" }}
                  onClick={() => setOpen(true)}
                >
                  Request A Proposal
                </button>
              </div>
              <img
                className="viewsvg2"
                width={300}
                height={300}
                src="../workshop/img6.svg"
              />
            </div>
          </div>

          <div className="row m-auto view-reason p-2 mt-3">
            <div className="row PositionR">
              <img
                className="viewsvg3"
                width={250}
                height={250}
                src="../workshop/img6.svg"
              />

              <p
                className="poppins-regular main_heading subtext text_light"
                style={{ fontSize: "15px" }}
              >
                Benefits
              </p>
              <ul>
                <div
                  className="reason poppins-regular"
                  style={{ fontWeight: "bold", fontSize: "14px" }}
                  dangerouslySetInnerHTML={{
                    __html: ShowFullReasonToJoin
                      ? DataById?.reasonToJoin?.[0]
                      : `${DataById?.reasonToJoin?.[0]?.substring(0, 600)}`,
                  }}
                />
              </ul>
              <a
                className=" readmore cursor"
                style={{ position: "relative", zIndex: "1", textAlign: "end" }}
                onClick={() => setShowFullReasonToJoin(!ShowFullReasonToJoin)}
              >
                {!ShowFullReasonToJoin ? " Read More..." : " Read Less"}
              </a>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-4">
              <div
                className=""
                style={{
                  backgroundColor: "#a77a43",
                  padding: "10px",
                  borderRadius: "5px",
                }}
              >
                <div
                  className="text-center poppins-regular"
                  style={{ color: "white" }}
                >
                  Details
                </div>
                <div className="d-flex mt-2">
                  <div className="col-md-2">
                    <img src="../category/view (1).png" width={55} />{" "}
                  </div>
                  <div
                    className="col-md-10 mx-2 poppins-regular d-flex"
                    style={{ alignItems: "center", color: "white" }}
                  >
                    {DataById?.Corporateduration?.min} mins -{" "}
                    {DataById?.Corporateduration?.max} {""}mins
                  </div>
                </div>
                <div className="d-flex mt-2">
                  <div className="col-md-2">
                    <img src="../category/view (2).png" width={55} />
                  </div>
                  <div
                    className="col-md-10 mx-2 poppins-regular d-flex"
                    style={{ alignItems: "center", color: "white" }}
                  >
                    <span className="me-1">{mode.online && "Online"}</span>
                    {mode.online && mode.offline && (
                      <span className="me-1">/</span>
                    )}
                    <span>{mode.offline && "Offline"}</span>
                  </div>
                </div>
                <div className="d-flex mt-2">
                  <div className="col-md-2">
                    <img src="../category/view (3).png" width={55} />{" "}
                  </div>
                  <div
                    className="col-md-10 mx-2 poppins-regular d-flex"
                    style={{ alignItems: "center", color: "white" }}
                  >
                    {DataById?.Minparticipant} - {DataById?.Maxparticipant}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4 mt-3">
              <div
                className=""
                style={{
                  backgroundColor: "#a77a43",
                  padding: "10px",
                  borderRadius: "5px",
                }}
              >
                <div
                  className="text-center poppins-regular"
                  style={{ color: "white" }}
                >
                  Primary Objectives
                </div>

                {primaryObjective?.map((objective, index) => (
                  <div key={index} className="col-md-12 mt-3 corporate-sub">
                    <i className="fa-solid fa-circle-check"></i>
                    <span
                      className=" poppins-regular"
                      style={{ color: "white", fontSize: "14px" }}
                      dangerouslySetInnerHTML={{ __html: objective }}
                    ></span>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-md-4 mt-3 mb-3">
              <div
                className=""
                style={{
                  backgroundColor: "#a77a43",
                  padding: "10px",
                  borderRadius: "5px",
                }}
              >
                <div
                  className="text-center poppins-regular"
                  style={{ color: "white" }}
                >
                  Suitable For
                </div>

                {SuitableFors?.map((objective, index) => (
                  <div key={index} className="col-md-12 mt-3 corporate-sub">
                    <i className="fa-solid fa-circle-check"></i>
                    <span
                      className=" poppins-regular"
                      style={{ color: "white", fontSize: "14px" }}
                      dangerouslySetInnerHTML={{ __html: objective }}
                    ></span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-md-8 m-auto">
            <p
              className="poppins-regular"
              style={{ fontSize: "15px", fontWeight: "bold" }}
            >
              Request A Proposal
            </p>
            <div className="row " style={{}}>
              <Form.Group className="mb-3 col-md-6">
                <Form.Label className="poppins-regular">Full name</Form.Label>
                <Form.Control
                  type="text"
                  name="fullname"
                  value={requestData.fullname}
                  onChange={handleChange}
                  isInvalid={!!errors.fullname}
                  className="poppins-regular"
                />
                <Form.Control.Feedback
                  type="invalid"
                  className="poppins-regular"
                  style={{ fontSize: "14px" }}
                >
                  {errors.fullname}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3 col-md-6">
                <Form.Label className="poppins-regular">
                  Mobile number
                </Form.Label>
                <Form.Control
                  type="text"
                  name="mobileno"
                  value={mobileno}
                  onChange={(e) => setMobileno(e.target.value)}
                  isInvalid={!!errors.mobileno}
                  className="poppins-regular"
                />
                <Form.Control.Feedback
                  type="invalid"
                  className="poppins-regular"
                  style={{ fontSize: "14px" }}
                >
                  {errors.mobileno}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3 col-md-6">
                <Form.Label className="poppins-regular">
                  Company name (optional)
                </Form.Label>
                <Form.Control
                  type="text"
                  name="companyname"
                  value={requestData.companyname}
                  onChange={handleChange}
                  isInvalid={!!errors.companyname}
                  className="poppins-regular"
                />
                <Form.Control.Feedback
                  type="invalid"
                  className="poppins-regular"
                  style={{ fontSize: "14px" }}
                >
                  {errors.companyname}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3 col-md-6">
                <Form.Label className="poppins-regular">
                  Company email address (optional)
                </Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={requestData.email}
                  onChange={handleChange}
                  className="poppins-regular"
                />
                <Form.Control.Feedback
                  type="invalid"
                  className="poppins-regular"
                  style={{ fontSize: "14px" }}
                >
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3 col-md-6 m-auto">
                <Form.Label className="poppins-regular">
                  Tentative Workshop Date (optional)
                </Form.Label>
                <Form.Control
                  type="date"
                  value={workshopDate}
                  onChange={(e) => setWorkshopDate(e.target.value)}
                  isInvalid={!!errors.workshopDate}
                  className="poppins-regular"
                />
                <Form.Control.Feedback
                  type="invalid"
                  className="poppins-regular"
                  style={{ fontSize: "14px" }}
                >
                  {errors.workshopDate}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3 ">
                <Form.Label className="poppins-regular">
                  Message ({requestData?.message?.length})
                </Form.Label>
                <Form.Control
                  as="textarea"
                  name="message"
                  className="poppins-regular"
                  rows={3}
                  value={requestData.message}
                  readOnly={requestData.message?.length >= 3000}
                  onChange={handleChange}
                  isInvalid={!!errors.message || !!MessageLimit}
                  placeholder="Message Limit: 3000 characters"
                />
                <Form.Control.Feedback
                  type="invalid"
                  className="poppins-regular"
                  style={{ fontSize: "14px" }}
                >
                  {errors.message} {MessageLimit}
                </Form.Control.Feedback>
              </Form.Group>

              <div className="row m-auto">
                <button
                  className="poppins-regular submit mt-3 mb-3  m-auto"
                  onClick={handleRequestSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>

          <div className="row m-auto">
            {FilteredWorkshop?.length > 0 && (
              <div className="row m-auto  mt-3 ">
                <div className="row m-auto d-flex">
                  <div className="col-md-3 ">
                    <p className="sub_heading textbold">Similar Workshop</p>
                  </div>
                  <div className="col-md-7"></div>
                  <div className="col-5 col-md-2">
                    <Link to="/category">
                      <button className="col-12 col-md-7 p-1 text-white viewallclient">
                        View All {">>>"}
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="col-md-11 m-auto">
                  <div className="row   index_value">
                    {FilteredWorkshop?.map((Ele) => {
                      return (
                        <div className="col-md-4  mt-4 text-center ">
                          <Link
                            to={handleSimilarWorkshop(Ele)}
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
                            <p className="col-md-8 text-center m-auto sub_heading p-3 ">
                              {Ele.workshopTitle}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* <img
              className="viewsvg5"
              width={250}
              height={250}
              src="../workshop/img6.svg"
            /> */}
                  <img
                    className="viewsvg6"
                    width={250}
                    height={250}
                    src="../workshop/img3.svg"
                  />
                </div>
              </div>
            )}
            {FilteredCategory?.length > 0 && (
              <div className="row mt-5 ">
                <div
                  className=" d-flex"
                  style={{ justifyContent: "space-between" }}
                >
                  <p className="poppins-regular textbold">
                    Our Workshop Categories
                  </p>

                  <Link to="/categorylist">
                    <button className="poppins-regular col-12 col-md-7 p-1 text-white viewallclient">
                      View All {">>>"}
                    </button>
                  </Link>
                </div>

                <div className="row mb-3" style={{ justifyContent: "center" }}>
                  {FilteredCategory?.slice(0, 3).map((Ele) => {
                    return (
                      <div
                        className="col-6  mt-4 text-center"
                        onClick={() => handleCategoryview(Ele)}
                      >
                        <img
                          className="row  p-0   m-auto cursor"
                          src={`https://api.healinggarden.co.in/Category/${Ele?.categoryImage}`}
                          style={{ width: "100px", height: "100px" }}
                        />
                        <p
                          className="poppins-regular  col-md-7 m-auto "
                          style={{ fontSize: "13px" }}
                        >
                          {Ele.category}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <img
                  className="viewsvg6"
                  width={250}
                  height={250}
                  src="../workshop/img3.svg"
                />
              </div>
            )}
            {RecentlyVisited?.length > 0 && (
              <div className="row m-auto  mt-3 ">
                <div className="row m-auto d-flex">
                  <div className="col-md-3 ">
                    <p className="sub_heading textbold">Recently Visited</p>
                  </div>
                  <div className="col-md-7"></div>
                  {/* <div className="col-5 col-md-2">
                <Link to="/category">
                  <button className="col-12 col-md-7 p-1 text-white viewallclient">
                    View All {">>>"}
                  </button>
                </Link>
              </div> */}
                </div>
                <div className="col-md-11 m-auto">
                  <div className="row">
                    {RecentlyVisited?.slice(0, 3)?.map((Ele) => {
                      return (
                        <div className="col-md-4  mt-4 text-center ">
                          <Link
                            to={handleSimilarWorkshop(Ele)}
                            className="text-decoration-none text-black"
                            style={{ cursor: "pointer" }}
                          >
                            <div className="row">
                              <img
                                className="col-md-9 m-auto cursor p-0 "
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
                            <p className="col-md-8 text-center m-auto sub_heading p-3 ">
                              {Ele.workshopTitle}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* <img
                className="viewsvg5"
                width={250}
                height={250}
                src="../workshop/img6.svg"
              /> */}
                  <img
                    className="viewsvg6"
                    width={250}
                    height={250}
                    src="../workshop/img3.svg"
                  />
                </div>
              </div>
            )}
          </div>
          {open && <RequestProposal open={open} setOpen={setOpen} />}
        </div>
      </div>
      <Footer />
      <Mobilefooter />
    </>
  );
}
