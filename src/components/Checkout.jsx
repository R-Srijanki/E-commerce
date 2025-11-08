import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../utils/cartSlice";
import { useNavigate,Link } from "react-router-dom";

export default function Checkout() {
  const cart = useSelector((store) => store.cart); //to get cart details from store
  const dispatch = useDispatch(); 
  const navigate = useNavigate();
  //states for form details,errors 
  const [formErr, setFormErr] = useState({});
  //state for message after order placed successfully
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
      total + ((item.price * (1 - item.discountPercentage / 100)) * item.quantity),
    0
  );
  //variables for shipping,discount,total 
  const shipping = subtotal > 500 ? 0 : 40;
  const discount = subtotal * 0.05;
  const total = subtotal - discount + shipping;
  //on change event on input in form it updates state value
  function handleChange(e) {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  }
  //to validate form details entered 
  function validateForm() {
    const errors = {};
    //below are regex for mail, phone, name, text
    const regexMail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const regexPhone = /^\d{10}$/;
    const regexName = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
    const regex = /^[A-Za-z]+$/;

    if (!formData.name.trim() || !regexName.test(formData.name.trim()))
      errors.name = "Enter valid name";
    if (!formData.email.trim() || !regexMail.test(formData.email.trim()))
      errors.email = "Enter valid email";
    if (!formData.address.trim()) errors.address = "Address is required";
    if (!formData.contact.trim() || !regexPhone.test(formData.contact))
      errors.contact = "Enter valid contact number";
    if (!formData.city.trim() || !regex.test(formData.city.trim()))
      errors.city = "Valid City Name is required";
    if (!formData.state.trim() || !regex.test(formData.state.trim()))
      errors.state = "Valid State Name is required";
    if (!formData.pincode.trim() || formData.pincode.trim().length !== 6)
      errors.pincode = "Enter valid pincode";

    return errors;
  }
  //to handle form on submit event
  function handleForm(e) {
    e.preventDefault();
    const errors = validateForm();
    setFormErr(errors);
    //if error exits return 
    if (Object.keys(errors).length > 0) return;

  //no error then show message
    setSuccessMsg("✅ Order placed successfully! Redirecting...");
    
  }
  useEffect(() => {
    if (!successMsg) return; // only run when there's a message
//after 3s return to home page
    const timer = setTimeout(() => {
      setSuccessMsg("");
      //to clear cart action
    dispatch(clearCart());
      navigate("/");
    }, 3000);
//clean-up function
    return () => clearTimeout(timer);
  }, [successMsg, navigate]);

 
  return (<div className="min-h-screen">
    {cart.items.length === 0 ? ( 
        <div className="text-center text-gray-600 mt-10">
          <p className="text-lg">🛒 Your cart is empty.</p>
          <Link to="/" className="mt-4 inline-block px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Continue Shopping
          </Link>
        </div>
      ):(
    <>
    {/* ✅ Floating success message */}
      {successMsg && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-[9999] text-lg font-medium animate-fade-slide">
          {successMsg}
        </div>
    )}
    <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col lg:flex-row gap-10 min-h-screen overflow-auto">
      {/* Billing Form */}
      <div className="w-full lg:w-2/3 bg-white shadow-md h-fit rounded-2xl p-6 border border-gray-100">
        <h1 className="text-2xl font-semibold text-gray-800 mb-5">
          🧾 Billing Information
        </h1>
        {/*form to collect data */}
        <form onSubmit={handleForm} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/*it takes input and on submit it which check error and shows error if exists */}
         {/* Name */}
            <div className="flex flex-col">
              <label htmlFor="name" className="mb-1 text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500"
              />
              {formErr.name && <p className="text-red-500 text-sm">{formErr.name}</p>}
            </div>
          {/* Email */}
            <div className="flex flex-col">
              <label htmlFor="email" className="mb-1 text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500"
              />
              {formErr.email && <p className="text-red-500 text-sm">{formErr.email}</p>}
            </div>
          {/* Contact */}
            <div className="flex flex-col">
              <label htmlFor="contact" className="mb-1 text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                id="contact"
                type="number"
                value={formData.contact}
                onChange={handleChange}
                placeholder="10-digit phone"
                className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500"
              />
              {formErr.contact && <p className="text-red-500 text-sm">{formErr.contact}</p>}
            </div>
           {/* Address */}
            <div className="flex flex-col">
              <label htmlFor="address" className="mb-1 text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                id="address"
                type="text"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500"
              />
              {formErr.address && <p className="text-red-500 text-sm">{formErr.address}</p>}
            </div>
          {/* City */}
            <div className="flex flex-col">
              <label htmlFor="city" className="mb-1 text-sm font-medium text-gray-700">
                City
              </label>
              <input
                id="city"
                type="text"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500"
              />
              {formErr.city && <p className="text-red-500 text-sm">{formErr.city}</p>}
            </div>
           {/* State */}
            <div className="flex flex-col">
              <label htmlFor="state" className="mb-1 text-sm font-medium text-gray-700">
                State
              </label>
              <input
                id="state"
                type="text"
                value={formData.state}
                onChange={handleChange}
                placeholder="State"
                className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500"
              />
              {formErr.state && <p className="text-red-500 text-sm">{formErr.state}</p>}
            </div>

          {/* Pincode */}
            <div className="flex flex-col">
              <label htmlFor="pincode" className="mb-1 text-sm font-medium text-gray-700">
                Pincode
              </label>
              <input
                id="pincode"
                type="number"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="6-digit Pincode"
                className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500"
              />
              {formErr.pincode && <p className="text-red-500 text-sm">{formErr.pincode}</p>}
            </div>
          {/*payment and error*/}
          <div className="flex flex-col">
               <label htmlFor="cod" className="mb-1 text-sm font-medium text-gray-700">
                Payment Method
              </label>
              <select id="cod"
                onChange={handleChange}
                value={formData.cod}
                 className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500">
            <option value="cod">Cash on Delivery</option>
            <option value="card">Credit / Debit Card</option>
            <option value="upi">UPI / Net Banking</option>
          </select>
          </div>
          
        {/*on click it places order if no error exits in form details */}
         {/* Submit Button */}
            <button
              type="submit"
              className="col-span-1 sm:col-span-2 bg-green-600 text-white py-2.5 rounded-lg hover:bg-green-700 transition"
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
            {/*displays all cart items title and quantity added */}
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
              {/*displays all price,subtotal,discount,shipping details */}
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
    </>)}
    </div>
  );
  
}