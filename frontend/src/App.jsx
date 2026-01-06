import React from "react";
import { createBrowserRouter,RouterProvider,Navigate } from "react-router-dom";
import { Layout } from "./componenets/layout";
import { Home } from "./componenets/home";
import Login from "./componenets/login";
import Register from "./componenets/register";
import Logout from "./componenets/logout";
import { Auth } from "./componenets/auth";

const App = ()=>
{

  const router = createBrowserRouter([
    {
      path:"/",
      element:<Layout/>,
      children:[
        {
          index:true,
          element:<Navigate to={"/register"}/>
        },
        {
          path:"/Home",
          element: <ProtectedRoutes><Home/></ProtectedRoutes>
        },
        
        {
          path:"/logout",
          element:<Logout/>
        }

      ]
    },
    {
      path:"/login",
      element:<Auth><Login/></Auth>
    },
    {
      path:"/register",
      element:<Auth><Register/></Auth>
    }
  ])
  return(
  <>
    <RouterProvider router={router}/>
  
  </>
    
  )
}

export function ProtectedRoutes(props)
{
  if(localStorage.getItem("token"))
  {
    return props.children;
  }
  else
  {
    return <Navigate to={"/login"}/>
  }
}


export default App;