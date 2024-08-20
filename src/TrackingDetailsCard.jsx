function TrackingDetailsCard() {
  return (
    <div className="w-[316px] bg-white  p-4 rounded-3xl">
      <h1 className="font-bold text-xl pb-2">#127777489-DL-NY</h1>
      <div className="flex gap-3">
        <div className="w-fit rounded-full font-semibold text-xs pt-2 pb-2 pl-5 pr-5 bg-[#F2EED0]">
          In Transit
        </div>
        <div className="w-fit rounded-full font-semibold text-xs pt-2 pb-2 pl-5 pr-5 bg-[#F2EED0]">
          Documents
        </div>
      </div>
      <div className="flex items-start gap-2 pt-5">
        <img src="/Details.svg" alt="" />
        <div className="space-y-3">
          <p className="font-semibold text-sm ">
            Package has left Courier Facility
          </p>
          <p className="font-normal text-xs uppercase text-[#888888]">
            Detroit, Denmark
          </p>
        </div>
      </div>
    </div>
  );
}

export default TrackingDetailsCard;