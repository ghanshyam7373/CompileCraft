import { Tldraw } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";
import "./Home.css";

const Home = () => {
  return (
    <div
      className="homePage"
      style={{ position: "fixed", inset: 0, marginRight: "5rem" }}
    >
      <Tldraw />
    </div>
  );
};
export default Home;
