import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./pages/registration-login/Register";
import Login from "./pages/registration-login/Login";
import Admin from "./pages/admin/Admin";
import Buyers from "./pages/buyer/Buyers";
import Dashboard from "./pages/dashboard/Dashboard";
import Category from "./pages/category/Category";
import Products from "./pages/products/Products";
import PaymentOptions from "./pages/payment-option/PaymentOption";
import Profile from "./pages/profile/Profile";
import Orders from "./pages/order/Order";
import Reviews from "./pages/review/Review";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase-config";
import { getUserAction } from "./pages/registration-login/UserAction";
import { useDispatch } from "react-redux";
import { PrivateRoute } from "./components/privateRoute/PrivateRoute";
import { AddProduct } from "./components/product/AddProduct";
import { EditProduct } from "./components/product/EditProduct";

function App() {
  const dispatch = useDispatch();
  onAuthStateChanged(auth, (users) => {
    // users?.uid && navigate("/dashboard");
    users?.uid && dispatch(getUserAction(users?.uid));
  });
  return (
    <div className='App'>
      <Routes>
        <Route
          path='/'
          element={<Login />}
        />

        {/* // private routes  */}
        <Route
          path='/registration'
          element={
            <PrivateRoute>
              <Register />
            </PrivateRoute>
          }
        />
        <Route
          path='/dashboard'
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path='/categories'
          element={
            <PrivateRoute>
              <Category />
            </PrivateRoute>
          }
        />
        <Route
          path='/products'
          element={
            <PrivateRoute>
              <Products />
            </PrivateRoute>
          }
        />
        <Route
          path='/Add-Product'
          element={
            <PrivateRoute>
              <AddProduct></AddProduct>
            </PrivateRoute>
          }
        />
        {/* edit product  */}
        <Route
          path='/Edit-Product'
          element={
            <PrivateRoute>
              <EditProduct />
            </PrivateRoute>
          }
        />
        <Route
          path='/payment-options'
          element={
            <PrivateRoute>
              <PaymentOptions />
            </PrivateRoute>
          }
        />
        <Route
          path='/orders'
          element={
            <PrivateRoute>
              <Orders />
            </PrivateRoute>
          }
        />
        <Route
          path='/buyers'
          element={
            <PrivateRoute>
              <Buyers />
            </PrivateRoute>
          }
        />
        <Route
          path='/reviews'
          element={
            <PrivateRoute>
              <Reviews />
            </PrivateRoute>
          }
        />
        <Route
          path='/admin'
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
      {/* {toast.success("checking")} */}
      <ToastContainer />
    </div>
  );
}

export default App;
