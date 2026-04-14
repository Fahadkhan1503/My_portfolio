import { useTheme } from '../context/ThemeContext';
import ProjectCard from '../components/ProjectCard';

export default function Projects() {
  const { theme } = useTheme();

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce platform built with React and Node.js featuring product management, user authentication, and payment integration.',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      githubUrl: 'https://github.com',
      deployUrl: 'https://example.com',
    },
    {
      id: 2,
      title: 'AR Navigation System',
      description: 'Real-time AR navigation app using AR Foundation and Unity for indoor wayfinding in medical facilities.',
      tags: ['Unity', 'AR Foundation', 'C#', 'ARKit'],
      githubUrl: 'https://github.com',
      deployUrl: 'https://example.com',
    },
    {
      id: 3,
      title: 'AI Chatbot Platform',
      description: 'Intelligent chatbot powered by machine learning algorithms with natural language processing capabilities.',
      tags: ['Python', 'TensorFlow', 'FastAPI', 'React'],
      githubUrl: 'https://github.com',
      deployUrl: 'https://example.com',
    },
    {
      id: 4,
      title: 'Task Management App',
      description: 'Real-time task management application with collaboration features, live updates, and team analytics.',
      tags: ['React', 'Firebase', 'Tailwind', 'Redux'],
      githubUrl: 'https://github.com',
      deployUrl: 'https://example.com',
    },
    {
      id: 5,
      title: 'Medical Image Analysis',
      description: 'ML model for analyzing medical images with 98% accuracy using computer vision techniques.',
      tags: ['Python', 'OpenCV', 'TensorFlow', 'PyTorch'],
      githubUrl: 'https://github.com',
      deployUrl: 'https://example.com',
    },
    {
      id: 6,
      title: 'VR Gaming Environment',
      description: 'Immersive VR gaming environment built with Unity featuring physics-based interactions.',
      tags: ['Unity', 'C#', 'VR', 'Oculus SDK'],
      githubUrl: 'https://github.com',
      deployUrl: 'https://example.com',
    },
  ];

  const stats = [
    { label: 'Total Projects', value: '10+' },
    { label: 'Open Source', value: '5+' },
    { label: 'Successfully Deployed', value: '8+' },
  ];

  return (
    <>
      {/* Section Header */}
      <section className="max-w-7xl mx-auto px-6 pt-32 pb-8">
        <span className="section-label">Featured Work</span>
        <h2 className="section-title">Projects</h2>
        <p className="section-desc max-w-2xl" style={{ color: theme.colors.secondary }}>
          A selection of things I've built - each representing my commitment to quality and innovation
        </p>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center animate-scale-in" style={{ animationDelay: `${0.1 * idx}s` }}>
              <div className="text-4xl font-bold mb-2" style={{ color: theme.colors.primary }}>
                {stat.value}
              </div>
              <p style={{ color: theme.colors.secondary }} className="text-sm uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <div key={project.id} className="animate-scale-in" style={{ animationDelay: `${0.08 * idx}s` }}>
              <ProjectCard
                title={project.title}
                description={project.description}
                tags={project.tags}
                githubUrl={project.githubUrl}
                deployUrl={project.deployUrl}
                isAdmin={false}
              />
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="p-12 rounded-2xl text-center border-2 transition-all duration-500 cursor-pointer"
          style={{
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border,
            transform: 'translateY(0)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = `0 20px 40px rgba(123,92,170,0.15)`;
            e.currentTarget.style.borderColor = '#7b5caa';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.borderColor = theme.colors.border;
          }}>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Want to see more?</h2>
          <p style={{ color: theme.colors.secondary }} className="text-lg mb-8 max-w-2xl mx-auto">
            Check out my GitHub repository for more projects and contributions to the open-source community.
          </p>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer"
            className="inline-block px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg"
            style={{ 
              backgroundColor: theme.colors.primary, 
              color: 'white',
              boxShadow: '0 4px 12px rgba(123,92,170,0.15)',
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-3px)';
              e.target.style.boxShadow = '0 8px 24px rgba(123,92,170,0.25)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 12px rgba(123,92,170,0.15)';
            }}>
            Visit GitHub →
          </a>
        </div>
      </section>
    </>
  );
}
