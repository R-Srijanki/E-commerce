import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import { Provider } from "react-redux"
import store from '../src/utils/store'
import Footer from "./components/Footer"

function App() {
  return (
    <>
    <Provider store={store}>
      <Header/>
      <Outlet/>
      <Footer/>
      </Provider>
    </>
  )
}

export default App
