import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, logout, getToken } from '../../services/authService';
import { getAllProjects, deleteProject } from '../../services/projectService';
import { useTheme } from '../../context/ThemeContext';
import Navbar from '../../components/Navbar';
import ProjectCard from '../../components/ProjectCard';
import Button from '../../components/Button';
import AddProjectModal from '../../components/AddProjectModal';
import { getSettings, updateSettings } from '../../services/settingsService';



export default function AdminPanel() {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [cvUrl, setCvUrl] = useState('');
  const [cvSaved, setCvSaved] = useState(false);
  // Fetch projects from API
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await getAllProjects();
      setProjects(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const currentUser = getUser();
    const token = getToken();
    
    if (!currentUser || !token) {
      navigate('/login');
    } else {
      setUser(currentUser);
      fetchProjects();
      getSettings()
        .then(data => setCvUrl(data.cvUrl || ''))
        .catch(error => {
          console.error('Failed to load settings:', error);
          setCvUrl('');
        });
    }
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleAddProject = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const handleSaveCv = async () => {
    try {
      await updateSettings(cvUrl, getToken());
      setCvSaved(true);
      setTimeout(() => setCvSaved(false), 2000);
    } catch (err) {
      console.error('Failed to save CV URL:', err);
      alert('Failed to save CV URL. Please try again.');
    }
  };

  const handleCloseModal = () => {
    setEditingProject(null);
    setIsModalOpen(false);
  };

  const handleProjectAdded = () => {
    // Refresh projects list
    fetchProjects();
  };

  const handleEditProject = (projectId) => {
    const project = projects.find(p => p._id === projectId);
    if (project) {
      setEditingProject(project);
      setIsModalOpen(true);
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(projectId);
        // Refresh projects list
        fetchProjects();
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Failed to delete project');
      }
    }
  };

  if (!user) {
    return (
      <div style={{ backgroundColor: theme.colors.background, minHeight: '100vh' }} className="flex items-center justify-center">
        <p style={{ color: theme.colors.text }} className="text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: theme.colors.background, color: theme.colors.text, minHeight: '100vh' }}>
      {/* Navigation Bar */}
      <Navbar showLoginButton={false} user={user} onLogout={handleLogout} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <div style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.border }} className="border rounded-lg p-6">
            <p style={{ color: theme.colors.secondary }} className="text-sm mb-2">Total Projects</p>
            <p style={{ color: theme.colors.primary }} className="text-3xl font-bold">{projects.length}</p>
          </div>
          <div style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.border }} className="border rounded-lg p-6">
            <p style={{ color: theme.colors.secondary }} className="text-sm mb-2">Total Tags</p>
            <p className="text-3xl font-bold" style={{ color: '#10b981' }}>
              {projects.reduce((acc, p) => acc + (p.tags?.length || 0), 0)}
            </p>
          </div>
          <div style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.border }} className="border rounded-lg p-6">
            <p style={{ color: theme.colors.secondary }} className="text-sm mb-2">With GitHub</p>
            <p className="text-3xl font-bold" style={{ color: '#3b82f6' }}>
              {projects.filter(p => p.githubUrl).length}
            </p>
          </div>
          <div style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.border }} className="border rounded-lg p-6">
            <p style={{ color: theme.colors.secondary }} className="text-sm mb-2">Deployed</p>
            <p className="text-3xl font-bold" style={{ color: '#06b6d4' }}>
              {projects.filter(p => p.deployUrl).length}
            </p>
          </div>
          <div style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.border }} className="border rounded-lg p-6">
            <p style={{ color: theme.colors.secondary }} className="text-sm mb-2">User Role</p>
            <p style={{ color: '#a855f7' }} className="text-3xl font-bold capitalize">{user.role}</p>
          </div>
        </div>

        {/* Projects Section */}
        <div style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.border }} className="border rounded-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 style={{ color: theme.colors.text }} className="text-2xl font-bold">Your Projects</h2>
            <Button variant="primary" size="md" onClick={handleAddProject}>
              + Add Project
            </Button>
          </div>

          {/* Projects Grid */}
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard
                  key={project._id}
                  title={project.title}
                  description={project.description}
                  tags={project.tags}
                  image={project.image}
                  githubUrl={project.githubUrl}
                  deployUrl={project.deployUrl}
                  isAdmin={true}
                  onEdit={() => handleEditProject(project._id)}
                  onDelete={() => handleDeleteProject(project._id)}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 mb-4"
                fill="none"
                stroke="currentColor"
                style={{ color: theme.colors.secondary }}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <p style={{ color: theme.colors.secondary }} className="text-lg">
                No projects yet. Create one to get started!
              </p>
            </div>
          )}
        </div>

        {/* CV URL Section */}
<div
  style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.border }}
  className="border rounded-lg p-8 mt-8"
>
  <h2 style={{ color: theme.colors.text }} className="text-2xl font-bold mb-2">
    CV / Resume Link
  </h2>
  <p style={{ color: theme.colors.secondary }} className="text-sm mb-6">
    Paste your Google Drive, Dropbox, or any public PDF link here.
  </p>

  <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
    <input
      type="text"
      value={cvUrl}
      onChange={(e) => setCvUrl(e.target.value)}
      placeholder="https://drive.google.com/file/d/..."
      style={{
        flex: '1 1 250px',
        minWidth: '250px',
        padding: '12px 16px',
        borderRadius: '10px',
        border: `1.5px solid ${theme.colors.border}`,
        background: theme.colors.background,
        color: theme.colors.text,
        fontSize: '14px',
        outline: 'none',
      }}
      onFocus={(e) => e.target.style.borderColor = '#7b5caa'}
      onBlur={(e) => e.target.style.borderColor = theme.colors.border}
    />
    <button
      onClick={handleSaveCv}
      style={{
        padding: '12px 24px',
        borderRadius: '10px',
        border: 'none',
        background: cvSaved
          ? 'linear-gradient(135deg, #10b981, #059669)'
          : 'linear-gradient(135deg, #7b5caa, #a78bfa)',
        color: '#fff',
        fontWeight: 600,
        fontSize: '14px',
        cursor: 'pointer',
        transition: 'all 0.2s',
        whiteSpace: 'nowrap',
        flexShrink: 0,
      }}
    >
      {cvSaved ? '✓ Saved!' : 'Save Link'}
    </button>
  </div>

  {cvUrl && (
    <p style={{ marginTop: '10px', fontSize: '12px', color: theme.colors.secondary }}>
      Current:{' '}
      <a href={cvUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#7b5caa' }}>
        {cvUrl}
      </a>
    </p>
  )}
</div>

        
      </div>

      {/* Add Project Modal */}
      <AddProjectModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onProjectAdded={handleProjectAdded}
        project={editingProject}
      />
    </div>
    
  );
}
