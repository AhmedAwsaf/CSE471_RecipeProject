import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const UserSideBar = () => {
  const { isAuthenticated, setIsAuthenticated, userObj, checkTokenValidity } =
    useAuth();
  const navigate = useNavigate();
<<<<<<< Updated upstream
=======
  const [showModal, setShowModal] = useState(false);

>>>>>>> Stashed changes
  function handleLogOut() {
    setIsAuthenticated(false);
    localStorage.removeItem("loginToken");
    navigate("/");
  }
  return (
    <div className="flex flex-col justify-between border-e bg-white">
      <div className="px-4 py-1">
        <ul className="mt-6 space-y-1">
          <li>
            <a
              href="#"
              className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
            >
              General
            </a>
          </li>

          <li>
            <a
              href="#"
              className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              Calendar
            </a>
          </li>
          <li>
            <a
              href="/minimart/cart"
              className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              Cart
            </a>
          </li>
          <li>
            <Link
              to="/userprofile/createrecipe"
              className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              Create
            </Link>
          </li>
          <li>
            <details className="group [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                <span className="text-sm font-medium"> Account </span>

                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </summary>

              <ul className="mt-2 space-y-1 px-4">
                <li>
<<<<<<< Updated upstream
                  <a
                    href="#"
                    className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
=======
                  <button
                    className="w-full rounded-lg px-2 py-2 text-sm font-medium text-gray-500 [text-align:_inherit] hover:bg-gray-100 hover:text-gray-700"
                    onClick={handleDelete}
>>>>>>> Stashed changes
                  >
                    Security
                  </a>
                </li>

                <li>
<<<<<<< Updated upstream
                  <form action="#">
                    <button
                      type="submit"
                      className="w-full rounded-lg px-4 py-2 text-sm font-medium text-gray-500 [text-align:_inherit] hover:bg-gray-100 hover:text-gray-700"
                      onClick={handleLogOut}
                    >
                      Logout
                    </button>
                  </form>
=======
                  {!userObj.isVerified && (
                    <Link
                      className="w-full rounded-lg px-2 py-2 text-sm font-medium text-gray-500 [text-align:_inherit] hover:bg-gray-100 hover:text-gray-700"
                      to="/verify-email"
                    >
                      Verify Email
                    </Link>
                  )}
                </li>
                <li>
                  <button
                    className="w-full rounded-lg px-2 py-2 text-sm font-medium text-gray-500 [text-align:_inherit] hover:bg-gray-100 hover:text-gray-700"
                    onClick={handleLogOut}
                  >
                    Logout
                  </button>
>>>>>>> Stashed changes
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>

      <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
        <a
          href="#"
          className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50"
        >
          <img
            alt=""
            src={userObj?.photo}
            className="size-10 rounded-full object-cover"
          />

          <div>
            <p className="text-xs">
              <strong className="block font-medium">{userObj?.username}</strong>

              <span> {userObj?.email} </span>
            </p>
          </div>
        </a>
      </div>
<<<<<<< Updated upstream
=======

      {showModal && (
        // <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
        //   <div className="bg-white p-4 rounded-lg shadow-lg">
        //     <p className="mb-4">
        //       This action cannot be undone. Do you want to proceed?
        //     </p>
        //     <button
        //       className="bg-red-500 text-white px-4 py-2 rounded mr-2"
        //       onClick={confirmDelete}
        //     >
        //       Yes
        //     </button>
        //     <button
        //       className="bg-gray-500 text-white px-4 py-2 rounded"
        //       onClick={() => setShowModal(false)}
        //     >
        //       Cancel
        //     </button>
        //   </div>
        // </div>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Confirm Action
            </h2>
            <p className="mb-6 text-gray-600 text-sm">
              This action cannot be undone. Do you want to proceed?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-700 transition duration-300"
                onClick={confirmDelete}
              >
                Yes
              </button>
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition duration-300"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
>>>>>>> Stashed changes
    </div>
  );
};
export default UserSideBar;
