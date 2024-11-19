import TrackingDetailsWithProgress from "./TrackingDetailsWithProgress";
import "./section1.css"
function Section1({ data }) {
  return (
    <div className="min-sm:flex min-sm:flex-col min-sm:w-full max-sm:w-full w-[25%] border rounded-3xl relative h-screen overflow-y-auto scrollbar-custom flex flex-col items-center">
      <TrackingDetailsWithProgress data={data} />
    </div>
  );
}

export default Section1;