import ToAddress from "./ToAddress";

function Section3({ data, awbNumber }) {

  function maskPhoneNumber(phoneNumber) {
    if (!phoneNumber || phoneNumber.length < 4) {
      throw new Error("Invalid phone number");
    }
    
    const firstFive = phoneNumber.slice(0, 3); // First 5 digits
    const lastTwo = phoneNumber.slice(-2); // Last 2 digits
    const maskedSection = '*'.repeat(phoneNumber.length - firstFive.length - lastTwo.length);
    
    return `${firstFive}${maskedSection}${lastTwo}`;
  }

  return (
    <div className="items-center flex flex-col justify-between px-2 gap-4">
      <div className="bg-white w-fit  rounded-3xl px-3 py-2">
        <h1 className="font-bold text-xl pb-2">Details</h1>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col ">
            <div className="w-fit font-bold rounded-full  text-sm pt-2 pb-2 pl-5 pr-5 text-white bg-[#9333EA]">
              FROM
            </div>
            <div className="pl-10">
              <div className="flex items-center gap-2 pt-5">
                <img src="/user.svg" className="w-5" alt="" />
                <p className="font-semibold text-sm">{data?.consignorname}</p>
              </div>
              <div className="flex items-center gap-2 pt-5">
                <img src="/phone-icon.svg" className="w-5" alt="" />
                <p className="font-semibold text-sm">
                  {"+91" + " " + maskPhoneNumber(data?.consignorphonenumber)}
                </p>
              </div>
              <div className="flex items-center gap-2 pt-5">
                <img src="/userlocation.svg" className="w-5" alt="" />
                <p className="font-semibold text-sm w-[250px]">
                  {data?.consignorlocation}
                </p>
              </div>
            </div>
          </div>
          <ToAddress data={data} awbNumber={awbNumber} />
        </div>
      </div>
      <div className="sm:w-full flex w-fit rounded-[40px] gap-4">
        <div className="flex sm:w-full flex-col bg-white rounded-[40px] items-center gap-3">
          <div className="sm:w-full p-4 bg-[#9333EA] flex  flex-col gap-1 rounded-[40px]">
            <div className="flex items-center gap-2">
              <img src="/image.png" className="w-10 rounded-md" alt="" />
              <p className="text-base font-bold text-white">Customer care</p>
            </div>
            <div className="flex justify-between">
              <div>
                <p className="text-white font-bold text-sm">ID: S-13</p>
                <p className="underline text-base font-semibold text-white">
                  Jagathesh
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-green-300 lp:flex justify-center pt-2 pb-2 rounded-full">
                  <p className="font-bold text-base whitespace-nowrap px-3">
                    +91 9597788433
                  </p>
                </div>
                <button
                  className="bg-white text-[#9333EA] font-bold px-4 py-2 rounded-full shadow-md hover:bg-[#7e22ce] hover:text-white transition"
                  onClick={() => window.open("tel:+919597788433")}
                >
                  Call
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section3;