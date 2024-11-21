import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import "./App.css";
import AwbTracking from "./AwbTracking";

function App() {
  return (
    <Router>
      <div className="container mx-auto flex justify-center">
        <Routes>
          <Route path="/" element={<AwbTracking />} />
          <Route path="/TrackingDetails" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;