import React, { useContext, useEffect, useState } from "react";
import { Form, Input, message } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Mainauth from "./auth";
import Spinner from "./spinner";



const Register = () => {

    const api_url = import.meta.env.VITE_API_URL;
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    const { isloggedin } = useContext(Mainauth);

    useEffect(() => {
        if(isloggedin) {
            navigate("/home");
        }
    }, [isloggedin, navigate]);

    const submithandler = async (values) => {
    try {
      setLoading(true);
      await axios.post(`${api_url}/register`, values, {
        headers: { "Content-Type": "application/json" },
      });
      setLoading(false);
      message.success("Registered Successfully");
      navigate("/login"); 
    } catch (err) {
      setLoading(false);
      message.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="auth-page">
      {loading && <Spinner/>}
      <div className="auth-card">
        <p className="auth-brand">Expense<span>Tracker</span></p>
        <h2>Create an account</h2>
        <p className="auth-subtitle">Register to start tracking expenses</p>
        <Form layout="vertical" onFinish={submithandler}>
          <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please enter your name" }]}>
            <Input placeholder="Your name" size="large" />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please enter your email" }, { type: "email", message: "Please enter a valid email" }]}>
            <Input type="email" placeholder="you@example.com" size="large" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please enter your password" }]}>
            <Input.Password placeholder="••••••••" size="large" />
          </Form.Item>
          <Form.Item>
            <button type="submit" className="btn btn-primary">Create account</button>
          </Form.Item>
        </Form>
        <p className="auth-footer">
          Already have an account? <NavLink to="/login">Sign in</NavLink>
        </p>
      </div>
    </div>
  );
};

export default Register;
