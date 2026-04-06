const Projects = () => {
    return (
        <div>
            <header className="mb-10 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">Projects</h1>
                <p className="text-slate-500 font-medium mt-1">Manage and track your active projects.</p>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3].map(i => (
                    <div key={i} className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold text-slate-800">Project Alpha {i}</h3>
                            <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-bold uppercase tracking-wider">Active</span>
                        </div>
                        <p className="text-slate-600 mb-4 font-medium">Description for Project Alpha {i}. Implementation of task flow features.</p>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div className="bg-blue-600 h-full w-2/3"></div>
                        </div>
                        <div className="flex justify-between mt-2 text-xs font-bold text-slate-400">
                            <span>66% Complete</span>
                            <span>Due in 4 days</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Projects;
