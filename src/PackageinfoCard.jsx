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
            title === "DELIVERED"
              ? "text-[#16A34A]"
              : text === "STATUS"
              ? "text-[#FF7900]"
              : ""
          }`}
        >
          {title}
          <sub className="text-sm">{Sub_Spr}</sub>
        </h1>
        <p className="text-[#11111] text-sm font-medium max-h-24 overflow-y-auto">
          {text}
        </p>
        <img className="absolute right-6 top-6 w-10" src={src} alt="" />
      </div>
      
    </div>
  );
}

export default PackageinfoCard;