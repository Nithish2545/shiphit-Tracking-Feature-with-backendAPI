import "./Home.css";
import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";

function Home() {
  return (
    <div className="home max-w-[1440px] flex  bg-[#FDFBF0] justify-between">
      <Section1 />
      <div className="flex bg-white mt-4 mb-4 rounded-3xl">
      <Section2 />
      <Section3 />
      </div>
    </div>
  );
}

export default Home;