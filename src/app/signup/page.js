'use client';
import Head from 'next/head';
import { useRef, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast'; // ✅ Import toast
import { motion, AnimatePresence } from 'framer-motion';

export default function SignupPage() {
  const confirmPasswordRef = useRef(null);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [alert, setAlert] = useState({ show: false, message: '', isError: false });

  const toggleConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Animated alert component
  // const CustomAlert = ({ message, isError, onClose }) => (
  //   <motion.div
  //     initial={{ opacity: 0, y: -50 }}
  //     animate={{ opacity: 1, y: 0 }}
  //     exit={{ opacity: 0, y: -50 }}
  //     transition={{ duration: 0.3, ease: 'easeOut' }}
  //     className={`fixed top-4 left-1/2 transform -translate-x-1/2 p-4 py-5 rounded-lg shadow-lg z-50 flex items-center gap-4 max-w-md w-full ${isError ? 'bg-red-500' : 'bg-green-500'} text-white`}
  //   >
  //     <span>{isError ? '❌' : '✅'} {message}</span>
  //     <button
  //       onClick={onClose}
  //       className="ml-auto bg-white text-black px-2 py-1 rounded-full hover:bg-gray-200"
  //     >
  //       ×
  //     </button>
  //   </motion.div>
  // );

  const handleSubmit = async (e) => {
  e.preventDefault();
  const { name, email, password, confirmPassword } = formData;

  if (password !== confirmPassword) {
    toast.error('Passwords do not match');
    return;
  }

  try {
    const res = await fetch('https://backend-bcoc.onrender.com/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
        credentials: "include",
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success('User registered successfully!');
      setFormData({ name: '', email: '', password: '', confirmPassword: '' });
        setTimeout(() => {
    window.location.href = data.redirectUrl || "/";
  }, 800);
    } else {
      toast.error(data.message || 'Signup failed');
    }
  } catch (err) {
    console.error("Signup error:", err);
    toast.error(`Failed to connect: ${err.message}`);
  }
};


  return (
    <>
      <Head>
        <title>Signup Page</title>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@4.5.0/fonts/remixicon.css"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      
      
       <Toaster position="top-center" reverseOrder={false} />

      <form onSubmit={handleSubmit}>
        {/* <AnimatePresence>
          {alert.show && (
            <CustomAlert
              message={alert.message}
              isError={alert.isError}
              onClose={() => setAlert({ show: false, message: '', isError: false })}
            />
          )}
        </AnimatePresence> */}

        <div className="container">
          <div className="left">
            <h1>Hello!</h1>
          </div>
          <div className="right">
            <div className="form-box">
              <h2 style={{ fontFamily: 'Poppins, sans-serif' }} className='text-black/60'>Create your account</h2>
              <input
                className="inputText text-orange-500 font-semibold"
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                className="inputText text-orange-500 font-semibold"
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                className="inputText text-orange-500 font-semibold"
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <div className="password-wrapper text-orange-500 font-semibold">
                <input
                  className="inputText"
                  ref={confirmPasswordRef}
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <span className="eye-icon" onClick={toggleConfirmPassword}>
                  <i className={showConfirmPassword ? 'ri-eye-off-line' : 'ri-eye-line'}></i>
                </span>
              </div>
              <button className="create-account" type="submit">Create account</button>
              <div className="terms">
                By creating account you agree to BCCI <span>Term of Service</span> and{' '}
                <span>Privacy Policy</span>.
              </div>
              <div className="login-link">
                Have an account? <a href="/login">Log in</a>
              </div>
            </div>
          </div>
        </div>
      </form>

      <style jsx global>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-family: 'Poppins', sans-serif;
        }

        html, body {
          height: 100%;
          width: 100%;
        }

        .container {
          display: flex;
          height: 100vh;
        }

        .left {
          flex: 1;
          background: url('horse.png') no-repeat center center;
          background-size: contain;
          background-color: #ff6d24;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          position: relative;
        }

        .left h1 {
          position: relative;
          z-index: 2;
          bottom: 200px;
          font-size: 64px;
          font-weight: 700;
          color: white;
          margin-bottom: 30px;
          animation: fadeInLeft 1s ease-out forwards;
          opacity: 0;
          animation-delay: 0.2s;
        }

        .right {
          flex: 1;
          background-color: #ffffff;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 30px;
        }

        .form-box {
          background-color: #f1f1f1;
          padding: 40px;
          border-radius: 32px;
          width: 100%;
          max-width: 460px;
          box-shadow: 0 0 20px rgba(0,0,0,0.05);
          animation: fadeInUp 1s ease-out forwards;
          opacity: 0;
          animation-delay: 0.5s;
        }

        .inputText {
          background-color: rgba(255,255,255,1);
          width: 100%;
          padding: 14px 20px;
          margin-bottom: 15px;
          border-radius: 20px;
          border: 1px solid #ffffff;
          font-size: 14px;
        }

        .form-box h2 {
          text-align: center;
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 30px;
        }

        .form-box .password-wrapper {
          position: relative;
        }

        .form-box .password-wrapper input {
          padding-right: 40px;
        }

        .form-box .eye-icon {
          position: absolute;
          right: 15px;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
          opacity: 0.6;
        }

        .form-box button.create-account {
          width: 100%;
          padding: 14px;
          background-color: #FF6D1F;
          border: none;
          color: white;
          border-radius: 20px;
          font-size: 18px;
          font-weight: 600;
          margin: 20px 0;
          cursor: pointer;
        }

        button.create-account:hover {
          background-color: #ff7f3f;
          transform: translateY(-2px);
          transition: all 0.3s ease;
        }

        .form-box .terms {
          font-size: 12px;
          text-align: center;
          color: #666;
          margin-bottom: 20px;
          opacity: 0;
          animation: fadeInUp 0.8s ease-out forwards;
          animation-delay: 1.3s;
        }

        .form-box .terms span {
          font-weight: 600;
        }

        .form-box .login-link {
          font-size: 14px;
          text-align: center;
          color: #3C3B3BA8;
          opacity: 0;
          animation: fadeInUp 0.8s ease-out forwards;
          animation-delay: 1.4s;
        }

        .form-box .login-link a {
          color: #FF6D1F;
          text-decoration: none;
          font-weight: 600;
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          0% {
            opacity: 0;
            transform: translateX(-50px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes bounceIn {
          0% {
            transform: scale(0.95);
            opacity: 0;
          }
          60% {
            transform: scale(1.05);
            opacity: 1;
          }
          100% {
            transform: scale(1);
          }
        }

        /* Stagger animation for input fields */
        .form-box input:nth-of-type(1) { animation-delay: 0.6s; }
        .form-box input:nth-of-type(2) { animation-delay: 0.7s; }
        .form-box input:nth-of-type(3) { animation-delay: 0.8s; }
        .form-box .password-wrapper { animation-delay: 0.9s; }
        .form-box button.create-account { animation-delay: 1s; }

        /* Responsive */
        @media (max-width: 1024px) {
          .left h1 {
            font-size: 52px;
          }
          .form-box {
            padding: 35px;
          }
        }

        @media (max-width: 900px) {
          .left h1 {
            font-size: 44px;
          }
          .form-box {
            max-width: 420px;
          }
        }

        @media (max-width: 768px) {
          .container {
            flex-direction: column;
          }
          .left {
            display: none;
          }
          .right {
            width: 100%;
            height: 100vh;
            padding: 20px;
            justify-content: center;
            align-items: center;
          }
          .form-box {
            margin: auto;
            padding: 30px 20px;
            max-width: 90%;
          }
          .form-box h2 {
            font-size: 28px;
          }
        }

        @media (max-width: 600px) {
          .form-box h2 {
            font-size: 24px;
          }
          .form-box input,
          .form-box button.create-account {
            font-size: 14px;
            padding: 12px;
          }
        }

        @media (max-width: 431px) {
          .form-box {
            padding: 25px 15px;
          }
          .form-box input {
            font-size: 13px;
          }
          .form-box h2 {
            font-size: 22px;
          }
        }

        @media (max-width: 360px) {
          .form-box h2 {
            font-size: 20px;
          }
          .form-box input {
            font-size: 12px;
            padding: 10px;
          }
          .form-box button.create-account {
            font-size: 14px;
            padding: 12px;
          }
        }
      `}</style>
    </>
  );
}