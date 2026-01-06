import React, { useContext, useEffect } from "react";
import { Form, Input, message } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Mainauth from "./auth";



const Register = () => {

    const api_url = import.meta.env.VITE_API_URL;
    console.log("API URL:", api_url);

    const navigate = useNavigate();
    const { isloggedin } = useContext(Mainauth);

    useEffect(() => {
        if(isloggedin) {
            navigate("/home");
        }
    }, [isloggedin, navigate]);

    const submithandler = async (values) => {
    try {
      await axios.post(`${api_url}/register`, values, {
        headers: { "Content-Type": "application/json" },
      });

      message.success("Registered Successfully");
      navigate("/login"); 
    } catch (err) {
      message.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="register-page">
      <Form layout="vertical" onFinish={submithandler}>
        <h2>Register Page</h2>

        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="E-mail" name="email" rules={[{ required: true }]}>
          <Input type="email" />
        </Form.Item>

        <Form.Item label="Password" name="password" rules={[{ required: true }]}>
          <Input type="password" />
        </Form.Item>

        <div className="d-flex justify-content-between">
          <NavLink to="/login">Already a user? Login</NavLink>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </div>
      </Form>
    </div>
  );
};

export default Register;
