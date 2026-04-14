import { useTheme } from '../context/ThemeContext';
import Navbar from '../components/Navbar';
import About from './About';
import Skills from './Skills';
import Projects from './Projects';
import Contact from './Contact';

export default function Dashboard() {
  const { theme, isDarkMode } = useTheme();

  const heroBg = isDarkMode
    ? {
        background: '#0d0a14',
        backgroundImage: `
          radial-gradient(ellipse 110% 70% at 0% 110%, rgba(123,92,170,0.32) 0%, transparent 60%),
          radial-gradient(ellipse 75% 60%  at 100% -5%,  rgba(187,156,222,0.18) 0%, transparent 60%),
          radial-gradient(ellipse 50% 45%  at 55% 80%,   rgba(91,60,138,0.20)  0%, transparent 65%)
        `,
      }
    : {
        background: '#f7f4ff',
        backgroundImage: `
          radial-gradient(ellipse 110% 70% at 0% 110%, rgba(123,92,170,0.22) 0%, transparent 60%),
          radial-gradient(ellipse 75% 60%  at 100% -5%,  rgba(187,156,222,0.18) 0%, transparent 60%),
          radial-gradient(ellipse 50% 45%  at 55% 80%,   rgba(91,60,138,0.10)  0%, transparent 65%)
        `,
      };

  return (
    <div style={{ backgroundColor: theme.colors.background, color: theme.colors.text }} className="min-h-screen">
      <style>{`
        html { scroll-behavior: smooth; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Scroll-driven Tailwind utility equivalents */
        .translate-y-0  { transform: translateY(0); }
        .translate-y-4  { transform: translateY(16px); }
        .translate-y-8  { transform: translateY(32px); }
        .translate-y-10 { transform: translateY(40px); }
        .-translate-x-12 { transform: translateX(-48px); }
        .translate-x-0  { transform: translateX(0); }
        .translate-x-12 { transform: translateX(48px); }

        .section-label {
          display: inline-block;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.12em;
          color: #7b5caa;
          text-transform: uppercase;
          padding: 6px 14px;
          background: rgba(123,92,170,0.08);
          border: 1px solid rgba(123,92,170,0.18);
          border-radius: 20px;
        }

        .section-title {
          font-size: clamp(28px, 5vw, 48px);
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -0.02em;
        }

        .section-desc {
          font-size: 17px;
          line-height: 1.7;
        }

        .hero-tag    { animation: fadeUp 0.5s ease both; animation-delay: 0.1s; }
        .hero-title  { animation: fadeUp 0.5s ease both; animation-delay: 0.25s; }
        .hero-sub    { animation: fadeUp 0.5s ease both; animation-delay: 0.4s; }
        .hero-btns   { animation: fadeUp 0.5s ease both; animation-delay: 0.55s; }
        .hero-links  { animation: fadeUp 0.5s ease both; animation-delay: 0.7s; }

        .btn-primary {
          background: #7b5caa;
          color: #fff;
          padding: 12px 28px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 15px;
          text-decoration: none;
          transition: all 0.25s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: 2px solid #7b5caa;
        }
        .btn-primary:hover {
          background: #5b3c8a;
          border-color: #5b3c8a;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(123,92,170,0.28);
        }

        .btn-outline {
          border: 2px solid #7b5caa;
          color: #7b5caa;
          padding: 11px 28px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 15px;
          text-decoration: none;
          transition: all 0.25s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
        }
        .btn-outline:hover {
          background: #7b5caa;
          color: #fff;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(123,92,170,0.25);
        }

        .social-link {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition: transform 0.15s, background 0.2s, box-shadow 0.2s;
          border: 1px solid rgba(123,92,170,0.2);
          background: rgba(123,92,170,0.08);
        }
        .social-link:hover {
          transform: translateY(-2px);
          background: rgba(123,92,170,0.16);
          box-shadow: 0 4px 16px rgba(123,92,170,0.15);
        }

        .stat-item { text-align: center; }
        .stat-num  { font-size: 26px; font-weight: 700; color: #7b5caa; line-height: 1; }
        .stat-lbl  { font-size: 12px; margin-top: 4px; letter-spacing: 0.05em; }

        .availability-dot {
          width: 7px; height: 7px; border-radius: 50%; background: #10b981;
          display: inline-block; margin-right: 6px;
          animation: pulse-dot 2s infinite;
        }
        @keyframes pulse-dot {
          0%   { box-shadow: 0 0 0 0 rgba(16,185,129,0.4); }
          70%  { box-shadow: 0 0 0 6px rgba(16,185,129,0); }
          100% { box-shadow: 0 0 0 0 rgba(16,185,129,0); }
        }

        /* Section dividers between pages */
        .page-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(123,92,170,0.2), transparent);
        }
      `}</style>

      <Navbar showLoginButton={true} />

      {/* ── Hero ── */}
      <section id="hero" style={{ ...heroBg, minHeight: '92vh', display: 'flex', alignItems: 'center' }}>
        <div className="max-w-7xl mx-auto px-6 py-24 w-full">
          <div style={{ maxWidth: '680px' }}>

            {/* Availability badge */}
            <div className="hero-tag" style={{ marginBottom: '24px' }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center',
                background: 'rgba(16,185,129,0.08)',
                border: '1px solid rgba(16,185,129,0.22)',
                borderRadius: '20px', padding: '6px 14px',
                fontSize: '13px', fontWeight: 500,
                color: '#10b981',
              }}>
                <span className="availability-dot" />
                Available for opportunities
              </span>
            </div>

            {/* Greeting + name */}
            <p className="hero-tag" style={{ fontSize: '14px', letterSpacing: '0.1em', color: theme.colors.secondary, marginBottom: '8px', fontWeight: 500, textTransform: 'uppercase' }}>
              Hello, I'm
            </p>
            <h1 className="hero-title" style={{
              fontSize: 'clamp(44px, 7vw, 80px)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: theme.colors.text,
              marginBottom: '16px',
            }}>
              Muhammad Fahad
            </h1>

            {/* Role */}
            <p className="hero-sub" style={{ fontSize: '20px', fontWeight: 600, color: '#7b5caa', marginBottom: '16px' }}>
              Full-Stack Developer &amp; Game Dev
            </p>

            {/* Description */}
            <p className="hero-sub" style={{
              fontSize: '16px', lineHeight: 1.8,
              color: theme.colors.secondary,
              maxWidth: '520px',
              marginBottom: '36px',
            }}>
              CS grad from Iqra University. I build full-stack web apps, AR/VR experiences,
              and ML-powered tools — with a passion for clean code and real-world impact.
            </p>

            <div className="hero-btns" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '40px' }}>
              <a href="/resume.pdf" target="_blank" className="btn-primary">Download CV</a>
              <a href="#contact" className="btn-outline">Get in touch</a>
            </div>

            {/* Social links */}
            <div className="hero-links" style={{ display: 'flex', gap: '10px', marginBottom: '48px' }}>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-link" style={{ color: theme.colors.text }}>
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link" style={{ color: theme.colors.text }}>
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a href="mailto:fahad@example.com" className="social-link" style={{ color: theme.colors.text }}>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>

            {/* Stats */}
            <div className="hero-links" style={{
              display: 'flex', gap: '36px',
              paddingTop: '24px',
              borderTop: `1px solid ${isDarkMode ? 'rgba(123,92,170,0.2)' : 'rgba(123,92,170,0.15)'}`,
            }}>
              <div className="stat-item">
                <div className="stat-num">3.55</div>
                <div className="stat-lbl" style={{ color: theme.colors.secondary }}>CGPA</div>
              </div>
              <div className="stat-item">
                <div className="stat-num">10+</div>
                <div className="stat-lbl" style={{ color: theme.colors.secondary }}>Projects</div>
              </div>
              <div className="stat-item">
                <div className="stat-num">98%</div>
                <div className="stat-lbl" style={{ color: theme.colors.secondary }}>AR Accuracy</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Page Sections — NO max-w or padding here, each page handles its own ── */}
      <div className="page-divider" />
      <section id="about">
        <About />
      </section>

      <div className="page-divider" />
      <section id="skills">
        <Skills />
      </section>

      <div className="page-divider" />
      <section id="projects">
        <Projects />
      </section>

      <div className="page-divider" />
      <section id="contact">
        <Contact />
      </section>

      {/* ── Footer ── */}
      <footer style={{
        backgroundColor: isDarkMode ? '#0a0810' : '#f0ecff',
        borderTop: `1px solid ${isDarkMode ? 'rgba(123,92,170,0.15)' : 'rgba(123,92,170,0.12)'}`,
      }}>
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <span style={{ color: '#7b5caa', fontWeight: 800, fontSize: '20px', letterSpacing: '-0.01em' }}>
            Fahad.
          </span>
          <p style={{ color: theme.colors.secondary, fontSize: '14px' }}>
            &copy; {new Date().getFullYear()} Muhammad Fahad. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            {['GitHub', 'LinkedIn', 'Email'].map((link) => (
              <a
                key={link}
                href={link === 'Email' ? 'mailto:fahad@example.com' : `https://${link.toLowerCase()}.com`}
                target={link !== 'Email' ? '_blank' : undefined}
                rel="noopener noreferrer"
                style={{
                  color: theme.colors.secondary,
                  fontSize: '13px',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => e.target.style.color = '#7b5caa'}
                onMouseLeave={(e) => e.target.style.color = theme.colors.secondary}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

// import { useTheme } from '../context/ThemeContext';
// import Navbar from '../components/Navbar';
// import About from './About';
// import Skills from './Skills';
// import Projects from './Projects';
// import Contact from './Contact';

// export default function Dashboard() {
//   const { theme, isDarkMode } = useTheme();

//   const heroBg = isDarkMode
//     ? {
//         background: '#0d0a14',
//         backgroundImage: `
//           radial-gradient(ellipse 110% 70% at 0% 110%, rgba(123,92,170,0.32) 0%, transparent 60%),
//           radial-gradient(ellipse 75% 60%  at 100% -5%,  rgba(187,156,222,0.18) 0%, transparent 60%),
//           radial-gradient(ellipse 50% 45%  at 55% 80%,   rgba(91,60,138,0.20)  0%, transparent 65%)
//         `,
//       }
//     : {
//         background: '#f7f4ff',
//         backgroundImage: `
//           radial-gradient(ellipse 110% 70% at 0% 110%, rgba(123,92,170,0.22) 0%, transparent 60%),
//           radial-gradient(ellipse 75% 60%  at 100% -5%,  rgba(187,156,222,0.18) 0%, transparent 60%),
//           radial-gradient(ellipse 50% 45%  at 55% 80%,   rgba(91,60,138,0.10)  0%, transparent 65%)
//         `,
//       };

//   return (
//     <div style={{ backgroundColor: theme.colors.background, color: theme.colors.text }} className="min-h-screen">
//       <style>{`
//         html { scroll-behavior: smooth; }
        
//         .section-label {
//           display: inline-block;
//           font-size: 13px;
//           font-weight: 600;
//           letter-spacing: 0.12em;
//           color: #7b5caa;
//           text-transform: uppercase;
//           margin-bottom: 12px;
//           padding: 8px 16px;
//           background: rgba(123,92,170,0.08);
//           border-radius: 20px;
//           animation: fadeUp 0.5s ease both;
//         }
        
//         .section-title {
//           font-size: clamp(28px, 5vw, 48px);
//           font-weight: 800;
//           line-height: 1.2;
//           letter-spacing: -0.01em;
//           animation: fadeUp 0.5s ease both;
//           animation-delay: 0.1s;
//         }
        
//         .section-desc {
//           font-size: 18px;
//           line-height: 1.6;
//           margin-bottom: 40px;
//           animation: fadeUp 0.5s ease both;
//           animation-delay: 0.2s;
//         }
        
//         .hero-tag    { animation: fadeUp 0.5s ease both; animation-delay: 0.1s; }
//         .hero-title  { animation: fadeUp 0.5s ease both; animation-delay: 0.25s; }
//         .hero-sub    { animation: fadeUp 0.5s ease both; animation-delay: 0.4s; }
//         .hero-btns   { animation: fadeUp 0.5s ease both; animation-delay: 0.55s; }
//         .hero-links  { animation: fadeUp 0.5s ease both; animation-delay: 0.7s; }

//         .btn-primary {
//           background: #7b5caa;
//           color: #fff;
//           padding: 12px 28px;
//           border-radius: 10px;
//           font-weight: 600;
//           font-size: 15px;
//           text-decoration: none;
//           transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
//           display: inline-block;
//           box-shadow: 0 4px 12px rgba(123,92,170,0.15);
//           border: 2px solid #7b5caa;
//         }
//         .btn-primary:hover { 
//           background: #5b3c8a; 
//           transform: translateY(-3px);
//           box-shadow: 0 8px 24px rgba(123,92,170,0.25);
//         }

//         .btn-outline {
//           border: 2px solid #7b5caa;
//           color: #7b5caa;
//           padding: 11px 28px;
//           border-radius: 10px;
//           font-weight: 600;
//           font-size: 15px;
//           text-decoration: none;
//           transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
//           display: inline-block;
//           background: transparent;
//         }
//         .btn-outline:hover { 
//           background: #7b5caa;
//           color: #fff;
//           transform: translateY(-3px);
//           box-shadow: 0 8px 24px rgba(123,92,170,0.25);
//         }

//         .social-link {
//           width: 40px;
//           height: 40px;
//           border-radius: 10px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           text-decoration: none;
//           transition: transform 0.15s, background 0.2s;
//         }
//         .social-link:hover { transform: translateY(-2px); }

//         .stat-item { text-align: center; }
//         .stat-num  { font-size: 28px; font-weight: 700; color: #7b5caa; line-height: 1; }
//         .stat-lbl  { font-size: 12px; margin-top: 4px; }

//         .availability-dot {
//           width: 8px; height: 8px; border-radius: 50%; background: #10b981;
//           display: inline-block; margin-right: 6px;
//           box-shadow: 0 0 0 0 rgba(16,185,129,0.4);
//           animation: pulse-dot 2s infinite;
//         }
//         @keyframes pulse-dot {
//           0%   { box-shadow: 0 0 0 0 rgba(16,185,129,0.4); }
//           70%  { box-shadow: 0 0 0 7px rgba(16,185,129,0); }
//           100% { box-shadow: 0 0 0 0 rgba(16,185,129,0); }
//         }
//       `}</style>

//       <Navbar showLoginButton={true} />

//       {/* ── Hero ── */}
//       <section id="hero" style={{ ...heroBg, minHeight: '92vh', display: 'flex', alignItems: 'center' }}>
//         <div className="max-w-7xl mx-auto px-6 py-24 w-full">
//           <div style={{ maxWidth: '680px' }}>

//             {/* availability badge */}
//             <div className="hero-tag" style={{ marginBottom: '24px' }}>
//               <span style={{
//                 display: 'inline-flex', alignItems: 'center',
//                 background: 'rgba(16,185,129,0.1)',
//                 border: '1px solid rgba(16,185,129,0.25)',
//                 borderRadius: '20px', padding: '6px 14px',
//                 fontSize: '13px', fontWeight: 500,
//                 color: '#10b981',
//               }}>
//                 <span className="availability-dot" />
//                 Available for opportunities
//               </span>
//             </div>

//             {/* greeting + name */}
//             <p className="hero-tag" style={{ fontSize: '16px', letterSpacing: '0.08em', color: theme.colors.secondary, marginBottom: '8px', fontWeight: 500 }}>
//               HELLO, I'M
//             </p>
//             <h1 className="hero-title" style={{
//               fontSize: 'clamp(44px, 7vw, 80px)',
//               fontWeight: 800,
//               lineHeight: 1.05,
//               letterSpacing: '-0.02em',
//               color: theme.colors.text,
//               marginBottom: '16px',
//             }}>
//               Muhammad Fahad
//             </h1>

//             {/* role */}
//             <p className="hero-sub" style={{ fontSize: '20px', fontWeight: 600, color: '#7b5caa', marginBottom: '16px' }}>
//               Full-Stack Developer &amp; Game Dev
//             </p>

//             {/* description */}
//             <p className="hero-sub" style={{
//               fontSize: '16px', lineHeight: 1.75,
//               color: theme.colors.secondary,
//               maxWidth: '520px',
//               marginBottom: '36px',
//             }}>
//               CS grad from Iqra University. I build full-stack web apps, AR/VR experiences,
//               and ML-powered tools — with a passion for clean code and real-world impact.
//             </p>

//             <div className="hero-btns" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '40px' }}>
//               <a href="/resume.pdf" target="_blank" className="btn-primary">Download CV</a>
//             </div>

//             {/* social links */}
//             <div className="hero-links" style={{ display: 'flex', gap: '10px', marginBottom: '48px' }}>
//               {/* GitHub */}
//               <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-link"
//                 style={{ background: 'rgba(123,92,170,0.1)', border: '1px solid rgba(123,92,170,0.2)', color: theme.colors.text }}>
//                 <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
//                 </svg>
//               </a>
//               {/* LinkedIn */}
//               <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link"
//                 style={{ background: 'rgba(123,92,170,0.1)', border: '1px solid rgba(123,92,170,0.2)', color: theme.colors.text }}>
//                 <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
//                 </svg>
//               </a>
//               {/* Email */}
//               <a href="mailto:fahad@example.com" className="social-link"
//                 style={{ background: 'rgba(123,92,170,0.1)', border: '1px solid rgba(123,92,170,0.2)', color: theme.colors.text }}>
//                 <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                   <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
//                 </svg>
//               </a>
//             </div>

//             {/* stats */}
//             <div className="hero-links" style={{
//               display: 'flex', gap: '32px',
//               paddingTop: '24px',
//               borderTop: `1px solid ${isDarkMode ? 'rgba(123,92,170,0.2)' : 'rgba(123,92,170,0.15)'}`,
//             }}>
//               <div className="stat-item">
//                 <div className="stat-num">3.55</div>
//                 <div className="stat-lbl" style={{ color: theme.colors.secondary }}>CGPA</div>
//               </div>
//               <div className="stat-item">
//                 <div className="stat-num">10+</div>
//                 <div className="stat-lbl" style={{ color: theme.colors.secondary }}>Projects</div>
//               </div>
//               <div className="stat-item">
//                 <div className="stat-num">98%</div>
//                 <div className="stat-lbl" style={{ color: theme.colors.secondary }}>AR Accuracy</div>
//               </div>
//             </div>

//           </div>
//         </div>
//       </section>

//       {/* ── Page Sections ── */}
//       <section id="about">
//         <About />
//       </section>

//       <section id="skills">
//         <Skills />
//       </section>

//       <section id="projects">
//         <Projects />
//       </section>

//       <section id="contact">
//         <Contact />
//       </section>

//       {/* ── Footer ── */}
//       <footer style={{ backgroundColor: theme.colors.surface, borderTop: `1px solid ${theme.colors.border}`, marginTop: '80px' }}>
//         <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
//           <span style={{ color: '#7b5caa', fontWeight: 700, fontSize: '18px' }}>Fahad.</span>
//           <p style={{ color: theme.colors.secondary, fontSize: '14px' }}>
//             &copy; {new Date().getFullYear()} Muhammad Fahad . All rights reserved.
//           </p>
//           <div style={{ display: 'flex', gap: '16px' }}>
//             <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={{ color: theme.colors.secondary, fontSize: '13px', textDecoration: 'none' }}>GitHub</a>
//             <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: theme.colors.secondary, fontSize: '13px', textDecoration: 'none' }}>LinkedIn</a>
//             <a href="mailto:fahad@example.com" style={{ color: theme.colors.secondary, fontSize: '13px', textDecoration: 'none' }}>Email</a>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

