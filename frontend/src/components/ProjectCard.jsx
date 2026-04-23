import { useTheme } from '../context/ThemeContext';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function ProjectCard({ 
  id = null,
  title = 'Project Title', 
  description = 'Project description goes here',
  tags = [],
  image = null,
  githubUrl = null,
  deployUrl = null,
  onEdit = null,
  onDelete = null,
  isAdmin = false,
}) {
  const { theme, isDarkMode } = useTheme();
  const navigate = useNavigate();

  const cardStyle = {
    borderRadius: '20px',
    overflow: 'hidden',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
    cursor: 'pointer',
    background: isDarkMode
      ? 'rgba(123,92,170,0.18)'   // warm purple tint — contrasts #0f0c19
      : 'rgba(255,255,255,0.75)',  // bright white — contrasts #faf8ff
    border: isDarkMode
      ? '1px solid rgba(167,139,250,0.15)'
      : '1px solid rgba(123,92,170,0.2)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    boxShadow: isDarkMode
      ? '0 4px 28px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)'
      : '0 4px 24px rgba(123,92,170,0.12), inset 0 1px 0 rgba(255,255,255,1)',
  };

  const btnBase = {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    fontSize: '13px',
    fontWeight: 500,
    padding: '9px 0',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    textDecoration: 'none',
  };

  const btnGhost = {
    ...btnBase,
    border: isDarkMode ? '1px solid rgba(167,139,250,0.3)' : '1px solid rgba(123,92,170,0.28)',
    background: isDarkMode ? 'rgba(167,139,250,0.1)' : 'rgba(123,92,170,0.07)',
    color: isDarkMode ? '#c4b5fd' : '#6d3fbe',
  };

  const btnPrimary = {
    ...btnBase,
    border: 'none',
    background: isDarkMode
      ? 'linear-gradient(135deg, #7b5caa, #a78bfa)'
      : 'linear-gradient(135deg, #7b5caa, #9b7cc4)',
    color: '#fff',
    boxShadow: isDarkMode
      ? '0 4px 14px rgba(123,92,170,0.4)'
      : '0 4px 14px rgba(123,92,170,0.3)',
  };

  return (
    <div
      style={cardStyle}
      onClick={() => id && navigate(`/projects/${id}`)}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-6px)';
        e.currentTarget.style.borderColor = isDarkMode ? 'rgba(167,139,250,0.45)' : 'rgba(123,92,170,0.45)';
        e.currentTarget.style.boxShadow = isDarkMode
          ? '0 20px 48px rgba(123,92,170,0.28), inset 0 1px 0 rgba(255,255,255,0.08)'
          : '0 20px 48px rgba(123,92,170,0.2), inset 0 1px 0 rgba(255,255,255,1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = isDarkMode ? 'rgba(167,139,250,0.15)' : 'rgba(123,92,170,0.2)';
        e.currentTarget.style.boxShadow = isDarkMode
          ? '0 4px 28px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)'
          : '0 4px 24px rgba(123,92,170,0.12), inset 0 1px 0 rgba(255,255,255,1)';
      }}
    >
      {/* Image with padding */}
      <div style={{ margin: '15px 15px 0', borderRadius: '12px',border: '1px solid rgba(123,92,170,0.2)', overflow: 'hidden', height: '155px' }}>
        {image ? (
          <img
            src={image}
            alt={title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        ) : (
          <div style={{
            width: '100%', height: '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '12px',
            background: isDarkMode
              ? 'linear-gradient(135deg, rgba(123,92,170,0.35), rgba(91,60,138,0.2))'
              : 'linear-gradient(135deg, rgba(123,92,170,0.1), rgba(167,139,250,0.08))',
            color: isDarkMode ? 'rgba(255,255,255,0.35)' : 'rgba(123,92,170,0.45)',
          }}>
            Project Image
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: '14px 16px 16px' }}>

        {/* Title */}
        <h3 style={{
          fontSize: '19px', fontWeight: 600, margin: '0 0 5px 0', paddingBottom: '20px',
          color: isDarkMode ? '#ede9fe' : '#1e0f3a',
        }}>
          {title}
        </h3>

        {/* Description */}
        <p style={{
          fontSize: '14px', margin: '0 0 20px', lineHeight: 1.6,
          color: isDarkMode ? 'rgba(210,200,255,0.55)' : 'rgba(70,40,120,0.6)',
          display: '-webkit-box', WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical', overflow: 'hidden',paddingBottom: '20px'
        }}>
          {description}
        </p>

        {/* Tags */}
        {tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '14px' }}>
            {tags.slice(0, 4).map((tag, i) => (
              <span key={i} style={{
                fontSize: '11px', fontWeight: 500,
                padding: '3px 9px', borderRadius: '20px',
                background: isDarkMode ? 'rgba(167,139,250,0.12)' : 'rgba(123,92,170,0.08)',
                color: isDarkMode ? '#c4b5fd' : '#6d3fbe',
                border: isDarkMode ? '0.5px solid rgba(167,139,250,0.25)' : '0.5px solid rgba(123,92,170,0.2)',
              }}>
                {tag}
              </span>
            ))}
            {tags.length > 4 && (
              <span title={tags.slice(4).join(', ')} style={{
                fontSize: '11px', fontWeight: 500,
                padding: '3px 9px', borderRadius: '20px',
                background: isDarkMode ? 'rgba(167,139,250,0.08)' : 'rgba(123,92,170,0.06)',
                color: isDarkMode ? '#c4b5fd' : '#6d3fbe',
                border: isDarkMode ? '0.5px solid rgba(167,139,250,0.2)' : '0.5px solid rgba(123,92,170,0.15)',
              }}>
                +{tags.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Divider */}
        <div style={{
          height: '0.5px', marginBottom: '12px',
          background: isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(123,92,170,0.1)',
        }} />

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" style={{ flex: 1 }}>
              <button
                style={btnGhost}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = isDarkMode ? 'rgba(167,139,250,0.2)' : 'rgba(123,92,170,0.14)';
                  e.currentTarget.style.borderColor = isDarkMode ? 'rgba(167,139,250,0.55)' : 'rgba(123,92,170,0.5)';
                  e.currentTarget.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = isDarkMode ? 'rgba(167,139,250,0.1)' : 'rgba(123,92,170,0.07)';
                  e.currentTarget.style.borderColor = isDarkMode ? 'rgba(167,139,250,0.3)' : 'rgba(123,92,170,0.28)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <FaGithub size={13} /> GitHub
              </button>
            </a>
          )}

          {deployUrl && (
            <a href={deployUrl} target="_blank" rel="noopener noreferrer" style={{ flex: 1 }}>
              <button
                style={btnPrimary}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '0.88';
                  e.currentTarget.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '1';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <FaExternalLinkAlt size={11} /> Demo
              </button>
            </a>
          )}

          {isAdmin && onEdit && (
            <button
              onClick={onEdit}
              style={{ ...btnPrimary, flex: 1 }}
            >
              Edit
            </button>
          )}

          {isAdmin && onDelete && (
            <button
              onClick={onDelete}
              style={{
                ...btnBase, flex: 1,
                background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                border: 'none', color: '#fff',
                boxShadow: '0 4px 14px rgba(239,68,68,0.35)',
              }}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
