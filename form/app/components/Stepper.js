"use client";
import React, { useState } from 'react';
import { font } from './font/grotesk';

const Step1 = ({ formData, setFormData, validationErrors, setValidationErrors }) => {
  const handleBudgetSelection = (budget) => {
    setFormData({ ...formData, budget });
    setValidationErrors({ ...validationErrors, budget: '' });
  };

  return (
    <div className={`${font.className} text-center`}>
      <h2 className="text-2xl font-semibold mb-4">Step #1</h2>
      <p className="text-lg mb-6">What is your monthly digital marketing budget?</p>
      <div className="space-y-4">
        {["< $1,000/mo", "$1,000 - $2,000", "$2,000 - $5,000", "$5,000 - $10,000", "$10,000 - $25,000", "$25,000 +"].map((budget) => (
          <button
            key={budget}
            onClick={() => handleBudgetSelection(budget)}
            className={`block w-full bg-white py-3 rounded-md border border-gray-300 ${
              formData.budget === budget ? 'border-green-500 bg-green-50' : ''
            }`}
          >
            {budget}
          </button>
        ))}
        {validationErrors.budget && <p className="text-red-500 text-sm mt-2">{validationErrors.budget}</p>}
      </div>
    </div>
  );
};

const Step2 = ({ formData, setFormData, validationErrors }) => {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className={`${font.className} text-center`}>
      <h2 className="text-3xl  font-semibold mb-4">Step #2</h2>
      <p className="text-3xl font-bold mb-4">Details</p>
      <p className='font-normal text-xl text-gray-400 mb-4'>We're thrilled at the opportunity to help you grow your business online.</p>
      <form className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full p-3 rounded-md border border-gray-300 placeholder-black"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-3 rounded-md border border-gray-300 placeholder-black"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          className="w-full p-3 rounded-md border border-gray-300 placeholder-black"
          value={formData.phone}
          onChange={handleChange}
        />
        <textarea
          name="details"
          placeholder="Anything else you’d like to share?"
          className="w-full p-3 rounded-md border border-gray-300 placeholder-black"
          rows={4}
          value={formData.details}
          onChange={handleChange}
        />
        {validationErrors.step2 && <p className="text-red-500 text-sm">{validationErrors.step2}</p>}
      </form>
    </div>
  );
};

const Step3 = () => {
  return (
    <div className={`${font.className} text-center`}>
      <h2 className="text-2xl font-semibold mb-4">Your Request for a Proposal Has Been Submitted!</h2>
      <p className="text-gray-500 mb-4">Lorem ipsum dolor sit amet consectetur. Tincidunt ultricies gravida.</p>
      <button className="bg-green-500 text-white py-2 px-4 rounded-md">Return Home</button>
    </div>
  );
};

const StepperForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    budget: '',
    name: '',
    email: '',
    phone: '',
    details: '',
  });

  const [validationErrors, setValidationErrors] = useState({});

  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const handleBack = () => setStep(step - 1);

  const validateStep = () => {
    let errors = {};
    if (step === 1 && !formData.budget) {
      errors.budget = "Please select a budget.";
    }
    if (step === 2) {
      if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
        errors.step2 = "Please fill all the remaining fields.";
      }
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <div className={`${font.className} max-w-lg mx-auto bg-white p-6 rounded-md`}>
      <div className="flex justify-between items-center mb-4">
        <button onClick={handleBack} className="text-gray-700 font-bold hover:text-black">
        ← Go Back
        </button>
        <h1 className="text-xl font-bold mr-16">Stepper Form</h1>
        <div></div>
      </div>
      <div className="w-full bg-gray-200 h-2 mb-4">
        <div className={`h-full bg-green-500`} style={{ width: `${(step / 3) * 100}%` }}></div>
      </div>
      {step === 1 && <Step1 formData={formData} setFormData={setFormData} validationErrors={validationErrors} setValidationErrors={setValidationErrors} />}
      {step === 2 && <Step2 formData={formData} setFormData={setFormData} validationErrors={validationErrors} />}
      {step === 3 && <Step3 />}
      <div className="mt-6 flex justify-center items-center">
        {step < 3 && (
          <button onClick={handleNext} className="bg-green-500 text-white py-2 px-4 rounded-md">
            {step === 2 ? "Submit Request" : "Next"}
          </button>
        )}
      </div>
    </div>
  );
};

export default StepperForm;
