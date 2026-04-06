const Team = () => {
    return (
        <div>
           <header className="mb-10 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
               <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">Team Members</h1>
               <p className="text-slate-500 font-medium mt-1">Collaborate and manage your team across projects.</p>
           </header>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {[1, 2, 3, 4].map(i => (
                   <div key={i} className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center">
                       <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-3xl font-bold border-4 border-blue-100 shadow-lg shadow-blue-500/20 text-white mb-6 transform transition-transform group-hover:scale-110">
                           {i === 1 ? 'M' : i === 2 ? 'L' : i === 3 ? 'K' : 'A'}
                       </div>
                       <h3 className="text-xl font-bold text-slate-800">Team Member {i}</h3>
                       <p className="text-slate-500 font-medium mb-4">{i % 2 === 0 ? 'Lead Developer' : 'UI/UX Designer'}</p>
                       <div className="flex gap-2">
                           <span className="px-3 py-1 bg-blue-50 text-blue-600 border border-blue-100 rounded-full text-xs font-bold uppercase tracking-wider">Active</span>
                           <span className="px-3 py-1 bg-slate-50 text-slate-600 border border-slate-100 rounded-full text-xs font-bold uppercase tracking-wider">Project X</span>
                       </div>
                   </div>
               ))}
           </div>
        </div>
    );
};

export default Team;
