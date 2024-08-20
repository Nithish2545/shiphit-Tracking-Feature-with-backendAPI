import PackageinfoCard from "./PackageinfoCard";

function Section2() {

  return (
    <div className="w-fit rounded-3xl bg-white mt-auto mb-auto p-5">
      <img src="/3d-truck.svg" className="w-[600px]" alt="" />
      <div className="flex gap-5">
        <div className="flex flex-col gap-5">
          <PackageinfoCard
            title="101"
            text="Payload"
            src="/kg.png"
            Sub_Spr="kg"
          />
          <PackageinfoCard
            title="16"
            text="Estimated Time"
            src="/EstimatedTime.svg"
            Sub_Spr="th"
          />
        </div>
        <div className="flex flex-col gap-5">
          <PackageinfoCard
            title="16"
            text="Estimated Time"
            src="/EstimatedTime.svg"
            Sub_Spr="th"
          />
          <PackageinfoCard
            title="16"
            text="Estimated Time"
            src="/EstimatedTime.svg"
            Sub_Spr="th"
          />
        </div>
      </div>
    </div>
  );
  
}

export default Section2;