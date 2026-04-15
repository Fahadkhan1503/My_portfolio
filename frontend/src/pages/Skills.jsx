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
      category: 'AR/VR & Game Dev',
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
        className={`max-w-7xl mx-auto px-6 pt-32 pb-20 transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <span className="section-label">Expertise</span>
        <h2 className="section-title mt-3">My Skills</h2>
        <p className="section-desc mt-4 max-w-2xl" style={{ color: theme.colors.secondary }}>
          A comprehensive toolkit developed through education and hands-on project experience
        </p>
      </div>

      {/* ── Skills Grid ── */}
      <div ref={gridRef} className="max-w-7xl mx-auto px-6 pb-32">
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

      {/* ── Proficiency Levels ── */}
      <div ref={profRef} className="max-w-7xl mx-auto px-6 py-32">
        <div
          className={`text-center mb-16 transition-all duration-700 ${profVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <h2 className="section-title">Proficiency Levels</h2>
          <p className="mt-4 text-lg" style={{ color: theme.colors.secondary }}>
            Honest breakdown of where I stand
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {proficiencies.map((prof, idx) => (
            <div
              key={idx}
              className={`transition-all duration-700 ${profVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${120 * idx}ms` }}
            >
              <div
                className="p-8 rounded-2xl text-center"
                style={{
                  background: isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.8)',
                  border: `1.5px solid ${isDarkMode ? 'rgba(123,92,170,0.18)' : 'rgba(123,92,170,0.12)'}`,
                }}
              >
                {/* SVG circle */}
                <div className="relative w-28 h-28 mx-auto mb-6">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                    <circle
                      cx="60" cy="60" r="50"
                      fill="none"
                      stroke={isDarkMode ? 'rgba(123,92,170,0.15)' : 'rgba(123,92,170,0.1)'}
                      strokeWidth="8"
                    />
                    <circle
                      cx="60" cy="60" r="50"
                      fill="none"
                      stroke="#7b5caa"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${(prof.percent / 100) * 314.16} 314.16`}
                      style={{ transition: 'stroke-dasharray 1.2s ease' }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold" style={{ color: theme.colors.text }}>
                      {prof.percent}%
                    </span>
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: theme.colors.text }}>
                  {prof.level}
                </h3>
                <p className="text-sm" style={{ color: theme.colors.secondary }}>
                  {prof.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


// import { useTheme } from '../context/ThemeContext';
// import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

// export default function Skills() {
//   const { theme, isDarkMode } = useTheme();
//   const { ref: gridRef, isVisible: gridVisible } = useIntersectionObserver();
//   const { ref: profRef, isVisible: profVisible } = useIntersectionObserver();

//   const skillCategories = [
//     {
//       category: 'Frontend',
//       skills: ['React', 'React Native', 'Tailwind CSS', 'Next.js', 'Redux', 'HTML/CSS', 'JavaScript/TypeScript', 'Vite'],
//     },
//     {
//       category: 'Backend',
//       skills: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'FastAPI', 'RESTful APIs', 'Authentication', 'JWT'],
//     },
//     {
//       category: 'AR/VR & Game Dev',
//       skills: ['Unity', 'AR Foundation', 'Vuforia', 'C#', 'WebXR', 'Three.js', 'Game Design', 'Physics Engine'],
//     },
//     {
//       category: 'AI/ML',
//       skills: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenCV', 'NLP', 'Computer Vision', 'Data Analysis'],
//     },
//     {
//       category: 'Tools & DevOps',
//       skills: ['Git', 'Docker', 'Firebase', 'AWS', 'Postman', 'Linux', 'npm/yarn', 'VS Code'],
//     },
//     {
//       category: 'Soft Skills',
//       skills: ['Problem Solving', 'Team Collaboration', 'Communication', 'Project Management', 'Mentoring', 'Adaptability'],
//     },
//   ];

//   const proficiencies = [
//     { level: 'Expert', percent: 85 },
//     { level: 'Proficient', percent: 75 },
//     { level: 'Familiar', percent: 60 },
//   ];

//   const categoryIcons = {
//     'Frontend': '🎨',
//     'Backend': '⚙️',
//     'AR/VR & Game Dev': '🎮',
//     'AI/ML': '🤖',
//     'Tools & DevOps': '🛠️',
//     'Soft Skills': '💡',
//   };

//   const sectionBg = isDarkMode
//     ? {
//         background: '#0f0c18',
//         backgroundImage: `
//           radial-gradient(ellipse 120% 60% at 20% 80%, rgba(123,92,170,0.25) 0%, transparent 50%),
//           radial-gradient(ellipse 100% 80% at 80% 20%, rgba(187,156,222,0.15) 0%, transparent 60%)
//         `,
//       }
//     : {
//         background: '#faf8ff',
//         backgroundImage: `
//           radial-gradient(ellipse 120% 60% at 20% 80%, rgba(123,92,170,0.12) 0%, transparent 50%),
//           radial-gradient(ellipse 100% 80% at 80% 20%, rgba(187,156,222,0.10) 0%, transparent 60%)
//         `,
//       };

//   return (
//     <>
//       {/* Section Header */}
//       <section className="max-w-7xl mx-auto px-6 pt-32 pb-8">
//         <span className="section-label">Expertise</span>
//         <h2 className="section-title">My Skills</h2>
//         <p className="section-desc max-w-2xl" style={{ color: theme.colors.secondary }}>
//           A comprehensive toolkit developed through education and hands-on project experience
//         </p>
//       </section>

//       {/* Skills Grid with Background */}
//       <section style={sectionBg} className="w-full relative py-24 overflow-x-hidden">
//         <div ref={gridRef} className="max-w-7xl mx-auto px-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {skillCategories.map((category, idx) => (
//             <div
//               key={idx}
//               className={`p-8 rounded-2xl border-2 transition-all duration-500 group cursor-pointer ${gridVisible ? 'animate-in-bottom' : 'opacity-0'}`}
//               style={{
//                 borderColor: theme.colors.border,
//                 backgroundColor: theme.colors.surface,
//                 animationDelay: `${0.1 * (idx + 1)}s`,
//                 transform: 'translateY(0)',
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.transform = 'translateY(-8px)';
//                 e.currentTarget.style.boxShadow = `0 20px 40px rgba(123,92,170,0.15)`;
//                 e.currentTarget.style.borderColor = '#7b5caa';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.transform = 'translateY(0)';
//                 e.currentTarget.style.boxShadow = 'none';
//                 e.currentTarget.style.borderColor = theme.colors.border;
//               }}
//             >
//               <div className="text-3xl mb-3">{categoryIcons[category.category]}</div>
//               <h3 className="text-2xl font-bold mb-6" style={{ color: theme.colors.primary }}>
//                 {category.category}
//               </h3>
//               <div className="flex flex-wrap gap-3">
//                 {category.skills.map((skill, skillIdx) => (
//                   <span
//                     key={skillIdx}
//                     className="px-4 py-2 rounded-lg text-sm font-medium border-2 transition-all duration-300 hover:shadow-md hover:scale-105 animate-fadeup"
//                     style={{
//                       borderColor: theme.colors.primary,
//                       color: theme.colors.primary,
//                       backgroundColor: `${theme.colors.primary}15`,
//                       animationDelay: `${0.05 * skillIdx}s`,
//                     }}
//                   >
//                     {skill}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//         </div>
//       </section>

//       {/* Proficiency Levels with Background */}
//       <section style={sectionBg} className="w-full relative py-24 overflow-x-hidden">
//         <div ref={profRef} className="max-w-7xl mx-auto px-6">
//           <h2 className="section-title mb-12 text-center">Proficiency Levels</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
//             {proficiencies.map((prof, idx) => (
//               <div key={idx} className={`text-center ${profVisible ? 'animate-in-bottom' : 'opacity-0'}`} 
//                 style={{ animationDelay: `${0.1 * (idx + 1)}s` }}>
//                 <div className="relative w-32 h-32 mx-auto mb-6">
//                   <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
//                     <circle cx="60" cy="60" r="54" stroke={theme.colors.border} strokeWidth="8" fill="none" />
//                     <circle
//                       cx="60" cy="60" r="54"
//                       stroke={theme.colors.primary}
//                       strokeWidth="8"
//                       fill="none"
//                       strokeDasharray={`${prof.percent * 3.4} 360`}
//                       className="transition-all duration-1000"
//                     />
//                   </svg>
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <span className="text-3xl font-bold">{prof.percent}%</span>
//                   </div>
//                 </div>
//                 <h3 className="text-xl font-bold">{prof.level}</h3>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

      
//     </>
//   );
// }
