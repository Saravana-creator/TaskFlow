import Button from "../components/Button";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
    const navigate = useNavigate();
    const { login, authError } = useAuth();
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(formData);
    };

    // Use effect to navigate only on real authentication success
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className="flex min-h-screen bg-slate-50 items-center justify-center p-6">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 border border-slate-100 flex flex-col gap-8 transform transition-all">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-blue-600 tracking-tight mb-2">Welcome Back</h1>
                    <p className="text-slate-500 font-medium tracking-wide">Enter your details to access your TaskFlow dashboard.</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-bold text-slate-700 tracking-wide uppercase">Email Address</label>
                            <input
                                type="email"
                                placeholder="user@taskflow.dev"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                required
                                className="bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all font-medium text-slate-800"
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-bold text-slate-700 tracking-wide uppercase">Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                                required
                                className="bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all font-medium text-slate-800"
                            />
                        </div>
                        {authError && <p className="text-red-500 text-sm font-medium">{authError}</p>}
                    </div>

                    <Button type="submit">Log In</Button>
                    
                    <div className="text-center">
                        <p className="text-slate-500 font-medium text-sm">
                            New here? <Link to="/signup" className="text-blue-600 font-bold hover:underline">Create an account</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
