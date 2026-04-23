import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import ProjectCard from '../components/ProjectCard';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { getAllProjects } from '../services/projectService';
import { FaGithub } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import ProjectsPage from './ProjectsPage';

export default function Projects() {
  const { theme, isDarkMode } = useTheme();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { ref: headerRef, isVisible: headerVisible } = useIntersectionObserver();
  const { ref: statsRef, isVisible: statsVisible } = useIntersectionObserver();
  const { ref: gridRef, isVisible: gridVisible } = useIntersectionObserver();
  const { ref: ctaRef, isVisible: ctaVisible } = useIntersectionObserver();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await getAllProjects();
        setProjects(Array.isArray(data) ? data : data.data || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError(err.message);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const sectionBg = isDarkMode
    ? {
        background: '#0d0a14',
        backgroundImage: `
          radial-gradient(ellipse 110% 70% at 0% 110%, rgba(123,92,170,0.32) 0%, transparent 60%),
          radial-gradient(ellipse 75% 60%  at 100% -5%,  rgba(187,156,222,0.18) 0%, transparent 60%),
          radial-gradient(ellipse 50% 45%  at 55% 80%,   rgba(91,60,138,0.20)  0%, transparent 65%)
        `,
      }
    : {
        background: '#f6f3ff',
        backgroundImage: `
          radial-gradient(ellipse 80% 65% at 15% 85%, rgba(79,70,229,0.22) 0%, transparent 55%),
          radial-gradient(ellipse 65% 55% at 85% 15%, rgba(124,58,237,0.20) 0%, transparent 55%),
          radial-gradient(ellipse 50% 40% at 50% 70%, rgba(37,99,235,0.12) 0%, transparent 60%)
        `,
      };

  const stats = [
    { label: 'Total Projects', value: '10+', icon: '📁' },
    { label: 'Open Source', value: '5+', icon: '🔓' },
    { label: 'Deployed', value: '8+', icon: '🚀' },
  ];

  return (
    <div style={sectionBg}>

      {/* ── Section Header ── */}
      <div
        ref={headerRef}
        className={`max-w-7xl mx-auto px-6 pt-22 pb-10 transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <span className="section-label">3.Featured Work</span>
        <h2 className="section-title mt-3">Projects</h2>
        <p className="section-desc mt-4 max-w-2xl" style={{ color: theme.colors.secondary }}>
          A selection of things I've built — each representing my commitment to quality and innovation
        </p>
      </div>


      {/* ── Projects Grid ── */}
      <div ref={gridRef} className="max-w-7xl mx-auto px-6 pb-15">
        {loading ? (
          <div className="text-center py-16">
            <p style={{ color: theme.colors.secondary }}>Loading projects...</p>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <p style={{ color: '#ef4444' }}>Error: {error}</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-16">
            <p style={{ color: theme.colors.secondary }}>No projects found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, idx) => (
              <div
                key={project._id}
                className={`transition-all duration-700 ${gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${80 * idx}ms` }}
              >
                <ProjectCard
                  id={project._id}
                  title={project.title}
                  description={project.description}
                  tags={project.tags}
                  image={project.image}
                  githubUrl={project.githubUrl}
                  deployUrl={project.deployUrl}
                  isAdmin={false}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Divider ── */}
      <div
        className="max-w-7xl mx-auto px-6"
        style={{ height: '1px', background: isDarkMode ? 'rgba(123,92,170,0.12)' : 'rgba(123,92,170,0.1)' }}
      />
      
      {/* ── CTA ── */}
<div ref={ctaRef} className="max-w-7xl mx-auto px-6 py-20">
  <div
    className={`transition-all duration-700 ${ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    style={{
      maxWidth: '560px',
      margin: '0 auto',
      borderRadius: '20px',
      padding: '40px 32px',
      textAlign: 'center',
      background: isDarkMode
        ? 'rgba(138,92,210,0.08)'
        : 'rgba(255,255,255,0.6)',
      border: isDarkMode
        ? '1px solid rgba(167,139,250,0.18)'
        : '1px solid rgba(123,92,170,0.18)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      boxShadow: isDarkMode
        ? '0 4px 28px rgba(0,0,0,0.3)'
        : '0 4px 24px rgba(123,92,170,0.1)',
    }}
  >
    <h2
      className="text-2xl font-semibold mb-2"
      style={{ color: isDarkMode ? '#ede9fe' : '#1e0f3a' }}
    >
      Want to see more?
    </h2>

    <p
      className="text-sm mb-6"
      style={{
        color: isDarkMode ? 'rgba(210,200,255,0.55)' : 'rgba(70,40,120,0.6)',
        lineHeight: 1.6,
      }}
    >
      Check out my GitHub for more projects and open-source contributions.
    </p>

    <a
      href="https://github.com/fahadkhan1503"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 24px',
        borderRadius: '10px',
        fontSize: '13px',
        fontWeight: 500,
        color: '#fff',
        background: isDarkMode
          ? 'linear-gradient(135deg, #7b5caa, #a78bfa)'
          : 'linear-gradient(135deg, #7b5caa, #9b7cc4)',
        boxShadow: isDarkMode
          ? '0 4px 14px rgba(123,92,170,0.4)'
          : '0 4px 14px rgba(123,92,170,0.3)',
        textDecoration: 'none',
        transition: 'all 0.2s',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'scale(1.03)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1)'; }}
    >
      <FaGithub size={14} />
      Visit GitHub
    </a>
    
  </div>
  </div>

  






    </div>
  );
}
