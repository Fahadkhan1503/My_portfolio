import { useTheme } from '../context/ThemeContext';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export default function Skills() {
  const { theme, isDarkMode } = useTheme();

  const { ref: headerRef, isVisible: headerVisible } = useIntersectionObserver();
  const { ref: gridRef, isVisible: gridVisible } = useIntersectionObserver();
  const { ref: profRef, isVisible: profVisible } = useIntersectionObserver();

  const skillCategories = [
    {
      category: 'Frontend',
      icon: '🎨',
      skills: ['React', 'React Native', 'Tailwind CSS', 'Next.js', 'Redux', 'HTML/CSS', 'TypeScript', 'Vite'],
    },
    {
      category: 'Backend',
      icon: '⚙️',
      skills: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'FastAPI', 'REST APIs', 'Auth/JWT'],
    },
    {
      category: 'AR & Game Dev',
      icon: '🎮',
      skills: ['Unity', 'AR Foundation', 'Vuforia', 'C#', 'WebXR', 'Three.js', 'Physics Engine'],
    },
    {
      category: 'AI / ML',
      icon: '🤖',
      skills: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenCV', 'NLP', 'Computer Vision'],
    },
    {
      category: 'Tools & DevOps',
      icon: '🛠️',
      skills: ['Git', 'Docker', 'Firebase', 'AWS', 'Postman', 'Linux', 'VS Code'],
    },
    {
      category: 'Soft Skills',
      icon: '💡',
      skills: ['Problem Solving', 'Collaboration', 'Communication', 'Project Mgmt', 'Adaptability'],
    },
  ];

  const proficiencies = [
    { level: 'Expert', percent: 85, desc: 'React, Node.js, Unity' },
    { level: 'Proficient', percent: 75, desc: 'Python, AR/VR, DevOps' },
    { level: 'Familiar', percent: 60, desc: 'ML/AI, Cloud Services' },
  ];

  const sectionBg = isDarkMode ? { background: '#0f0c19' } : { background: '#faf8ff' };

  return (
    <div style={sectionBg}>

      {/* ── Section Header ── */}
      <div
        ref={headerRef}
        className={`max-w-7xl mx-auto px-6 pt-22 pb-20 transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <span className="section-label">Expertise</span>
        <h2 className="section-title mt-3">My Skills</h2>
        <p className="section-desc mt-4 max-w-2xl" style={{ color: theme.colors.secondary }}>
          A comprehensive toolkit developed through education and hands-on project experience
        </p>
      </div>

      {/* ── Skills Grid ── */}
      <div ref={gridRef} className="max-w-7xl mx-auto px-6 pb-22">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, idx) => (
            <div
              key={idx}
              className={`group p-8 rounded-2xl cursor-pointer transition-all duration-700 ${gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{
                transitionDelay: `${80 * idx}ms`,
                background: isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.8)',
                border: `1.5px solid ${isDarkMode ? 'rgba(123,92,170,0.18)' : 'rgba(123,92,170,0.12)'}`,
                backdropFilter: 'blur(8px)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = 'rgba(123,92,170,0.45)';
                e.currentTarget.style.boxShadow = '0 16px 48px rgba(123,92,170,0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = isDarkMode ? 'rgba(123,92,170,0.18)' : 'rgba(123,92,170,0.12)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Card header */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
                  style={{
                    background: isDarkMode ? 'rgba(123,92,170,0.15)' : 'rgba(123,92,170,0.08)',
                    border: `1px solid ${isDarkMode ? 'rgba(123,92,170,0.25)' : 'rgba(123,92,170,0.15)'}`,
                  }}
                >
                  {cat.icon}
                </div>
                <h3 className="text-base font-bold" style={{ color: theme.colors.text }}>
                  {cat.category}
                </h3>
              </div>

              {/* Skill pills */}
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium"
                    style={{
                      background: isDarkMode ? 'rgba(123,92,170,0.12)' : 'rgba(123,92,170,0.07)',
                      border: `1px solid ${isDarkMode ? 'rgba(123,92,170,0.22)' : 'rgba(123,92,170,0.18)'}`,
                      color: isDarkMode ? '#c4a8e8' : '#6a45a0',
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Divider ── */}
      <div
        className="max-w-7xl mx-auto px-6"
        style={{ height: '1px', background: isDarkMode ? 'rgba(123,92,170,0.12)' : 'rgba(123,92,170,0.1)' }}
      />
      
    </div>
  );
}
