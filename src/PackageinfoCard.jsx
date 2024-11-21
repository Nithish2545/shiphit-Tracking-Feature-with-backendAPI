function PackageinfoCard({ title, text, src, Sub_Spr , fontSize}) {
  return (
    <div className="p-5 relative w-[220px] rounded-3xl bg-[#FFFCF9] border border-[#E9E9E9]">
      <div className="flex flex-col gap-5 mt-8">
        <h1 className={` ${fontSize} font-semibold`}>
          {title}
          <sub className="text-sm">{Sub_Spr}</sub>
        </h1>
        <p className="text-[#11111] text-sm font-medium">{text}</p>
        <img className="absolute right-6 top-6 w-10" src={src} alt="" />
      </div>
    </div>
  );
}

export default PackageinfoCard;