import React, { useState, useEffect } from "react";
import { Navbar, Nav, NavDropdown, Form, Dropdown, Container } from "react-bootstrap";
import { IoCallOutline } from "react-icons/io5";
import { FaShoppingBag } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import RequestProposal from "../Request";

export default function Header() {
  const [isSticky, setSticky] = useState(false);
  const [categoryData, setcategoryData] = useState([]);
  const [Workshop, setWorkshop] = useState([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    getAllCategory();
    getAllWorkShop();
  }, []);
  const getAllCategory = async () => {
    let response = await axios.get(
      "https://api.healinggarden.co.in/api/category/getcategory"
    );
    let data = response.data.data.sort((a, b) => a.order - b.order);

    setcategoryData(data);
  };
  const getAllWorkShop = async () => {
    let response = await axios.get(
      "https://api.healinggarden.co.in/api/workshop/getallworkshop"
    );
    if (searchValue) {
      let value = searchValue.toLowerCase();
      let filterData = response.data.data.filter((ele) =>
        ele.productName?.includes(value)
      );
      setWorkshop(filterData);
    } else {
      setWorkshop(response.data.data);
    }
  };

  const userDataStr = localStorage.getItem("HGuserdata");
  const userid = JSON.parse(userDataStr)?._id;
  const [AllOrderData, setAllOrderData] = useState([]);
  useEffect(() => {
    if (userid) {
      getorderdata();
    }
  }, [userid]);

  const getorderdata = async () => {
    try {
      const response = await axios.get(
        "https://api.healinggarden.co.in/api/order/getallorder"
      );

      setAllOrderData(response.data.data);
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  const [searchValue, setsearchValue] = useState("");



  const generatePathname = (category) => {
    return `/category/${category.toLowerCase().replace(/ /g, "-")}`;
  };

  const generatePathname = (data) => {
    return {
      pathname: `/corporate-view/${data.workshopTitle.toLowerCase().replace(/ /g, "-")}`,
      search: `?id=${data._id}`
    };
  };
  return (
    <>
      <div
        className={`row p-2 m-auto Sticky-header ${isSticky ? "sticky" : ""}`}
      >
        <p
          className={`main_heading m-auto text-center f-25 ${isSticky ? "hide" : ""
            }`}
        >
          Enhancing Mental & Social Wellness!
        </p>
      </div>

      <div className={`row m-auto subheading p-2 ${isSticky ? "sticky" : ""}`}>
        <Navbar collapseOnSelect expand="lg">
          <Container>
            <Navbar.Brand href="/">
              <div className="me-5" >
                <img src="../workshop/HealingGardenLogo.png"
                  height={50} width="100%" />
              </div>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/about" className="text-li m-auto me-3">
                  About
                </Nav.Link>

                <NavDropdown
                  title="Workshops"
                  className="text-li me-3"
                  id="collapsible-nav-dropdown"
                >
                  {categoryData.map((ele) => (
                    <Link
                      to={{
                        pathname: generatePathname(ele.category),
                      }}
                      className="text-decoration-none text-black p-0 m-0"
                      style={{ cursor: "pointer" }}
                    >

                      <p className="p-0 m-0">{ele.category}</p>
                    </Link>

                  ))}
                </NavDropdown>

                <Nav.Link href="/gallery" className="text-li m-auto me-3">
                  Gallery
                </Nav.Link>
                <Nav.Link href="/individual" className="text-li m-auto me-3">
                  For Individuals
                </Nav.Link>


                <NavDropdown
                  title="More"
                  className="text-li me-3"
                  id="navbarScrollingDropdown"
                >
                  <Dropdown.Item href="/private-parties"> Private Parties</Dropdown.Item>
                  <Dropdown.Item href="/volunteer">Volunteer</Dropdown.Item>
                  <Dropdown.Item href="/careers">Career</Dropdown.Item>
                  <Dropdown.Item href="/blog">Blog</Dropdown.Item>
                </NavDropdown>
                <Nav.Link href="/contact-us" className="text-li m-auto me-3" >
                  Contact Us
                </Nav.Link>


              </Nav>

              <Nav>
                <Nav.Link
                  onClick={() => setOpen(true)}
                  className="request-proposal  text-center text-li  p-2"
                >
                  Request A Proposal
                </Nav.Link>

                <Nav.Link
                  eventKey={2}
                  href="tel:+9620520200"
                  className="ms-2 text-li"
                >
                  <span className="call-icon p-1">
                    <IoCallOutline />
                  </span> 9620520200
                </Nav.Link>
                <Nav.Link
                  className="text-li"
                  eventKey={2}
                  href={`${AllOrderData.length === 0 ? "/individual" : "/cart"} `}
                >
                  <span className="call-icon p-1">
                    <FaShoppingBag /></span>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse></Container>
        </Navbar>
        {open && <RequestProposal open={open} setOpen={setOpen} />}
      </div>
    </>
  );
}
