import { useDispatch } from "react-redux";
import { decreaseItem, increaseItems, removeItems } from "../utils/cartSlice.jsx";
import { LazyLoadImage } from "react-lazy-load-image-component"; 


export default function CartItem({ item }) {
  const dispatch = useDispatch();
  const discountPrice = item.price * (1 - item.discountPercentage / 100);
  //on click on - button it dispatches action to decreaseItem reducer function of item in cart
  function handleDec() {
    dispatch(decreaseItem(item));
  }
  //on click increases quantity of item in cart
  function handleInc() {
    dispatch(increaseItems(item));
  }
  //removes product from cart 
  function handleRemove() {
    if (window.confirm(`Remove "${item.title}" from cart?`)) {
    dispatch(removeItems(item));
  }
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between shadow-md rounded-xl p-4 border border-gray-100 hover:shadow-lg hover:scale-[1.01] transition-transform bg-gradient-to-r from-blue-300 via-cyan-200 to-green-300">
      {/* Product Image */}
      <div className="w-32 h-32 flex items-center justify-center overflow-hidden rounded-lg bg-gray-50">
       {/*lazy load images */} 
        <LazyLoadImage 
          src={item.thumbnail}
          alt={item.title}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 sm:ml-6 text-center sm:text-left mt-3 sm:mt-0">
        <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
        <p className="text-sm text-gray-500 mb-1">{item.brand}</p>
        {/*pricing content */}
        <p className="text-gray-600">
          Price:{" "}
          <span className="line-through text-gray-400">₹{item.price}</span>{" "}
          <span className="font-semibold text-green-600">
            ₹{discountPrice.toFixed(2)}
          </span>
        </p>
        <p className="text-sm text-gray-700">
          Subtotal:{" "}
          <span className="font-semibold text-gray-800">
            ₹{(discountPrice * item.quantity).toFixed(2)}
          </span>
        </p>
      </div>

    <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 mt-3 sm:mt-0">
      {/* Quantity Controls */}
      <div className="flex items-center gap-2 mt-3 sm:mt-0">
        {/*to decrease product quantity by 1 */}
        <button
          onClick={handleDec}
          className="cursor-pointer px-2 py-1 rounded-md bg-red-300 hover:bg-red-400 text-gray-800 font-semibold transition"
        >
          −
        </button>
        {/*to display total items selected */}
        <span className="px-3 py-1 border rounded-md text-gray-800 font-medium">
          {item.quantity}
        </span>
         {/*to increase product quantity by 1 */}
        <button
          onClick={handleInc}
          className="cursor-pointer px-2 py-1 rounded-md bg-blue-300 hover:bg-blue-400 text-gray-800 font-semibold transition"
        >
          +
        </button>
      </div>

      {/* Remove Button */}
      <div className="mt-3 sm:mt-0">
        <button
          onClick={handleRemove}
          className="cursor-pointer text-red-500 hover:text-red-600 font-medium text-sm underline ml-3 sm:ml-6 transition"
        >
          Remove
        </button>
      </div>
      </div>
    </div>
  );
}