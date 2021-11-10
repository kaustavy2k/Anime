import React, { Component, useState } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import LoadingOverlay from "react-loading-overlay";
import { Spinner } from "react-bootstrap";
import "./Login.css";
function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [msg, setmsg] = useState("");
  const [loading, setloading] = useState(false);
  const [navigate, setnavigate] = useState(false);
  let submitHandler = (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    setloading(true);
    console.log(process.env.REACT_APP_API_URL)
    axios
      .post(`${process.env.REACT_APP_API_URL}/login`, data, {
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
        setloading(false);
      })
      .catch((err) => {
        setloading(false);
        setmsg(err.response.data.message);
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
            <form onSubmit={submitHandler}>
              <h3>Login</h3>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email"
                  onChange={(e) => setemail(e.target.value)}
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
                <h5 className="display-error">{msg}</h5>
              </div>
              <button className="btn btn-primary btn-block">Login</button>
              <Link to="/signup" className="btn btn-danger btn-block">
                Signup
              </Link>
            </form>
          </div>
        </div>
      </LoadingOverlay>
    </React.Fragment>
  );
}
export default Login;
