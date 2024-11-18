import TrackingDetailsWithProgress from "./TrackingDetailsWithProgress";

function Section1({data}) {
  return (
    <div className=" pl-4 relative h-screen overflow-y-auto scrollbar-hide-y flex flex-col items-center">
      <div className="sticky top-0 bg-[#FDFBF0] z-50 h-20 flex items-center">
        <h1 className="font-bold text-2xl">Tracking</h1>
      </div>
      <TrackingDetailsWithProgress data={data} />
    </div>
  );
}

export default Section1;