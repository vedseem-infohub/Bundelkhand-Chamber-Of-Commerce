"use client";
import React, { useState } from "react";

function Page() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    email: "",
    mobile: "",
    gstin: "",
    msme: "",
    pan: "",
    entityType: "",
    year: "",
    businessInterests: "",
    consent: false,
  });

  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://backend-bcoc.onrender.com/send-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success) {
        setMessage("✅ Form submitted successfully!");
        setIsError(false);

        // reset form
        setFormData({
          firstName: "",
          lastName: "",
          addressLine1: "",
          addressLine2: "",
          city: "",
          state: "",
          zip: "",
          country: "",
          email: "",
          mobile: "",
          gstin: "",
          msme: "",
          pan: "",
          entityType: "",
          year: "",
          businessInterests: "",
          consent: false,
        });
      } else {
        setMessage("❌ Something went wrong. Please try again.");
        setIsError(true);
      }

      setTimeout(() => setMessage(null), 4000);
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to submit form.");
      setIsError(true);
      setTimeout(() => setMessage(null), 4000);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50"
    >
      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-8 relative">
        <h1 className="text-2xl font-bold mb-6">Join BCCI Page</h1>

        {/* Name */}
        <label className="block mb-2 font-medium">
          Name <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="border border-gray-300 rounded-md p-2 w-full"
            required
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="border border-gray-300 rounded-md p-2 w-full"
            required
          />
        </div>

        {/* Address */}
        <label className="block mb-2 font-medium">
          Address of company <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="addressLine1"
          value={formData.addressLine1}
          onChange={handleChange}
          placeholder="Street Address"
          className="border border-gray-300 rounded-md p-2 w-full mb-4"
          required
        />
        <input
          type="text"
          name="addressLine2"
          value={formData.addressLine2}
          onChange={handleChange}
          placeholder="Address Line 2"
          className="border border-gray-300 rounded-md p-2 w-full mb-4"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            className="border border-gray-300 rounded-md p-2 w-full"
            required
          />
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="State/Region/Province"
            className="border border-gray-300 rounded-md p-2 w-full"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            name="zip"
            value={formData.zip}
            onChange={handleChange}
            placeholder="Postal / Zip Code"
            className="border border-gray-300 rounded-md p-2 w-full"
            required
          />
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="Country"
            className="border border-gray-300 rounded-md p-2 w-full"
            required
          />
        </div>

        {/* Email */}
        <label className="block mb-2 font-medium">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="border border-gray-300 rounded-md p-2 w-full mb-6"
          required
        />

        {/* Mobile */}
        <label className="block mb-2 font-medium">
          Mobile <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          placeholder="Mobile"
          className="border border-gray-300 rounded-md p-2 w-full mb-6"
          required
        />

        {/* GSTN, MSME, PAN */}
        <label className="block mb-2 font-medium">GSTIN No</label>
        <input
          type="text"
          name="gstin"
          value={formData.gstin}
          onChange={handleChange}
          placeholder="Enter GSTIN No"
          maxLength="15"
          pattern="^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$"
          title="Enter valid 15-character GSTIN (e.g., 27AAEPM1234C1Z5)"
          className="border border-gray-300 rounded-md p-2 w-full mb-4"
        />

        <label className="block mb-2 font-medium">MSME No</label>
        <input
          type="text"
          name="msme"
          value={formData.msme}
          onChange={handleChange}
          placeholder="Enter MSME No"
          className="border border-gray-300 rounded-md p-2 w-full mb-4"
        />

        <label className="block mb-2 font-medium">PAN No</label>
        <input
          type="text"
          name="pan"
          value={formData.pan}
          onChange={handleChange}
          placeholder="Enter PAN No"
          className="border border-gray-300 rounded-md p-2 w-full mb-6"
        />

        {/* Whether a */}
        <label className="block mb-2 font-medium">
          Whether a <span className="text-red-500">*</span>
        </label>
        <div className="space-y-2 mb-6">
          {[
            "Company",
            "Partnership Firm",
            "Proprietary Concern",
            "Society",
            "Trust",
            "Other",
          ].map((option) => (
            <label key={option} className="flex items-center space-x-2">
              <input
                type="radio"
                name="entityType"
                value={option}
                checked={formData.entityType === option}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600"
                required
              />
              <span>{option}</span>
            </label>
          ))}
        </div>

        {/* Year of Establishment */}
        <label className="block mb-2 font-medium">
          Year of establishment <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          name="year"
          value={formData.year}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2 w-full mb-6"
          required
        />

        {/* Business Interests */}
        <label className="block mb-2 font-medium">
          Business interests <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="businessInterests"
          value={formData.businessInterests}
          onChange={handleChange}
          placeholder="Enter Business Interests"
          className="border border-gray-300 rounded-md p-2 w-full mb-6"
          required
        />

        {/* Terms and Conditions */}
        <label className="block mb-2 font-medium">
          Terms and Conditions <span className="text-red-500">*</span>
        </label>
        <p className="border border-gray-300 text-gray-500 rounded-md p-2 w-full mb-4">
          I accept the Terms of Service and have read the Privacy Policy.
        </p>

        <label className="flex items-center space-x-2 mb-6">
          <input
            type="checkbox"
            name="consent"
            checked={formData.consent}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600"
          />
          <span>
            I consent to receiving information about other events in the future,
            from BCCI.
          </span>
        </label>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          Submit
        </button>

        {/* Toast Message */}
        {message && (
          <div
            className={`fixed bottom-6 right-6 px-4 py-3 rounded-md shadow-lg text-white ${
              isError ? "bg-red-600" : "bg-green-600"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </form>
  );
}

export default Page;
