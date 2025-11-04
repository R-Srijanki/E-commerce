import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { lazy, Suspense } from 'react'

// Lazy-loaded components
const NotFound = lazy(() => import('./components/NotFound.jsx'))
const Home = lazy(() => import('./components/Home.jsx'))
const Cart = lazy(() => import('./components/Cart.jsx'))
const ProductDetail = lazy(() => import('./components/ProductDetail.jsx'))
const ProductList = lazy(() => import('./components/ProductList.jsx'))
const Search = lazy(() => import('./components/Search.jsx'))
const Checkout = lazy(() => import('./components/Checkout.jsx'))

// Centralized suspense wrapper for consistency
const LazyWrapper = (Component) => (
  <Suspense fallback={<div className="text-center py-10 text-gray-600">Loading...</div>}>
    <Component />
  </Suspense>
)

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: LazyWrapper(Home) },
      { path: 'cart', element: LazyWrapper(Cart) },
      { path: 'productdetail/:id', element: LazyWrapper(ProductDetail) },
      { path: 'category', element: LazyWrapper(ProductList) },
      { path: 'category/:category', element: LazyWrapper(ProductList) },
      { path: 'checkout', element: LazyWrapper(Checkout) },
    ],
    errorElement: LazyWrapper(NotFound),
  },
])

createRoot(document.getElementById('root')).render(
    <Suspense fallback={<div className="text-center py-10 text-gray-600">Loading App...</div>}>
    <RouterProvider router={appRouter} />
  </Suspense>

)