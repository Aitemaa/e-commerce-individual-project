import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import axiosInstance from "../utils/axios";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  async function handleCredentialResponse(response) {
    try {
      console.log("Encoded JWT ID token: " + response.credential);
      const googleToken = response.credential;
      console.log({googleToken})
      const {data} = await axiosInstance({
        method: 'post',
        url: '/googleLogin',
        data: {googleToken}
        
      })
      localStorage.setItem("access_token", data.access_token)
      nav('/')
    } catch (error) {
      console.log(error)
    }

  }
  useEffect(() => {

      window.google.accounts.id.initialize({
        client_id: "696766713892-4ga56n66g0qnmqfihmd2k2v0660d868u.apps.googleusercontent.com",
        callback: handleCredentialResponse
      });
      window.google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large" }  
      );
      window.google.accounts.id.prompt(); 
  }, [])

  const handleSubmit = async (event) => {
      event.preventDefault()
      try {
          let {data} = await axiosInstance({
              method: 'post',
              url:'/login',
              data: {
                  email: email,
                  password: password
              }
          })
          localStorage.setItem("access_token", data.access_token)
          nav('/')
      } catch (error) {
          console.log(error)
          toast.error(error.response?.data.message || error.message, {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              });
      }
  }
  return (
    <div className="container-fluid flex w-full h-screen justify-center items-center">
      <div className="container login__container flex flex-col mx-auto bg-white">
        <div className="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
          <div className="flex items-center justify-center w-full lg:p-12">
            <div className="flex items-center xl:p-10">
              <form onSubmit={handleSubmit} className="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl">
                <h3 className="mb-3 text-4xl font-extrabold text-dark-grey-900">
                  Sign In
                </h3>
                <p className="mb-4 text-grey-700">
                  Enter your email and password
                </p>
                <div id="buttonDiv"></div>
                <div className="flex items-center mb-3">
                  <hr className="h-0 border-b border-solid border-grey-500 grow" />
                  <p className="mx-4 text-grey-600">or</p>
                  <hr className="h-0 border-b border-solid border-grey-500 grow" />
                </div>
                <label
                  htmlFor="email"
                  className="mb-2 text-sm text-start text-grey-900"
                >
                  Email*
                </label>
                <input
                  id="email"
                  type="email"
                  onChange={(event => setEmail(event.target.value))} 
                  placeholder="mail@loopple.com"
                  className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
                />
                <label
                  htmlFor="password"
                  className="mb-2 text-sm text-start text-grey-900"
                >
                  Password*
                </label>
                <input
                  id="password"
                  type="password"
                  onChange={(event => setPassword(event.target.value))} 
                  placeholder="Enter a password"
                  className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
                />
                <button type='submit' className="w-full px-6 py-5 mb-5 text-sm font-bold leading-none text-black transition duration-300 md:w-96 rounded-2xl hover:bg-purple-blue-600 focus:ring-4 focus:ring-purple-blue-100 bg-purple-blue-500">
                  Sign In
                </button>
                <p className="text-sm leading-relaxed text-grey-900">
                  Not registered yet?{" "}
                  <Link
                    to={'/register'}
                    className="font-bold text-grey-700"
                  >
                    Create an Account
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
