import { BrowserRouter } from "react-router-dom";
import { Router } from "@/core/routes/Router";
import { ThemeProvider } from "@/core/presentation/components/base/theme-provider";

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
