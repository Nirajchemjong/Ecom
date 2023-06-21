import { Button } from "react-bootstrap";
import "./App.css";
import { FaBeer } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <h3>
          Lets go for a <FaBeer />?
          <Button className='btn-success'>hello world</Button>
        </h3>
      </header>
      {toast.success("checking")}
      <ToastContainer />
    </div>
  );
}

export default App;
