import { Tldraw } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";
import "./Home.css";
import CodeBox from "../CodeBox/CodeBox";

const Home = () => {
  return (
    <div className="homePage">
      <div className="whiteBoard" style={{ position: "fixed", inset: 0 }}>
        <Tldraw />
      </div>

      <div className="codePad">
        <CodeBox />
      </div>
    </div>
  );
};
export default Home;
