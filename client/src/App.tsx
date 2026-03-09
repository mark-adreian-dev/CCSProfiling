import { BrowserRouter } from "react-router-dom";
import { Router } from "./core/routes/Router";

export function App() {
  return (
    <>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </>
  );
}

export default App;
