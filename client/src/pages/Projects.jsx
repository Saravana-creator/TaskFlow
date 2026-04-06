import { useState, useEffect } from 'react';
import CreateProjectModal from '../components/CreateProjectModal';
import ProjectTasksModal from '../components/ProjectTasksModal';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isTasksModalOpen, setIsTasksModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    const fetchProjects = async () => {
        try {
            const response = await fetch('/api/projects');
            const data = await response.json();
            if (response.ok) {
                setProjects(data);
            }
        } catch (error) {
            console.error('Error fetching projects:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleProjectCreated = (newProject) => {
        setProjects([newProject, ...projects]);
    };

    const handleDeleteProject = async (projectId) => {
        if (!window.confirm('Are you sure you want to delete this project? All associated tasks will remain but link will be lost.')) return;
        
        try {
            const response = await fetch(`/api/projects/${projectId}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                setProjects(projects.filter(p => p._id !== projectId));
            }
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    };

    const handleViewTasks = (project) => {
        setSelectedProject(project);
        setIsTasksModalOpen(true);
    };

    if (loading) return <div className="p-10 text-center font-bold text-slate-400">Loading projects...</div>;

    return (
        <div>
            <header className="mb-10 bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">Projects</h1>
                    <p className="text-slate-500 font-medium mt-1">Manage and track your active projects.</p>
                </div>
                <button 
                    onClick={() => setIsCreateModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-blue-100"
                >
                    New Project
                </button>
            </header>
            
            {projects.length === 0 ? (
                <div className="bg-white p-20 rounded-3xl border border-dashed border-slate-300 text-center">
                    <p className="text-slate-400 font-bold text-xl">No projects found. Create your first one!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
                    {projects.map(project => (
                        <div key={project._id} className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all relative group">
                            <button 
                                onClick={() => handleDeleteProject(project._id)}
                                className="absolute top-4 right-4 p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                title="Delete Project"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            </button>
                            
                            <div className="flex justify-between items-start mb-4 pr-10">
                                <h3 className="text-xl font-bold text-slate-800">{project.title}</h3>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                                    project.status === 'Active' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600'
                                }`}>
                                    {project.status}
                                </span>
                            </div>
                            <p className="text-slate-600 mb-4 font-medium text-sm line-clamp-3 h-12 overflow-hidden">{project.description}</p>
                            
                            <div className="mt-8">
                                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                                    <div className="bg-gradient-to-r from-blue-500 to-blue-700 h-full w-0 transition-all duration-1000 animate-pulse"></div>
                                </div>
                                <div className="flex justify-between mt-2 text-xs font-bold text-slate-400">
                                    <span>Project Lifecycle</span>
                                    <span>{project.deadline ? new Date(project.deadline).toLocaleDateString() : 'No deadline'}</span>
                                </div>
                            </div>

                            <button 
                                onClick={() => handleViewTasks(project)}
                                className="w-full mt-6 py-3.5 bg-slate-50 hover:bg-blue-600 text-slate-500 hover:text-white rounded-2xl font-bold text-sm transition-all border border-slate-100 hover:border-blue-600 shadow-sm"
                            >
                                View All Tasks
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <CreateProjectModal 
                isOpen={isCreateModalOpen} 
                onClose={() => setIsCreateModalOpen(false)} 
                onProjectCreated={handleProjectCreated}
            />

            <ProjectTasksModal 
                isOpen={isTasksModalOpen} 
                onClose={() => setIsTasksModalOpen(false)} 
                project={selectedProject}
            />
        </div>
    );
};

export default Projects;
