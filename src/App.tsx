import "./App.css";
import { Flow } from "./Flow";

function App() {
  return (
    <div
      className="App"
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }}
    >
      <Flow></Flow>
    </div>
  );
}

export default App;
