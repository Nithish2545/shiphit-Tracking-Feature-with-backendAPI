import "./Home.css";
import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";

function Home() {
  const location = useLocation();
  const { awbNumber } = location.state || {};
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const fetchData = async (collectionName) => {
    try {
      const q = query(
        collection(db, collectionName),
        where("awbNumber", "==", parseInt(awbNumber))
      );
      const querySnapshot = await getDocs(q);
      const fetchedData = querySnapshot.docs.map((doc) => doc.data());
      setData(fetchedData);
    } catch (e) {
      setError("Failed to fetch data. Please try again.");
    }
  };

  useEffect(() => {
    if (!awbNumber) return;
    if (awbNumber > 3000) {
      fetchData("franchise_coimbatore");
    } else if (awbNumber > 2000) {
      fetchData("franchise_pondy");
    } else if (awbNumber > 1000) {
      fetchData("pickup");
    } else {
      setError("Invalid AWB Number.");
    }
  }, [awbNumber]);

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }


   function getEstimatedDate() {
    const input = data[0].pickupCompletedDatatime; // Assume data is defined elsewhere
    if (!input) {
      return;
    }

    // Match the "7-11" pattern
    const match = input.match(/^\d+-\d+/);
    const result = match ? match[0] : null;

    if (!result) {
      console.error("Invalid date format");
      return;
    }

    // Split the result into day and month
    const [day, month] = result.split("-").map(Number);
    console.log(day, month);
    // Ensure the year is correctly handled
    const year = new Date().getFullYear(); // Default to the current year
    const date = new Date(year, month - 1, day); // Months are 0-indexed

    // Add 7 days
    date.setDate(date.getDate() + 7);

    // Format the new date as DD/MM/YYYY
    const newDay = String(date.getDate()).padStart(2, "0");
    const newMonth = String(date.getMonth() + 1).padStart(2, "0");
    const newYear = date.getFullYear();

    const newDate = `${newDay}/${newMonth}/${newYear}`;
    return newDate; // Output: 18/11/2024 + 7 days = 25/11/2024
  }


  return (
    <div className="home max-w-[1440px]  flex  gap-3 justify-between bg-[#DDCFF0] rounded-3xl">
      <Section1 data={data[0]} />
      <div className="flex rounded-3xl w-[75%] justify-between">
        <Section2 data={data[0]} EstimatedDate={ getEstimatedDate()}/>
        <Section3 data={data[0]} EstimatedDate={ getEstimatedDate()}/>
      </div>
    </div>
  );
}

export default Home;