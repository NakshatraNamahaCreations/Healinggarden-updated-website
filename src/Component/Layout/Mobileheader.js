import React, { useState, useEffect } from "react";
import { Navbar, Dropdown, Container, Badge } from "react-bootstrap";
import { IoCallOutline } from "react-icons/io5";
import { FaShoppingBag, FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

function Mobileheader() {
  const [isSticky, setSticky] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [workshopData, setWorkshopData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [allOrderData, setAllOrderData] = useState([]);
  const [open, setOpen] = useState(false);

  const userData = JSON.parse(localStorage.getItem("HGuserdata"));
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartItemCount = cartItems.length;
  const navigate = useNavigate();

  const userId = userData?._id;

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    fetchCategories();
    fetchWorkshops();
    if (userId) fetchOrders();
  }, [userId]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://api.healinggarden.co.in/api/category/getcategory"
      );
      const sortedData = response.data.data.sort((a, b) => a.order - b.order);
      setCategoryData(sortedData);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchWorkshops = async () => {
    try {
      const response = await axios.get(
        "https://api.healinggarden.co.in/api/workshop/getallworkshop"
      );
      const filteredData = searchValue
        ? response.data.data.filter((workshop) =>
            workshop.productName
              ?.toLowerCase()
              .includes(searchValue.toLowerCase())
          )
        : response.data.data;
      setWorkshopData(filteredData);
    } catch (error) {
      console.error("Error fetching workshops:", error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "https://api.healinggarden.co.in/api/order/getallorder"
      );
      setAllOrderData(response.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("HGuserdata");
    navigate("/");
  };

  const generatePathname = (category) => {
    return `/category/${category.toLowerCase().replace(/ /g, "-")}`;
  };

  return (
    <div className="">
      <div
        className={`d-flex mobile_header  p-2  ${isSticky ? "sticky" : ""}`}
        // style={{ backgroundColor: "green" }}
        style={{ justifyContent: "center" }}
      >
        <div
          className={`poppins-regular text-center  ${isSticky ? "hide" : ""}`}
        >
          Enhancing Mental & Social Wellness!
        </div>
      </div>

      <div
        className="row  mobile_header"
        style={{
          justifyContent: "space-between",
          backgroundColor: "#50673b",
          padding: "15px",
          width: "103%",
        }}
      >
        <div className="col-8">
          <Link to="/">
            <img
              src="../workshop/HealingGardenLogo.png"
              alt="Healing Garden Logo"
              style={{ width: "60px", height: "50px" }}
            />
          </Link>
        </div>
        <div className="col-4 d-flex" style={{ justifyContent: "end" }}>
          <Link
            to={allOrderData.length === 0 ? "/individual" : "/cart"}
            className="text-light"
          >
            <span className="position-relative">
              <FaShoppingBag size={22} style={{ marginTop: "9px" }} />
              {cartItemCount > 0 && (
                <Badge
                  pill
                  bg="danger"
                  className="position-absolute top-0 start-100 translate-middle"
                >
                  {cartItemCount}
                </Badge>
              )}
            </span>
          </Link>

          <Dropdown align="end" className="ms-3">
            <Dropdown.Toggle variant="light" id="user-menu">
              <FaUserCircle size={25} />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/Bookings">
                My Bookings
              </Dropdown.Item>
              {userData ? (
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              ) : (
                <Dropdown.Item as={Link} to="/login">
                  Login
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}

export default Mobileheader;
