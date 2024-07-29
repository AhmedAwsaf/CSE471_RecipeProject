import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  HiArrowRightOnRectangle,
  HiOutlineUserCircle,
  HiCheckCircle,
  HiOutlineShoppingCart,
} from "react-icons/hi2";
import { HiArrowRightStartOnRectangle } from "react-icons/hi2";
import { apiStart } from "../../api";

const Nav = ({ menuItems, Logo, userProfile, onLogout }) => {
  const { checkTokenValidity, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  function handleLogOut() {
    localStorage.removeItem("loginToken");
    checkTokenValidity();
    navigate("/");
  }

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="h-16 flex justify-between items-center px-6 lg:px-12">
      <a href="/">
        <img src={Logo} alt="logo" className="h-12 w-auto" />{" "}
        {/* Adjust ml-4 as needed */}
      </a>
      <ul className="flex gap-7">
        <li>
          <Link to="/" className="font-medium capitalize text-secondary">
            Recipes
          </Link>
        </li>
        <li>
          <Link
            to="/minimart"
            className="font-medium capitalize text-secondary"
          >
            Minimart
          </Link>
        </li>
        <li>
          <Link to="#" className="font-medium capitalize text-secondary">
            About
          </Link>
        </li>
        <li>
          <Link to="#" className="font-medium capitalize text-secondary">
            Contact
          </Link>
        </li>
      </ul>
      <ul className="flex items-center gap-4 font-medium">
        {isAuthenticated ? (
          <>
            <li>
              <Link to="/minimart/cart" className="hover:text-teal-600">
                <HiOutlineShoppingCart size={28} />
              </Link>
            </li>
            <li>
              <Link to="/userprofile" className="hover:text-teal-600">
                <HiOutlineUserCircle size={30} />
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogOut}
                className="pt-1 hover:text-teal-600"
              >
                <HiArrowRightStartOnRectangle size={28} />
              </button>
            </li>
            <li>
              {!userProfile.isVerified && (
                <Link to="/verify-email">
                  <button className="px-4 py-2 rounded text-red-700 border border-red-600">
                    Verify Email
                  </button>
                </Link>
              )}
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">
                <button className="text-secondary px-4 py-4 rounded">
                  Log In
                </button>
              </Link>
            </li>

            <li>
              <Link to="/signup">
                <button className="text-secondary px-4 py-4 rounded">
                  Sign up
                </button>
              </Link>
            </li>
          </>
        )}
      </ul>
      {/* <div className="flex items-center gap-4 font-medium">
        {userProfile ? (
          <>
            <div className="relative flex">
              <h1 className="mr-4 my-auto">{userProfile.username}</h1>
              <button onClick={toggleDropdown} className="focus:outline-none">
                <img
                  src={
                    `${apiStart}${userProfile.photo}` ||
                    `${apiStart}/default-profile.png`
                  } // Placeholder image
                  alt="profile"
                  className="h-10 w-10 rounded-full"
                />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
                  <Link
                    to="/userprofile"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    User Profile
                  </Link>
                  <button
                    className="flex w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                    onClick={() => {
                      onLogout();
                      setDropdownOpen(false);
                    }}
                  >
                    Logout
                    <HiArrowRightOnRectangle size={20} className="mx-2" />
                  </button>
                </div>
              )}
            </div> */}
      {/* {!userProfile.isVerified && (
              <Link to="/verify-email">
                <button className="px-4 py-2 rounded text-red-700 border border-red-600">
                  Verify Email
                </button>
              </Link>
            )}
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="text-secondary px-4 py-2 rounded">
                Log In
              </button>
            </Link>
            <Link to="/signup">
              <button className="text-secondary px-4 py-2 rounded">
                Sign Up
              </button>
            </Link>
          </>
        )}
      </div> */}
    </div>
  );
};

export default Nav;
