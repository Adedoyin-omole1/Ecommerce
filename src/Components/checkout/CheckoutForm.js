"use client";

import { useState } from "react";

export default function CheckoutForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    shipping: {},
    payment: {},
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        {["Shipping", "Payment", "Review"].map((label, index) => (
          <div key={label} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                index + 1 <= step
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {index + 1}
            </div>
            <span className="ml-2">{label}</span>
            {index < 2 && <div className="w-16 h-0.5 bg-gray-200 mx-2" />}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Shipping Address</h2>
          <input
            type="text"
            name="address"
            placeholder="Address"
            onChange={handleChange}
            className="w-full p-3 border rounded-md"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            onChange={handleChange}
            className="w-full p-3 border rounded-md"
          />
          <input
            type="text"
            name="zip"
            placeholder="ZIP Code"
            onChange={handleChange}
            className="w-full p-3 border rounded-md"
          />
          <button
            onClick={() => setStep(2)}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Continue to Payment
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Payment</h2>
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number"
            onChange={handleChange}
            className="w-full p-3 border rounded-md"
          />
          <div className="flex gap-4">
            <input
              type="text"
              name="expiry"
              placeholder="MM/YY"
              onChange={handleChange}
              className="w-1/2 p-3 border rounded-md"
            />
            <input
              type="text"
              name="cvv"
              placeholder="CVV"
              onChange={handleChange}
              className="w-1/2 p-3 border rounded-md"
            />
          </div>
          <button
            onClick={() => setStep(3)}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Review Order
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Review Your Order</h2>
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="font-semibold mb-2">Shipping Address</h3>
            <p>{formData.shipping.address || "Not provided"}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="font-semibold mb-2">Payment Method</h3>
            <p>Card ending in ****{formData.payment.cardNumber?.slice(-4) || "0000"}</p>
          </div>
          <button
            onClick={() => alert("Order placed successfully!")}
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
          >
            Place Order
          </button>
        </div>
      )}
    </div>
  );
}
