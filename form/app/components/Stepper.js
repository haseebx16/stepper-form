"use client"
import React, { useState } from 'react';

const Step1 = ({ formData, setFormData, errors }) => (
  <div>
    <h2 className="text-2xl font-semibold mb-4">Step 1: Personal Info</h2>
    <div className="mb-4">
      <label className="block text-sm font-medium">First Name</label>
      <input
        className={`mt-1 block w-full p-2 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-md`}
        type="text"
        value={formData.firstName}
        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
      />
      {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
    </div>
    <div className="mb-4">
      <label className="block text-sm font-medium">Last Name</label>
      <input
        className={`mt-1 block w-full p-2 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-md`}
        type="text"
        value={formData.lastName}
        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
      />
      {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
    </div>
  </div>
);

const Step2 = ({ formData, setFormData, errors }) => (
  <div>
    <h2 className="text-2xl font-semibold mb-4">Step 2: Address Info</h2>
    <div className="mb-4">
      <label className="block text-sm font-medium">Address</label>
      <input
        className={`mt-1 block w-full p-2 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-md`}
        type="text"
        value={formData.address}
        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
      />
      {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
    </div>
    <div className="mb-4">
      <label className="block text-sm font-medium">City</label>
      <input
        className={`mt-1 block w-full p-2 border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded-md`}
        type="text"
        value={formData.city}
        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
      />
      {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
    </div>
  </div>
);

const Step3 = ({ formData }) => (
  <div>
    <h2 className="text-2xl font-semibold mb-4">Step 3: Review Info</h2>
    <div className="mb-4">
      <p><strong>First Name:</strong> {formData.firstName}</p>
      <p><strong>Last Name:</strong> {formData.lastName}</p>
      <p><strong>Address:</strong> {formData.address}</p>
      <p><strong>City:</strong> {formData.city}</p>
    </div>
    <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">Submit</button>
  </div>
);

const StepperForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
  });
  const [errors, setErrors] = useState({});

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    return newErrors;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    return newErrors;
  };

  const handleNext = () => {
    let newErrors = {};
    if (step === 1) {
      newErrors = validateStep1();
    } else if (step === 2) {
      newErrors = validateStep2();
    }

    if (Object.keys(newErrors).length === 0) {
      setStep(step + 1);
    } else {
      setErrors(newErrors);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 shadow-lg rounded-md bg-white">
      {step === 1 && <Step1 formData={formData} setFormData={setFormData} errors={errors} />}
      {step === 2 && <Step2 formData={formData} setFormData={setFormData} errors={errors} />}
      {step === 3 && <Step3 formData={formData} />}

      <div className="flex justify-between mt-4">
        {step > 1 && (
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded-md"
            onClick={handleBack}
          >
            Back
          </button>
        )}
        {step < 3 && (
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={handleNext}
          >
            Next
          </button>
        )}
      </div>
    </form>
  );
};

export default StepperForm;
