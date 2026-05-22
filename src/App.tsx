import { RouterProvider } from "react-router-dom";
import { router } from './router';
import { ThemeProvider } from "./contexts/theme/themeProvider";
function App() {

  return (
    <>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  )
}

export default App;
