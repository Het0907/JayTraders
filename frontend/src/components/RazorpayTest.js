import React, { useState } from 'react';
import { toast } from 'react-toastify';
import API_ENDPOINTS from '../config/api';
import { RAZORPAY_CONFIG, validateRazorpayConfig } from '../config/razorpay';

const RazorpayTest = () => {
  const [testResults, setTestResults] = useState({});

  const runTests = async () => {
    const results = {};

    // Test 1: Environment Variables
    results.envVars = {
      REACT_APP_API_URL: process.env.REACT_APP_API_URL,
      REACT_APP_RAZORPAY_KEY_ID: process.env.REACT_APP_RAZORPAY_KEY_ID ? 'Present' : 'Missing',
      API_ENDPOINTS_PAYMENT: API_ENDPOINTS.PAYMENT
    };

    // Test 2: Razorpay Config Validation
    results.configValidation = validateRazorpayConfig();

    // Test 3: Backend Connectivity
    try {
      const response = await fetch(`${API_ENDPOINTS.PAYMENT}/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 10000 }) // 100 INR in paise
      });
      results.backendConnectivity = {
        status: response.status,
        ok: response.ok,
        message: response.ok ? 'Backend is reachable' : 'Backend error'
      };
    } catch (error) {
      results.backendConnectivity = {
        status: 'Error',
        ok: false,
        message: error.message
      };
    }

    // Test 4: Razorpay Script Loading
    try {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      
      const scriptLoadPromise = new Promise((resolve, reject) => {
        script.onload = () => resolve('Script loaded successfully');
        script.onerror = () => reject(new Error('Script failed to load'));
        setTimeout(() => reject(new Error('Script load timeout')), 5000);
      });

      document.body.appendChild(script);
      const scriptResult = await scriptLoadPromise;
      results.scriptLoading = { success: true, message: scriptResult };
      
      // Clean up
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    } catch (error) {
      results.scriptLoading = { success: false, message: error.message };
    }

    setTestResults(results);
    console.log('Razorpay Test Results:', results);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Razorpay Configuration Test</h2>
      
      <button
        onClick={runTests}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
      >
        Run Tests
      </button>

      {Object.keys(testResults).length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Test Results:</h3>
          
          {/* Environment Variables */}
          <div className="border p-3 rounded">
            <h4 className="font-medium">Environment Variables:</h4>
            <pre className="text-sm bg-gray-100 p-2 rounded mt-2">
              {JSON.stringify(testResults.envVars, null, 2)}
            </pre>
          </div>

          {/* Config Validation */}
          <div className="border p-3 rounded">
            <h4 className="font-medium">Config Validation:</h4>
            <div className={`mt-2 p-2 rounded ${testResults.configValidation ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {testResults.configValidation ? '✓ Valid' : '✗ Invalid'}
            </div>
          </div>

          {/* Backend Connectivity */}
          <div className="border p-3 rounded">
            <h4 className="font-medium">Backend Connectivity:</h4>
            <div className={`mt-2 p-2 rounded ${testResults.backendConnectivity?.ok ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              Status: {testResults.backendConnectivity?.status} - {testResults.backendConnectivity?.message}
            </div>
          </div>

          {/* Script Loading */}
          <div className="border p-3 rounded">
            <h4 className="font-medium">Razorpay Script Loading:</h4>
            <div className={`mt-2 p-2 rounded ${testResults.scriptLoading?.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {testResults.scriptLoading?.success ? '✓' : '✗'} {testResults.scriptLoading?.message}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RazorpayTest; 