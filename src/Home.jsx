import "./Home.css";
import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";

function Home() {
  return (
    <div className="home max-w-[1440px] flex bg-[#FDFBF0] justify-around">
      <Section1 />
      <Section2 />
      <Section3 />
    </div>
  );
}

export default Home;