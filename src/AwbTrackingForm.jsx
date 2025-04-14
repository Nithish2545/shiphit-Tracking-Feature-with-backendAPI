import { useState } from "react";
import axios from "axios";

function AwbTrackingForm() {
  const [awbTrackingID, setAwbTrackingID] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const response = await axios.post(
        "http://localhost:3000/awb-tracking-details",
        {
          TOKEN:
            "shiphit_f83a1b4076b71e2e2fa77e3c72f73d34f9a60c349dbc708e15fdd98756e72c96",
          AWBID: awbTrackingID,
        }
      );

      // Store the response data in local storage
      localStorage.setItem("awbTrackingData", JSON.stringify(response.data));

      // Optionally, you can clear the form after submission
      setAwbTrackingID("");
    } catch (error) {
      console.error("Error fetching tracking details:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-4 bg-white shadow-md rounded-lg"
    >
      <label className="block text-gray-700 text-sm font-bold mb-2">
        AWB Tracking ID:
        <input
          type="text"
          value={awbTrackingID}
          onChange={(e) => setAwbTrackingID(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#8447D6] focus:border-[#8447D6] sm:text-sm"
        />
      </label>
      <button
        type="submit"
        className={`w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#8447D6] hover:bg-[#AC77F2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8447D6] ${
          loading ? "cursor-not-allowed opacity-50" : ""
        }`}
        disabled={loading}
      >
        {loading ? (
          <svg
            className="animate-spin h-5 w-5 text-white mx-auto"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            ></path>
          </svg>
        ) : (
          "Track"
        )}
      </button>
    </form>
  );
}

export default AwbTrackingForm;
