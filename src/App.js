import "./App.css";
import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Component/Layout/Home";
import Categorylist from "./Component/Layout/Categorylist";
import Workshopdetails from "./Component/Workshopdetails";
import About from "./Component/About";
import ForIndividual from "./Component/ForIndividual";
import View from "./Component/View";
import Cart from "./Component/Cart";
import ClientServed from "./Component/ClientServed";
import Testimonials from "./Component/Testimonials";
import Approach from "./Component/FooterPages/Aproach";
import Blog from "./Component/FooterPages/Blog";
import Careers from "./Component/FooterPages/Careers";
import ContactUs from "./Component/FooterPages/ContactUs";
import FAQ from "./Component/FooterPages/FAQ";
import Gallary from "./Component/FooterPages/Gallary";
import PrivateParties from "./Component/FooterPages/PrivateParties";
import Volunteer from "./Component/FooterPages/Volunteer";
import Login from "./Component/FooterPages/Login";
import Signup from "./Component/FooterPages/SignUp";
import RequestProposal from "./Component/Request";
import Terms from "./Component/FooterPages/Terms";
import PrivacyPolicy from "./Component/FooterPages/Privacy";
import CancellationAndRefund from "./Component/FooterPages/Refund";
import CorporateView from "./Component/CorporateView";
import ToasterComponent from "./Component/FooterPages/ToasterComponent";
import Checkout from "./Component/checkout";
import CategoryView from "./Component/Layout/CategoryView";
import PaymentSuccess from "./Component/Paymentsuccess";
import Bookings from "./Component/Bookings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:category" element={<CategoryView />} />
        <Route path="/view/:data" element={<View />} />
        <Route path="/categorylist" element={<Categorylist />} />
        <Route path="/Workshopdetails" element={<Workshopdetails />} />
        <Route path="/individual" element={<ForIndividual />} />
        <Route path="/about" element={<About />} />
        <Route path="/client-served" element={<ClientServed />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/approach" element={<Approach />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/gallery" element={<Gallary />} />
        <Route path="/private-parties" element={<PrivateParties />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/terms-and-conditions" element={<Terms />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route
          path="/cancellation-and-refund-policy"
          element={<CancellationAndRefund />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/request" element={<RequestProposal />} />
        <Route path="/checkout" element={<Checkout />} />

        <Route path="/Paymentsuccess" element={<PaymentSuccess />} />
        <Route path="/Bookings" element={<Bookings />} />
        <Route
          path="/corporate-view/:workshoptitle"
          element={<CorporateView />}
        />
      </Routes>
      <ToasterComponent />
    </BrowserRouter>
  );
}

export default App;
