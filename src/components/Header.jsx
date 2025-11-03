import { BsCart2 } from "react-icons/bs";

import { Link} from "react-router-dom";
import { useSelector } from "react-redux";


export default function Header() {
   const totalCartItems = useSelector((store) => store.cart.total);

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
        <nav className="flex items-center gap-4 sm:gap-6">
          <Link
            to="/cart"
            className="relative flex items-center gap-1 text-lg font-medium hover:text-amber-400 transition"
          >
            <BsCart2 className="text-2xl" />
            {totalCartItems > 0 && (
              <span className="absolute -top-2 -right-3 bg-amber-400 text-gray-900 text-xs font-bold px-1.5 py-0.5 rounded-full">
                {totalCartItems}
              </span>
            )}
            <span className="hidden sm:inline">Cart</span>
          </Link>
        </nav>
      </div>

      {/* Search bar on small screens
      <form
        onSubmit={handleSubmit}
        className="flex sm:hidden items-center border border-gray-500 rounded-md mx-4 overflow-hidden bg-gray-800 focus-within:border-amber-400 transition"
      >
        <input
          type="text"
          placeholder="Search products..."
          value={searchText}
          onChange={handleSearch}
          className="flex-grow px-3 py-2 bg-transparent outline-none text-white placeholder-gray-400"
        />
        <button
          type="submit"
          className="px-3 py-2 bg-amber-400 text-gray-900 hover:bg-amber-300 transition"
        >
          <IoSearchOutline className="text-xl" />
        </button>
      </form> */}
    </header>
  );
}