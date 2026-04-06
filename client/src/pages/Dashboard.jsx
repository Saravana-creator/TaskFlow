import Button from "../components/Button";

const Dashboard = () => {
    return (
        <>
            <header className="mb-10 flex justify-between items-center bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <div>
                    <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">
                        Dashboard
                    </h1>
                    <p className="text-slate-500 font-medium mt-1">Ready for your tasks today?</p>
                </div>
                <Button onClick={() => alert('Welcome home!')}>New Task</Button>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="h-64 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <h2 className="text-xl font-bold text-slate-800">Your Summary</h2>
                    <div className="mt-4 flex gap-4">
                        <div className="flex-1 h-20 bg-blue-50 rounded-2xl border border-blue-100 flex flex-col justify-center items-center">
                            <span className="text-blue-600 font-black text-2xl">12</span>
                            <span className="text-blue-400 text-xs font-bold uppercase tracking-wider">Active Tasks</span>
                        </div>
                        <div className="flex-1 h-20 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col justify-center items-center">
                            <span className="text-slate-600 font-black text-2xl">48</span>
                            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Completed</span>
                        </div>
                    </div>
                </div>

                <div className="h-64 bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 shadow-lg shadow-blue-200 text-white flex flex-col justify-between">
                    <div>
                        <h2 className="text-xl font-bold">Upcoming Deadlines</h2>
                        <p className="opacity-80 text-sm mt-1 font-medium">3 tasks due this week</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                        <span className="text-xs font-bold uppercase tracking-widest block opacity-70">Next focus</span>
                        <span className="text-lg font-bold">UI Design Revision</span>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Dashboard;
