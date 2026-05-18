import { RouterProvider } from "react-router-dom";
import { router } from './router';
import { UserProvider } from "./contexts/user/userProvider";
import { CartProvider } from "./contexts/cart/cartProvider";
import { ThemeProvider } from "./contexts/theme/themeProvider";
function App() {

  return (
    <>
      <ThemeProvider>
        <UserProvider>
          <CartProvider>
            <RouterProvider router={router} />
          </CartProvider>
        </UserProvider>
      </ThemeProvider>
    </>
  )
}

export default App;
