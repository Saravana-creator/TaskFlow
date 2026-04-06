import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

const Sidenav = () => {
    const navigate = useNavigate();
    const { logout, user } = useAuth();
    const modules = [
        { name: "Dashboard", path: "/" },
        { name: "Projects", path: "/projects" },
        { name: "Team Members", path: "/team" }
    ];

    const actualUser = {
        name: user?.name || "Guest",
        role: user?.role || "Team Member"
    };

    const getInitials = (name) => {
        return name ? name.charAt(0).toUpperCase() : "?";
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <aside className="w-64 bg-slate-900 text-white h-screen flex flex-col justify-between p-6 shadow-2xl">
            <div className="flex flex-col gap-10">
                <div className="text-3xl font-bold tracking-tight text-blue-400">
                    TaskFlow
                </div>

                <nav className="flex flex-col gap-2">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Modules</span>
                    {modules.map((module) => (
                        <NavLink
                            key={module.path}
                            to={module.path}
                            className={({ isActive }) =>
                                `px-4 py-3 rounded-xl transition-all duration-200 font-medium group flex items-center gap-3 ${
                                    isActive 
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" 
                                    : "hover:bg-slate-800 hover:text-blue-400 text-slate-300"
                                }`
                            }
                        >
                            <div className="w-1.5 h-1.5 rounded-full bg-current opacity-40 group-hover:opacity-100 transition-opacity"></div>
                            {module.name}
                        </NavLink>
                    ))}
                </nav>
            </div>

            <div className="pt-6 border-t border-slate-800">
                <div className="flex items-center gap-4 group cursor-pointer p-2 rounded-xl hover:bg-slate-800 transition-all duration-200">
                    <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-xl font-bold border-2 border-blue-400 shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-transform group-hover:scale-105">
                        {getInitials(actualUser.name)}
                    </div>
                    <div className="flex flex-col overflow-hidden flex-1">
                        <span className="font-semibold text-sm tracking-wide text-slate-100 truncate">{actualUser.name}</span>
                        <span className="text-xs text-slate-400 font-medium truncate">{actualUser.role}</span>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="w-full mt-3 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-all duration-200"
                >
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default Sidenav;
