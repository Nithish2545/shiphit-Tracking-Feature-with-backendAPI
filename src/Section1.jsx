import TrackingDetailsWithProgress from './TrackingDetailsWithProgress'
import TrackingDetailsCard from './TrackingDetailsCard'

function Section1() {
  return (
    <div className="relative h-screen overflow-y-auto scrollbar-hide-y">
        <div className="sticky top-0 bg-[#FDFBF0] z-50 h-20 flex items-center">
          <h1 className="font-bold text-2xl">Tracking</h1>
        </div>
        <div className="flex flex-col gap-5">
          <TrackingDetailsWithProgress />
          <TrackingDetailsCard />
          <TrackingDetailsCard />
          <TrackingDetailsCard />
        </div>
      </div>
  )
}

export default Section1;