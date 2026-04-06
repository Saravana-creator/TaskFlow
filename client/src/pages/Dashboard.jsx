import Button from "../components/Button";
import { useState, useEffect } from 'react';
import CreateTaskModal from '../components/CreateTaskModal';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchAllData = async () => {
        try {
            const [taskRes, projectRes] = await Promise.all([
                fetch('/api/tasks'),
                fetch('/api/projects')
            ]);
            
            const taskData = await taskRes.json();
            const projectData = await projectRes.json();

            if (taskRes.ok) setTasks(taskData);
            if (projectRes.ok) setProjects(projectData);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllData();
    }, []);

    const handleTaskCreated = (newTask) => {
        setTasks([newTask, ...tasks]);
    };

    const activeTasks = tasks.filter(t => t.status !== 'Done').length;
    const completedTasks = tasks.filter(t => t.status === 'Done').length;

    if (loading) return <div className="p-10 text-center font-bold text-slate-400 font-sans tracking-wide">Loading dashboard insights...</div>;

    return (
        <>
            <header className="mb-10 flex justify-between items-center bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <div>
                    <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">
                        Dashboard
                    </h1>
                    <p className="text-slate-500 font-medium mt-1">Ready for your tasks today?</p>
                </div>
                <Button onClick={() => setIsModalOpen(true)}>New Task</Button>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Stats Card */}
                <div className="h-64 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <h2 className="text-xl font-bold text-slate-800">Your Summary</h2>
                    <div className="mt-4 flex gap-4">
                        <div className="flex-1 h-20 bg-blue-50 rounded-2xl border border-blue-100 flex flex-col justify-center items-center">
                            <span className="text-blue-600 font-black text-2xl">{activeTasks}</span>
                            <span className="text-blue-400 text-xs font-bold uppercase tracking-wider">Active Tasks</span>
                        </div>
                        <div className="flex-1 h-20 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col justify-center items-center">
                            <span className="text-slate-600 font-black text-2xl">{completedTasks}</span>
                            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Completed</span>
                        </div>
                    </div>
                </div>

                {/* Deadlines Card */}
                <div className="h-64 bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 shadow-lg shadow-blue-200 text-white flex flex-col justify-between">
                    <div>
                        <h2 className="text-xl font-bold">Upcoming Deadlines</h2>
                        <p className="opacity-80 text-sm mt-1 font-medium">{tasks.length} total tasks</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                        <span className="text-xs font-bold uppercase tracking-widest block opacity-70">Status</span>
                        <span className="text-lg font-bold">Systems Online</span>
                    </div>
                </div>
            </section>

            <CreateTaskModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onTaskCreated={handleTaskCreated}
                projects={projects}
            />
        </>
    );
};

export default Dashboard;
