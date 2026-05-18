import { Outlet } from "react-router-dom";
import Header from "../components/header";


const Layout = ()=>{
    return (
        <div className="min-h-screen bg-[var(--bg)]">
            <Header />
            <Outlet />
        </div>
    )
}

export default Layout;
