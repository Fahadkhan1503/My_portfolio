import { useTheme } from '../context/ThemeContext';

export default function Skills() {
  const { theme } = useTheme();

  const skillCategories = [
    {
      category: 'Frontend',
      skills: ['React', 'React Native', 'Tailwind CSS', 'Next.js', 'Redux', 'HTML/CSS', 'JavaScript/TypeScript', 'Vite'],
    },
    {
      category: 'Backend',
      skills: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'FastAPI', 'RESTful APIs', 'Authentication', 'JWT'],
    },
    {
      category: 'AR/VR & Game Dev',
      skills: ['Unity', 'AR Foundation', 'Vuforia', 'C#', 'WebXR', 'Three.js', 'Game Design', 'Physics Engine'],
    },
    {
      category: 'AI/ML',
      skills: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenCV', 'NLP', 'Computer Vision', 'Data Analysis'],
    },
    {
      category: 'Tools & DevOps',
      skills: ['Git', 'Docker', 'Firebase', 'AWS', 'Postman', 'Linux', 'npm/yarn', 'VS Code'],
    },
    {
      category: 'Soft Skills',
      skills: ['Problem Solving', 'Team Collaboration', 'Communication', 'Project Management', 'Mentoring', 'Adaptability'],
    },
  ];

  const proficiencies = [
    { level: 'Expert', percent: 85 },
    { level: 'Proficient', percent: 75 },
    { level: 'Familiar', percent: 60 },
  ];

  return (
    <>
      {/* Skills Grid */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl border-2 animate-scale-in hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              style={{
                borderColor: theme.colors.border,
                backgroundColor: theme.colors.surface,
                animationDelay: `${0.1 * idx}s`,
              }}
            >
              <h3 className="text-2xl font-bold mb-6" style={{ color: theme.colors.primary }}>
                {category.category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, skillIdx) => (
                  <span
                    key={skillIdx}
                    className="px-4 py-2 rounded-lg text-sm font-medium border-2 transition-all duration-300 hover:shadow-md hover:scale-105 animate-fadeup"
                    style={{
                      borderColor: theme.colors.primary,
                      color: theme.colors.primary,
                      backgroundColor: `${theme.colors.primary}15`,
                      animationDelay: `${0.05 * skillIdx}s`,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Proficiency Levels */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold mb-12 text-center">Proficiency Levels</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {proficiencies.map((prof, idx) => (
            <div key={idx} className="text-center animate-fadeup" style={{ animationDelay: `${0.15 * idx}s` }}>
              <div className="relative w-32 h-32 mx-auto mb-6">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="54" stroke={theme.colors.border} strokeWidth="8" fill="none" />
                  <circle
                    cx="60" cy="60" r="54"
                    stroke={theme.colors.primary}
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${prof.percent * 3.4} 360`}
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold">{prof.percent}%</span>
                </div>
              </div>
              <h3 className="text-xl font-bold">{prof.level}</h3>
            </div>
          ))}
        </div>
      </section>

      
    </>
  );
}
