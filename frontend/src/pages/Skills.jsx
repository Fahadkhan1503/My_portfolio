import { useTheme } from '../context/ThemeContext';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { FaReact, FaServer, FaGamepad, FaBrain, FaTools, FaLightbulb } from 'react-icons/fa';

const scrollAnimationStyle = `
  @keyframes scrollHorizontal {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(calc(-300px * 6 - 1.5rem * 6));
    }
  }

  @media (min-width: 640px) {
    @keyframes scrollHorizontal {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(calc(-340px * 6 - 1.5rem * 6));
      }
    }
  }

  @media (min-width: 1024px) {
    @keyframes scrollHorizontal {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(calc(-360px * 6 - 1.5rem * 6));
      }
    }
  }

  .scroll-wrapper {
    overflow-x: auto;
    overflow-y: hidden;
    scroll-behavior: smooth;
    width: 100%;
    -webkit-overflow-scrolling: touch;
  }

  .scroll-wrapper::-webkit-scrollbar {
    display: none;
  }

  .scroll-wrapper {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .scroll-container {
    display: flex;
    gap: 1.5rem;
    width: fit-content;
    padding: 1rem 0;
    animation: scrollHorizontal 40s linear infinite;
  }

  .scroll-container:hover {
    animation-play-state: paused;
  }

  .scroll-card {
    flex: 0 0 auto;
    width: 280px;
  }

  @media (min-width: 640px) {
    .scroll-card {
      width: 320px;
    }
  }

  @media (min-width: 1024px) {
    .scroll-card {
      width: 360px;
    }
  }
`;

export default function Skills() {
  const { theme, isDarkMode } = useTheme();

  const { ref: headerRef, isVisible: headerVisible } = useIntersectionObserver();
  const { ref: gridRef, isVisible: gridVisible } = useIntersectionObserver();
  const { ref: profRef, isVisible: profVisible } = useIntersectionObserver();

  const skillCategories = [
    {
      category: 'Frontend',
      icon: FaReact,
      skills: ['React', 'React Native', 'Tailwind CSS', 'Next.js', 'Redux', 'HTML/CSS', 'TypeScript', 'Vite'],
    },
    {
      category: 'Backend',
      icon: FaServer,
      skills: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'FastAPI', 'REST APIs', 'Auth/JWT'],
    },
    {
      category: 'AR & Game Dev',
      icon: FaGamepad,
      skills: ['Unity', 'AR Foundation', 'Vuforia', 'C#', 'WebXR', 'Three.js', 'Physics Engine'],
    },
    {
      category: 'AI / ML',
      icon: FaBrain,
      skills: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenCV', 'NLP', 'Computer Vision'],
    },
    {
      category: 'Tools & DevOps',
      icon: FaTools,
      skills: ['Git', 'Docker', 'Firebase', 'AWS', 'Postman', 'Linux', 'VS Code'],
    },
    {
      category: 'Soft Skills',
      icon: FaLightbulb,
      skills: ['Problem Solving', 'Collaboration', 'Communication', 'Project Mgmt', 'Adaptability'],
    },
  ];

  const primaryColor = '#8b5cf6';
  const primaryColorRgb = '139, 92, 246';

  const proficiencies = [
    { level: 'Expert', percent: 85, desc: 'React, Node.js, Unity' },
    { level: 'Proficient', percent: 75, desc: 'Python, AR/VR, DevOps' },
    { level: 'Familiar', percent: 60, desc: 'ML/AI, Cloud Services' },
  ];

  const sectionBg = isDarkMode ? { background: '#0f0c19' } : { background: '#faf8ff' };

  return (
    <div style={sectionBg}>
      <style>{scrollAnimationStyle}</style>

      {/* ── Section Header ── */}
      <div
        ref={headerRef}
        className={`max-w-7xl mx-auto px-4 md:px-6 pt-16 md:pt-22 pb-12 md:pb-20 transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <span className="section-label">2.Expertise</span>
        <h2 className="section-title mt-3">My Skills</h2>
        <p className="section-desc mt-4 max-w-2xl text-sm md:text-base" style={{ color: theme.colors.secondary }}>
          A comprehensive toolkit developed through education and hands-on project experience
        </p>
      </div>

      {/* ── Skills Scroll Section ── */}
      <div ref={gridRef} className="max-w-7xl mx-auto px-2 md:px-4 pb-16 md:pb-22">
        <div className="scroll-wrapper">
          <div className="scroll-container">
            {[...skillCategories, ...skillCategories].map((cat, idx) => {
              const IconComponent = cat.icon;
              const gradientAngle = (idx % skillCategories.length * 60) % 360;
              return (
                <div key={idx} className="scroll-card">
                  <SkillCard
                    cat={cat}
                    idx={idx}
                    IconComponent={IconComponent}
                    gradientAngle={gradientAngle}
                    gridVisible={gridVisible}
                    theme={theme}
                    isDarkMode={isDarkMode}
                    primaryColor={primaryColor}
                    primaryColorRgb={primaryColorRgb}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Divider ── */}
      <div
        className="max-w-7xl mx-auto px-4 md:px-6"
        style={{ height: '1px', background: isDarkMode ? 'rgba(123,92,170,0.12)' : 'rgba(123,92,170,0.1)' }}
      />
      
    </div>
  );
}

function SkillCard({ cat, idx, IconComponent, gradientAngle, gridVisible, theme, isDarkMode, primaryColor, primaryColorRgb }) {
  return (
    <div
      className={`group h-full p-4 md:p-6 lg:p-8 rounded-xl md:rounded-2xl cursor-pointer transition-all duration-200 transform hover:shadow-xl ${gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{
        transitionDelay: `${80 * idx}ms`,
        background: isDarkMode 
          ? `linear-gradient(${120 + gradientAngle}deg, rgba(${primaryColorRgb},0.12) 0%, rgba(${primaryColorRgb},0.05) 50%, rgba(${primaryColorRgb},0.08) 100%)`
          : `linear-gradient(${120 + gradientAngle}deg, rgba(${primaryColorRgb},0.08) 0%, rgba(${primaryColorRgb},0.03) 50%, rgba(${primaryColorRgb},0.06) 100%)`,
        border: `1.5px solid rgba(${primaryColorRgb},${isDarkMode ? '0.25' : '0.18'})`,
        backdropFilter: 'blur(10px)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
        e.currentTarget.style.borderColor = `rgba(${primaryColorRgb},0.45)`;
        e.currentTarget.style.boxShadow = `0 20px 60px rgba(${primaryColorRgb},${isDarkMode ? '0.18' : '0.22'})`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.borderColor = `rgba(${primaryColorRgb},${isDarkMode ? '0.25' : '0.18'})`;
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Card header with icon */}
      <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
        <div
          className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-lg md:rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
          style={{
            background: isDarkMode 
              ? `linear-gradient(135deg, rgba(${primaryColorRgb},0.28) 0%, rgba(${primaryColorRgb},0.14) 100%)`
              : `linear-gradient(135deg, rgba(${primaryColorRgb},0.18) 0%, rgba(${primaryColorRgb},0.1) 100%)`,
            border: `2px solid rgba(${primaryColorRgb},${isDarkMode ? '0.35' : '0.25'})`,
          }}
        >
          <IconComponent 
            size={typeof window !== 'undefined' && window.innerWidth < 768 ? 20 : 28} 
            color={isDarkMode ? '#a78bfa' : primaryColor}
          />
        </div>
        <h3 className="text-base md:text-lg font-bold transition-all duration-300" style={{ color: theme.colors.text }}>
          {cat.category}
        </h3>
      </div>

      {/* Skill pills */}
      <div className="flex flex-wrap gap-1.5 md:gap-2">
        {cat.skills.map((skill, sIdx) => (
          <span
            key={sIdx}
            className="px-2 md:px-3 py-1 md:py-1.5 rounded-lg text-xs md:text-xs font-medium transition-all duration-300 hover:translate-y-0.5 whitespace-nowrap"
            style={{
              background: isDarkMode 
                ? `rgba(${primaryColorRgb},0.16)`
                : `rgba(${primaryColorRgb},0.09)`,
              border: `1px solid rgba(${primaryColorRgb},${isDarkMode ? '0.32' : '0.22'})`,
              color: isDarkMode ? '#a78bfa' : primaryColor,
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
