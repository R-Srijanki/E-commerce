import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { increaseItems } from "../utils/cartSlice";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useState } from "react";



export default function ProductItem({ item }) {
  const [added,setadded]=useState(false);
  const dispatch = useDispatch();
  const discountPrice = item.price * (1 - item.discountPercentage / 100);

  function handleAddToCart(item) {
    setadded(true);
    dispatch(increaseItems(item));
  }

  return (
    <div className="w-[230px] bg-white shadow-md rounded-2xl p-3 hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between" key={item.id}>
      {/* Product Image */}
      <Link to={`/productdetail/${item.id}`}>
        <div className="relative overflow-hidden rounded-xl">
          <LazyLoadImage
            src={item.thumbnail}
            alt={item.title}
            className="rounded-xl h-[160px] w-full object-cover transition-transform duration-300 hover:scale-110"
          />
          {item.discountPercentage > 0 && (
            <span className="absolute top-2 left-2 bg-pink-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
              {item.discountPercentage}% OFF
            </span>
          )}
        </div>

        {/* Product Info */}
        <div className="text-center mt-3">
          <h2 className="font-semibold text-lg truncate text-gray-800 hover:text-pink-600 transition-colors">
            {item.title}
          </h2>
          <p className="text-sm mt-1 font-bold" style={{color:item.rating>=4?"green":item.rating>=3?"orange":"red"}}>⭐ {item.rating}</p>
          <div className="flex justify-center gap-2 mt-2 items-center">
            <span className="line-through text-gray-400 text-sm">₹{item.price}</span>
            <span className="text-green-600 font-semibold text-sm">
              ₹{discountPrice.toFixed(2)}
            </span>
          </div>
        </div>
      </Link>

      {/* Add to Cart Button */}
      <div className="text-center mt-4">
        {added&&<p className="text-green-800 font-bold">Item Added to cart</p>}
        <button
          onClick={() => handleAddToCart(item)}
          className="bg-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-pink-700 transition-colors duration-300"
        >
          Add to Cart 🛒
        </button>
      </div>
    </div>
  );
}