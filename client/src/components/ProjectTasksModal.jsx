import { useState, useEffect } from 'react';

const ProjectTasksModal = ({ isOpen, onClose, project }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isOpen && project) {
            const fetchTasks = async () => {
                setLoading(true);
                try {
                    const response = await fetch(`/api/tasks/project/${project._id}`);
                    const data = await response.json();
                    if (response.ok) {
                        setTasks(data);
                    }
                } catch (error) {
                    console.error('Error fetching project tasks:', error);
                } finally {
                    setLoading(false);
                }
            };
            fetchTasks();
        }
    }, [isOpen, project]);

    if (!isOpen || !project) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <div>
                        <h2 className="text-2xl font-black text-slate-800 tracking-tight">{project.title}</h2>
                        <p className="text-slate-500 font-medium text-sm">Task Overview</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-xl transition-colors text-slate-400">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
                    </button>
                </div>
                
                <div className="p-8 max-h-[60vh] overflow-y-auto">
                    {loading ? (
                        <div className="py-10 text-center font-bold text-slate-400">Loading tasks...</div>
                    ) : tasks.length === 0 ? (
                        <div className="py-16 text-center text-slate-400 font-bold border-2 border-dashed border-slate-100 rounded-3xl">
                            No tasks found for this project.
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {tasks.map(task => (
                                <div key={task._id} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-200 transition-all flex justify-between items-center group">
                                    <div className="flex gap-4 items-center">
                                        <div className={`w-3 h-3 rounded-full ${
                                            task.priority === 'High' ? 'bg-red-500' : task.priority === 'Medium' ? 'bg-yellow-500' : 'bg-blue-500'
                                        }`} />
                                        <div>
                                            <h4 className="font-bold text-slate-700">{task.title}</h4>
                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{task.status}</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-3 items-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="px-3 py-1.5 bg-white text-slate-500 hover:text-blue-600 rounded-lg text-xs font-bold border border-slate-200 shadow-sm transition-all">
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="p-8 bg-slate-50/50 border-t border-slate-100 flex justify-end">
                    <button onClick={onClose} className="px-8 py-3 bg-slate-800 hover:bg-slate-900 text-white rounded-2xl font-bold shadow-lg transition-all">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProjectTasksModal;
