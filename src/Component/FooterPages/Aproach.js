import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { Helmet } from "react-helmet";

export default function Approach() {
  return (
    <>
    <Header/>
      <div className="categoryview m-auto row">
        <hr className="row hr-line" style={{ borderColor: "white" }}></hr>
        <p className="p-1"> Home {">"} Approach</p>
      </div>
      <div className="row m-auto p-2 ">
        <p className="about-us sourc">Approach</p>
      </div>
      <div className="row m-auto">
       Coming Soon...
      </div><Footer/>
    </>
  );
}
