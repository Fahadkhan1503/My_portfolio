import { useTheme } from '../context/ThemeContext';

export default function About() {
  const { theme } = useTheme();

  const achievements = [
    { label: 'CGPA', value: '3.55' },
    { label: 'Internships', value: '1' },
    { label: 'Projects', value: '10+' },
  ];

  return (
    <>
      {/* Story Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="animate-scale-in">
            <div className="w-full aspect-square rounded-2xl overflow-hidden"
              style={{ backgroundColor: theme.colors.surface, border: `2px solid ${theme.colors.border}` }}>
              <div className="w-full h-full bg-linear-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl font-bold mb-2" style={{ color: theme.colors.primary }}>👨‍💻</div>
                  <p style={{ color: theme.colors.secondary }}>Photo placeholder</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="space-y-6 animate-fadeup" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-4xl font-bold">My Journey</h2>
              <p className="text-lg leading-relaxed" style={{ color: theme.colors.secondary }}>
                I'm a Computer Science graduate from Iqra University with a CGPA of 3.55. My passion lies in building scalable web applications, AR/VR experiences, and AI-powered solutions that solve real-world problems.
              </p>
              <p className="text-lg leading-relaxed" style={{ color: theme.colors.secondary }}>
                During my studies, I interned at 10Pearls, where I worked on full-stack development projects. This experience shaped my approach to clean code and user-centric design.
              </p>
              <p className="text-lg leading-relaxed" style={{ color: theme.colors.secondary }}>
                I'm currently seeking entry-level roles in software development, where I can contribute my technical skills and learn from experienced professionals.
              </p>

              <div className="grid grid-cols-3 gap-8 pt-8 border-t" style={{ borderColor: theme.colors.border }}>
                {achievements.map((item, idx) => (
                  <div key={idx} className="text-center animate-slide-down"
                    style={{ animationDelay: `${0.3 + idx * 0.1}s` }}>
                    <div className="text-3xl font-bold mb-2" style={{ color: theme.colors.primary }}>
                      {item.value}
                    </div>
                    <p className="text-sm uppercase tracking-wider" style={{ color: theme.colors.secondary }}>
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">What I Value</h2>
          <p className="text-lg" style={{ color: theme.colors.secondary }}>
            Principles that guide my work and development philosophy
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Clean Code', desc: 'Writing maintainable, readable code that stands the test of time' },
            { title: 'User Focus', desc: 'Building solutions that solve real problems and delight users' },
            { title: 'Continuous Learning', desc: 'Always exploring new technologies and best practices' },
          ].map((value, idx) => (
            <div key={idx}
              className="p-8 rounded-2xl border-2 animate-scale-in hover:shadow-lg transition-all duration-300"
              style={{
                borderColor: theme.colors.border,
                backgroundColor: theme.colors.surface,
                animationDelay: `${0.1 * idx}s`,
              }}>
              <h3 className="text-xl font-bold mb-4">{value.title}</h3>
              <p style={{ color: theme.colors.secondary }}>{value.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
