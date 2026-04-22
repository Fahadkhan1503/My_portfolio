


import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';
import { getProjectById } from '../services/projectService';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft } from 'react-icons/fa';

// Reusable style constants
const STYLES = {
  getBg: (isDarkMode) => ({
    background: isDarkMode ? '#0d0a14' : '#f6f3ff',
    backgroundImage: isDarkMode
      ? `
        radial-gradient(ellipse 110% 70% at 0% 110%, rgba(123,92,170,0.32) 0%, transparent 60%),
        radial-gradient(ellipse 75% 60%  at 100% -5%,  rgba(187,156,222,0.18) 0%, transparent 60%),
        radial-gradient(ellipse 50% 45%  at 55% 80%,   rgba(91,60,138,0.20)  0%, transparent 65%)
      `
      : `
        radial-gradient(ellipse 80% 65% at 15% 85%, rgba(79,70,229,0.22) 0%, transparent 55%),
        radial-gradient(ellipse 65% 55% at 85% 15%, rgba(124,58,237,0.20) 0%, transparent 55%),
        radial-gradient(ellipse 50% 40% at 50% 70%, rgba(37,99,235,0.12) 0%, transparent 60%)
      `,
  }),
  getButton: (isDarkMode, variant = 'secondary') => {
    const variants = {
      secondary: {
        border: isDarkMode ? '1.5px solid rgba(167,139,250,0.35)' : '1.5px solid rgba(123,92,170,0.3)',
        background: isDarkMode ? 'rgba(167,139,250,0.1)' : 'rgba(123,92,170,0.08)',
        color: isDarkMode ? '#c4b5fd' : '#6d3fbe',
        hoverBg: isDarkMode ? 'rgba(167,139,250,0.25)' : 'rgba(123,92,170,0.18)',
        hoverBorder: isDarkMode ? 'rgba(167,139,250,0.6)' : 'rgba(123,92,170,0.55)',
        hoverShadow: isDarkMode ? '0 8px 20px rgba(123,92,170,0.25)' : '0 8px 20px rgba(123,92,170,0.15)',
      },
      primary: {
        border: 'none',
        background: isDarkMode ? 'linear-gradient(135deg, #7b5caa, #a78bfa)' : 'linear-gradient(135deg, #7b5caa, #9b7cc4)',
        color: '#fff',
        hoverBg: isDarkMode ? 'linear-gradient(135deg, #7b5caa, #a78bfa)' : 'linear-gradient(135deg, #7b5caa, #9b7cc4)',
        hoverBorder: 'none',
        hoverShadow: isDarkMode ? '0 12px 28px rgba(123,92,170,0.45)' : '0 12px 28px rgba(123,92,170,0.35)',
        baseShadow: isDarkMode ? '0 4px 16px rgba(123,92,170,0.35)' : '0 4px 16px rgba(123,92,170,0.25)',
      },
    };
    return variants[variant] || variants.secondary;
  },
};

const getTextColor = (isDarkMode, type = 'primary') => {
  const colors = {
    primary: isDarkMode ? '#ede9fe' : '#1e0f3a',
    secondary: isDarkMode ? 'rgba(210,200,255,0.75)' : 'rgba(70,40,120,0.7)',
    tertiary: isDarkMode ? 'rgba(210,200,255,0.55)' : 'rgba(70,40,120,0.6)',
    label: isDarkMode ? '#c4b5fd' : '#6d3fbe',
  };
  return colors[type] || colors.primary;
};

const BaseButton = ({ onClick, children, variant = 'secondary', isDarkMode }) => {
  const buttonStyle = STYLES.getButton(isDarkMode, variant);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        padding: '14px 24px',
        fontSize: '15px',
        fontWeight: 600,
        borderRadius: '12px',
        border: isHovered ? buttonStyle.hoverBorder : buttonStyle.border,
        background: isHovered ? buttonStyle.hoverBg : buttonStyle.background,
        color: buttonStyle.color,
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        boxShadow: isHovered ? buttonStyle.hoverShadow : (buttonStyle.baseShadow || 'none'),
        transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
        width: '100%',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </button>
  );
};

const Loader = ({ isDarkMode }) => (
  <div className="flex flex-col items-center justify-center gap-4">
    <div
      style={{
        width: '50px',
        height: '50px',
        border: `3px solid ${isDarkMode ? 'rgba(167,139,250,0.2)' : 'rgba(123,92,170,0.15)'}`,
        borderTop: `3px solid ${isDarkMode ? '#a78bfa' : '#7b5caa'}`,
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
      }}
    />
    <p style={{ color: getTextColor(isDarkMode, 'secondary') }}>Loading project details...</p>
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

export default function ProjectsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const data = await getProjectById(id);
        setProject(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching project:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProject();
    }
  }, [id]);

  if (!id) {
    return (
      <div style={STYLES.getBg(isDarkMode)} className="min-h-screen flex items-center justify-center">
        <p style={{ color: getTextColor(isDarkMode, 'secondary') }}>No project selected</p>
      </div>
    );
  }

  const renderErrorState = (message) => (
    <div style={STYLES.getBg(isDarkMode)} className="min-h-screen flex flex-col items-center justify-center px-6">
      <p style={{ color: '#ef4444', marginBottom: '16px' }}>{message}</p>
      <BaseButton onClick={() => navigate('/dashboard')} isDarkMode={isDarkMode} variant="primary">
        <FaArrowLeft size={14} /> Back to Dashboard
      </BaseButton>
    </div>
  );

  if (loading) return (
    <div style={STYLES.getBg(isDarkMode)} className="min-h-screen flex items-center justify-center">
      <Loader isDarkMode={isDarkMode} />
    </div>
  );
  if (error) return renderErrorState(`Error: ${error}`);
  if (!project) return renderErrorState('Project not found');

  return (
    <div style={STYLES.getBg(isDarkMode)} className="min-h-screen">
      {/* Header with Back Button & Theme Toggle */}
      <div className="sticky top-0 z-50 backdrop-blur-md" style={{
        background: isDarkMode ? 'rgba(13, 10, 20, 0.8)' : 'rgba(246, 243, 255, 0.8)',
        borderBottom: `1px solid ${isDarkMode ? 'rgba(167,139,250,0.15)' : 'rgba(123,92,170,0.15)'}`,
      }}>
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 flex justify-between items-center">
          <button
            onClick={() => navigate('/dashboard')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 500,
              color: getTextColor(isDarkMode, 'label'),
              background: isDarkMode ? 'rgba(167,139,250,0.1)' : 'rgba(123,92,170,0.07)',
              border: isDarkMode ? '1px solid rgba(167,139,250,0.3)' : '1px solid rgba(123,92,170,0.28)',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = isDarkMode ? 'rgba(167,139,250,0.2)' : 'rgba(123,92,170,0.14)';
              e.currentTarget.style.transform = 'translateX(-4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = isDarkMode ? 'rgba(167,139,250,0.1)' : 'rgba(123,92,170,0.07)';
              e.currentTarget.style.transform = 'translateX(0)';
            }}
          >
            <FaArrowLeft size={12} /> Back
          </button>
          <ThemeToggle />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

          {/* Left: Content */}
          <div className="order-2 lg:order-1">
            <h1 style={{ color: getTextColor(isDarkMode, 'primary') }} className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              {project.title}
            </h1>

            <p style={{ color: getTextColor(isDarkMode, 'secondary') }} className="text-base sm:text-lg leading-relaxed mb-8">
              {project.description}
            </p>

            {/* Technologies */}
            {project.tags?.length > 0 && (
              <div className="mb-8">
                <p style={{ color: getTextColor(isDarkMode, 'label') }} className="text-xs font-semibold uppercase tracking-wide mb-3">
                  Technologies
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      style={{
                        background: isDarkMode ? 'rgba(167,139,250,0.15)' : 'rgba(123,92,170,0.1)',
                        color: getTextColor(isDarkMode, 'label'),
                        border: isDarkMode ? '1px solid rgba(167,139,250,0.35)' : '1px solid rgba(123,92,170,0.25)',
                      }}
                      className="px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Divider */}
            <div style={{
              height: '1px',
              background: isDarkMode ? 'rgba(167,139,250,0.15)' : 'rgba(123,92,170,0.15)',
              margin: '32px 0',
            }} />

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                  <BaseButton isDarkMode={isDarkMode} variant="secondary">
                    <FaGithub size={16} /> View Source
                  </BaseButton>
                </a>
              )}

              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex-1">
                  <BaseButton isDarkMode={isDarkMode} variant="primary">
                    <FaExternalLinkAlt size={14} /> Live Demo
                  </BaseButton>
                </a>
              )}
            </div>
          </div>

          {/* Right: Image */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div
              style={{
                background: isDarkMode ? 'rgba(123,92,170,0.15)' : 'rgba(255,255,255,0.6)',
                border: isDarkMode ? '1px solid rgba(167,139,250,0.2)' : '1px solid rgba(123,92,170,0.2)',
                boxShadow: isDarkMode ? '0 8px 32px rgba(0,0,0,0.3)' : '0 8px 32px rgba(123,92,170,0.15)',
                width: '100%',
                maxWidth: '100%',
              }}
              className="rounded-2xl overflow-hidden backdrop-blur-sm"
            >
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-auto block"
                  style={{ maxHeight: '600px' }}
                />
              ) : (
                <div
                  style={{
                    aspectRatio: '16/9',
                    background: isDarkMode
                      ? 'linear-gradient(135deg, rgba(123,92,170,0.35), rgba(91,60,138,0.2))'
                      : 'linear-gradient(135deg, rgba(123,92,170,0.1), rgba(167,139,250,0.08))',
                    color: getTextColor(isDarkMode, 'tertiary'),
                  }}
                  className="flex items-center justify-center text-base"
                >
                  Project Image
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}