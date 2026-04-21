import { useTheme } from '../context/ThemeContext';
import Button from './Button';

export default function ProjectCard({ 
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

  return (
    <div 
      style={{ 
        backgroundColor: theme.colors.surface, 
        borderColor: theme.colors.border,
        border: `2px solid ${theme.colors.border}`,
        transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
        transform: 'translateY(0)',
        borderRadius: '16px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      }} 
      className="p-6 hover:border-opacity-100 cursor-pointer"
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px)';
        e.currentTarget.style.boxShadow = `0 20px 40px rgba(123,92,170,0.15)`;
        e.currentTarget.style.borderColor = '#7b5caa';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
        e.currentTarget.style.borderColor = theme.colors.border;
      }}   >
      {/* Project Image */}
      <div 
        style={{ backgroundColor: isDarkMode ? '#2a2a2d' : '#f0ede9' }} 
        className="h-40 rounded-lg mb-4 flex items-center justify-center overflow-hidden bg-cover bg-center"
      >
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <span style={{ color: theme.colors.secondary }}>Project Image</span>
        )}
      </div>

      {/* Project Title */}
      <h3 className="text-lg font-semibold mb-2" style={{ color: theme.colors.text }}>
        {title}
      </h3>

      {/* Project Description */}
      <p className="mb-4 line-clamp-2" style={{ color: theme.colors.secondary }}>
        {description}
      </p>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="mb-6">
          <div className="flex gap-2 flex-wrap">
            {tags.slice(0, 4).map((tag, index) => (
              <span 
                key={index}
                style={{ 
                  backgroundColor: `${theme.colors.primary}20`, 
                  color: theme.colors.primary,
                  border: `1px solid ${theme.colors.primary}40`,
                  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }} 
                className="px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `${theme.colors.primary}30`;
                  e.currentTarget.style.borderColor = theme.colors.primary;
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = `${theme.colors.primary}20`;
                  e.currentTarget.style.borderColor = `${theme.colors.primary}40`;
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {tag}
              </span>
            ))}
            {tags.length > 4 && (
              <span 
                style={{ 
                  backgroundColor: `${theme.colors.primary}15`, 
                  color: theme.colors.primary,
                  border: `1px solid ${theme.colors.primary}35`,
                  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }} 
                className="px-2.5 py-1 rounded-full text-xs font-medium flex items-center justify-center min-w-fit"
                title={tags.slice(4).join(', ')}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `${theme.colors.primary}25`;
                  e.currentTarget.style.borderColor = theme.colors.primary;
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = `${theme.colors.primary}15`;
                  e.currentTarget.style.borderColor = `${theme.colors.primary}35`;
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                +{tags.length - 4}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2 mt-6">
        {githubUrl && (
          <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
            <Button variant="outline" size="sm" className="w-full">
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </span>
            </Button>
          </a>
        )}

        {deployUrl && (
          <a href={deployUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
            <Button variant="outline" size="sm" className="w-full">
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Deploy
              </span>
            </Button>
          </a>
        )}

        {isAdmin && onEdit && (
          <Button variant="primary" size="sm" onClick={onEdit} className="flex-1">
            Edit
          </Button>
        )}

        {isAdmin && onDelete && (
          <Button variant="danger" size="sm" onClick={onDelete} className="flex-1">
            Delete
          </Button>
        )}
      </div>
    </div>
  );
}
