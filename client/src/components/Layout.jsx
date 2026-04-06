import Sidenav from "./Sidenav";

const Layout = ({ children }) => {
    return (
        <div className="flex h-screen bg-slate-50 font-sans">
            <Sidenav />
            <main className="flex-1 p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    );
};

export default Layout;
