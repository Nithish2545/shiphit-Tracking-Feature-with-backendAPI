import { useEffect, useState } from "react";
import "./section1.css";
import Section2 from "./Section2";
import axios from "axios";
import { Player } from "@lottiefiles/react-lottie-player";
import loadingAnimation from "./assets/loadingLottie.json";

function Section1({ data }) {
  function extractDateTime(datetimeString) {
    const dateObject = new Date(datetimeString);
    // Extract date parts
    const day = String(dateObject.getDate()).padStart(2, "0");
    const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = dateObject.getFullYear();

    // Extract time parts
    const hours = String(dateObject.getHours()).padStart(2, "0");
    const minutes = String(dateObject.getMinutes()).padStart(2, "0");
    const seconds = String(dateObject.getSeconds()).padStart(2, "0");

    // Format the date and time
    const formattedDate = `${day}-${month}-${year}`;
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    return { formattedDate, formattedTime };
  }

  const imageStyle = { width: 35 };
  const imageHeight = "h-20";
  const initialDataSet = [
    {
      status: "Run sheet",
      dateTime: data.pickupDatetime,
      progress: false,
      Location: "Chennai",
    },
    {
      status: "INCOMING MANIFEST",
      dateTime: data.pickupCompletedDatatime,
      Location: "Chennai",
      progress: false,
    },
    {
      status: "PAYMENT PENDING",
      dateTime: "01/11/2024, 9:06 A.M.",
      Location: "Chennai",
      progress: false,
    },
    {
      status: "PAYMENT DONE",
      dateTime: data.PaymentComfirmedDate,
      Location: "Chennai",
      progress: false,
    },
    {
      status: "SHIPMENT CONNECTED",
      dateTime: data.packageConnectedDataTime,
      Location: "Chennai",
      progress: false,
    },
  ];

  const postData = {
    UserID: "WF200",
    AWBNo: data.vendorAwbnumber,
    Password: "PETTI@123",
    Type: "C",
    Vendor: "UPS",
  };

  const [dataSet, setDataSet] = useState(initialDataSet);
  const [addedStatuses, setAddedStatuses] = useState(new Set());
  const [FoundText, showNotFoundText] = useState(false);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    const shipmentconnected = dataSet.find(
      (d) => d.status == "SHIPMENT CONNECTED"
    );
    const fetchTrackingData = async () => {
      if (shipmentconnected.progress && data.vendorName == "UPS") {
        setloading(true);
        try {
          console.log("..............UPS DATA FEATCHING..............");
          const response = await axios.post(
            "https://awb-tracking-api.onrender.com/api/track",
            postData
          );
          const events = response.data.Response.Events;
          console.log("..............UPS DATA FEATCHED..............");
          if (events) {
            const newEvents = events
              .reverse()
              .filter((d) => !addedStatuses.has(d.Status));

            if (newEvents.length > 0) {
              const transformedData = newEvents.map((d) => {
                // Replace "UPS" with "SHIPHIT" in the status message
                const status = d.Status.replace(/UPS/gi, "SHIPHIT");
                return {
                  status: status,
                  dateTime: `${d.EventDate}, ${d.EventTime1}`,
                  Location: d.Location || "",
                  progress: true,
                };
              });

              setDataSet((prev) => [...prev, ...transformedData]);
              setAddedStatuses((prev) => {
                const updated = new Set(prev);
                newEvents.forEach((e) => updated.add(e.Status));
                return updated;
              });
            }
          }
        } catch (error) {
          console.error("Error fetching tracking data:", error);
        } finally {
          setloading(false);
        }
        return;
      } else if (shipmentconnected.progress && data.vendorName === "BOMBINO") {
        setloading(true);
        const baseUrl =
          "https://awb-tracking-api.onrender.com/api/track/bombino";
        const bodyContent = {
          Vendor: "BOMBINO",
          api_company_id: 2,
          customer_code: 71787,
          tracking_no: data.vendorAwbnumber,
        };
        try {
          const response = await axios.post(baseUrl, bodyContent);
          const events = response.data;
          console.log(events);
          if (events) {
            const newEvents = events
              .reverse()
              .filter(
                (d) =>
                  !addedStatuses.has(d.event_description.trim().toLowerCase())
              );
            if (newEvents.length > 0) {
              const transformedData = newEvents.map((d) => {
                const result = extractDateTime(d.event_at);
                console.log(d.event_description);
                return {
                  status: d.event_description.replace(/BOMBINO/gi, "SHIPHIT"),
                  dateTime: `${result.formattedDate}, ${result.formattedTime}`,
                  Location: d.event_location || "",
                  progress: true,
                };
              });

              setDataSet((prev) => [
                ...prev,
                ...transformedData.filter(
                  (event) =>
                    !prev.some(
                      (existing) =>
                        existing.status === event.status &&
                        existing.dateTime === event.dateTime
                    )
                ),
              ]);

              setAddedStatuses((prev) => {
                const updated = new Set(prev);
                newEvents.forEach((e) =>
                  updated.add(e.event_description.trim().toLowerCase())
                );
                return updated;
              });
            }
          }
        } catch (error) {
          console.error("Error:", error.message);
        } finally {
          setloading(false);
        }
      }
    };
    fetchTrackingData();
  }, [dataSet]);

  const updateProgress = (inputStatus) => {
    setDataSet((prevData) =>
      prevData.map((item, index) => ({
        ...item,
        progress:
          index <=
          prevData.findIndex(
            (d) => d.status.toLowerCase() === inputStatus.toLowerCase()
          ),
      }))
    );
  };

  useEffect(() => {
    if (data.status) {
      updateProgress(data.status);
    }
  }, [data.status]);

  const lastProgressTrue = (() => {
    for (let i = dataSet.length - 1; i >= 0; i--) {
      if (dataSet[i].progress === true) {
        return dataSet[i];
      }
    }
    return null; // Return null if no item with progress === true is found
  })();

  // Conditionally render loading screen or the actual data
  if (loading) {
    return (
      <div className="fixed left-0  flex justify-center h-screen items-center bg-white w-full">
        <Player autoplay loop src={loadingAnimation} className="w-80 h-80" />
      </div>
    );
  }

  function getEstimatedDate() {
    const input = data?.pickupCompletedDatatime; // Assume data is defined elsewhere
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
    <div className="sm:w-[100%] w-full sm:gap-10 sm:flex-col-reverse lp:flex lp:flex-row   rounded-3xl sm:rounded-none relative  sm:h-[100%]  lp:h-screen  scrollbar-custom flex flex-col items-center">
      <div className="lp:w-[60%] sm:px-4  sm:w-[100%] h-full flex flex-col justify-center rounded-lg relative">
        <div className="w-full  flex  flex-col mb-auto lp:sticky lp:top-0 bg-white z-50 px-3 rounded-2xl">
          <div className="h-20 flex items-center">
            <h1 className="font-bold text-2xl">Tracking</h1>
          </div>
          <div className="mb-3">
            <p className="text-sm text-gray-800 font-bold">Your shipment</p>
            <p className="font-semibold text-xl text-gray-900">
              {data.awbNumber}
            </p>
          </div>
          <div className="mb-4 flex gap-1 flex-col">
            <p className="flex flex-col">
              <p
                className={`text-[18px] font-medium flex gap-2 ${
                  lastProgressTrue?.status == "DELIVERED" ||
                  lastProgressTrue?.status == "SHIPMENT HAS BEEN DELIVERED"
                    ? "text-green-600"
                    : "text-[#FF7900]"
                }`}
              >
                {lastProgressTrue?.status == "DELIVERED" ? (
                  <img src="/green-checkmark-icon.svg" className="w-4" alt="" />
                ) : (
                  <img src="/pending-clock-icon.svg" className="w-4" alt="" />
                )}
                {lastProgressTrue?.status}
              </p>
              <p className="text-[18px] font-medium text-gray-800">
                {lastProgressTrue?.dateTime}
              </p>
              <p className="text-[18px] font-medium text-gray-600">
                {lastProgressTrue?.Location}
              </p>
            </p>
          </div>
        </div>

        {loading ? (
          <div className="h-full flex justify-center items-center">
            <Player
              autoplay
              loop
              src={loadingAnimation}
              className="w-80 h-80"
            />
          </div>
        ) : (
          <div className="flex gap-8 py-8 pl-4 pr-4 lp:flex lp:mb-auto  lp:overflow-y-auto  scrollbar-custom ">
            <div className="flex h-fit">
              <div className="relative">
                <div className="flex flex-col items-center relative">
                  {dataSet.map((d, idx) => (
                    <div
                      key={idx}
                      className={`flex flex-col items-center relative z-10 ${
                        d.enable ? "" : imageHeight
                      }`}
                    >
                      <img
                        style={imageStyle}
                        src={
                          d.progress
                            ? "/green-checkmark-icon.svg"
                            : "/pending-clock-icon.svg"
                        }
                        alt="Status icon"
                      />
                      {idx < dataSet.length - 1 && (
                        <div
                          className={`w-[2px] h-full ${
                            d.progress ? "bg-green-300" : "bg-red-300"
                          }`}
                        ></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="relative  grid grid-cols-1 h-fit">
              {dataSet.map((d, idx) => (
                <div key={idx} className={`flex flex-col z-10 ${imageHeight}`}>
                  <p className="text-sm font-semibold text-gray-800">
                    {d.status == "Run sheet" ? "SHIPMENT SCHEDULED" : d.status}
                  </p>
                  <p className="text-sm text-gray-600">{d.dateTime}</p>
                  <p className="text-sm text-gray-600">{d.Location}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Section2
        data={data}
        EstimatedDate={getEstimatedDate()}
        status={lastProgressTrue?.status}
      />
    </div>
  );
}
export default Section1;