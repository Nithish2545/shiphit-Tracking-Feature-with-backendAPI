function PackageinfoCard({ title, text, src, Sub_Spr }) {
  return (
    <div className="p-5 relative w-[216px] rounded-3xl bg-[#FFFCF9] border border-[#E9E9E9]">
      <div className="flex flex-col gap-5">
        <h1 className="text-3xl font-semibold">
          {title}
          {Sub_Spr == "kg" ? (
            <sub className="text-sm">{Sub_Spr}</sub>
          ) : (
            <sup className="text-sm">{Sub_Spr}</sup>
          )}
        </h1>
        <p className="text-[#11111] text-sm font-normal">{text}</p>
        <img className="absolute right-6 top-6  " src={src} alt="" />
      </div>
    </div>
  );
}

export default PackageinfoCard;