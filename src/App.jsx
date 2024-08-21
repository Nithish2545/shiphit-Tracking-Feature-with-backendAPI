// import React, { useEffect } from "react";
// import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from "react-router-dom";
// import Home from "./Home";
// import AwbTrackingForm from "./AwbTrackingForm";
// import "./App.css";

// function App() {
//   return (
//     <Router>
//       <div className="container mx-auto">
//         <Routes>
//           {/* Redirect to /track when the app launches */}
//           <Route path="/" element={<Navigate to="/track" />} />
          
//           {/* Protected route for Home */}
//           <Route 
//             path="/home" 
//             element={<ProtectedRoute><Home /></ProtectedRoute>} 
//           />
          
//           <Route path="/track" element={<AwbTracking />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// function ProtectedRoute({ children }) {
//   const storedData = localStorage.getItem("awbTrackingData");

//   if (!storedData) {
//     // If no data is found, redirect to /track
//     return <Navigate to="/track" />;
//   }

//   // If data is found, allow access to the protected route
//   return children;
// }

// function AwbTracking() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Set an interval to check every second if data is in local storage
//     const interval = setInterval(() => {
//       const storedData = localStorage.getItem("awbTrackingData");
//       if (storedData) {
//         navigate("/home"); // Navigate to the home page if data exists
//       }
//     }, 1000); // Check every 1 second

//     // Clean up the interval on component unmount
//     return () => clearInterval(interval);
//   }, [navigate]);

//   return <AwbTrackingForm />;
// }

// export default App;

import Testing1 from './Testing1'

function App() {
  return (
    <div><Testing1/></div>
  )
}

export default App