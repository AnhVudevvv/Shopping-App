import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout";
import Home from "../pages/home";
import Login from "../pages/login";
import Cart from "../pages/cart";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />
            }, {
                path: "/cart",
                element: <Cart />
            }
        ]
    }, {
        path: "/login",
        element: <Login />
    }
]);
