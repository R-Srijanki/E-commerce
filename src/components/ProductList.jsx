import { Link, useParams } from "react-router-dom";
import useFetchData from "../Hooks/useFetchdata";
import { lazy,memo,useEffect} from "react";
import { useSelector } from "react-redux";

const Err=lazy(()=>import("./Err"));
const ProductItem = lazy(()=>import("./ProductItem"));
// Memoized ProductItem to prevent unnecessary re-renders
const MemoizedProductItem = memo(ProductItem);

export default function ProductList() {
  const { category } = useParams();
  
  const { products } = useSelector((state) => state.product);
  const { data, loading, error } = useFetchData("https://dummyjson.com/products");

 
  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh] text-gray-500 text-lg">
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
      <div className="min-h-screen text-center mt-20 bg-gradient-to-b from-blue-300 via-cyan-200 to-green-300">
        <h1 className="text-3xl font-serif mb-3 capitalize">
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
      {/* Category Title */}
      <h1 className="text-center font-serif text-4xl mb-8 capitalize border-b-2 border-gray-200 inline-block mx-auto">
        {category ? `${category}` : "All Products"}
      </h1>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
        {productsToShow.map((item) => (
          
            <MemoizedProductItem item={item} key={item.id}/>
          
        ))}
      </div>
    </div>
  );
}