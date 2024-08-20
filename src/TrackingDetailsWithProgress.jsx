function TrackingDetailsWithProgress() {
  const Trackingdata = [
    {
      imageURL: "/circle1.svg",
      text1: "Package has left Courier Facility",
      text2: "San Francisco, California",
    },
    {
      imageURL: "/circle1.svg",
      text1: "Package arrived at Local Facility",
      text2: "NEW YORK CITY, NEW YORK",
    },
    {
      imageURL: "/circle3.svg",
      text1: "Out for Delivery",
      text2: "NEW YORK CITY, NEW YORK",
    },
    {
      imageURL: "/circle2.svg",
      text1: "Delivered",
      text2: "1567 DOVE STREET, NEW YORK CITY, 9888",
    },
  ];
  return (
    <div className="bg-secondary w-fit rounded-xl">
        <div className="p-4 flex flex-col gap-3">
          <h1 className="font-bold text-xl text-white">#127777489-DL-NY</h1>
          <div className="space-x-3">
            <button className="text-base bg-black text-white p-2 pl-5 pr-5 rounded-full">
              Out for Delivery
            </button>
            <button className="text-base bg-black text-white p-2 pl-5 pr-5 rounded-full">
              Parcel
            </button>
          </div>
        </div>
        <div className="relative ">
          <img src="HorizontalLine.svg" alt="" />
          <img
            src="verticalLine.svg"
            className="absolute top-0 left-[17px]  z-[10]"
            alt=""
          />
          <div className="flex flex-col gap-6 pt-9">
            {Trackingdata.map((d) => (
              <div key={d.text2} className="flex gap-2">
                <div className="w-9 flex justify-center">
                  <img
                    src={d.imageURL}
                    className={
                      d.imageURL != "/circle3.svg"
                        ? "w-5 h-5 z-[10]"
                        : "w-8 h-8 z-[10]"
                    }
                    alt=""
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="font-semibold text-sm text-white">{d.text1}</p>
                  <p className="font-normal text-xs uppercase text-white">
                    {d.text2}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

  )
}

export default TrackingDetailsWithProgress;