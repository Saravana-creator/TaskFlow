import { useState, useEffect } from 'react';

const Team = () => {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await fetch('/api/teams');
                const data = await response.json();
                if (response.ok) {
                    setTeams(data);
                }
            } catch (error) {
                console.error('Error fetching teams:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTeams();
    }, []);

    if (loading) return <div className="p-10 text-center font-bold text-slate-400">Loading team...</div>;

    // Flattening members from all teams for the team member view
    const allMembers = teams.flatMap(team => team.members);

    return (
        <div>
            <header className="mb-10 bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">Team Members</h1>
                    <p className="text-slate-500 font-medium mt-1">Collaborate and manage your team across projects.</p>
                </div>
                <button className="bg-slate-800 hover:bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg">
                    Invite Member
                </button>
            </header>

            {allMembers.length === 0 ? (
                <div className="bg-white p-20 rounded-3xl border border-dashed border-slate-300 text-center">
                    <p className="text-slate-400 font-bold text-xl">No team members found yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allMembers.map((member, index) => (
                        <div key={member._id} className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center">
                            <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-3xl font-bold border-4 border-blue-100 shadow-lg shadow-blue-500/20 text-white mb-6">
                                {member.name ? member.name.charAt(0).toUpperCase() : '?'}
                            </div>
                            <h3 className="text-xl font-bold text-slate-800">{member.name}</h3>
                            <p className="text-slate-500 font-medium mb-4">{member.role}</p>
                            <div className="flex gap-2">
                                <span className="px-3 py-1 bg-blue-50 text-blue-600 border border-blue-100 rounded-full text-xs font-bold uppercase tracking-wider">Active</span>
                                <span className="px-3 py-1 bg-slate-50 text-slate-600 border border-slate-100 rounded-full text-xs font-bold uppercase tracking-wider">{member.email}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Team;
