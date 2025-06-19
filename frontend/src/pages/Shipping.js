import React from 'react';

export default function Shipping() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Shipping Details</h1>
      <p className="mb-4">
        <strong>Shipping Charges:</strong> Shipping will be charged as per actuals based on the weight, size, and destination of your order. The exact shipping cost will be communicated to you before dispatch.
      </p>
      <p className="mb-4">
        <strong>Delivery Time:</strong> Orders are usually processed within 1-2 business days. Delivery times may vary depending on your location and the availability of products.
      </p>
      <p className="mb-4">
        <strong>Order Tracking:</strong> Once your order is shipped, you will receive a tracking number via email or SMS.
      </p>
      <p className="mb-4">
        <strong>International Shipping:</strong> For international orders, please contact us for a custom quote.
      </p>
      <p>
        For any shipping-related queries, please contact us at <a href="mailto:support@jaytraders.com" className="text-blue-600 underline">support@jaytraders.com</a>.
      </p>
    </div>
  );
} 