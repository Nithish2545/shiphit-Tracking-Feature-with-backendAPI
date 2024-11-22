import React, { useEffect, useState } from "react";
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "./firebase";
import { useForm } from "react-hook-form";

const ToAddress = ({ data, awbNumber }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [collectionName, setcollectionName] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      if (awbNumber > 3000) {
        setcollectionName("franchise_coimbatore");
      } else if (awbNumber > 2000) {
        setcollectionName("franchise_pondy");
      } else if (awbNumber > 1000) {
        setcollectionName("pickup");
      }
    };
    fetchData();
  }, [awbNumber]);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  // Check if any field is empty
  const isAnyFieldEmpty =
    !data?.consigneename ||
    !data?.consigneephonenumber ||
    !data?.consigneelocation;

  const onSubmit = async (formData) => {
    try {
      // Query Firestore for the document where awbNumber matches
      const q = query(
        collection(db, collectionName),
        where("awbNumber", "==", parseInt(awbNumber))
      );
      const querySnapshot = await getDocs(q);
      let final_result = [];
      // Extract the document data
      querySnapshot.forEach((doc) => {
        final_result.push({ id: doc.id, ...doc.data() });
      });
      // Ensure we have a result to update
      if (final_result.length === 0) {
        // alert("No document found with the provided AWB Number");
        return;
      }
      // Get the document reference
      const docRef = doc(db, collectionName, final_result[0].id);
      // Update the Firestore document
      await updateDoc(docRef, {
        consigneename: formData.name,
        consigneephonenumber: formData.phoneNumber,
        consigneelocation: formData.address,
      });
      setShowPopup(false)
    } catch (error) {
      console.error("Error updating document:", error);
    //   alert("Error updating document. Please try again.");
    }
  };

  return (
    <div className="flex flex-col">
      <div className="w-fit font-bold rounded-full text-sm pt-2 pb-2 pl-5 pr-5 text-white bg-[#9333EA]">
        TO
      </div>
      <div className="pl-10">
        <div className="flex items-center gap-2 pt-5">
          <img src="/user.svg" className="w-5" alt="" />
          <p className="font-semibold text-sm">
            {data?.consigneename || (
              <span className="text-gray-500 italic">Name not provided</span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-2 pt-5">
          <img src="/phone-icon.svg" className="w-5" alt="" />
          <p className="font-semibold text-sm">
            {data?.consigneephonenumber || (
              <span className="text-gray-500 italic">
                Phone number not provided
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-2 pt-5">
          <img src="/userlocation.svg" className="w-6" alt="" />
          <p className="font-semibold text-sm w-[250px] text-wrap">
            {data?.consigneelocation || (
              <span className="text-gray-500 italic">Address not provided</span>
            )}
          </p>
        </div>
      </div>
      {isAnyFieldEmpty && (
        <button
          className="mt-5 px-4 py-2 bg-purple-500 text-white font-bold rounded-lg hover:bg-purple-600 transition-all"
          onClick={togglePopup}
        >
          Update
        </button>
      )}
      {showPopup && (
        <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-[300px] shadow-lg">
            <h2 className="text-lg text-center font-bold mb-4 text-green-400">
              Update To Address
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label className="block mb-2 font-semibold text-sm">
                Name:
                <input
                  type="text"
                  className={`w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    data?.consigneename ? "cursor-not-allowed" : "cursor-text"
                  }`}
                  defaultValue={data?.consigneename}
                  placeholder="Enter name"
                  readOnly={data?.consigneename}
                  {...register("name", { required: !data?.consigneename })}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">Name is required</p>
                )}
              </label>

              <label className="block mb-2 font-semibold text-sm">
                Phone Number:
                <input
                  type="tel"
                  className={`w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    data?.consigneephonenumber
                      ? "cursor-not-allowed"
                      : "cursor-text"
                  }`}
                  defaultValue={data?.consigneephonenumber}
                  placeholder="Enter phone number"
                  readOnly={data?.consigneephonenumber}
                  {...register("phoneNumber", {
                    required: !data?.consigneephonenumber,
                  })}
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phoneNumber.message || "Phone number is required"}
                  </p>
                )}
              </label>

              <label className="block mb-2 font-semibold text-sm">
                Address:
                <textarea
                  className={`w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    data?.consigneelocation
                      ? "cursor-not-allowed"
                      : "cursor-text"
                  }`}
                  defaultValue={data?.consigneelocation}
                  placeholder="Enter address"
                  readOnly={data?.consigneelocation}
                  {...register("address", {
                    required: !data?.consigneelocation,
                  })}
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">
                    Address is required
                  </p>
                )}
              </label>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                  onClick={togglePopup}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default ToAddress;
