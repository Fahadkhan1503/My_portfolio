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
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-3">Featured Projects</h2>
          <p style={{ color: theme.colors.secondary }}>Each project represents my commitment to quality and innovation</p>
        </div>

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
        <div className="p-12 rounded-2xl text-center border-2"
          style={{
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border,
          }}>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Want to see more?</h2>
          <p style={{ color: theme.colors.secondary }} className="text-lg mb-8 max-w-2xl mx-auto">
            Check out my GitHub repository for more projects and contributions to the open-source community.
          </p>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer"
            className="inline-block px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            style={{ backgroundColor: theme.colors.primary, color: 'white' }}>
            Visit GitHub →
          </a>
        </div>
      </section>
    </>
  );
}
