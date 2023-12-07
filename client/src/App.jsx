import "./App.css";
import Home from "./components/Home/Home";
import { track, useEditor } from "@tldraw/tldraw";
import { setUserPreferences } from "@tldraw/tldraw";

function App() {
  const editor = useEditor();
  setUserPreferences({ id: "yourUserId", isDarkMode: true });

  return (
    <>
      <Home />
    </>
  );
}

export default App;
