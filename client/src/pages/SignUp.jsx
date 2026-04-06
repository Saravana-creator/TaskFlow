import Button from "../components/Button";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const SignUp = () => {
    const navigate = useNavigate();
    const { signup } = useAuth();
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        
        signup(formData);
        navigate('/login');
    };

    return (
        <div className="flex min-h-screen bg-slate-50 items-center justify-center p-6">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 border border-slate-100 transform transition-all shadow-blue-100">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold text-blue-600 tracking-tight mb-2">Join TaskFlow</h1>
                    <p className="text-slate-500 font-medium tracking-wide">Start managing your projects like a pro today.</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-4 mb-8">
                        <div className="flex gap-4">
                            <div className="flex-1 flex flex-col gap-1.5">
                                <label className="text-sm font-bold text-slate-700 tracking-wide uppercase">First Name</label>
                                <input
                                    type="text"
                                    placeholder="..."
                                    value={formData.firstName}
                                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                                    required
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all font-medium text-slate-800"
                                />
                            </div>
                            <div className="flex-1 flex flex-col gap-1.5">
                                <label className="text-sm font-bold text-slate-700 tracking-wide uppercase">Last Name</label>
                                <input
                                    type="text"
                                    placeholder="..."
                                    value={formData.lastName}
                                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                                    required
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all font-medium text-slate-800"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-bold text-slate-700 tracking-wide uppercase">Email Address</label>
                            <input
                                type="email"
                                placeholder="user@taskflow.dev"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                required
                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all font-medium text-slate-800"
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
                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all font-medium text-slate-800"
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-bold text-slate-700 tracking-wide uppercase">Confirm Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                                required
                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all font-medium text-slate-800"
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
                    </div>

                    <div className="flex flex-col gap-6">
                        <Button onClick={handleSubmit}>Create Account</Button>
                        <div className="text-center">
                            <p className="text-slate-500 font-medium text-sm">
                                Already have an account? <Link to="/login" className="text-blue-600 font-bold hover:underline">Log in</Link>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
