import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./pages/registration/Register";

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route
          path='/'
          element={<Register />}
        ></Route>
      </Routes>
      {/* {toast.success("checking")} */}
      <ToastContainer />
    </div>
  );
}

export default App;
