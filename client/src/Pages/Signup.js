import React, { Component, useState } from "react";
import axios from "axios";
import "./Signup.css";
import LoadingOverlay from "react-loading-overlay";
import { Spinner } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
function Signup(props) {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const [loading, setloading] = useState(false);
  const [name, setname] = useState("");
  const [navigate, setnavigate] = useState(false);
  const [msg, setmsg] = useState({ e: "", m: "" });
  let submitHandler = (e) => {
    const data = {
      email: email,
      password: password,
      passwordConfirm: cpassword,
      name: name,
    };
    setloading(true)
    axios
      .post(`${process.env.REACT_APP_API_URL}/signup`, data, {
        withCredentials: true,
      })
      .then((res) => {
        localStorage.setItem(
          "isAuthenticated",
          JSON.stringify({
            id: res.data.data.user._id,
            email: res.data.data.user.email,
          })
        );
        setnavigate(true);
        setloading(false)
      })
      .catch((err) => {
        setloading(false)
        let e = err.response.data.message.errors.email?.message;
        let m = err.response.data.message.errors.passwordConfirm?.message;
        setmsg({ e, m });
      });
  };
  return (
    <React.Fragment>
      <LoadingOverlay
        active={loading}
        spinner={<Spinner animation="grow" variant="primary" size="lg" />}
      >
        {navigate ? <Navigate to="/" /> : ""}
        <div className="auth-wrapper">
          <div className="auth-inner">
            <div>
              <h3>SignUp</h3>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email"
                  onChange={(e) => setemail(e.target.value)}
                />
                <h5 className="display-error">{msg.e}</h5>
              </div>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="name"
                  className="form-control"
                  placeholder="Name"
                  onChange={(e) => setname(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={(e) => setpassword(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={(e) => setcpassword(e.target.value)}
                />
                <h5 className="display-error">{msg.m}</h5>
              </div>
              <button
                className="btn btn-primary btn-block"
                onClick={submitHandler}
              >
                SignUp
              </button>
              <Link to="/login" className="btn btn-danger btn-block">
                Login
              </Link>
            </div>
          </div>
        </div>
      </LoadingOverlay>
    </React.Fragment>
  );
}
export default Signup;
