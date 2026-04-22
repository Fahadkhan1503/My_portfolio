import { useTheme } from '../context/ThemeContext';
import Navbar from '../components/Navbar';
import About from './About';
import Skills from './Skills';
import Projects from './Projects';
import Contact from './Contact';
import ProjectsPage from './ProjectsPage';
import { TypeAnimation } from 'react-type-animation';
import { FaLinkedin, FaGithub } from "react-icons/fa";
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
      }:
   {
  background: '#f6f3ff',
  backgroundImage: `
    radial-gradient(ellipse 80% 65% at 15% 85%, rgba(79,70,229,0.22) 0%, transparent 55%),
  radial-gradient(ellipse 65% 55% at 85% 15%, rgba(124,58,237,0.20) 0%, transparent 55%),
  radial-gradient(ellipse 50% 40% at 50% 70%, rgba(37,99,235,0.12) 0%, transparent 60%)
`
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
          background: ${theme.colors.gradients.subtle};
          // background: linear-gradient(135deg, #a855f7 0%, #06b6d4 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-size: clamp(28px, 5vw, 48px);
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -0.02em;
          padding-bottom: 0.5rem;
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

      <style>{`
  @keyframes orbit1 {
    0%   { transform: translate(-50%, -50%) rotate(0deg)   translateX(200px) rotate(0deg); }
    100% { transform: translate(-50%, -50%) rotate(360deg) translateX(200px) rotate(-360deg); }
  }

  @keyframes orbit2 {
    0%   { transform: translate(-50%, -50%) rotate(0deg)   translateX(180px) rotate(0deg); }
    100% { transform: translate(-50%, -50%) rotate(360deg) translateX(180px) rotate(-360deg); }
  }

  .floating-dot {
    position: absolute;
    border-radius: 50%;
    background: ${theme.colors.primary};
    opacity: 0.6;
    top: 30%;
    left: 50%;
  }

  .dot-1 {
    width: 12px;
    height: 12px;
    animation: orbit1 15s infinite linear;
  }

  .dot-2 {
    width: 8px;
    height: 8px;
    animation: orbit2 15s infinite linear reverse;
  }

  .orbit-path-outer {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    height: 400px;
    border: 2px dashed ${theme.colors.primary};
    border-radius: 50%;
    opacity: 0; //change opacity to 0.3  to show orbits
    pointer-events: none;
  }

  .orbit-path-inner {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 360px;
    height: 360px;
    border: 2px dashed ${theme.colors.primary};
    border-radius: 50%;
    opacity: 0;
    pointer-events: none;
  }
      `}</style>
      <Navbar showLoginButton={true} />

     
     {/* ── Hero ── */}
<section id="hero" style={{ ...heroBg, minHeight: '92vh', display: 'flex', alignItems: 'center', position: 'relative', zIndex: 0, paddingTop: '20px' }}>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-28 pb-8 sm:pb-12 w-full">
    
    {/* Two column layout - responsive */}
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', alignItems: 'center', gap: 'clamp(40px, 8vw, 60px)', width: '100%' }}>
      
      {/* ── Left: Text Content ── */}
      <div style={{ maxWidth: '580px' }}>

        {/* Greeting */}
        <p className="hero-tag" style={{ fontSize: 'clamp(12px, 3vw, 14px)', letterSpacing: '0.1em', color: theme.colors.secondary, marginBottom: '8px', fontWeight: 500, textTransform: 'uppercase' }}>
          Hello, I'm
        </p>

        {/* Name */}
        <h1 className="hero-title" style={{
          fontSize: 'clamp(36px, 8vw, 80px)',
          fontWeight: 800,
          lineHeight: 1.05,
          letterSpacing: '-0.02em',
          color: theme.colors.text,
          marginBottom: '16px',
        }}>
          Muhammad Fahad
        </h1>

        {/* Role */}
        <p className="hero-sub" style={{ fontSize: 'clamp(16px, 4vw, 20px)', fontWeight: 500, color: '#7b5caa', marginBottom: '16px' }}>
          Full-Stack Developer 
        </p>
        {/* typing animation */}
        <div style={{ fontSize: 'clamp(20px, 4vw, 26px)', fontWeight: 500, color: theme.colors.primary, marginBottom: '16px' }}>
        <TypeAnimation
              sequence={[
                'Building full-stack webapps',
                2000,
                'fullstack | RestAPI | clean code',
                2000,
                'Crafting AI-powered chatbots',
                2000,
                'Always shipping, always learning',
                2000,
              ]}
              wrapper="p"
              cursor={true}
              repeat={Infinity}
              // style={{ fontSize: 'clamp(26px, 4vw, 20px)', fontWeight: 700, color: theme.colors.primary, marginBottom: '16px'  }}
            />
            </div>  
        {/* Description */}
        <p className="hero-sub" style={{
          fontSize: 'clamp(14px, 3vw, 16px)', lineHeight: 1.8,
          color: theme.colors.secondary,
          maxWidth: '520px',
          marginBottom: '36px',
        }}>
          CS graduate from Iqra University building full-stack apps, AR project experiences, and AI/ML solutions.
Focused on solving real problems and shipping reliable, maintainable systems.
        </p>

        {/* Buttons */}
        <div className="hero-btns" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '40px' }}>
          <a href="/resume.pdf" target="_blank" className="btn-primary" style={{ fontSize: 'clamp(13px, 2.5vw, 15px)' }}>Download CV</a>
          <a href="#contact" className="btn-outline" style={{ fontSize: 'clamp(13px, 2.5vw, 15px)' }}>Get in touch</a>
        </div>

        {/* Social links */}
        <div className="hero-links" style={{ display: 'flex', gap: '10px', marginBottom: '48px', flexWrap: 'wrap' }}>
          <a href="https://github.com/Fahadkhan1503" target="_blank" rel="noopener noreferrer" className="social-link" style={{ color: theme.colors.text }}>
            <FaGithub className="w-5 h-5" />
          </a>
          <a href="https://www.linkedin.com/in/muhammad-fahad-678861273/" target="_blank" rel="noopener noreferrer" className="social-link" style={{ color: theme.colors.text }}>
           <FaLinkedin className="w-5 h-5" />
          </a>
          {/* <a href="https://mail.google.com/mail/?view=cm&fs=1&to=fahadkhan1503@gmail.com" className="social-link" style={{ color: theme.colors.text }}>
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a> */}
        </div>

        {/* Stats - responsive grid */}
        {/* <div className="hero-links" style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', gap: 'clamp(20px, 8vw, 36px)',
          paddingTop: '24px',paddingBottom: '34px',
          borderTop: `1px solid ${isDarkMode ? 'rgba(123,92,170,0.2)' : 'rgba(123,92,170,0.15)'}`,
        }}>
          <div className="stat-item">
            <div className="stat-num">3.55</div>
            <div className="stat-lbl" style={{ color: theme.colors.secondary, fontSize: 'clamp(10px, 2vw, 12px)' }}>CGPA</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">10+</div>
            <div className="stat-lbl" style={{ color: theme.colors.secondary, fontSize: 'clamp(10px, 2vw, 12px)' }}>Projects</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">98%</div>
            <div className="stat-lbl" style={{ color: theme.colors.secondary, fontSize: 'clamp(10px, 2vw, 12px)' }}>AR Accuracy</div>
          </div>
        </div> */}

      </div>

      {/* ── Right: Profile Picture ── */}

      <div style={{ position: 'relative', justifySelf: 'center', width: 'clamp(250px, 60vw, 360px)', height: 'clamp(300px, 60vw, 430px)', minWidth: '250px' }}>
      <div className="orbit-path-outer"></div>
      <div className="orbit-path-inner"></div>
      <div className="floating-dot dot-1"></div>
      <div className="floating-dot dot-2"></div>
        {/* Glow behind blob */}
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%', height: '90%',
          borderRadius: '50%',
          background: isDarkMode
            ? 'radial-gradient(circle, #7c3aed44 0%, transparent 70%)'
            : 'radial-gradient(circle, #7c3aed33 0%, transparent 70%)',
          filter: 'blur(40px)',
          zIndex: 0,
        }} />

        {/* Back offset shape */}
        <div style={{
          position: 'absolute',
          top: '-51px', left: '-10px',
          width: '100%', height: '100%',
          borderRadius: '60% 40% 55% 45% / 45% 55% 45% 55%',
          background: isDarkMode
            ? 'linear-gradient(135deg, #6d28d966, #9333ea33)'
            : 'linear-gradient(135deg, #7c3aed44, #a855f722)',
          border: `1px solid ${isDarkMode ? '#7c3aed55' : '#9333ea44'}`,
          zIndex: 1,
        }} />

        {/* Main blob with image */}
        <div style={{
          position: 'absolute',
          top: '-55px', left: '23px',
          width: '100%', height: '100%',
          borderRadius: '55% 45% 60% 36% / 50% 45% 55% 50%',
          overflow: 'hidden',
          border: `2px solid ${isDarkMode ? '#7c3aed88' : '#9333ea66'}`,
          zIndex: 2,
          boxShadow: isDarkMode
            ? '0 25px 60px rgba(124,58,237,0.35), 0 0 0 1px rgba(124,58,237,0.1)'
            : '0 25px 60px rgba(124,58,237,0.20), 0 0 0 1px rgba(124,58,237,0.08)',
        }}>
          {/* image path */}
          <img
            src="/profile_image.png"
            alt="Muhammad Fahad"
            style={{
              width: '100%',
              height: '80%',
              objectFit: 'cover',
              objectPosition: 'center top',
              filter: isDarkMode ? 'brightness(0.9)' : 'brightness(1)',             
            }}
          />
        </div>
            
        {/* Floating badge — bottom left */}
        <div className="hero-tag" style={{
          position: 'absolute',
          bottom: 'clamp(55px, -5vw, -10px)', left: 'clamp(-25px, -8vw, -20px)',
          zIndex: 3,
          background: isDarkMode ? 'rgba(18,12,30,0.90)' : 'rgba(255,255,255,0.92)',
          border: `1px solid ${isDarkMode ? '#7c3aed55' : '#9333ea33'}`,
          borderRadius: '14px',
          padding: 'clamp(8px, 2vw, 10px) clamp(12px, 3vw, 16px)',
          display: 'flex', alignItems: 'center', gap: 'clamp(6px, 2vw, 8px)',
          boxShadow: '0 8px 32px rgba(124,58,237,0.18)',
          backdropFilter: 'blur(10px)',
          whiteSpace: 'nowrap',
          fontSize: 'clamp(11px, 2.5vw, 13px)',
        }}>
          
          <span className="availability-dot" />
          <span style={{ fontWeight: 500, color: '#10b981' }}>
            Available
          </span>
        </div>

        {/* Floating badge — top right */}
        <div className="hero-tag" style={{
          position: 'absolute',
          top: 'clamp(-15px, -5vw, -10px)', right: 'clamp(-25px, -8vw, -20px)',
          zIndex: 3,
          background: isDarkMode ? 'rgba(18,12,30,0.90)' : 'rgba(255,255,255,0.92)',
          border: `1px solid ${isDarkMode ? '#7c3aed55' : '#9333ea33'}`,
          borderRadius: '14px',
          padding: 'clamp(8px, 2vw, 10px) clamp(12px, 3vw, 16px)',
          textAlign: 'center',
          boxShadow: '0 8px 32px rgba(124,58,237,0.18)',
          backdropFilter: 'blur(10px)',
        }}>
          <div style={{ fontSize: 'clamp(16px, 4vw, 20px)', fontWeight: 800, color: '#7c3aed', lineHeight: 1 }}>10+</div>
          <div style={{ fontSize: 'clamp(9px, 2vw, 11px)', fontWeight: 500, color: theme.colors.secondary, marginTop: '3px' }}>Projects</div>
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
