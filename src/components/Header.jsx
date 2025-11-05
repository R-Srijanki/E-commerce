import { BsCart2 } from "react-icons/bs";
import { FaShopify } from "react-icons/fa";
import { RiBillLine } from "react-icons/ri";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiTwotoneHome } from "react-icons/ai";
import { Link} from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";


export default function Header() {
  const [click,setclick]=useState(false); //to handle click state
   const totalCartItems = useSelector((store) => store.cart.total); //fetch total items in cart

  return (
    <header className="bg-gray-900 text-white sticky top-0 z-10 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 sm:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl sm:text-3xl font-semibold text-amber-400 tracking-wide hover:text-amber-300 transition"
        >
          Shoppy<span className="text-white">Globe</span>
        </Link>

       

        {/* Navigation / Cart */}
        <nav className="hidden md:flex items-center gap-4 sm:gap-8">
          <Link to="/" className="relative flex items-center gap-1 text-lg font-medium hover:text-amber-400 transition"><AiTwotoneHome/><span className="sm:inline">Home</span></Link>
          <Link to="/category" className="relative flex items-center gap-1 text-lg font-medium hover:text-amber-400 transition"><FaShopify/><span className="sm:inline">Shop</span></Link>
          <Link to="/checkout" className="relative flex items-center gap-1 text-lg font-medium hover:text-amber-400 transition"><RiBillLine/><span className="sm:inline">Checkout</span></Link>
          <Link to="/cart" className="relative flex items-center gap-1 text-lg font-medium hover:text-amber-400 transition">
            <BsCart2 className="text-2xl" />
            {totalCartItems > 0 && (
              <span className="absolute -top-2 -right-3 bg-amber-400 text-gray-900 text-xs font-bold px-1.5 py-0.5 rounded-full">
                {totalCartItems}
              </span>
            )}
            <span className="sm:inline">Cart</span>
          </Link>
        </nav>
        {/*small screen */}
        <button
      onClick={() => setclick(!click)}
      className="md:hidden border-none cursor-pointer text-2xl text-white hover:text-amber-300 transition-colors relative mr-6">
      <RxHamburgerMenu/>
    </button>
          {/* 📋 Dropdown for Mobile */}
    <div
      className={`md:hidden absolute top-full right-4 bg-white border border-gray-200 rounded-lg shadow-lg z-50 transition-all duration-300 ease-in-out ${
        click ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
      }`}
    >
      <nav className="flex flex-col p-2.5 w-35">
        <Link to="/" className="no-underline text-gray-700 py-2 px-3 rounded-md hover:bg-indigo-50 hover:text-indigo-700"
          onClick={() => setclick(false)}>Home</Link>
        <Link to="/category" className="no-underline text-gray-700 py-2 px-3 rounded-md hover:bg-indigo-50 hover:text-indigo-700"
          onClick={() => setclick(false)}>Shop</Link>
        <Link to="/checkout"  className="no-underline text-gray-700 py-2 px-3 rounded-md hover:bg-indigo-50 hover:text-indigo-700"
          onClick={() => setclick(false)}>Checkout</Link>
        <Link to="/cart"  className="no-underline text-gray-700 py-2 px-3 rounded-md hover:bg-indigo-50 hover:text-indigo-700"
          onClick={() => setclick(false)}>Cart({totalCartItems})</Link>
      </nav>
    </div>
      </div>
    </header>
  );
}