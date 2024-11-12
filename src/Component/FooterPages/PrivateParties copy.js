
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { Helmet } from "react-helmet";

import { TfiEmail } from "react-icons/tfi";
export default function PrivateParties() {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/919620520200", "_blank");
  };
  return (
    <>  <Header/>
      <div className="categoryview m-auto row">
        <hr className="row hr-line" style={{ borderColor: "white" }}></hr>
        <p className="p-1"> Home {">"} Private Parties</p>
      </div>
      <div className="row m-auto p-2 ">
        <p className="about-us sourc">Private Parties</p>
      </div>
      <div className="col-md-12 ">

        <img
          className="d-block w-100 PositionR"
          height="100%"
          src="../clients/team/party.png"
          alt="banner"
        />

      </div>
      <div className="container">
        <div className="row m-auto">
          <p className="col-md-10 m-auto fs_25">Transform Your Private Party with Our Unique
            Workshops & Bulk Gifting!</p>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="row m-auto">
              <div className="col-md-4 ">
                <img width="200" src="./Party/party (6).png" />
              </div>
              <div className="col-md-4 ">
                <img width="200" className="party1" src="./Party/party (10).png" />  </div>
            </div>
            <div className="row mt-5">
              <div className="col-md-4 mt-5">
                <img width="200" src="./Party/party (7).png" />   </div>
              <div className="col-md-4 mt-5">
                <img width="200" className="party1" src="./Party/party (4).png" />
              </div>
            </div>


          </div>
          <div className="col-md-6">
            <p className="sub_heading">
              Looking to add a special touch to
              your next private party? Our
              exclusive workshops are the
              perfect way to engage and
              entertain your guests while
              creating unforgettable memories.
              Whether it's a birthday
              celebration, bridal shower, or any
              special occasion, we offer a
              variety of hands-on experiences
              tailored to your event. From art
              and crafts, terrarium & fairy
              garden making to magic shows and
              wellness sessions, our expert
              instructors will guide your guests
              through fun and interactive
              activities. Book our workshops
              today and turn your private party
              into an extraordinary experience
              filled with creativity, learning, and
              laughter!
            </p>
          </div>
        </div>
        <div className="row mt-5 " >
          <div className="col-md-4 m-auto mb-5">
            <div className="row m-auto mb-5">
              <div className="col-md-4 mt-5">

                <img width="200" src="./Party/party (1).png" /></div>
              <div className="col-md-4 mt-5">

                <img width="200" className="party2" src="./Party/party (3).png" />
              </div>
            </div>
          </div>


          <div className="col-md-4 m-auto mb-5">
            <div className="row m-auto mb-5">
              <div className="col-md-4">

                <img width="200" src="./Party/party (5).png" />  </div>
              <div className="col-md-4">
                <img width="200" className="party2" src="./Party/party (2).png" />
              </div>

            </div>
          </div>
          <div className="col-md-4 m-auto mb-5">
            <div className="row m-auto mb-5">
              <div className="col-md-4">

                <img width="200" src="./Party/party (8).png" /> </div>
              <div className="col-md-4">

                <img width="200" className="party2" src="./Party/party (9).png" />
              </div>
            </div>
          </div>
        </div>

        <div className="row m-auto text-center mt-5">
          <a href="https://www.healinggarden.co.in/categorylist" className="m-auto" >
            <button className="col-md-5 m-auto request-corporat">Check Out Workshop Categories</button></a>
        </div>
        <div className="row">
          <p className="Main_heading">Contact Us</p>
          <p className="sub_heading">WhatsApp or email us your resume if you find yourself relevant for
            the above listed opportunity. </p>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="row">
              <div className="col-md-1">
                <TfiEmail className="fs_15 m-auto" />
              </div>
              <div className="col-md-8">
                <p className="sub_heading m-auto">HealingGarden4All@gmaill.com</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-1">
                <img width={30} className="m-auto" onClick={handleWhatsAppClick} src="../photos/icons8-whatsapp-48.png" alt="WhatsApp" />
              </div>
              <div className="col-md-8">
                <p className="sub_heading m-auto">+91 96205 20200</p>
              </div>
            </div>



          </div>
          <div className="col-md-8"></div>
        </div>
      </div>
    </>
  );
}
