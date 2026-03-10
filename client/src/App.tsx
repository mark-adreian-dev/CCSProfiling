import { BrowserRouter } from "react-router-dom";
import { Router } from "./core/routes/Router";
import { AuthGuard } from "./core/routes/AuthGuard";

export function App() {
  return (
    <BrowserRouter>
      <AuthGuard>
        <Router />
      </AuthGuard>
    </BrowserRouter>
  );
}

export default App;
