import { useTheme } from "../context/ThemeContext";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { FaGraduationCap, FaBriefcase, FaCode, FaGlobe   } from 'react-icons/fa';

export default function About() {
  const { theme, isDarkMode } = useTheme();

  const { ref: headerRef, isVisible: headerVisible } =
    useIntersectionObserver();
  const { ref: storyRef, isVisible: storyVisible } = useIntersectionObserver();
  const { ref: valuesRef, isVisible: valuesVisible } =
    useIntersectionObserver();

  const achievements = [
    { label: "CGPA", value: "3.55" },
    { label: "Internships", value: "1" },
    { label: "Projects", value: "10+" },
  ];

  const sectionBg = isDarkMode
    ? { background: "#0f0c19" }
    : { background: "#faf8ff" };

  return (
    <div style={sectionBg}>
      {/* ── Section Header ── */}
      <div
        ref={headerRef}
        className={`max-w-7xl mx-auto px-6 pt-10 pb-5 transition-all duration-700 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <span className="section-label"> 1.About Me</span>
        <h2 className="section-title mt-3 pb-2">My Journey</h2>
        <p
          className="section-desc mt-4 max-w-2xl font-semibold"
          style={{ color: theme.colors.secondary }}
        >
          From passion to profession , my path through technology and continuous
          growth
        </p>
      </div>

      {/* ── Story Section ── */}
      <div ref={storyRef} className="max-w-7xl mx-auto px-6 pb-22">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* left — Text */}
          <div
            className={`transition-all duration-700 delay-200 ${storyVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}
          >
            <div className="space-y-5">
              <p
                className="text-lg leading-relaxed"
                style={{ color: theme.colors.secondary }}
              >
                I'm a Computer Science graduate from Iqra University with a CGPA
                of 3.55. My passion lies in building scalable web applications,
                AR applications, Chatbots and AI-powered solutions that solve
                real-world problems.
              </p>
              <p
                className="text-lg leading-relaxed"
                style={{ color: theme.colors.secondary }}
              >
                During my studies, I interned at{" "}
                <strong style={{ color: theme.colors.text }}>10Pearls</strong>,
                where I worked on full-stack development projects and used sonar qube like applications. This
                experience shaped my approach to code analysis and user-centric
                design.
              </p>
              <p
                className="text-lg leading-relaxed"
                style={{ color: theme.colors.secondary }}
              >
                I'm currently seeking roles in software development,
                where I can contribute my technical skills and learn from
                experienced professionals.
              </p>

              {/* Stats */}
              {/* <div
                className="grid grid-cols-3 gap-6 pt-8 mt-8"
                style={{ borderTop: `1px solid ${isDarkMode ? 'rgba(123,92,170,0.2)' : 'rgba(123,92,170,0.15)'}` }}
              >
                {achievements.map((item, idx) => (
                  <div
                    key={idx}
                    className={`text-center transition-all duration-500 ${storyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                    style={{ transitionDelay: `${300 + idx * 100}ms` }}
                  >
                    <div className="text-3xl font-bold" style={{ color: '#7b5caa' }}>{item.value}</div>
                    <p className="text-xs uppercase tracking-widest mt-1" style={{ color: theme.colors.secondary }}>
                      {item.label}
                    </p>
                  </div>
                ))}
              </div> */}
            </div>
          </div>

          {/* right — Stats Grid (2x2) */}
          <div
            className={`transition-all duration-700 delay-100 ${storyVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}
          >
            <div className="grid grid-cols-2 gap-4 h-full">
              {[
                {
                  value: "3.55",
                  label: "CGPA",
                  desc: "Iqra University",
                  icon: <FaGraduationCap size={20} />,
                },
                {
                  value: "1",
                  label: "Internship",
                  desc: "10Pearls · Full‑stack",
                  icon: <FaBriefcase size={20} />,
                },
                {
                  value: "10+",
                  label: "Projects",
                  desc: "Webapps, chatbot, AR & AI",
                  icon: <FaCode size={20} />,
                },
                {
                  value: "5+",
                  label: "deployments",
                  desc: "Active development work",
                  icon: <FaGlobe  size={20} />
                }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="relative rounded-2xl p-5 flex flex-col justify-between transition-all duration-500 hover:scale-[1.02]"
                  style={{
                    background: isDarkMode
                      ? "rgba(30, 20, 45, 0.6)"
                      : "rgba(255, 255, 255, 0.7)",
                    backdropFilter: "blur(8px)",
                    border: `2.5px solid ${isDarkMode ? "rgba(123,92,170,0.3)" : "rgba(123,92,170,0.2)"}`,
                    boxShadow: isDarkMode
                      ? "0 8px 20px -6px rgba(0,0,0,0.4)"
                      : "0 8px 20px -6px rgba(0,0,0,0.08)",
                    transitionDelay: `${200 + idx * 80}ms`,
                  }}
                >
                  <div>
                    
                    <div
                      className="mb-3 w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{
                        // background: isDarkMode ? "rgba(123,92,170,0.2)" : "rgba(123,92,170,0.1)",
                        background: isDarkMode ? theme.colors.primaryLighter : theme.colors.primaryLight,
                        color: isDarkMode ?  theme.colors.primaryDarker : "#ffffff" ,
                      }}
                    >
                      {item.icon}
                    </div>
                        <div className="flex items-center gap-2 mb-1">
                    <div
                      className="text-3xl font-bold mb-1"
                      style={{ color: theme.colors.primary }}
                    >
                      {item.value}
                      
                    </div>
                    <div
                      className="text-lg uppercase tracking-wider font-medium "
                      style={{ color: theme.colors.text }}
                    >
                      {item.label}
                      </div>
                    </div>
                  </div>
                  <div
                    className="text-xs mt-3 opacity-70"
                    style={{ color: theme.colors.secondary }}
                  >
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Divider ── */}
      <div
        className="max-w-7xl mx-auto px-6"
        style={{
          height: "1px",
          background: isDarkMode
            ? "rgba(123,92,170,0.12)"
            : "rgba(123,92,170,0.1)",
        }}
      />

      {/* ── Values Section ── */}
      {/* <div ref={valuesRef} className="max-w-7xl mx-auto px-6 py-32">
        <div
          className={`text-center mb-16 transition-all duration-700 ${valuesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <h2 className="section-title">What I Value</h2>
          <p className="mt-4 text-lg" style={{ color: theme.colors.secondary }}>
            Principles that guide my work and development philosophy
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Clean Code', desc: 'Writing maintainable, readable code that stands the test of time', icon: '✨' },
            { title: 'User Focus', desc: 'Building solutions that solve real problems and delight users', icon: '🎯' },
            { title: 'Continuous Learning', desc: 'Always exploring new technologies and best practices', icon: '🚀' },
          ].map((value, idx) => (
            <div
              key={idx}
              className={`group p-8 rounded-2xl cursor-pointer transition-all duration-700 ${valuesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{
                transitionDelay: `${100 + idx * 120}ms`,
                background: isDarkMode
                  ? 'rgba(255,255,255,0.03)'
                  : 'rgba(255,255,255,0.8)',
                border: `3px solid ${isDarkMode ? 'rgba(123,92,170,0.18)' : 'rgba(123,92,170,0.12)'}`,
                backdropFilter: 'blur(8px)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = theme.colors.primary;
                e.currentTarget.style.boxShadow = '0 16px 48px rgba(123,92,170,0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = isDarkMode ? 'rgba(123,92,170,0.18)' : 'rgba(123,92,170,0.12)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-6"
                style={{
                  background: isDarkMode ? 'rgba(123,92,170,0.15)' : 'rgba(123,92,170,0.08)',
                  border: `1px solid ${isDarkMode ? 'rgba(123,92,170,0.25)' : 'rgba(123,92,170,0.15)'}`,
                }}
              >
                {value.icon}
              </div>
              <h3 className="text-lg font-bold mb-3" style={{ color: theme.colors.text }}>
                {value.title}
              </h3>
              <p className="leading-relaxed" style={{ color: theme.colors.secondary }}>
                {value.desc}
              </p>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
}
