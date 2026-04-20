import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import ProjectCard from '../components/ProjectCard';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { getAllProjects } from '../services/projectService';

export default function Projects() {
  const { theme, isDarkMode } = useTheme();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const sectionBg = isDarkMode ? { background: '#0f0c19' } : { background: '#faf8ff' };

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
        className={`max-w-7xl mx-auto px-6 pt-22 pb-20 transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <span className="section-label">Featured Work</span>
        <h2 className="section-title mt-3">Projects</h2>
        <p className="section-desc mt-4 max-w-2xl" style={{ color: theme.colors.secondary }}>
          A selection of things I've built — each representing my commitment to quality and innovation
        </p>
      </div>

      {/* ── Stats Row ── */}
      {/* <div ref={statsRef} className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-5 p-6 rounded-2xl transition-all duration-700 ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{
                transitionDelay: `${100 * idx}ms`,
                background: isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.8)',
                border: `1.5px solid ${isDarkMode ? 'rgba(123,92,170,0.18)' : 'rgba(123,92,170,0.12)'}`,
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0"
                style={{
                  background: isDarkMode ? 'rgba(123,92,170,0.15)' : 'rgba(123,92,170,0.08)',
                  border: `1px solid ${isDarkMode ? 'rgba(123,92,170,0.25)' : 'rgba(123,92,170,0.15)'}`,
                }}
              >
                {stat.icon}
              </div>
              <div>
                <div className="text-2xl font-bold" style={{ color: '#7b5caa' }}>{stat.value}</div>
                <p className="text-sm" style={{ color: theme.colors.secondary }}>{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div> */}

      {/* ── Projects Grid ── */}
      <div ref={gridRef} className="max-w-7xl mx-auto px-6 pb-32">
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
                key={project.id}
                className={`transition-all duration-700 ${gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${80 * idx}ms` }}
              >
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  tags={project.tags}
                  image={project.image}
                  githubUrl={project.githubUrl}
                  deployUrl={project.link}
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
      <div ref={ctaRef} className="max-w-7xl mx-auto px-6 py-32">
        <div
          className={`rounded-3xl p-12 md:p-16 text-center transition-all duration-700 ${ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{
            background: isDarkMode
              ? 'linear-gradient(135deg, rgba(91,60,138,0.25) 0%, rgba(123,92,170,0.1) 100%)'
              : 'linear-gradient(135deg, rgba(123,92,170,0.08) 0%, rgba(187,156,222,0.06) 100%)',
            border: `1.5px solid ${isDarkMode ? 'rgba(123,92,170,0.25)' : 'rgba(123,92,170,0.15)'}`,
          }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: theme.colors.text }}>
            Want to see more?
          </h2>
          <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color: theme.colors.secondary }}>
            Check out my GitHub for more projects and open-source contributions.
          </p>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2"
          >
            Visit GitHub
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}


// import { useTheme } from '../context/ThemeContext';
// import ProjectCard from '../components/ProjectCard';
// import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

// export default function Projects() {
//   const { theme, isDarkMode } = useTheme();
//   const { ref: statsRef, isVisible: statsVisible } = useIntersectionObserver();
//   const { ref: gridRef, isVisible: gridVisible } = useIntersectionObserver();
//   const { ref: ctaRef, isVisible: ctaVisible } = useIntersectionObserver();

//   const sectionBg = isDarkMode
//     ? {
//         background: '#0f0c18',
//         backgroundImage: `
//           radial-gradient(ellipse 120% 60% at 50% 0%, rgba(123,92,170,0.25) 0%, transparent 50%),
//           radial-gradient(ellipse 100% 80% at 0% 100%, rgba(187,156,222,0.15) 0%, transparent 60%)
//         `,
//       }
//     : {
//         background: '#faf8ff',
//         backgroundImage: `
//           radial-gradient(ellipse 120% 60% at 50% 0%, rgba(123,92,170,0.12) 0%, transparent 50%),
//           radial-gradient(ellipse 100% 80% at 0% 100%, rgba(187,156,222,0.10) 0%, transparent 60%)
//         `,
//       };

//   const projects = [
//     {
//       id: 1,
//       title: 'E-Commerce Platform',
//       description: 'A full-stack e-commerce platform built with React and Node.js featuring product management, user authentication, and payment integration.',
//       tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
//       githubUrl: 'https://github.com',
//       deployUrl: 'https://example.com',
//     },
//     {
//       id: 2,
//       title: 'AR Navigation System',
//       description: 'Real-time AR navigation app using AR Foundation and Unity for indoor wayfinding in medical facilities.',
//       tags: ['Unity', 'AR Foundation', 'C#', 'ARKit'],
//       githubUrl: 'https://github.com',
//       deployUrl: 'https://example.com',
//     },
//     {
//       id: 3,
//       title: 'AI Chatbot Platform',
//       description: 'Intelligent chatbot powered by machine learning algorithms with natural language processing capabilities.',
//       tags: ['Python', 'TensorFlow', 'FastAPI', 'React'],
//       githubUrl: 'https://github.com',
//       deployUrl: 'https://example.com',
//     },
//     {
//       id: 4,
//       title: 'Task Management App',
//       description: 'Real-time task management application with collaboration features, live updates, and team analytics.',
//       tags: ['React', 'Firebase', 'Tailwind', 'Redux'],
//       githubUrl: 'https://github.com',
//       deployUrl: 'https://example.com',
//     },
//     {
//       id: 5,
//       title: 'Medical Image Analysis',
//       description: 'ML model for analyzing medical images with 98% accuracy using computer vision techniques.',
//       tags: ['Python', 'OpenCV', 'TensorFlow', 'PyTorch'],
//       githubUrl: 'https://github.com',
//       deployUrl: 'https://example.com',
//     },
//     {
//       id: 6,
//       title: 'VR Gaming Environment',
//       description: 'Immersive VR gaming environment built with Unity featuring physics-based interactions.',
//       tags: ['Unity', 'C#', 'VR', 'Oculus SDK'],
//       githubUrl: 'https://github.com',
//       deployUrl: 'https://example.com',
//     },
//   ];

//   const stats = [
//     { label: 'Total Projects', value: '10+' },
//     { label: 'Open Source', value: '5+' },
//     { label: 'Successfully Deployed', value: '8+' },
//   ];

//   return (
//     <>
//       {/* Section Header */}
//       <section className="max-w-7xl mx-auto px-6 pt-32 pb-8">
//         <span className="section-label">Featured Work</span>
//         <h2 className="section-title">Projects</h2>
//         <p className="section-desc max-w-2xl" style={{ color: theme.colors.secondary }}>
//           A selection of things I've built - each representing my commitment to quality and innovation
//         </p>
//       </section>

//       {/* Stats with Background */}
//       <section style={sectionBg} className="w-full relative py-24 overflow-x-hidden">
//         <div ref={statsRef} className="max-w-7xl mx-auto px-6">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {stats.map((stat, idx) => (
//               <div key={idx} className={`text-center ${statsVisible ? 'animate-in-bottom' : 'opacity-0'}`} style={{ animationDelay: `${0.1 * (idx + 1)}s` }}>
//                 <div className="text-4xl font-bold mb-2" style={{ color: theme.colors.primary }}>
//                   {stat.value}
//                 </div>
//                 <p style={{ color: theme.colors.secondary }} className="text-sm uppercase tracking-wider">
//                   {stat.label}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Projects Grid with Background */}
//       <section style={sectionBg} className="w-full relative py-24 overflow-x-hidden">
//         <div ref={gridRef} className="max-w-7xl mx-auto px-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {projects.map((project, idx) => (
//               <div key={project.id} className={`${gridVisible ? 'animate-in-bottom' : 'opacity-0'}`} style={{ animationDelay: `${0.08 * (idx + 1)}s` }}>
//                 <ProjectCard
//                   title={project.title}
//                   description={project.description}
//                   tags={project.tags}
//                   githubUrl={project.githubUrl}
//                   deployUrl={project.deployUrl}
//                   isAdmin={false}
//                 />
//               </div>
//             ))}
//         </div>
//         </div>
//       </section>

//       {/* CTA Section with Background */}
//       <section style={sectionBg} className="w-full relative py-24 overflow-x-hidden">
//         <div ref={ctaRef} className="max-w-7xl mx-auto px-6">
//           <div className={`p-12 rounded-2xl text-center border-2 transition-all duration-500 cursor-pointer ${ctaVisible ? 'animate-in-bottom' : 'opacity-0'}`}
//             style={{
//               backgroundColor: theme.colors.surface,
//               borderColor: theme.colors.border,
//               transform: 'translateY(0)',
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.transform = 'translateY(-4px)';
//               e.currentTarget.style.boxShadow = `0 20px 40px rgba(123,92,170,0.15)`;
//               e.currentTarget.style.borderColor = '#7b5caa';
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.transform = 'translateY(0)';
//               e.currentTarget.style.boxShadow = 'none';
//               e.currentTarget.style.borderColor = theme.colors.border;
//             }}>
//             <h2 className="text-3xl md:text-4xl font-bold mb-6">Want to see more?</h2>
//             <p style={{ color: theme.colors.secondary }} className="text-lg mb-8 max-w-2xl mx-auto">
//               Check out my GitHub repository for more projects and contributions to the open-source community.
//           </p>
//           <a href="https://github.com" target="_blank" rel="noopener noreferrer"
//             className="inline-block px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg"
//             style={{ 
//               backgroundColor: theme.colors.primary, 
//               color: 'white',
//               boxShadow: '0 4px 12px rgba(123,92,170,0.15)',
//             }}
//             onMouseEnter={(e) => {
//               e.target.style.transform = 'translateY(-3px)';
//               e.target.style.boxShadow = '0 8px 24px rgba(123,92,170,0.25)';
//             }}
//             onMouseLeave={(e) => {
//               e.target.style.transform = 'translateY(0)';
//               e.target.style.boxShadow = '0 4px 12px rgba(123,92,170,0.15)';
//             }}>
//             Visit GitHub →
//           </a>
//           </div>
//         </div>
        
//       </section>
//     </>
//   );
// }
