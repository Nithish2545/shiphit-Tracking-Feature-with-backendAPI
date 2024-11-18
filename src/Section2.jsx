import { useState } from "react";
import PackageinfoCard from "./PackageinfoCard";

function Section2({ data }) {
  console.log("TrackingDetailsWithProgress", data.service);
  console.log("TrackingDetailsWithProgress", data.postPickupWeight);
  console.log("TrackingDetailsWithProgress", data.weightapx);
  console.log("TrackingDetailsWithProgress", data.actualWeight);

  const info = {
    service: data?.service,
    weight:  data.weightapx ? data.weightapx : data.postPickupWeight ? data.postPickupWeight : data.actualWeight ? actualWeight : "0"  
  };
  
  console.log(info)

  const [Result, setResult] = useState(info);

  return (
    <div className="w-fit rounded-3xl bg-white mt-auto mb-auto p-5">
      <img src="/3d-truck.svg" className="w-[600px]" alt="" />
      <div className="flex gap-5">
        <div className="flex flex-col gap-5">
          <PackageinfoCard
            title={Result.weight}
            text="WEIGHT"
            src="/kg.png"
            Sub_Spr="kg"
          />
          <PackageinfoCard
            title="16"
            text="ESTIMATED TIME"
            src="/EstimatedTime.svg"
            Sub_Spr="th"
          />
        </div>
        <div className="flex flex-col gap-5">
          <PackageinfoCard
            title="16"
            text="No OF BOXES"
            src="/EstimatedTime.svg"
            Sub_Spr="th"
          />
          <PackageinfoCard
            title="16"
            text="SERVICE"
            src="/EstimatedTime.svg"
            Sub_Spr="th"
          />
        </div>
      </div>
    </div>
  );
}

export default Section2;