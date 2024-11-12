import React, { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { Form } from "react-bootstrap";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { Helmet } from "react-helmet";

import axios from "axios";
import { useNavigate } from "react-router-dom";
function Signup() {
  const navigate = useNavigate();

  const [FormData, setFormData] = useState({
    usertype: "",
    email: "",
    password: "",
    cpassword: "",
    username: "",
  });

  const handleRegister = async () => {
    if (
      !FormData.usertype ||
      !FormData.email ||
      !FormData.password ||
      !FormData.cpassword
    ) {
      return alert("Please fill out all fields");
    }
    try {
      let config = {
        url: "https://api.healinggarden.co.in/api/user/adduser",
        method: "post",
        headers: { "Content-Type": "application/json" },
        data: {
          usertype: FormData.usertype,
          email: FormData.email,
          password: FormData.password,
          cpassword: FormData.cpassword,
          username: FormData.username,
        },
      };
      let res = await axios(config);
      if (res.status === 200 || res.data.success) {
        alert("Signed in Succesfully");
        window.location.href = "/login";
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert("Error: " + error.response.data.message); // Specific error message from the server
      } else {
        alert("Error: Something went wrong"); // Fallback generic error message
      }
    }
  };
  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData((prevedata) => ({
      ...prevedata,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="row m-auto mt-2 p-5">
        <div className="col-md-4 m-auto login-container ">
          <div className="right-side">
            <div className="row m-auto text-center shadow p-4">
              <h4 className="mt-3 ">Register</h4>
              <div className="inputlogin ">
                <Form.Control
                  type="text"
                  className="form-control mb-3"
                  placeholder="Your name"
                  name="username"
                  value={FormData.username}
                  onChange={handleChange}
                />
                <Form.Select
                  type="text"
                  className="form-control mb-3"
                  placeholder="Name"
                  name="usertype"
                  value={FormData.usertype}
                  onChange={handleChange}
                >
                  <option>Select</option>
                  <option value="Individuals">Individuals</option>
                  <option value="Corporate">Corporate</option>
                </Form.Select>
                <Form.Control
                  type="text"
                  className="form-control mb-3"
                  placeholder="Email"
                  name="email"
                  value={FormData.email}
                  onChange={handleChange}
                />
                <Form.Control
                  type="password"
                  className="form-control mt-4"
                  placeholder="Password"
                  name="password"
                  value={FormData.password}
                  onChange={handleChange}
                />
                <Form.Control
                  type="password"
                  className="form-control mt-4"
                  placeholder="Confirm Password"
                  name="cpassword"
                  value={FormData.cpassword}
                  onChange={handleChange}
                />
              </div>

              <div className="text-center pt-3">
                <Button
                  style={{
                    width: "200px",
                    padding: "4px",
                    backgroundColor: "#10b981",
                    border: "none",
                    fontWeight: "bold",
                  }}
                  onClick={handleRegister}
                >
                  Signup
                </Button>
              </div>
              {/* <p
            style={{
              fontSize: "12px",
              marginTop: "10px",
              textAlign: "center",
            }}
          >
            <b>Never share your login details with anyone.</b>
          </p> */}
            </div>
          </div>
        </div>
      </div>{" "}
    </>
  );
}

export default Signup;
