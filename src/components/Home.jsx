import { Link } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import useFetchData from '../Hooks/useFetchData';
import { LazyLoadImage } from "react-lazy-load-image-component";
import { lazy } from 'react';
import { addProduct } from '../utils/productSlice';
import { useDispatch } from 'react-redux';
import { TiStar } from "react-icons/ti";
//icons for page
//lazy load for err component
const Err=lazy(()=>import("./Err"));

export default function Home() {
  const { data, loading, error } = useFetchData('https://dummyjson.com/products');//custom hook for api call
  const dispatch=useDispatch();
  const categories = useMemo(() => [
          { name: 'Beauty', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW1lgSdy3T6XFCNVEnUkvJir1QZK7nYHN9bA&s' },
          { name: 'Fragrances', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjK0SQ6OmxPPr3Bgvb9aI0hsOxvW2yXN8I4g&s' },
          { name: 'Furniture', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4l7w3GR0OjjlwzmWf3R0n9duY91137oxZAg&s' },
          { name: 'Groceries', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHgG0y7gaDKqOOdNjpOne9wBZaYdV5o1JcWQ&s' },
          { name: 'All Categories', img: 'https://th.bing.com/th/id/OIP.CifpG7TDeZ-69yeIHgarwgHaHa?w=163&h=180&c=7&r=0&o=7&pid=1.7&rm=3' },
        ], []);
   // when data is fetched, add to redux store
  useEffect(() => {
    if (data?.products) {
      dispatch(addProduct(data.products));
    }
  }, [data, dispatch]);
//to extract top deals from data fetched to display home page
  const crazyDealsProducts = useMemo(() => {
    if (!data?.products) return [];
    return [...data.products].sort((a, b) => b.discountPercentage - a.discountPercentage).slice(0, 5);
  }, [data]);
//to extract top rated products from data fetched by api call
  const topRatedProducts = useMemo(() => {
    if (!data?.products) return [];
    return [...data.products].sort((a, b) => b.rating - a.rating).slice(0, 5);
  }, [data]);

  return (
    <div className="px-6 py-10 bg-gradient-to-b from-blue-300 via-cyan-200 to-green-300">
      {/* Header Section */}
      <div className="text-center mb-10 bg-blue-400 py-10 rounded-2xl">
        <h1 className="text-5xl font-serif font-semibold mb-3">Welcome to Shoppy Globe</h1>
        <p className="text-lg italic text-gray-600 max-w-3xl mx-auto">
          Explore our wide range of products and enjoy a seamless shopping experience. Don't forget to check out our exclusive deals just for you!
        </p>
      </div>

      {/* Category Section */}
      <h2 className="text-center font-serif text-3xl mb-6 border-b border-gray-300 pb-2">Shop By Category</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center mb-10">
        {categories.map((cat) => (
          <div key={cat.name} className="text-center group">
            <Link to={`/category/${cat.name === 'All Categories' ? '' : cat.name.toLowerCase()}`}>
            {/*lazy loading images */}
              <LazyLoadImage
                src={cat.img}
                alt={cat.name}
                className="rounded-full w-[160px] h-[160px] object-cover border-2 border-gray-300 shadow-md transition-transform duration-300 group-hover:scale-110"
              />
            </Link>
            <h3 className="mt-2 font-sans italic text-lg group-hover:text-pink-600 transition-colors">{cat.name}</h3>
          </div>
        ))}
      </div>

      {/* Loading & Error */}
      {loading && <div className="text-center text-gray-500 text-lg">Loading...</div>}
     {error && (<Suspense fallback={<div className="text-center text-gray-500">Loading Error...</div>}>
    <Err /></Suspense>)}


      {/* Product Sections */}
      {!loading && !error && (
        <>
          {/* Crazy Deals */}
          <section className="mb-12">
            <h2 className="text-center font-serif text-3xl mb-6">Top Crazy Deals (Up to 20% OFF)</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 justify-items-center">
              {crazyDealsProducts.map((item) => (
                //on click displays product details
                <Link to={`/productdetail/${item.id}`} key={item.id}>
                  <div className="shadow-md w-[220px] bg-white rounded-2xl p-3 hover:shadow-xl transition-transform duration-300 hover:scale-105 relative">
                    <LazyLoadImage src={item.thumbnail} alt={item.title} className="rounded-lg h-[150px] w-full object-cover mb-3" />
                    <span className="absolute top-2 left-2 bg-pink-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
              {item.discountPercentage}% OFF
            </span>
                    <div className="text-center">
                      <h2 className="font-semibold text-lg mb-1 truncate">{item.title}</h2>
                      {/* <span className="text-sm font-bold flex justify-center" style={{color:item.rating>=4?"green":item.rating>=3?"orange":"red"}}><span className='mb-1 px-1 text-lg'><TiStar/></span> {item.rating}</span> */}
                      <div className="flex justify-center gap-2 mt-1">
                        <span className="line-through text-gray-400 text-sm">₹{item.price}</span>
                        <span className="font-bold text-green-600 text-sm">
                          ₹{(item.price * (1 - item.discountPercentage / 100)).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Top Rated */}
          <section>
            <h2 className="text-center font-serif text-3xl mb-6">Top Rated Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 justify-items-center">
              {topRatedProducts.map((item) => (
                //on click displays product details
                <Link to={`/productdetail/${item.id}`} key={item.id}>
                  <div className="shadow-md w-[220px] bg-white rounded-2xl p-3 hover:shadow-xl transition-transform duration-300 hover:scale-105">
                    <LazyLoadImage src={item.thumbnail} alt={item.title} className="rounded-lg h-[150px] w-full object-cover mb-3" />
                    {/*lazy loading image */}
                    <div className="text-center">
                      <h2 className="font-semibold text-lg mb-1 truncate">{item.title}</h2>
                      <span className="text-sm font-bold flex justify-center" style={{color:item.rating>=4?"green":item.rating>=3?"orange":"red"}}><span className='mb-1 px-1 text-lg'><TiStar/></span> {item.rating}</span>
                      <div className="flex justify-center gap-2 mt-1">
                        <span className="line-through text-gray-400 text-sm">₹{item.price}</span>
                        <span className="font-bold text-green-600 text-sm">
                          ₹{(item.price * (1 - item.discountPercentage / 100)).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}