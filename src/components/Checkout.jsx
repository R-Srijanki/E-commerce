import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../utils/cartSlice";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const cart = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formErr, setFormErr] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    contact: "",
    city: "",
    state: "",
    pincode: "",
    cod: "cod",
  });

  // Calculate totals
  const subtotal = cart.items.reduce(
    (total, item) =>
      total + item.price * (1 - item.discountPercentage / 100) * item.quantity,
    0
  );
  const shipping = subtotal > 500 ? 0 : 40;
  const discount = subtotal * 0.05;
  const total = subtotal - discount + shipping;

  function handleChange(e) {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value.trim() }));
  }

  function validateForm() {
    const errors = {};
    const regexMail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const regexPhone = /^\d{10}$/;
    const regexName = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
    const regex = /^[A-Za-z]+$/;

    if (!formData.name || !regexName.test(formData.name))
      errors.name = "Enter valid name";
    if (!formData.email || !regexMail.test(formData.email))
      errors.email = "Enter valid email";
    if (!formData.address) errors.address = "Address is required";
    if (!formData.contact || !regexPhone.test(formData.contact))
      errors.contact = "Enter valid contact number";
    if (!formData.city || !regex.test(formData.city))
      errors.city = "City is required";
    if (!formData.state || !regex.test(formData.state))
      errors.state = "State is required";
    if (!formData.pincode || formData.pincode.length !== 6)
      errors.pincode = "Enter valid pincode";

    return errors;
  }

  function handleForm(e) {
    e.preventDefault();
    const errors = validateForm();
    setFormErr(errors);
    if (Object.keys(errors).length > 0) return;

  
    setSuccessMsg("✅ Order placed successfully! Redirecting...");
    dispatch(clearCart());

      // Hide message and navigate after 1.5 seconds
    
    
  }
  useEffect(() => {
    if (!successMsg) return; // only run when there's a message

    const timer = setTimeout(() => {
      setSuccessMsg("");
      navigate("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, [successMsg, navigate]);

  return (
    <>
    {/* ✅ Floating success message */}
      {successMsg && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-[9999] text-lg font-medium animate-fade-slide">
          {successMsg}
        </div>
    )}
    <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col lg:flex-row gap-10">
      {/* Billing Form */}
      <div className="w-full lg:w-2/3 bg-white shadow-md rounded-2xl p-6 border border-gray-100">
        <h1 className="text-2xl font-semibold text-gray-800 mb-5">
          🧾 Billing Information
        </h1>
        <form onSubmit={handleForm} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
          <input
            type="text"
            placeholder="Full Name"
            id="name"
            onChange={handleChange}
            value={formData.name}
            className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500"
          />
          {formErr.name && <p className="text-red-500 text-sm">{formErr.name}</p>}
          </div>
          <div>
          <input
            type="email"
            placeholder="Email Address"
            id="email"
            onChange={handleChange}
            value={formData.email}
            className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500"
          />
          {formErr.email && <p className="text-red-500 text-sm">{formErr.email}</p>}
          </div>
          <div>
          <input
            type="number"
            placeholder="Phone Number"
            id="contact"
            onChange={handleChange}
            value={formData.contact}
            className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500"
          />
          {formErr.contact && <p className="text-red-500 text-sm">{formErr.contact}</p>}
          </div>
          <div>
          <input
            type="text"
            placeholder="Address"
            id="address"
            onChange={handleChange}
            value={formData.address}
            className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500"
          />
          {formErr.address && <p className="text-red-500 text-sm">{formErr.address}</p>}
          </div>
          <div>
          <input
            type="text"
            placeholder="City"
            id="city"
            onChange={handleChange}
            value={formData.city}
            className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500"
          />
          {formErr.city && <p className="text-red-500 text-sm">{formErr.city}</p>}
          </div>
          <div>
          <input
            type="text"
            placeholder="State"
            id="state"
            onChange={handleChange}
            value={formData.state}
            className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500"
          />
          {formErr.state && <p className="text-red-500 text-sm">{formErr.state}</p>}
          </div>
          <div>
          <input
            type="number"
            placeholder="Pincode"
            id="pincode"
            onChange={handleChange}
            value={formData.pincode}
            className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500"
          />
          {formErr.pincode && <p className="text-red-500 text-sm">{formErr.pincode}</p>}
          </div>
          <select
            id="cod"
            onChange={handleChange}
            value={formData.cod}
            className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 col-span-2"
          >
            <option value="cod">Cash on Delivery</option>
            <option value="card">Credit / Debit Card</option>
            <option value="upi">UPI / Net Banking</option>
          </select>

          <button
            type="submit"
            className="col-span-2 mt-4 bg-green-600 text-white py-2.5 rounded-lg hover:bg-green-700 transition"
          >
            Place Order
          </button>
        </form>
      </div>

      {/* Order Summary */}
      <div className="w-full lg:w-1/3 bg-gray-50 shadow-md rounded-2xl p-6 border border-gray-100 h-fit">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          🛍️ Order Summary
        </h3>
        {cart.items.length === 0 ? (
          <p className="text-gray-600">No items in cart.</p>
        ) : (
          <div>
            <ul className="divide-y">
              {cart.items.map((item) => (
                <li key={item.id} className="flex justify-between py-2 text-gray-700">
                  <span>
                    {item.title} x {item.quantity}
                  </span>
                  <span>
                    ₹
                    {(
                      item.price *
                      (1 - item.discountPercentage / 100) *
                      item.quantity
                    ).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>

            <hr className="my-4" />
            <p className="flex justify-between">
              <span>Subtotal:</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </p>
            <p className="flex justify-between">
              <span>Discount (5%):</span>
              <span>-₹{discount.toFixed(2)}</span>
            </p>
            <p className="flex justify-between">
              <span>Shipping:</span>
              <span className="text-green-600">
                {shipping === 0 ? "Free" : `₹${shipping}`}
              </span>
            </p>
            <hr className="my-4" />
            <p className="flex justify-between text-lg font-semibold">
              <span>Total:</span>
              <span>₹{total.toFixed(2)}</span>
            </p>
          </div>
        )}
      </div>
    </div>
    </>
  );
}