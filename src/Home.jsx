import "./Home.css";
import Section1 from "./Section1";
import Section3 from "./Section3";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebase";
import { Player } from "@lottiefiles/react-lottie-player";
import loadingAnimation from "./assets/loadingLottie.json";

function Home() {
  const { awbNumber } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const fetchData = (collectionName) => {
    try {
      // Construct the query
      const q = query(
        collection(db, collectionName),
        where("awbNumber", "==", parseInt(awbNumber))
      );

      // Subscribe to real-time updates
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const fetchedData = querySnapshot.docs.map((doc) => doc.data());
        setData(fetchedData);

        if (fetchedData.length === 0) {
          setError("No data found for the given AWB number.");
        } else {
          setError(null); // Clear any previous errors
        }
      });

      // Return the unsubscribe function for cleanup
      return unsubscribe;
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
    return (
      <div className="h-screen flex justify-center items-center w-full">
        <Player autoplay loop src={loadingAnimation} className="w-80 h-80" />
      </div>
    );
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
    <div className="sm:flex   sm:flex-col sm:px-2  max-w-[1440px] w-full lp:flex lp:flex-row gap-3 justify-between bg-[#DDCFF0] lp:rounded-3xl ">
      <Section1 data={data[0]} />
      <div className="sm:pb-4 flex rounded-3xl lp:w-[35%] sm:w-full justify-between sm:flex sm:justify-center">
        <Section3
          awbNumber={awbNumber}
          data={data[0]}
          EstimatedDate={getEstimatedDate()}
        />
      </div>
    </div>
  );
}

export default Home;
