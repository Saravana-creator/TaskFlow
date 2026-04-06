import { useState, useEffect } from 'react';

const CreateTaskModal = ({ isOpen, onClose, onTaskCreated, projects }) => {
    const [formData, setFormData] = useState({ title: '', description: '', projectId: '', priority: 'Medium', dueDate: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (projects.length > 0 && !formData.projectId) {
            setFormData(prev => ({ ...prev, projectId: projects[0]._id }));
        }
    }, [projects]);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('/api/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                const newTask = await response.json();
                onTaskCreated(newTask);
                onClose();
            }
        } catch (error) {
            console.error('Error creating task:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <h2 className="text-2xl font-black text-slate-800 tracking-tight">New Task</h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-xl transition-colors text-slate-400 hover:text-slate-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-8">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Task Title</label>
                            <input 
                                type="text" 
                                required
                                placeholder="What needs to be done?"
                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all font-medium text-slate-800"
                                value={formData.title}
                                onChange={(e) => setFormData({...formData, title: e.target.value})}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Project</label>
                            <select 
                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all font-medium text-slate-800"
                                value={formData.projectId}
                                onChange={(e) => setFormData({...formData, projectId: e.target.value})}
                            >
                                {projects.map(p => (
                                    <option key={p._id} value={p._id}>{p.title}</option>
                                ))}
                            </select>
                        </div>
                        
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Priority</label>
                            <div className="flex gap-2">
                                {['Low', 'Medium', 'High'].map(p => (
                                    <button
                                        key={p}
                                        type="button"
                                        onClick={() => setFormData({...formData, priority: p})}
                                        className={`flex-1 py-3 rounded-xl font-bold transition-all border ${
                                            formData.priority === p 
                                            ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-100' 
                                            : 'bg-white text-slate-400 border-slate-200 hover:border-blue-300'
                                        }`}
                                    >
                                        {p}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Due Date</label>
                            <input 
                                type="date" 
                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all font-medium text-slate-800"
                                value={formData.dueDate}
                                onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="mt-10 flex gap-4">
                        <button type="button" onClick={onClose} className="flex-1 px-6 py-4 rounded-2xl font-bold text-slate-500 hover:bg-slate-100 transition-all">Cancel</button>
                        <button type="submit" disabled={loading} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-blue-100 disabled:opacity-50">
                            {loading ? 'Adding...' : 'Add Task'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateTaskModal;
