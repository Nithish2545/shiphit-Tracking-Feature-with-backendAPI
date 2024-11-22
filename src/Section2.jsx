import { useEffect, useState } from "react";
import PackageinfoCard from "./PackageinfoCard";

function Section2({ data , EstimatedDate , status}) {
  console.log(status)
  console.log("EstimatedDate" , EstimatedDate)
  const [weight, setweight] = useState({});
  const [NoBoxes, setNoBoxes] = useState({});

  function getApxNoofBoxes() {
    const number_of_boxes = parseInt(data.weightapx) / 25;
    return Math.ceil(number_of_boxes);
  }

  function removeKG(input) {
    return input.match(/\d+/) ? parseInt(input.match(/\d+/)[0], 10) : null;
  }

  useEffect(() => {
    const checkweight = {
      weightapx: data?.weightapx,
      postPickupWeight: data?.postPickupWeight,
      actualWeight: data?.actualWeight,
    };

    if (checkweight.weightapx) {
      if (checkweight.postPickupWeight) {
        if (checkweight.actualWeight) {
          setweight({
            weight: removeKG(checkweight.actualWeight),
            payloadname: "ACTUAL WEIGHT",
          });
        } else {
          setweight({
            weight: removeKG(checkweight.postPickupWeight),
            payloadname: "POST PICKUP WEIGHT",
          });
        }
      } else {
        setweight({
          weight: removeKG(checkweight.weightapx),
          payloadname: "APX WEIGHT",
        });
      }
    }
    const checkNoofboxes = {
      apxnoofboxes: getApxNoofBoxes(),
      postPickupnoboxes: data?.postNumberOfPackages,
      actualnoofboxes: data.actualNoOfPackages,
    };

    if (checkNoofboxes.apxnoofboxes) {
      if (checkNoofboxes.postPickupnoboxes) {
        if (checkNoofboxes.actualnoofboxes) {
          setNoBoxes({
            noofboxes: checkNoofboxes.actualnoofboxes,
            payloadname: "ACTUAL WEIGHT",
          });
        } else {
          setNoBoxes({
            noofboxes: checkNoofboxes.postPickupnoboxes,
            payloadname: "POST PICKUP WEIGHT",
          });
        }
      } else {
        setNoBoxes({
          noofboxes: checkNoofboxes.apxnoofboxes,
          payloadname: "APX WEIGHT",
        });
      }
    }
  }, []);

  
  return (
    <div className="sm:h-fit lp:justify-between sm:rounded-none sm:gap-10 sm:pt-10 w-[65%] sm:w-[100%] px-2 lp:rounded-3xl flex flex-col lp:h-full h-full items-center border mt-auto mb-auto justify-around">
      <img src="/3d-truck.svg" className="w-full max-w-[340px]" alt="" />
      <div className="sm:flex flex-col lp:flex-row gap-5 w-fit sm:pb-5">
        <div className="flex flex-col gap-5 ">
        <PackageinfoCard
            fontSize="text-[20px]"
            title={status}
            text="STATUS"
            src="/Noboxes.svg"
            Sub_Spr={""}
          />
          <PackageinfoCard
            fontSize="text-[20px]"
            title={EstimatedDate}
            text="ESTIMATED TIME"
            src="/EstimatedTime.svg"
            Sub_Spr=""
          />
        </div>
        <div className="flex flex-col gap-5">
        <PackageinfoCard
            fontSize="text-[20px]"
            title={weight.weight}
            text={weight.payloadname}
            src="/Weight-icon.svg"
            Sub_Spr="kg"
          />
          <PackageinfoCard
            fontSize="text-[20px]"
            title={data?.service}
            text="SERVICE"
            src="/service-icon.svg"
            Sub_Spr=""
          />
        </div>
      </div>
    </div>
  );
}

export default Section2;