import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { apiStart } from '../../api';

const VerifyEmailPage = () => {
  const [message, setMessage] = useState('Loading...');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get('token');

    const verifyEmail = async (token) => {
      try {
        const response = await axios.get(`${apiStart}/api/user/verify-email`, { params: { token } });
        setMessage(response.data);
      } catch (error) {
        setMessage(error.response ? error.response.data : 'Verification failed');
      }
    };

    const checkUserStatus = async () => {
      const Vertoken = localStorage.getItem("loginToken");

      if (Vertoken) {
        try {
          const response = await axios.get(`${apiStart}/api/user/my`, {
            headers: { Authorization: `Bearer ${Vertoken}` },
          });
          setIsLoggedIn(true);
          setIsVerified(response.data.data.isVerified);
          setMessage(`User is ${response.data.data.isVerified ? 'verified' : 'not verified'}`);
        } catch (error) {
          setIsLoggedIn(false);
          setIsVerified(false);
          setMessage('Please log in to verify your email');
        }
      } else {
        setIsLoggedIn(false);
        setIsVerified(false);
        setMessage('Please log in to verify your email');
      }
    };

    if (token) {
      verifyEmail(token);
      navigate("/");
    } else {
      checkUserStatus();
    }
  }, [location, navigate]);

  const handleSendVerificationEmail = async () => {
    const Vertoken = localStorage.getItem("loginToken");
    try {
      await axios.get(`${apiStart}/api/user/send-verify-email`, {
        headers: {
          Authorization: `Bearer ${Vertoken}`,
        },
      });
      setMessage('Verification email sent. Please check your inbox.');
    } catch (error) {
      setMessage('Failed to send verification email. Please try again later.');
    }
  };

  return (
    <div className="flex h-screen flex-col bg-white">
      <img
        src="https://plus.unsplash.com/premium_photo-1671377387797-8d3307a546a6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
        className="h-64 w-full object-cover"
      />

      <div className="flex flex-1 items-center justify-center">
        <div className="mx-auto max-w-xl px-4 py-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Verify Email
          </h1>
          {/* <h1 className='text-xl font-bold'>Veridfy Email</h1> */}
          {message && <p>{message}</p>}
          {!isLoggedIn && (
            <div>
              <p className="mt-4 text-gray-500">Please log in to verify your email</p>
              <a
            href="/login"
            className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
          >
            Login
          </a>
            </div>
          )}
          {isLoggedIn && isVerified && (
            <div>
              <p className="mt-4 text-gray-500">Your email is verified.</p>
            </div>
          )}
          {isLoggedIn && !isVerified && (
            <div>
              <p className="mt-4 text-gray-500">Your email is not verified.</p>
              <button className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring" onClick={handleSendVerificationEmail}>Verify Email</button>
            </div>
          )}
{/* 
          <p className="mt-4 text-gray-500">
            Try searching again, or return home to start from the beginning.
          </p>

          <a
            href="#"
            className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
          >
            Go Back Home
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
