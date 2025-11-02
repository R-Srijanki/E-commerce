import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { clearCart } from "../utils/cartSlice";
import { lazy } from "react";

const CartItem = lazy(()=>import("./CartItem"));

export default function Cart() {
  const cart = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  function handlecart() {
    dispatch(clearCart());
  }

  // Calculate subtotal
  const subtotal = cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8 min-h-screen">
      <h1 className="text-3xl font-semibold text-center mb-8 font-serif text-gray-800">
        🛒 Shopping Cart
      </h1>

      {cart.items.length === 0 ? (
        <div className="text-center text-gray-600 mt-10">
          <p className="text-lg">Your cart is empty.</p>
          <Link
            to="/"
            className="mt-4 inline-block px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items Section */}
          <div className="flex flex-col w-full lg:w-3/4 space-y-4">
            {cart.items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* Cart Summary Section */}
          <div className="w-full lg:w-1/4 bg-gray-50 shadow-md p-6 rounded-xl h-fit sticky top-24">
            <h2 className="text-xl font-medium mb-4 text-gray-800 border-b pb-2">
              Order Summary
            </h2>
            <p className="flex justify-between mb-2 text-gray-700">
              <span>Total Items:</span>
              <span className="font-semibold">{cart.total}</span>
            </p>
            <p className="flex justify-between mb-2 text-gray-700">
              <span>Subtotal:</span>
              <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
            </p>
            <p className="flex justify-between mb-4 text-gray-700">
              <span>Shipping:</span>
              <span className="font-semibold text-green-600">Free</span>
            </p>

            <hr className="my-3" />

            <p className="flex justify-between text-lg font-semibold text-gray-800">
              <span>Total:</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </p>

            <div className="flex flex-col gap-3 mt-6">
              <Link
                to="/checkout"
                className="bg-green-600 text-white text-center py-2 rounded-lg hover:bg-green-700 transition"
              >
                Proceed to Checkout
              </Link>
              <button
                onClick={handlecart}
                className="bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
