import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import { setSearch } from "../../features/productSlice";
import { useDispatch } from "react-redux";
export default function Navbar() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    nav('/login')
  }

  const onChange = (e) => {
    dispatch(setSearch(e.target.value))
  }

  return (
    <div className="sticky drawer rounded-full">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="w-full navbar bg-base-100">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="flex-1 px-2 mx-2"> <Link to="/">Fashionate</Link></div>
          <div className="flex-none hidden lg:block">
            <ul className="menu menu-horizontal">
              {/* Navbar menu content here */}
              <div className="form-control">
                <input
                  type="text"
                  placeholder="Search"
                  className="input input-bordered w-24 h-10 md:w-auto"
                  onChange={onChange}
                />
              </div>
              <li>
                <a className="nav__link">My Orders</a>
              </li>
              <li>
                <Link to={'/myCart'} className="nav__link">Cart</Link>
              </li>
              <li>
                <Link to={'/profile'} className="nav__link">Profile</Link>
              </li>
              <li>
                <button>
                  <a className="nav__link" onClick={handleLogout}>logout</a>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* drawer */}
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200">
          {/* Sidebar content here */}
          <div className="form-control">
                <input
                  type="text"
                  placeholder="Search"
                  className="input input-bordered w-24 h-10 md:w-auto"
                />
              </div>
              <li>
                <Link to={'/'} className="nav__link">Home</Link>
              </li>
              <li>
                <a className="nav__link">My Orders</a>
              </li>
              <li>
                <Link to={'/myCart'} className="nav__link">Cart</Link>
              </li>
              <li>
                <Link to={'/profile'} className="nav__link">Profile</Link>
              </li>
              <li>
                <button>
                  <a className="nav__link" onClick={handleLogout}>logout</a>
                </button>
              </li>
        </ul>
      </div>
       {/* drawer */}
    </div>
  );
}