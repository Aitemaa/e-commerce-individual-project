import React from "react";
import ReactDOM from "react-dom/client";
import { Outlet, createBrowserRouter, redirect } from "react-router-dom";
import Navbar from "./components/navbar.jsx";
import Home from "./pages/Home.jsx";
import App from "./App.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Cart from "./pages/Cart.jsx";
import AddProductToCart from "./pages/AddProductToCart.jsx";
import { UserDetail } from "./pages/UserDetail.jsx";

const router = createBrowserRouter([

  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/login",
    element: <Login />,
    loader: () => {
      const token = localStorage.getItem('access_token');
      if (token) return redirect('/');
      return null
    }
  },
  {
    path: "/",
    element: (
      <div className="container-fluid min-h-screen m-0 p-0">
        <Navbar />
        <Outlet />
      </div>
    ),
    loader: () => {
      const token = localStorage.getItem('access_token');
      if (!token) return redirect('/login');
      return null
    },
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/myCart',
        element: <Cart />
      },
      {
        path: '/addProduct/:id',
        element: <AddProductToCart />
      },
      {
        path: '/profile',
        element: <UserDetail />
      },
    ]
  },

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App router={router} />
  </React.StrictMode>
);
