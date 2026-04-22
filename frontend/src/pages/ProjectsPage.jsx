import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import Navbar from '../components/Navbar';
import { getProjectById } from '../services/projectService';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft } from 'react-icons/fa';

export default function ProjectsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme, isDarkMode } = useTheme();
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
    return <div>No project selected</div>;
  }

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

  return (
    <div style={sectionBg} className="min-h-screen">
      <Navbar showLoginButton={false} />

      {loading ? (
        <div className="max-w-7xl mx-auto px-6 pt-24 pb-20 text-center">
          <p style={{ color: theme.colors.secondary }}>Loading project details...</p>
        </div>
      ) : error ? (
        <div className="max-w-7xl mx-auto px-6 pt-24 pb-20 text-center">
          <p style={{ color: '#ef4444' }}>Error: {error}</p>
          <button
            onClick={() => navigate('/dashboard')}
            style={{
              marginTop: '16px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 24px',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: 500,
              color: '#fff',
              background: isDarkMode
                ? 'linear-gradient(135deg, #7b5caa, #a78bfa)'
                : 'linear-gradient(135deg, #7b5caa, #9b7cc4)',
              boxShadow: isDarkMode
                ? '0 4px 14px rgba(123,92,170,0.4)'
                : '0 4px 14px rgba(123,92,170,0.3)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.88';
              e.currentTarget.style.transform = 'scale(1.03)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <FaArrowLeft size={14} /> Back to Dashboard
          </button>
        </div>
      ) : project ? (
        <div className="max-w-7xl mx-auto px-6 pt-24 pb-20">
          {/* Back Button */}
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
              color: isDarkMode ? '#c4b5fd' : '#6d3fbe',
              background: isDarkMode ? 'rgba(167,139,250,0.1)' : 'rgba(123,92,170,0.07)',
              border: isDarkMode ? '1px solid rgba(167,139,250,0.3)' : '1px solid rgba(123,92,170,0.28)',
              cursor: 'pointer',
              transition: 'all 0.2s',
              marginBottom: '32px',
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

          {/* Project Details Container */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '48px',
              alignItems: 'start',
            }}
            className="lg:grid-cols-2 md:grid-cols-1 grid-cols-1"
          >
            {/* Left Side - Content */}
            <div className="order-2 lg:order-1">
              {/* Title */}
              <h1
                style={{
                  fontSize: 'clamp(28px, 5vw, 48px)',
                  fontWeight: 700,
                  marginBottom: '16px',
                  color: isDarkMode ? '#ede9fe' : '#1e0f3a',
                  lineHeight: 1.2,
                }}
              >
                {project.title}
              </h1>

              {/* Description */}
              <p
                style={{
                  fontSize: '16px',
                  lineHeight: 1.8,
                  marginBottom: '32px',
                  color: isDarkMode ? 'rgba(210,200,255,0.75)' : 'rgba(70,40,120,0.7)',
                }}
              >
                {project.description}
              </p>

              {/* Tags */}
              {project.tags && project.tags.length > 0 && (
                <div style={{ marginBottom: '32px' }}>
                  <p
                    style={{
                      fontSize: '13px',
                      fontWeight: 600,
                      marginBottom: '12px',
                      color: isDarkMode ? '#c4b5fd' : '#6d3fbe',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    Technologies
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: '13px',
                          fontWeight: 500,
                          padding: '8px 16px',
                          borderRadius: '20px',
                          background: isDarkMode
                            ? 'rgba(167,139,250,0.15)'
                            : 'rgba(123,92,170,0.1)',
                          color: isDarkMode ? '#c4b5fd' : '#6d3fbe',
                          border: isDarkMode
                            ? '1px solid rgba(167,139,250,0.35)'
                            : '1px solid rgba(123,92,170,0.25)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Divider */}
              <div
                style={{
                  height: '1px',
                  background: isDarkMode
                    ? 'rgba(167,139,250,0.15)'
                    : 'rgba(123,92,170,0.15)',
                  margin: '32px 0',
                }}
              />

              {/* Buttons */}
              <div
                style={{
                  display: 'flex',
                  gap: '16px',
                  flexWrap: 'wrap',
                }}
              >
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ flex: '1 1 auto', minWidth: '140px' }}
                  >
                    <button
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        padding: '14px 24px',
                        fontSize: '15px',
                        fontWeight: 600,
                        borderRadius: '12px',
                        border: isDarkMode
                          ? '1.5px solid rgba(167,139,250,0.35)'
                          : '1.5px solid rgba(123,92,170,0.3)',
                        background: isDarkMode
                          ? 'rgba(167,139,250,0.1)'
                          : 'rgba(123,92,170,0.08)',
                        color: isDarkMode ? '#c4b5fd' : '#6d3fbe',
                        cursor: 'pointer',
                        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = isDarkMode
                          ? 'rgba(167,139,250,0.25)'
                          : 'rgba(123,92,170,0.18)';
                        e.currentTarget.style.borderColor = isDarkMode
                          ? 'rgba(167,139,250,0.6)'
                          : 'rgba(123,92,170,0.55)';
                        e.currentTarget.style.transform = 'translateY(-3px)';
                        e.currentTarget.style.boxShadow = isDarkMode
                          ? '0 8px 20px rgba(123,92,170,0.25)'
                          : '0 8px 20px rgba(123,92,170,0.15)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = isDarkMode
                          ? 'rgba(167,139,250,0.1)'
                          : 'rgba(123,92,170,0.08)';
                        e.currentTarget.style.borderColor = isDarkMode
                          ? 'rgba(167,139,250,0.35)'
                          : 'rgba(123,92,170,0.3)';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <FaGithub size={18} />
                      View Source
                    </button>
                  </a>
                )}

                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ flex: '1 1 auto', minWidth: '140px' }}
                  >
                    <button
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        padding: '14px 24px',
                        fontSize: '15px',
                        fontWeight: 600,
                        borderRadius: '12px',
                        border: 'none',
                        background: isDarkMode
                          ? 'linear-gradient(135deg, #7b5caa, #a78bfa)'
                          : 'linear-gradient(135deg, #7b5caa, #9b7cc4)',
                        color: '#fff',
                        cursor: 'pointer',
                        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        boxShadow: isDarkMode
                          ? '0 4px 16px rgba(123,92,170,0.35)'
                          : '0 4px 16px rgba(123,92,170,0.25)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-3px)';
                        e.currentTarget.style.boxShadow = isDarkMode
                          ? '0 12px 28px rgba(123,92,170,0.45)'
                          : '0 12px 28px rgba(123,92,170,0.35)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = isDarkMode
                          ? '0 4px 16px rgba(123,92,170,0.35)'
                          : '0 4px 16px rgba(123,92,170,0.25)';
                      }}
                    >
                      <FaExternalLinkAlt size={16} />
                      Live Demo
                    </button>
                  </a>
                )}
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="order-1 lg:order-2">
              <div
                style={{
                  borderRadius: '20px',
                  overflow: 'hidden',
                  background: isDarkMode
                    ? 'rgba(123,92,170,0.15)'
                    : 'rgba(255,255,255,0.6)',
                  border: isDarkMode
                    ? '1px solid rgba(167,139,250,0.2)'
                    : '1px solid rgba(123,92,170,0.2)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  boxShadow: isDarkMode
                    ? '0 8px 32px rgba(0,0,0,0.3)'
                    : '0 8px 32px rgba(123,92,170,0.15)',
                  aspectRatio: '16/9',
                }}
              >
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '16px',
                      background: isDarkMode
                        ? 'linear-gradient(135deg, rgba(123,92,170,0.35), rgba(91,60,138,0.2))'
                        : 'linear-gradient(135deg, rgba(123,92,170,0.1), rgba(167,139,250,0.08))',
                      color: isDarkMode
                        ? 'rgba(255,255,255,0.35)'
                        : 'rgba(123,92,170,0.45)',
                    }}
                  >
                    Project Image
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-6 pt-24 pb-20 text-center">
          <p style={{ color: theme.colors.secondary }}>Project not found</p>
          <button
            onClick={() => navigate('/dashboard')}
            style={{
              marginTop: '16px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 24px',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: 500,
              color: '#fff',
              background: isDarkMode
                ? 'linear-gradient(135deg, #7b5caa, #a78bfa)'
                : 'linear-gradient(135deg, #7b5caa, #9b7cc4)',
              boxShadow: isDarkMode
                ? '0 4px 14px rgba(123,92,170,0.4)'
                : '0 4px 14px rgba(123,92,170,0.3)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.88';
              e.currentTarget.style.transform = 'scale(1.03)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <FaArrowLeft size={14} /> Back to Dashboard
          </button>
        </div>
      )}
    </div>
  );
}