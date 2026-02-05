'use client'

import React, { useEffect, useState } from "react";
import { ChevronDown, ArrowLeft, ArrowRight } from 'lucide-react';
import Nav from '@/components/sections/Nav';
import Footer from '@/components/sections/Footer';
import { AnimatePresence, motion } from 'framer-motion';
import toast, { Toaster } from "react-hot-toast";
import { BASE_URL, ENDPOINTS } from '@/config/api';

const tabs = ['Service Members', 'Industry Members', 'Business Members', 'Enroll Now'];

const fadeInVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Page() {
  const [activeTab, setActiveTab] = useState('Service Members');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Consolidated state for data fetching
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 });

  // State for the "Enroll Now" form
  const [isDeptOpen, setIsDeptOpen] = useState(false);
  const [selectedDept, setSelectedDept] = useState("Select Department");
  const departments = ["Service", "Industry", "Business"];

  // Data fetch effect
  useEffect(() => {
    let endpoint = '';
    if (activeTab === 'Service Members') endpoint = 'service';
    else if (activeTab === 'Industry Members') endpoint = 'industry';
    else if (activeTab === 'Business Members') endpoint = 'business';

    if (!endpoint) {
      setData([]);
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(`${BASE_URL}${ENDPOINTS.MEMBER_ZONE_DATA(endpoint)}?page=${pagination.currentPage}&limit=20`);
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const paginatedResponse = await res.json();
        setData(paginatedResponse.data);
        setPagination(prev => ({ ...prev, totalPages: paginatedResponse.totalPages }));
      } catch (err) {
        setError("Failed to load members. Please try again later.");
        console.error("Error loading members:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [activeTab, pagination.currentPage]);

  // Pagination handlers
  const handleNextPage = () => {
    if (pagination.currentPage < pagination.totalPages) {
      setPagination(prev => ({ ...prev, currentPage: prev.currentPage + 1 }));
    }
  };

  const handlePrevPage = () => {
    if (pagination.currentPage > 1) {
      setPagination(prev => ({ ...prev, currentPage: prev.currentPage - 1 }));
    }
  };

  // Dynamic table headers
  const getTableHeaders = () => {
    switch (activeTab) {
      case 'Service Members':
      case 'Industry Members':
        return ["Reg. No", "Name", "Member Organization", "Mobile No."];
      case 'Business Members':
        return ["Reg. No", "Name", "Firm Name", "Mobile No."];
      default:
        return [];
    }
  };
  const tableHeaders = getTableHeaders();

  // Enroll Now form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      mobile: e.target.mobile.value,
      department: selectedDept,
      business: e.target.business?.value || "",
    };

    try {
      const res = await fetch(`${BASE_URL}${ENDPOINTS.MEMBER_ZONE_ENROLL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || "Details sent successfully!");
        e.target.reset();
        setSelectedDept("Select Department");
      } else {
        toast.error(data.error || "Something went wrong.");
      }
    } catch (err) {
      toast.error("Failed to send details. Please try again later.");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <div>
        <Toaster position="top-right" reverseOrder={false} />
        <Nav className="fixed top-0 left-0 w-full z-50 bg-white shadow" />
      </div>

      {/* Hero Section */}
      <div className="px-10">
        <div
          className="hidden w-full min-h-[400px] lg:flex flex-col items-center rounded-2xl justify-center bg-cover bg-center"
          style={{ backgroundImage: "url('/memberZone.jpg')" }}
        ></div>
        <motion.h1
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInVariants}
          className="inline-block md:text-6xl text-2xl w-full font-bold md:font-extrabold text-orange-500 text-center mt-40 md:mt-10 md:mb-10 mb-10 after:content-[''] after:block md:after:h-[5px] after:h-[3px] after:w-[30%] md:after:w-[20%] after:bg-orange-500 after:mx-auto after:mt-0 md:after:mt-1 after:rounded-full"
        >
          Members Zone
        </motion.h1>
      </div>

      {/* Content Section */}
      <div className="flex-1 container mx-auto px-4 sm:px-10 font-sans">
        {/* Mobile dropdown */}
        <div className="relative block md:hidden w-full max-w-full mb-0">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="w-full flex justify-between items-center p-3 rounded-lg bg-orange-500 text-white font-medium shadow-md focus:outline-none">
            <span>{activeTab}</span>
            <ChevronDown size={22} className={`transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-180' : ''}`} />
          </button>
          <div className={`absolute z-50 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-[300px] opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-2'}`}>
            <div className="overflow-y-auto max-h-[300px]">
              {tabs.map((tab) => (
                <button key={tab} onClick={() => { setActiveTab(tab); setPagination({ currentPage: 1, totalPages: 1 }); setIsMobileMenuOpen(false); }} className={`w-full text-left px-4 py-3 transition-colors ${activeTab === tab ? 'bg-orange-500 text-white font-semibold' : 'text-black hover:bg-orange-100'}`}>
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop tabs */}
        <div className="hidden md:flex justify-center flex-wrap gap-3 border-b border-gray-300 pb-3">
          {tabs.map(tab => (
            <button key={tab} onClick={() => { setActiveTab(tab); setPagination({ currentPage: 1, totalPages: 1 }); }} className={`relative px-5 py-2 text-md font-semibold transition-all duration-300 rounded-md ${activeTab === tab ? 'text-orange-500 font-semibold' : 'text-gray-600 hover:text-orange-400'}`}>
              {tab}
              {activeTab === tab && (<span className="absolute bottom-0 left-0 w-full h-[3px] bg-orange-500 rounded-full animate-[slideIn_0.3s_ease-in-out]"></span>)}
            </button>
          ))}
        </div>

        {/* Dynamic Content */}
        <div className="mt-8">
          {activeTab !== 'Enroll Now' && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariants}
            >
              {isLoading && <p className="text-center text-gray-500">Loading members...</p>}
              {error && <p className="text-center text-red-500">{error}</p>}
              {!isLoading && !error && data.length === 0 && <p className="text-center text-gray-500">No members found.</p>}
              {!isLoading && !error && data.length > 0 && (
                <>
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInVariants}
                    className="overflow-x-auto shadow-lg rounded-lg border border-gray-200 bg-white"
                  >
                    <table className="min-w-full text-left text-gray-700">
                      <thead className="bg-gray-100 text-gray-800 uppercase text-sm">
                        <tr>
                          {tableHeaders.map(header => <th key={header} className="p-4">{header}</th>)}
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((member, idx) => (
                          <tr key={member['Reg. No.'] || idx} className={`transition-colors duration-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-orange-50`}>
                            <td className="p-4">{member['Reg. No.']}</td>
                            <td className="p-4">{member['Name of Representative'] || member['Name']}</td>
                            <td className="p-4">{member['Member Organization'] || member['Firm Name']}</td>
                            <td className="p-4">{member['Mob. No.'] || member['Mobile No.']}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </motion.div>

                  {/* Pagination */}
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInVariants}
                    className="flex justify-between items-center mt-6"
                  >
                    <button onClick={handlePrevPage} disabled={pagination.currentPage === 1} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                      <ArrowLeft size={16} /> Previous
                    </button>
                    <span className="text-sm text-gray-700">
                      Page {pagination.currentPage} of {pagination.totalPages}
                    </span>
                    <button onClick={handleNextPage} disabled={pagination.currentPage === pagination.totalPages} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                      Next <ArrowRight size={16} />
                    </button>
                  </motion.div>
                </>
              )}
            </motion.div>
          )}

          {/* Enroll Now Form */}
          {activeTab === "Enroll Now" && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariants}
              className="mt-8 shadow-xl rounded-2xl border border-orange-200 bg-white p-8 max-w-2xl mx-auto"
            >
              <h2 className="text-3xl font-bold text-orange-500 mb-8 text-center">Enroll Now</h2>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <input type="text" name="name" placeholder="Enter your full name" required className="w-full px-4 py-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none transition" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input type="email" name="email" placeholder="Enter your email" required className="w-full px-4 py-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none transition" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile No.</label>
                  <input type="tel" name="mobile" placeholder="Enter your mobile number" required className="w-full px-4 py-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none transition" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Department</label>
                  <button type="button" onClick={() => setIsDeptOpen(!isDeptOpen)} className="w-full flex justify-between items-center px-4 py-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none transition bg-white text-gray-700">
                    {selectedDept}
                    <ChevronDown className={`h-4 w-4 transition-transform ${isDeptOpen ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {isDeptOpen && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden border border-orange-200 rounded-lg mt-2 bg-white shadow-md"
                      >
                        {departments.map((dept) => (
                          <li key={dept} onClick={() => { setSelectedDept(dept); setIsDeptOpen(false); }} className="px-4 py-2 cursor-pointer hover:bg-orange-100 transition">
                            {dept}
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Business Details</label>
                  <textarea name="business" placeholder="Tell us more about your business..." rows={4} className="w-full px-4 py-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none transition"></textarea>
                </div>
                <div className="flex justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    className="bg-orange-500 text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-orange-600 transition-all"
                  >
                    Submit
                  </motion.button>
                </div>
              </form>
            </motion.div>
          )}
        </div>
      </div>

      <div className='mt-20 md:mt-10'>
        <Footer />
      </div>
    </div>
  );
}
