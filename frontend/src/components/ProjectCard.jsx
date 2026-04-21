import { useTheme } from '../context/ThemeContext';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

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
                <FaExternalLinkAlt size={11} /> Live Demo
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


// import { useTheme } from '../context/ThemeContext';
// import Button from './Button';

// export default function ProjectCard({ 
//   title = 'Project Title', 
//   description = 'Project description goes here',
//   tags = [],
//   image = null,
//   githubUrl = null,
//   deployUrl = null,
//   onEdit = null,
//   onDelete = null,
//   isAdmin = false,
// }) {
//   const { theme, isDarkMode } = useTheme();

//   return (
//     <div 
//       style={{ 
//         backgroundColor: theme.colors.surface, 
//         borderColor: theme.colors.border,
//         border: `2px solid ${theme.colors.border}`,
//         transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
//         transform: 'translateY(0)',
//         borderRadius: '16px',
//         boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
//       }} 
//       className="p-6 hover:border-opacity-100 cursor-pointer"
//       onMouseEnter={(e) => {
//         e.currentTarget.style.transform = 'translateY(-8px)';
//         e.currentTarget.style.boxShadow = `0 20px 40px rgba(123,92,170,0.15)`;
//         e.currentTarget.style.borderColor = '#7b5caa';
//       }}
//       onMouseLeave={(e) => {
//         e.currentTarget.style.transform = 'translateY(0)';
//         e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
//         e.currentTarget.style.borderColor = theme.colors.border;
//       }}   >
//       {/* Project Image */}
//       <div 
//         style={{ backgroundColor: isDarkMode ? '#2a2a2d' : '#f0ede9' }} 
//         className="h-40 rounded-lg mb-4 flex items-center justify-center overflow-hidden bg-cover bg-center"
//       >
//         {image ? (
//           <img src={image} alt={title} className="w-full h-full object-cover" />
//         ) : (
//           <span style={{ color: theme.colors.secondary }}>Project Image</span>
//         )}
//       </div>

//       {/* Project Title */}
//       <h3 className="text-lg font-semibold mb-2" style={{ color: theme.colors.text }}>
//         {title}
//       </h3>

//       {/* Project Description */}
//       <p className="mb-4 line-clamp-2" style={{ color: theme.colors.secondary }}>
//         {description}
//       </p>

//       {/* Tags */}
//       {tags.length > 0 && (
//         <div className="mb-6">
//           <div className="flex gap-2 flex-wrap">
//             {tags.slice(0, 4).map((tag, index) => (
//               <span 
//                 key={index}
//                 style={{ 
//                   backgroundColor: `${theme.colors.primary}20`, 
//                   color: theme.colors.primary,
//                   border: `1px solid ${theme.colors.primary}40`,
//                   transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
//                 }} 
//                 className="px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap"
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.backgroundColor = `${theme.colors.primary}30`;
//                   e.currentTarget.style.borderColor = theme.colors.primary;
//                   e.currentTarget.style.transform = 'translateY(-2px)';
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.backgroundColor = `${theme.colors.primary}20`;
//                   e.currentTarget.style.borderColor = `${theme.colors.primary}40`;
//                   e.currentTarget.style.transform = 'translateY(0)';
//                 }}
//               >
//                 {tag}
//               </span>
//             ))}
//             {tags.length > 4 && (
//               <span 
//                 style={{ 
//                   backgroundColor: `${theme.colors.primary}15`, 
//                   color: theme.colors.primary,
//                   border: `1px solid ${theme.colors.primary}35`,
//                   transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
//                 }} 
//                 className="px-2.5 py-1 rounded-full text-xs font-medium flex items-center justify-center min-w-fit"
//                 title={tags.slice(4).join(', ')}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.backgroundColor = `${theme.colors.primary}25`;
//                   e.currentTarget.style.borderColor = theme.colors.primary;
//                   e.currentTarget.style.transform = 'translateY(-2px)';
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.backgroundColor = `${theme.colors.primary}15`;
//                   e.currentTarget.style.borderColor = `${theme.colors.primary}35`;
//                   e.currentTarget.style.transform = 'translateY(0)';
//                 }}
//               >
//                 +{tags.length - 4}
//               </span>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Action Buttons */}
//       <div className="flex gap-2 mt-6">
//         {githubUrl && (
//           <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
//             <Button variant="outline" size="sm" className="w-full">
//               <span className="flex items-center justify-center gap-2">
//                 <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
//                 </svg>
//                 GitHub
//               </span>
//             </Button>
//           </a>
//         )}

//         {deployUrl && (
//           <a href={deployUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
//             <Button variant="outline" size="sm" className="w-full">
//               <span className="flex items-center justify-center gap-2">
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
//                 </svg>
//                 Deploy
//               </span>
//             </Button>
//           </a>
//         )}

//         {isAdmin && onEdit && (
//           <Button variant="primary" size="sm" onClick={onEdit} className="flex-1">
//             Edit
//           </Button>
//         )}

//         {isAdmin && onDelete && (
//           <Button variant="danger" size="sm" onClick={onDelete} className="flex-1">
//             Delete
//           </Button>
//         )}
//       </div>
//     </div>
//   );
// }
