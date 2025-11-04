import { useParams } from "react-router-dom";
import { MdOutlineAssignmentReturn } from "react-icons/md";
import { RiSecurePaymentLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { increaseItems } from "../utils/cartSlice";
import useFetchData from "../Hooks/useFetchdata";
import { CgProfile } from "react-icons/cg";
import { useState,useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { lazy } from "react";
import { TiStar } from "react-icons/ti";
const Err=lazy(()=>import("./Err"));

export default function ProductDetail() {
 const { id } = useParams();
  const dispatch = useDispatch();
  const [added,setadded]=useState(false);
  const url = "https://dummyjson.com/products";
  const { data, error, loading } = useFetchData(`${url}/${id}`);

  //  Always call hooks before any return
  const [mainImg, setMainImg] = useState(data?.thumbnail);
   useEffect(() => {
    if (data?.thumbnail) setMainImg(data.thumbnail);
  }, [data]);

  //  Now you can conditionally return
  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh] text-gray-500 text-lg">
        Loading product details...
      </div>
    );

  if (error)
    return (
      <Err/>
    );

  if (!data) return null;
  function handleAddToCart() { 
    setadded(true);
    dispatch(increaseItems(data)); 
  }
  const discountPrice = data?.price * (1 - data?.discountPercentage / 100);
  return (
    <div className="min-h-screen max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-10 items-center md:items-start bg-gradient-to-r from-blue-200 via-cyan-100 to-green-100">
      {/* Product Image Section */}
     <div className="flex-1 shadow-lg rounded-2xl overflow-hidden md:sticky md:top-15 p-4 bg-white">
      {/* Main Product Image */}
      <LazyLoadImage
        src={mainImg}
        alt={data?.title}
        className="w-full h-[350px] object-cover rounded-2xl transition-transform duration-300 hover:scale-105"
      />

      {/* Thumbnails Section */}
      <div className="flex gap-3 mt-4 overflow-x-auto">
        {data?.images?.map((item, index) => (
          <LazyLoadImage
            key={index}
            src={item}
            alt={`${data?.title} ${index}`}
            className={`w-20 h-20 object-cover rounded-xl border-2 cursor-pointer ${
              mainImg === item ? "border-blue-500" : "border-gray-200"
            }`}
            onMouseOver={() => setMainImg(item)}
          />
        ))}
      </div>
    </div>

      {/* Product Details Section */}
      <div className="flex-1 space-y-4">
        {/* Title & Brand */}
        <h1 className="text-3xl font-serif text-gray-800">{data?.title}</h1>
        <h3 className="text-gray-600 italic">by <b>{data?.brand || "Unknown Brand"}</b></h3>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-2">
          {data?.tags?.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 border border-gray-300 rounded-full text-sm text-gray-600 hover:bg-pink-50 hover:border-pink-400 transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Rating */}
        <p className="text-sm font-bold flex" style={{color:data.rating>=4?"green":data.rating>=3?"orange":"red"}}><span className='mb-1 px-1 text-lg'><TiStar/></span> {data?.rating} / 5</p>

        {/* Price Section */}
        <div className="flex items-baseline gap-3">
          <span className="line-through text-gray-400 text-lg">₹{data?.price}</span>
          <span className="text-green-600 text-2xl font-bold">₹{discountPrice.toFixed(2)}</span>
          <span className="text-pink-600 font-semibold">
            ({data?.discountPercentage}% OFF)
          </span>
        </div>

        {/* Add to Cart Button */}
        {added&&<p className="text-green-800 font-bold">Item Added to Cart</p>}
        <button
          onClick={handleAddToCart}
          className="cursor-pointer mt-4 bg-pink-600 text-white px-6 py-2 rounded-full hover:bg-pink-700 transition-colors duration-300"
        >
          Add to Cart 🛒
        </button>

        {/* Policy Info */}
        <div className="flex gap-6 items-start mt-6">
          <div className="flex items-center gap-2 text-gray-600">
            <MdOutlineAssignmentReturn size={22} className="text-pink-600" />
            <p className="text-sm">{data?.returnPolicy}</p>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <RiSecurePaymentLine size={22} className="text-pink-600" />
            <p className="text-sm">{data?.warrantyInformation}</p>
          </div>
        </div>

        {/* Product Details */}
        <div className="mt-6 space-y-2">
          <h3 className="font-semibold text-lg border-b border-gray-200 pb-1">
            Product Details
          </h3>
          <p className="text-gray-700">
            Dimensions:{" "}
            <span className="italic">
              {data?.dimensions?.width}W × {data?.dimensions?.height}H ×{" "}
              {data?.dimensions?.depth}D
            </span>
          </p>
          <p className="text-gray-700">Weight: {data?.weight} kg</p>
        </div>

        {/* Description */}
        <div className="mt-6">
          <h3 className="font-semibold text-lg border-b border-gray-200 pb-1">
            About this item
          </h3>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mt-2">
            {data?.description
              ?.split(".")
              ?.filter((sent) => sent.trim().length > 0)
              .map((sent) => (
                <li key={sent} className="italic">
                  {sent.trim()}.
                </li>
              ))}
          </ul>
        </div>
       <div className="mt-8 border-t border-gray-300 pt-6">
  <h2 className="text-2xl font-semibold mb-4 text-gray-800">Ratings & Reviews</h2>

  <div className="flex items-center gap-2 mb-2">
    <h3 className="text-xl font-bold" style={{color:data.rating>=4?"green":data.rating>=3?"orange":"red"}}>{data.rating}</h3>
    <span className="text-lg font-bold">⭐</span>
  </div>

  <p className="text-gray-600 mb-4">Customer Reviews</p>

  <div className="space-y-4">
    {data.reviews.map((item, index) => (
      <div
        key={index}
        className="bg-gray-100 p-4 rounded-lg shadow-sm hover:shadow-md transition-all"
      >
        <p className="font-semibold text-gray-800 flex items-center gap-2">
          <CgProfile className="text-gray-600 text-lg" /> {item.reviewerName}
        </p>
       <p className="font-normal w-fit px-1 rounded-lg text-white" style={{backgroundColor:item.rating >= 4 ? "green": item.rating >= 3? "orange": "red",}}>
  {item.rating} ⭐</p>
        <p className="text-sm text-gray-500">
          Reviewed on {new Date(item.date).toDateString()}
        </p>
        <span className="block mt-2 text-gray-700">{item.comment}</span>
      </div>
    ))}
  </div>
</div>
      </div>
    </div>
  );
}
