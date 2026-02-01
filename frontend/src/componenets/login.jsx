import React, { useContext, useEffect, useState } from "react";
import { Form, Input, message } from "antd";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import Mainauth from "./auth";
import Spinner from "./spinner";

const Login = ()=>
{
    const navigate = useNavigate();
    const { login, isloggedin } = useContext(Mainauth);
    const api_url = import.meta.env.VITE_API_URL;
    const [loading,setLoading] = useState(false);
    
    async function submithandler(value)
    {   
        try
        {
            setLoading(true);
            const response = await axios.post(`${api_url}/login`,value);
            setLoading(false);
            message.success("User Logined Successfully");
            // Use login function from context to update auth state
            // Backend returns jwttoken, not token
            login(response.data.jwttoken, response.data.user);
            navigate("/home");
        }
        catch(err)
        {
            setLoading(false);
            message.error("There was an issue during login");
        }
    }

    useEffect(()=>
        {
        if(isloggedin)
        {
            navigate("/home");
        }
    },[isloggedin, navigate]);

    return (
        <div className="auth-page">
            {loading && <Spinner/>}
            <div className="auth-card">
                <p className="auth-brand">Expense<span>Tracker</span></p>
                <h2>Welcome back</h2>
                <p className="auth-subtitle">Sign in to your account</p>
                <Form layout="vertical" onFinish={submithandler}>
                    <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please enter your email" }]}>
                        <Input type="email" placeholder="you@example.com" size="large" />
                    </Form.Item>
                    <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please enter your password" }]}>
                        <Input.Password placeholder="••••••••" size="large" />
                    </Form.Item>
                    <Form.Item>
                        <button type="submit" className="btn btn-primary">Sign in</button>
                    </Form.Item>
                </Form>
                <p className="auth-footer">
                    Don&apos;t have an account? <NavLink to="/register">Register</NavLink>
                </p>
            </div>
        </div>
    )
}

export default Login;