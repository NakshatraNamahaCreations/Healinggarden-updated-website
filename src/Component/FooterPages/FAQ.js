

import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { Helmet } from "react-helmet";

export default function FAQ() {
  return (
    <>  <Helmet>
    <title>Frequently Asked Questions (FAQ) | Healing Garden India</title>
    <meta name="description" content="Visit our Frequently Asked Questions (FAQ) section for convenient access to essential information." />
    <meta name="keywords" content="FAQ, frequently asked questions, healing garden FAQ" />
    <meta property="og:title" content="Frequently Asked Questions (FAQ) | Healing Garden India" />
    <meta property="og:description" content="Visit our Frequently Asked Questions (FAQ) section for convenient access to essential information." />
    <meta property="og:image" content="URL-to-your-image" />
    <link rel="canonical" href="http://www.healinggarden.co.in/faq" />
  </Helmet><Header/>
      <div className="categoryview m-auto row">
        <hr className="row hr-line" style={{ borderColor: "white" }}></hr>
        <p className="p-1"> Home {">"} FAQ</p>
      </div>
      <div className="row m-auto p-2 ">
        <p className="about-us sourc">FAQ</p>
      </div>
      <div className="row m-auto">
       Coming Soon...
      </div><Footer/>
    </>
  );
}
