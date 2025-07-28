
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
function App() {
    return (
    
      <div className="App">

      <ToastContainer position="top-right"/>
      <AppRoutes />
     
    </div>    
    );
}

export default App;
