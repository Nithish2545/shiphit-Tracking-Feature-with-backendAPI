import "./Home.css";
import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";

function Home() {
  return (
    <div className="home max-w-[1440px] flex  justify-around">
      <Section1 />
      <Section2 />
      <Section3 />
    </div>
  );
}
// https://www.figma.com/design/G5jy8J8WDDuYbbzle0NsRU/Delivery-Service-Dashboard---Admin-Panel-(Community)?t=YFAoU3mzEpW8Movb-0
export default Home;