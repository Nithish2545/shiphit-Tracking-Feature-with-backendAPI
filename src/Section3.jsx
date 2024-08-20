function Section3() {
  return (
    <div className="mt-7  mb-7 flex flex-col justify-between">
      <div className="bg-white p-4 rounded-3xl">
        <h1 className="font-bold text-xl pb-2">Details</h1>
        <div className="flex gap-3"></div>
        <div className="flex gap-5">
          <div className="flex flex-col">
            <div className="w-fit font-bold rounded-full  text-sm pt-2 pb-2 pl-5 pr-5 bg-[#F2EED0]">
              Jaisankar
            </div>
            <div className="flex items-center gap-2 pt-5">
              <img src="/Details.svg" alt="" />
              <p className="font-semibold text-sm">9042489612</p>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="w-fit font-bold rounded-full  text-sm pt-2 pb-2 pl-5 pr-5 bg-[#F2EED0]">
              Ramesh
            </div>
            <div className="flex items-center gap-2 pt-5">
              <img src="/Details.svg" alt="" />
              <p className="font-semibold text-sm">9988776655</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black flex  rounded-[40px] p-3">
        <div className="flex flex-col bg-[#4A4A4A] rounded-[40px] items-center gap-3">
          <div className="w-fit p-4 bg-[#CEC15A] flex  flex-col gap-1 rounded-[40px]">
            <div className="flex items-center gap-2">
              <img src="SalesPersonImage.svg" alt="" />
              <p className="text-base font-bold">Sales Person</p>
            </div>
            <p className="text-[#524D24] font-bold text-sm">ID:222-111-33</p>
            <p className="underline text-base font-semibold">Matthew Perry</p>
          </div>
          <div className="bg-[#757575] cursor-pointer mb-4 w-[150px] flex justify-center gap-10 text-white pt-2 pb-2 rounded-full">
            <img src="/phone.svg" alt="" />
            <p className="text-white font-bold text-base">Call</p>
          </div>
        </div>
        <div className="w-fit rounded-[40px]  flex flex-col justify-between bg-[#4A4A4A] p-4 border border-[#656565]">
          <div className="space-y-2">
            <p className="text-sm font-medium text-white">Address</p>
            <div className="flex items-start gap-2">
              <img src="/Location.svg" alt="" />
              <p className="text-white font-bold text-[15px] w-[108px]">
                Houston Lane,Lan 9, 22/1
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium   text-white">Delivery</p>
            <div className="flex items-start gap-2">
              <img src="/DeliveryIcon.svg" alt="" />
              <p className="text-white font-bold text-[15px] w-[80px]">
                12:30 PM 31 Jan
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section3;
