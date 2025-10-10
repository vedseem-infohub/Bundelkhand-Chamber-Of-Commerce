'use client';
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { toast, Toaster } from 'react-hot-toast';


export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const togglePassword = () => {
    setShowPassword(prev => !prev);
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };



  const handleSubmit = async (e) => {
  e.preventDefault();
  const { email, password } = formData;

  try {
    const res = await fetch('https://backend-bcoc.onrender.com/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    console.log("Login response:", data);

   if (res.ok) {
  toast.success("Login successful!");
  setTimeout(() => {
    window.location.href = data.redirectUrl || "/";
  }, 800);
}
 else {
      toast.error(data.message || 'Login failed');
    }
  } catch (err) {
    console.error("Login error:", err);
    toast.error("Password do not match");
  }
};



  return (
    <>
      <Head>
        <title>Login Page</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://cdn.jsdelivr.net/npm/remixicon@4.5.0/fonts/remixicon.css" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <Toaster position="top-center" reverseOrder={false} />


      <form onSubmit={handleSubmit}> 

        <div className="container">
          <div className="left">
            <div className="form-box">
              <h2 className='text-black/60'>Login to your account</h2>
              <input
                className="inputText text-orange-500 font-semibold"
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <div className="password-wrapper">
                <input
                  className="inputText text-orange-500 font-semibold"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <span className="eye-icon" onClick={togglePassword}>
                  <i className={showPassword ? "ri-eye-line" : "ri-eye-off-line"}></i>
                </span>
              </div>
              <div className="forgot-password text-black">
                <a href="#" className='text-black'>Forgot password?</a>
              </div>
              <button className="login-btn" type="submit">Login</button>
              <div className="login-link">
                Don’t have an account? <Link href="/signup" style={{ color: 'rgb(255, 109, 31)' }}>Sign up</Link>
              </div>
            </div>
          </div>
          <div className="right">
            <h1>Welcome!</h1>
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

// ---------------ALERT ----------
.custom-alert {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 14px 28px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 16px;
  z-index: 9999;
  opacity: 0;
  animation: fadeInDown 0.5s ease-out forwards;
  color: white;
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

.custom-alert.success {
  background-color: #28a745;
}

.custom-alert.error {
  background-color: #dc3545;
}

@keyframes fadeInDown {
  0% {
    opacity: 0;
    transform: translate(-50%, -30px);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}
// ----------------ALERT END -------------

    .left {
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

   .inputText{
     background-color: rgba(255,255,255,1)
   }
     
    .form-box h2 {
      text-align: center;
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 30px;
    }

    .form-box input {
      width: 100%;
      padding: 14px 20px;
      margin-bottom: 15px;
      border-radius: 20px;
      border: 1px solid #ffffff;
      font-size: 14px;
      opacity: 0;
      animation: fadeInUp 0.8s ease-out forwards;
    }

    .form-box input:nth-of-type(1) { animation-delay: 0.6s; }

    .password-wrapper {
      position: relative;
      margin-bottom: 5px;
    }

    .password-wrapper input {
      width: 100%;
      padding: 14px 45px 14px 20px;
      border-radius: 20px;
      border: 1px solid #ffffff;
      font-size: 14px;
      opacity: 0;
      animation: fadeInUp 0.8s ease-out forwards;
      animation-delay: 0.7s;
    }

    .eye-icon {
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
      color: #777;
      font-size: 18px;
      opacity: 0.6;
    }

    .forgot-password {
      text-align: right;
      margin-bottom: 15px;
      animation: fadeInUp 0.8s ease-out forwards;
      animation-delay: 0.8s;
      opacity: 0;
    }

    .forgot-password a {
      color: #FF6D1F;
      text-decoration: none;
      font-weight: 500;
      font-size: 14px;
    }

    .form-box button.login-btn {
      width: 100%;
      padding: 14px;
      background-color: #FF6D1F;
      border: none;
      color: white;
      border-radius: 20px;
      font-size: 18px;
      font-weight: 600;
      margin-top: 10px;
      cursor: pointer;
      opacity: 0;
      animation: fadeInUp 0.8s ease-out forwards;
      animation-delay: 0.9s;
    }

    .form-box .login-link {
      font-size: 14px;
      text-align: center;
      color: #3C3B3BA8;
      margin-top: 20px;
      opacity: 0;
      animation: fadeInUp 0.8s ease-out forwards;
      animation-delay: 1s;
    }

    .form-box .login-link a {
      color: #FF6D1F;
      text-decoration: none;
      font-weight: 600;
    }

    .right {
      flex: 1;
      background: url('horse.png') no-repeat center center;
      background-size: contain;
      background-color: #ff6d24;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    .right h1 {
        margin-bottom: 450px;
      color: white;
      font-size: 64px;
      font-weight: 700;
      animation: fadeInLeft 1s ease-out forwards;
      opacity: 0;
      animation-delay: 0.2s;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .container {
        flex-direction: column;
      }

      .right {
        display: none;
      }

      .left {
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
      .form-box button.login-btn {
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

      .form-box button.login-btn {
        font-size: 14px;
        padding: 12px;
      }
    }

    /* Animations */
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

    /* Button Hover */
    button.login-btn:hover {
      background-color: #ff7f3f;
      transform: translateY(-2px);
      transition: all 0.3s ease;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="left">
      <div class="form-box">
        <h2>Login to your account</h2>
        <input type="email" placeholder="Email address" />
        <div class="password-wrapper">
          <input type="password" id="password" placeholder="Password" />
          <span class="eye-icon" onclick="togglePassword()">
            <i class="ri-eye-off-line"></i>
          </span>
        </div>
        <div class="forgot-password">
          <a href="#">Forgot password?</a>
        </div>
        <button class="login-btn">Login</button>
        <div class="login-link">
          Don’t have an account? <a href="signup.html">Sign up</a>
        </div>
      </div>
    </div>
    <div class="right">
      <h1>Welcome!</h1>
    </div>
  </div>

  <script>
    function togglePassword() {
      const input = document.getElementById("password");
      const icon = document.querySelector(".eye-icon i");
      if (input.type === "password") {
        input.type = "text";
        icon.classList.remove("ri-eye-off-line");
        icon.classList.add("ri-eye-line");
      } else {
        input.type = "password";
        icon.classList.remove("ri-eye-line");
        icon.classList.add("ri-eye-off-line");
      }
    }
      `}</style>
    </>
  );
}
