'use client';
import Image from 'next/image';
import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BASE_URL, ENDPOINTS } from '@/config/api';

export default function ContactPage() {
  const scrollRef = useRef(null);
  const { ref: headingRef, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const formRef = useRef(null);
  const alertTimeoutRef = useRef(null);

  const [alert, setAlert] = useState({ show: false, message: '', isError: false });
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Restored your original image paths.
  // For these to work, the images must be in the `public` folder of your Next.js project.
  const contact = [
    { img: "/contact1.jpg" }, { img: "/contact2.jpg" }, { img: "/contact3.jpg" },
    { img: "/contact4.jpg" }, { img: "/contact6.jpg" }, { img: "/contact7.jpg" },
    { img: "/contact8.jpg" }, { img: "/contact9.jpg" }, { img: "/contact10.jpg" },
    { img: "/contact11.jpg" }, { img: "/contact12.jpg" }, { img: "/contact13.jpg" },
    { img: "/contact14.jpg" }, { img: "/contact15.jpg" }, { img: "/contact16.jpeg" },
    { img: "/contact17.jpg" }, { img: "/contact19.jpg" }, { img: "/contact20.jpg" },
  ];

  // Custom Alert Component for user feedback
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
        className="ml-auto bg-transparent text-white font-bold text-xl leading-none hover:opacity-75"
        aria-label="Close"
      >
        &times;
      </button>
    </motion.div>
  );

  // Effect to track component mount for animations
  useEffect(() => {
    setMounted(true);
  }, []);

  // Effect for the continuous image scroll
  useEffect(() => {
    if (!mounted) return;
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId;
    let scrollAmount = 0;
    const scrollSpeed = 0.5;

    const step = () => {
      if (scrollContainer.scrollWidth > scrollContainer.clientWidth) {
        scrollAmount += scrollSpeed;
        if (scrollAmount >= scrollContainer.scrollWidth / 2) {
          scrollAmount = 0; // This creates the seamless loop effect
        }
        scrollContainer.scrollLeft = scrollAmount;
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [mounted]);

  // Helper function to show alerts
  const showAlert = useCallback((message, isError = false, duration = 4000) => {
    if (alertTimeoutRef.current) clearTimeout(alertTimeoutRef.current);
    setAlert({ show: true, message, isError });
    alertTimeoutRef.current = setTimeout(() => {
      setAlert({ show: false, message: '', isError: false });
      alertTimeoutRef.current = null;
    }, duration);
  }, []);

  // Cleanup alert timer on component unmount
  useEffect(() => {
    return () => {
      if (alertTimeoutRef.current) clearTimeout(alertTimeoutRef.current);
    };
  }, []);

  // Form submission handler
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target;
    const formData = {
      name: form.elements['name']?.value?.trim(),
      email: form.elements['email']?.value?.trim(),
      phone: form.elements['phone']?.value?.trim(),
      typeMessage: form.elements['typeMessage']?.value?.trim(),
    };

    if (!formData.name || !formData.email || !formData.phone || !formData.typeMessage) {
      showAlert('Please fill all required fields.', true);
      setIsSubmitting(false);
      return;
    }

    const apiEndpoint = `${BASE_URL}${ENDPOINTS.CONTACT}`;

    try {
      const res = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        showAlert('Message sent successfully!', false);
        form.reset();
      } else {
        showAlert(data.error || `Error: ${res.status} ${res.statusText}`, true);
      }
    } catch (err) {
      console.error('Submission Error:', err);
      showAlert('A network error occurred. Please try again later.', true);
    } finally {
      setIsSubmitting(false);
    }
  }, [showAlert]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 font-sans">
      <AnimatePresence>
        {alert.show && (
          <CustomAlert
            message={alert.message}
            isError={alert.isError}
            onClose={() => setAlert({ show: false, message: '', isError: false })}
          />
        )}
      </AnimatePresence>

      {/* Left side: Scrolling image gallery */}
      <div className="w-full md:w-1/2 p-4 overflow-hidden">
        <div
          ref={scrollRef}
          className="flex flex-row items-center gap-6 overflow-x-auto whitespace-nowrap no-scrollbar h-full"
        >
          {/* By duplicating the array, we create a seamless, infinite loop effect */}
          {[...contact, ...contact].map((item, i) => (
            <div
              key={i}
              className="w-80 h-[25rem] md:h-[35rem] bg-orange-300 rounded-xl shadow-lg flex-shrink-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${item.img})` }}
            />
          ))}
        </div>
      </div>

      {/* Right side: Contact form */}
      <div className="w-full relative md:w-1/2 p-8 bg-white flex flex-col justify-center items-center">
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
            noValidate
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-4 w-full max-w-2xl"
          >
            <div>
              <label htmlFor="name" className="sr-only">Name</label>
              <input id="name" type="text" name="name" placeholder="Name" required className="w-full p-3 border text-black bg-orange-200 rounded-tl-xl border-none rounded-br-xl focus:outline-none focus:ring-1 focus:ring-orange-500 transition" />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full">
                <label htmlFor="email" className="sr-only">E-Mail</label>
                <input id="email" type="email" name="email" placeholder="E-Mail" required className="w-full p-3 text-black bg-orange-200 rounded-tl-xl border-none rounded-br-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition" />
              </div>
              <div className="w-full">
                <label htmlFor="phone" className="sr-only">Phone</label>
                <input id="phone" type="tel" name="phone" placeholder="Phone" required className="w-full p-3 text-black bg-orange-200 rounded-tl-xl border-none rounded-br-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition" />
              </div>
            </div>

            <div>
              <label htmlFor="typeMessage" className="sr-only">Message</label>
              <textarea id="typeMessage" name="typeMessage" placeholder="Type Message" required className="w-full p-3 text-black h-40 bg-orange-200 rounded-tl-xl border-none rounded-br-xl resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 transition"></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-semibold w-full sm:w-auto disabled:bg-orange-300 disabled:cursor-not-allowed transition-colors duration-300"
            >
              {isSubmitting ? 'Sending...' : 'Send'}
            </button>
          </motion.form>
        ) : (
          // Skeleton loader for initial render
          <div aria-hidden="true" className="space-y-4 w-full max-w-2xl">
            <div className="w-full h-12 bg-orange-200 rounded-lg animate-pulse" />
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full h-12 bg-orange-200 rounded-lg animate-pulse" />
              <div className="w-full h-12 bg-orange-200 rounded-lg animate-pulse" />
            </div>
            <div className="w-full h-40 bg-orange-200 rounded-lg animate-pulse" />
            <div className="w-28 h-10 bg-orange-400 rounded-md animate-pulse" />
          </div>
        )}
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
    </div>
  );
}


