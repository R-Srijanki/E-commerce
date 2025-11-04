import { Link, useParams } from "react-router-dom";
import { memo,useEffect,lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../utils/productSlice";
const ProductItem = lazy(() => import("./ProductItem"));
const Err=lazy(()=>import('./Err'));
const MemoizedProductItem = memo(ProductItem);

export default function Search({searchText}) {
  const dispatch=useDispatch();
  const {filteredProducts,products}=useSelector((state)=>state.product);

  // Update search query whenever route param changes
  useEffect(() => {
    if (products.length > 0) {
      dispatch(setSearchQuery(searchText));
    }
  }, [dispatch, searchText, products]);


  if (!products.length)
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-lg text-gray-700 dark:text-gray-200">
        Loading products...
      </div>
    );

  return (
    <div className="px-4 sm:px-8 py-10 bg-gradient-to-b from-blue-300 via-cyan-200 to-green-200 min-h-screen">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-semibold text-gray-800">
          Results for "<span className="italic">{searchText}</span>"
        </h2>
        <p className="text-gray-700 mt-1">
          {filteredProducts.length} item
          {filteredProducts.length !== 1 ? "s" : ""} found
        </p>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
          {filteredProducts.map((item) => (
           
              <MemoizedProductItem item={item} key={item.id}/>
            
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center min-h-[50vh]">
          <p className="text-xl font-medium">No products found.</p>
          <Link
            to="/"
            className="mt-4 px-4 py-2 bg-amber-400 text-black rounded-md hover:bg-amber-500 transition"
          >
            Back to Home
          </Link>
        </div>
      )}
    </div>
  );
}