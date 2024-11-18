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

  return (
    <div className="home max-w-[1440px] flex  bg-[#FDFBF0] justify-between">
      <Section1 data={data[0]}/>
      <div className="flex bg-white mt-4 mb-4 rounded-3xl">
      <Section2 data={data[0]}/>
      <Section3 />
      </div>
    </div>
  );
}

export default Home;