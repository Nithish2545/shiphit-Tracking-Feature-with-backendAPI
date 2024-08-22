import { useEffect, useState } from "react";
import { json } from "react-router-dom";

function TrackingDetailsWithProgress() {
  const Trackingdata = [
    {
      imageURL: "/circle1.svg",
      text1: "Package has left Courier Facility",
      text2: "San Francisco, California",
    },
    {
      imageURL: "/circle1.svg",
      text1: "In transit",
      text2: "NEW YORK CITY, NEW YORK",
    },
    {
      imageURL: "/circle3.svg",
      text1: "Reached destination",
      text2: "NEW YORK CITY, NEW YORK",
    },
    {
      imageURL: "/circle2.svg",
      text1: "Out for delivery",
      text2: "1567 DOVE STREET, NEW YORK CITY, 9888",
    },
    
  ];

  const [Result, setResult] = useState({});

  useEffect(() => {
    const data = localStorage.getItem("awbTrackingData");
    setResult(JSON.parse(data));
  }, []);
  console.log(Result);
  return (
    <div className="bg-secondary w-fit rounded-xl pb-6">
      <div className="p-4 flex flex-col gap-3">
        <h1 className="font-bold text-xl text-white"></h1>
        <div className="space-x-3">
          <button className="text-base bg-black text-white p-2 pl-5 pr-5 rounded-full">
            {Result.update}
          </button>
        </div>
      </div>
      <div className="relative ">
        <img src="HorizontalLine.svg" alt="" />
        <img
          src="verticalLine.svg"
          className="absolute h-[210px] top-0 left-[17px] z-[10]"
          alt=""
        />
        <div className="flex flex-col gap-7 pt-9">
          {Trackingdata.map((d) => (
            <div key={d.text2} className="flex gap-2 items-center">
              <div className="w-9 flex justify-center">
                <img
                  src={d.imageURL}
                  className={
                    d.imageURL != "/circle3.svg"
                      ? "w-5 h-5 z-[10]"
                      : "w-8 h-8 z-[10]"
                  }
                  alt=""
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-semibold text-sm text-white">{d.text1}</p>
                {/* <p className="font-normal text-xs uppercase text-white">
                  {d.text2}
                </p> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TrackingDetailsWithProgress;