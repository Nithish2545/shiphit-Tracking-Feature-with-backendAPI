import React, { useState } from "react";

function PackageinfoCard({ title, text, src, Sub_Spr, fontSize }) {
  const [isModalOpen, setModalOpen] = useState(false);

  // Truncate title if it exceeds 6 characters
  const isTruncated = title?.length > 12;
  const truncatedTitle = isTruncated ? title.slice(0, 12) : title;

  // Modal toggle function
  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <div className="p-5 relative w-[270px] rounded-3xl bg-[#FFFCF9] border border-[#E9E9E9]">
      <div className="flex flex-col gap-5 mt-12">
        <h1
          className={`${fontSize} font-semibold ${
            truncatedTitle === "DELIVERED"
              ? "text-[#16A34A]"
              : text === "STATUS"
              ? "text-[#FF7900]"
              : ""
          }`}
        >
          {truncatedTitle}
          {isTruncated && (
            <span
              className="cursor-pointer text-[#007BFF] hover:underline ml-1"
              onClick={toggleModal}
            >
              ...
            </span>
          )}
          <sub className="text-sm">{Sub_Spr}</sub>
        </h1>
        <p className="text-[#11111] text-sm font-medium max-h-24 overflow-y-auto">
          {text}
        </p>
        <img className="absolute right-6 top-6 w-10" src={src} alt="" />
      </div>

      {/* Modal for displaying full title */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[300px] text-center shadow-lg">
            <h2 className="text-lg font-bold mb-4">Full Title</h2>
            <p className="text-sm text-gray-700">{title}</p>
            <button
              className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              onClick={toggleModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PackageinfoCard;