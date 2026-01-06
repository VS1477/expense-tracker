import React, { useContext, useEffect } from "react";
import {Form,Input, message} from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Mainauth from "./auth";

const Login = ()=>
{
    const navigate = useNavigate();
    const { login, isloggedin } = useContext(Mainauth);
    const api_url = import.meta.env.VITE_API_URL;
    
    async function submithandler(value)
    {   
        try
        {
            const response = await axios.post(`${api_url}/login`,value);
            message.success("User Logined Successfully");
            // Use login function from context to update auth state
            // Backend returns jwttoken, not token
            localStorage.setItem("user",JSON.stringify(response.data.user));
            login(response.data.jwttoken);
            navigate("/home");
        }
        catch(err)
        {
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

    return(
        <>
            <div className="login-page">
                
                <Form layout="vertical" onFinish={submithandler}>
                    <h2>Login Page</h2>
                    <Form.Item label="E-mail" name="email">
                        <Input type="email"/>
                    </Form.Item>
                    <Form.Item label="Password" name="password">
                        <Input type="password"/>
                    </Form.Item>
                    <div className="d-flex justify-content-between">
                            <button className="btn btn-primary">Login</button>
                        </div>
                </Form>
            </div>
        </>
    )
}

export default Login;