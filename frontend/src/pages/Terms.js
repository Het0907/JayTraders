import React from 'react';

export default function Terms() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
      <p className="mb-4">
        Welcome to Jay Traders. By accessing or using our website, you agree to be bound by these terms and conditions. Please read them carefully.
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>All products are subject to availability and may be withdrawn at any time.</li>
        <li>Prices are subject to change without prior notice.</li>
        <li>Orders are confirmed only after payment is received.</li>
        <li>Shipping charges will be as per actuals and will be communicated before dispatch.</li>
        <li>Returns and exchanges are subject to our return policy.</li>
        <li>Jay Traders reserves the right to refuse service to anyone for any reason at any time.</li>
        <li>All disputes are subject to jurisdiction of [Your City] courts only.</li>
      </ul>
      <p className="mt-6">For any queries, please contact us at <a href="mailto:support@jaytraders.com" className="text-blue-600 underline">support@jaytraders.com</a>.</p>
    </div>
  );
} 