'use client';
import Image from 'next/image';
import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function ContactPage() {
  const scrollRef = useRef(null);
  const { ref: headingRef, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const formRef = useRef(null); // ✅ Restored formRef
  const alertTimeoutRef = useRef(null);

  const [alert, setAlert] = useState({ show: false, message: '', isError: false });
  const [mounted, setMounted] = useState(false);

  const contact = [
    { img: "/contact1.jpg" },
    { img: "/contact2.jpg" },
    { img: "/contact3.jpg" },
    { img: "/contact4.jpg" },
    { img: "/contact6.jpg" },
    { img: "/contact7.jpg" },
    { img: "/contact8.jpg" },
    { img: "/contact9.jpg" },
    { img: "/contact10.jpg" },
    { img: "/contact11.jpg" },
    { img: "/contact12.jpg" },
    { img: "/contact13.jpg" },
    { img: "/contact14.jpg" },
    { img: "/contact15.jpg" },
    { img: "/contact16.jpeg" },
    { img: "/contact17.jpg" },
    { img: "/contact19.jpg" },
    { img: "/contact20.jpg" },
  ];

  // ✅ Alert component (unchanged)
  const CustomAlert = ({ message, isError, onClose }) => (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 p-4 rounded-lg shadow-lg z-[9999] flex items-center gap-4 max-w-md w-full ${isError ? 'bg-red-500' : 'bg-green-500'} text-white`}
    >
      <span>{isError ? '❌' : '✅'} {message}</span>
      <button
        onClick={onClose}
        className="ml-auto bg-white text-black px-2 py-1 rounded-full hover:bg-gray-200"
      >
        ×
      </button>
    </motion.div>
  );

  // Mount tracking
  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll effect
  useEffect(() => {
    if (!mounted) return;
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 0;
    const scrollSpeed = 1;
    const step = () => {
      if (scrollContainer.scrollWidth <= scrollContainer.clientWidth) return;
      scrollAmount += scrollSpeed;
      if (scrollAmount >= scrollContainer.scrollWidth) scrollAmount = 0;
      scrollContainer.scrollLeft = scrollAmount;
    };
    const interval = setInterval(step, 10);
    return () => clearInterval(interval);
  }, [mounted]);

  // ✅ Alert helper
  const showAlert = useCallback((message, isError = false, duration = 3000) => {
    if (alertTimeoutRef.current) clearTimeout(alertTimeoutRef.current);
    setAlert({ show: true, message, isError });
    alertTimeoutRef.current = setTimeout(() => {
      setAlert({ show: false, message: '', isError: false });
      alertTimeoutRef.current = null;
    }, duration);
  }, []);

  // Cleanup alert timer
  useEffect(() => {
    return () => {
      if (alertTimeoutRef.current) clearTimeout(alertTimeoutRef.current);
    };
  }, []);

  // ✅ Submit handler
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.elements['name']?.value?.trim();
    const email = form.elements['email']?.value?.trim();
    const phone = form.elements['phone']?.value?.trim();
    const typeMessage = form.elements['typeMessage']?.value?.trim();

    if (!name || !email || !phone || !typeMessage) {
      showAlert('Please fill all required fields', true);
      return;
    }

    try {
      const res = await fetch('https://backend-bcoc.onrender.com/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, typeMessage }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        showAlert('Message sent successfully!', false);
        form.reset();
      } else {
        showAlert(data.error || 'Something went wrong', true);
      }
    } catch (err) {
      console.error('Error:', err);
      showAlert('Network error — please try again later', true);
    }
  }, [showAlert]);

  return (
    <div className="flex flex-col md:flex-row min-h-fit bg-gray-100">
      {/* ✅ Animated Alert */}
      <AnimatePresence>
        {alert.show && (
          <CustomAlert
            message={alert.message}
            isError={alert.isError}
            onClose={() => setAlert({ show: false, message: '', isError: false })}
          />
        )}
      </AnimatePresence>

      {/* Left scrolling images */}
      <div className="w-full md:w-1/2 p-4 overflow-hidden">
        <div
          ref={scrollRef}
          className="flex flex-row justify-center items-center gap-6 overflow-x-scroll whitespace-nowrap no-scrollbar"
        >
          {contact.map((item, i) => (
            <div
              key={i}
              className="w-80 md:h-[35rem] h-[25rem] bg-orange-500 rounded-xl shadow-md flex-shrink-0"
              style={{
                backgroundImage: `url(${item.img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          ))}
        </div>
      </div>

      {/* Right Contact Form */}
      <div className="w-full relative md:w-1/2 p-8 bg-white shadow-lg flex flex-col overflow-hidden justify-center items-center">
        <motion.h1
          ref={headingRef}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="inline-block text-4xl w-full mb-8 font-extrabold text-orange-500 text-center after:content-[''] after:block after:h-[5px] after:w-[26%] md:after:w-[18%] after:bg-orange-500 after:mx-auto after:mt-0 after:rounded-full"
        >
          Contact Us
        </motion.h1>

        {mounted ? (
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-4 w-full max-w-2xl"
          >
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full p-3 border text-black bg-orange-200 rounded-tl-xl border-none rounded-br-xl focus:outline-none focus:ring-1 focus:ring-orange-500"
            />

            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                name="email"
                placeholder="E-Mail"
                className="w-full p-3 text-black bg-orange-200 rounded-tl-xl border-none rounded-br-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                className="w-full p-3 text-black bg-orange-200 rounded-tl-xl border-none rounded-br-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <textarea
              name="typeMessage"
              placeholder="Type Message"
              className="w-full p-3 text-black h-62 bg-orange-200 rounded-tl-xl border-none rounded-br-xl resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
            />

            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-semibold"
            >
              Send
            </button>
          </motion.form>
        ) : (
          <div aria-hidden="true" className="space-y-4 w-full max-w-2xl">
            <div className="w-full h-12 bg-orange-200 rounded-lg" />
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full h-12 bg-orange-200 rounded-lg" />
              <div className="w-full h-12 bg-orange-200 rounded-lg" />
            </div>
            <div className="w-full h-40 bg-orange-200 rounded-lg" />
            <div className="w-28 h-10 bg-orange-400 rounded-md" />
          </div>
        )}
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
