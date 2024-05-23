import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios";
import { toast } from "react-toastify";

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
        await axiosInstance({
            method: 'post',
            url:'/register',
            data: {
                email: email,
                password: password
            }
        })
        nav('/login')
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
    <>
    <div className="container-fluid flex w-full h-screen justify-center items-center">
      <div className="container flex flex-col mx-auto bg-white pt-12 my-5">
        <div className="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
          <div className="flex items-center justify-center w-full lg:p-12">
            <div className="flex items-center xl:p-10">
              <form onSubmit={handleSubmit} className="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl">
                <h3 className="mb-3 text-4xl font-extrabold text-dark-grey-900">
                  Register
                </h3>
                <p className="mb-4 text-grey-700">
                  Enter your email and password
                </p>
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
                <div className="flex flex-row justify-between mb-8">
                </div>
                <button className="w-full px-6 py-5 mb-5 text-sm font-bold leading-none text-black transition duration-300 md:w-96 rounded-2xl hover:bg-purple-blue-600 focus:ring-4 focus:ring-purple-blue-100 bg-purple-blue-500">
                  Register
                </button>
                <p className="text-sm leading-relaxed text-grey-900">
                  Already have an account?{" "}
                  <Link 
                    to={'/login'}
                    className="font-bold text-grey-700"
                  >
                    Login
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
