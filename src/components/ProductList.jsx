import { Link, useParams} from "react-router-dom";
import useFetchData from "../Hooks/useFetchdata";
import { lazy,memo,useEffect,useState} from "react";
import { useSelector } from "react-redux";
import { IoSearchOutline } from "react-icons/io5";

const Search=lazy(()=>import("./Search"))
const Err=lazy(()=>import("./Err"));
const ProductItem = lazy(()=>import("./ProductItem"));
// Memoized ProductItem to prevent unnecessary re-renders
const MemoizedProductItem = memo(ProductItem);
 
export default function ProductList() {
  const { category } = useParams();
  const [searchText, setSearchText] = useState("");
  const { products } = useSelector((state) => state.product);
  const { data, loading, error } = useFetchData("https://dummyjson.com/products");

   function handleSearch(e) {
    setSearchText(e.target.value);
  }
 function handleclick(){
  if(searchText.trim()=="")  return;
 }
  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh] text-gray-700 text-lg">
        Loading products...
      </div>
    );

  if (error)
    return (
      <Err/>
    );

  const productsToShow = category
    ? products.filter(
        (item) => item.category.toLowerCase() === category.toLowerCase()
      )
    :products;

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
      {searchText?<Search searchText={searchText}/>:(
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