import "./App.css";
import { Flow } from "./Flow";

function App() {
  return (
    <>
      <div
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
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          padding: "1em",
          backgroundColor: "#222",
          color: "#FAFAFA",
          zIndex: 10000,
          fontFamily: "'Source Code Pro', monospace",
          fontWeight: 600,
        }}
      >
        Congressional Graph
        <span style={{ float: "right" }}>
          <a
            href="https://github.com/mjvmroz/congressional-graph"
            target={"_blank"}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            [src]
          </a>
        </span>
      </div>
    </>
  );
}

export default App;
