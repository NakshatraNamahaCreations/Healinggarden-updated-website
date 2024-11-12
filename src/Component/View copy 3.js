import React, { useEffect, useState } from "react";
import {  useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { LineWave } from 'react-loader-spinner';

const capitalizeWords = (str) => {
  return str
    ?.split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default function View() {
  const location = useLocation();
  const { workshoptitle } = useParams();
  const [loading, setLoading] = useState(true);
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const Workshodate = queryParams.get('Workshodate');
  const startTime = queryParams.get('startTime');
  const endTime = queryParams.get('endTime');
  const [Workshop, setWorkshop] = useState(null);
  const [DataById, setDataById] = useState(null);


  useEffect(() => {
    getAllCategory();
    getAllWorkShop();
    getorderdata();
  }, []);

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
        `https://api.healinggarden.co.in/api/workshop/getworkshopbyid/${id}`,
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
  const navigate = useNavigate();

  const safeJsonParse = (jsonString) => {
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return [];
    }
  };
  const [showFullDescription, setShowFullDescription] = useState(false);

  const [ShowFullReasonToJoin, setShowFullReasonToJoin] = useState(false);
  const [categoryData, setcategoryData] = useState();
  const [OrderData, setOrderData] = useState([]);
  const getAllCategory = async () => {
    let response = await axios.get(
      "https://api.healinggarden.co.in/api/category/getcategory"
    );
    let FilterData = response.data.data.find(
      (ele) => ele._id === DataById?.category
    );
    setcategoryData(FilterData);
  };
  const getorderdata = async () => {
    let response = await axios.get(
      "https://api.healinggarden.co.in/api/order/getallorder"
    );
    setOrderData(response.data.data);
  };

  const getAllWorkShop = async () => {
    let response = await axios.get(
      "https://api.healinggarden.co.in/api/workshop/getallworkshop"
    );
    setWorkshop(response.data.data);
  };


  function sortSlots(slots) {
    return slots.sort((a, b) => {
      const dateTimeA = new Date(`${a.Workshodate}T${a.startTime}Z`).getTime();
      const dateTimeB = new Date(`${b.Workshodate}T${b.startTime}Z`).getTime();

      return dateTimeA - dateTimeB;
    });
  }


  function formatAll(dateString, startTime, endTime) {

    let date = new Date(dateString);
    let suffixes = ["th", "st", "nd", "rd"];

    function getSuffix(day) {
      if (day >= 11 && day <= 13) {
        return "th";
      }
      return suffixes[day % 10] || "th";
    }

    function formatDate(date) {
      let daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      let dayOfWeek = daysOfWeek[date.getDay()];
      let dayOfMonth = date.getDate();
      let daySuffix = getSuffix(dayOfMonth);
      let formattedDay = `${dayOfWeek}, ${dayOfMonth}${daySuffix}`;

      let months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
      ];
      let month = months[date.getMonth()];

      return `${formattedDay} ${month}`;
    }

    function formatTime(timeString) {
      let time = new Date(`1970-01-01T${timeString}Z`);
      let hours = time.getUTCHours();
      let minutes = time.getUTCMinutes();
      let ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      return `${hours}:${minutes} ${ampm}`;
    }

    let formattedDate = formatDate(date);
    let formattedStartTime = formatTime(startTime);
    let formattedEndTime = formatTime(endTime);
    return `${formattedDate} at ${formattedStartTime} - ${formattedEndTime}`;
  }
  let workshopSlots = JSON.parse(DataById?.WorkshopSlots);

  const sortedSlots = workshopSlots?.slots ? sortSlots(workshopSlots.slots) : [];

  const defaultSlot = sortedSlots?.find(slot =>
    slot?.Workshodate === Workshodate && slot?.startTime === startTime  && slot?.endTime === endTime
  ) || sortedSlots[0];


  const [viewSlots, setviewSlots] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(defaultSlot);


  const handleSelectDate = (slot) => {
    setSelectedSlot(slot);
  };


  const generateOrderId = (prefix, OrderData) => {
    let nextId = OrderData.length + 1;

    let currentMonth = new Date().getMonth() + 1;

    let currentDate = new Date().getDate();
    let dateRange = `${currentDate}-${currentDate + 1}`;

    return `${prefix}/${currentMonth
      .toString()
      .padStart(2, "0")}/${dateRange}-${nextId}`;
  };



  const handleBookWorkShop = async () => {
    try {
      const userDataStr = localStorage.getItem("HGuserdata");

      if (!userDataStr) {
        alert("Please Login");
        return window.location.assign("/login");
      }
      if (!selectedSlot) {
        alert("Please Select Date");
        return;
      }

      const userData = JSON.parse(userDataStr);
      const userid = userData?._id;
      const username = userData.username;
      const orderId = generateOrderId("HG", OrderData);

      const config = {
        url: "https://api.healinggarden.co.in/api/order/addorder",
        method: "post",
        headers: { "Content-Type": "application/json" },
        data: {
          SelectedDate: selectedSlot,
          item: DataById,
          userId: userid,
          orderStatus: "Pending",
          OrderID: orderId,
          username: username
        },
      };

      const res = await axios(config);

      if (res.status === 200) {
        alert("Your Order Confirmed");
        navigate("/cart", { state: { data: res.data } });
      } else {
        console.error("Failed to add order");
      }
    } catch (error) {
      console.error("Error adding order:", error);
    }
  };
  const languages = safeJsonParse(DataById?.language);
  const videoLinks = DataById?.YouTubeLink ? safeJsonParse(DataById?.YouTubeLink) : [];


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
      <div className="categoryview m-auto row ">
        <hr className="row hr-line" style={{ borderColor: "white" }}></hr>
        <p className="p-1">
          {" "}
          <a className="footertext" href="/">Home</a>
          {">"}  <a href="/individual" className="footertext">For Individuals</a> {">"} {DataById?.category} {">"}{" "}
          {capitalizeWords(workshoptitle)}
        </p>
      </div>
      <div className="row m-auto mt-5 ">
        <div className="col-md-6 PositionR">
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
            </div></div>
          <div className="row m-auto textbold inter">
            <p className="sub_heading m-auto textbold ">Schedule</p>
            {workshopSlots?.sessionType === "One Session" && (
              <div
                key={workshopSlots?.slots?.[0]?.startTime}
                className={`slot-item ${selectedSlot?.startTime === workshopSlots?.slots[0].startTime ? 'selected' : ''}`}
                onClick={() => handleSelectDate(workshopSlots?.slots?.[0])}
              >
                {formatAll(workshopSlots?.slots[0]?.Workshodate, workshopSlots?.slots[0]?.startTime, workshopSlots?.slots[0]?.endTime)}
              </div>
            )}
            {workshopSlots?.sessionType === "Multiple Sessions" && (
              <div className="row">
                {!viewSlots
                  ? sortedSlots.slice(0, 3).map((ele) => (
                    <div
                      key={`${ele.Workshodate}-${ele.startTime}`}
                      className={`col-md-2 m-auto slot-item text-center ${selectedSlot?.startTime === ele.startTime && selectedSlot?.Workshodate === ele.Workshodate ? 'selected' : ''}`}
                      onClick={() => handleSelectDate(ele)}
                    >
                      {formatAll(ele.Workshodate, ele.startTime, ele.endTime)}
                    </div>
                  ))
                  :
                  sortedSlots.map((ele) => (
                    <div
                      key={`${ele.Workshodate}-${ele.startTime}`}
                      className={`col-md-2 m-auto slot-item text-center ${selectedSlot?.startTime === ele.startTime && selectedSlot?.Workshodate === ele.Workshodate ? 'selected' : ''}`}
                      onClick={() => handleSelectDate(ele)}
                    >
                      {formatAll(ele.Workshodate, ele.startTime, ele.endTime)}
                    </div>
                  ))
                }

              </div>
            )}
          </div>

          {workshopSlots.slots.length > 3 && (
            <a
              className="readmore cursor"
              onClick={() => setviewSlots(!viewSlots)}
            >
              {!viewSlots ? "More" : "Less"}
            </a>
          )}
          <img
            className="viewsvg1"
            width={250}
            height={250}
            src="../workshop/img4.svg"
          />
        </div>

        <div className="col-md-6 ">
          <p className="main_heading categorycolor sourc">
            {DataById?.workshopTitle}
          </p>
          <p className="sub_sub_heading  m-auto">
            <span>
              {languages.map((ele, index) => (
                <span key={index} className="me-1">
                  {ele.name}
                  {index < languages.length - 1 && ","}
                </span>
              ))}

            </span> | {DataById?.minAge}yrs | Location:{" "}
            <a href={DataById?.gMapDirection}>Go</a>
          </p>
          <p className="sub_sub_heading  ">
            {DataById?.sessionAddress}

          </p>
          <p className="sub_heading textbold inter">About</p>
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
              style={{ position: "relative", zIndex: "10" }}
              onClick={() => setShowFullDescription(!showFullDescription)}
            >
              {!showFullDescription ? " Read More..." : " Read Less"}
            </a>
          </ul>
          <div className="row">
            <button
              className="col-md-4 book-now p-1"
              onClick={handleBookWorkShop}
            >
              <p className="m-auto inter textbold">
                Rs.{DataById?.OfferPrice}/-
              </p>
              <p className="m-auto inter textbold">Book Now</p>
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

          <p className="main_heading subtext text_light">Reasons to join</p>

          <ul>
            <div
              className="reason"
              dangerouslySetInnerHTML={{
                __html: ShowFullReasonToJoin
                  ? DataById?.reasonToJoin?.[0]
                  : `${DataById?.reasonToJoin?.[0].substring(0, 100)}...`,
              }}
            />
          </ul>
          <a
            className="col-md-2 readmore cursor"
            style={{ position: "relative", zIndex: "1" }}
            onClick={() => setShowFullReasonToJoin(!ShowFullReasonToJoin)}
          >
            {!ShowFullReasonToJoin ? " Read More..." : " Read Less"}
          </a>
        </div>
        <div className="row mt-5">
          <p className="main_heading subtext text_light">Terms & Condition</p>
          <ul>

            {
              DataById?.terms?.map((term, index) => (
                <p
                  key={index}
                  className="reason text_light"
                  dangerouslySetInnerHTML={{ __html: term }}
                />
              ))
            }
          </ul>
        </div>

      </div>

    </>
  );
}