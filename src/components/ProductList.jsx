import { Link, useParams} from "react-router-dom";
import useFetchData from "../Hooks/useFetchData";
import { lazy,memo,useState,Suspense} from "react";
import { useSelector } from "react-redux";
import { IoSearchOutline } from "react-icons/io5";
//lazy load components
const Search=lazy(()=>import("./Search"))
const Err=lazy(()=>import("./Err"));
const ProductItem = lazy(()=>import("./ProductItem"));
// Memoized ProductItem to prevent unnecessary re-renders
const MemoizedProductItem = memo(ProductItem);
 
export default function ProductList() {
  const { category } = useParams();//to get category
  const [searchText, setSearchText] = useState(""); //for searchtext state
  const { products } = useSelector((state) => state.product);//to get product from store
  const { data, loading, error } = useFetchData("https://dummyjson.com/products");
  //to handle input change
  function handleSearch(e) {
    setSearchText(e.target.value);
  }
  //on click search
 function handleclick(){
  if (!searchText.trim()) return;
 }
 //if data is not yet ready show loading
  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh] text-gray-700 text-lg">
        Loading products...
      </div>
    );
//error in fetching
  {error && (
  <Suspense fallback={<div>Loading Error...</div>}>
    <Err />
  </Suspense>
)}
//to filter products based on category
  const productsToShow = category
    ? products.filter(
        (item) => item.category.toLowerCase() === category.toLowerCase()
      )
    :products;
//no products of specific category 
  if (!productsToShow?.length)
    return (
      <div className="min-h-screen text-center bg-gradient-to-b from-blue-300 via-cyan-200 to-green-300">
        {/* Search Bar */}
                <div className="flex justify-center items-center py-4 shadow-sm ">
          <input
            type="text"
            placeholder="Search for product"
            value={searchText}
            onChange={handleSearch}
            className="bg-white placeholder-gray-500 w-72 md:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 mr-2 transition-all duration-200"/>
          <button onClick={handleclick} className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center justify-center">
              <IoSearchOutline className="text-xl" />
          </button>
        </div>
        <h1 className="text-3xl font-serif mb-3 mt-3 capitalize">
          {category ? `${category}` : "All Products"}
        </h1>
        <p className="text-gray-500 italic">No products found in this category.</p>
        <Link
          to="/"
          className="inline-block mt-4 px-5 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    );
//to handle for products display
  return (
    <div className="min-h-screen px-6 py-10 bg-gradient-to-b from-blue-300 via-cyan-200 to-green-300">
       {/* Search Bar */}
             <div className="flex justify-center items-center py-4 shadow-sm ">
          <input
            type="text"
            placeholder="Search for product"
            value={searchText}
            onChange={handleSearch}
            className="bg-white placeholder-gray-500 w-72 md:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 mr-2 transition-all duration-200"/>
          <button onClick={handleclick} className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center justify-center">
              <IoSearchOutline className="text-xl" />
          </button>
        </div>
      {/* Category Title */}
      {searchText ? (<Suspense fallback={<div>Searching...</div>}>
      <Search searchText={searchText} /></Suspense>):(
        <div>
      <h1 className="text-center font-serif text-4xl mb-8 mt-2.5 capitalize border-b-2 border-gray-200 inline-block mx-auto">
        {category ? `${category}` : "All Products"}
      </h1>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
        {productsToShow.map((item) => (
          
            <MemoizedProductItem item={item} key={item.id}/>
          
        ))}
      </div>
      </div>
      )}
    </div>
  );
}