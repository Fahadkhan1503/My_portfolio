import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export default function Contact() {
  const { theme, isDarkMode } = useTheme();
  const { ref: headerRef, isVisible: headerVisible } = useIntersectionObserver();
  const { ref: cardsRef, isVisible: cardsVisible } = useIntersectionObserver();
  const { ref: formRef, isVisible: formVisible } = useIntersectionObserver();

  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const sectionBg = isDarkMode
    ? {
        background: '#0d0a14',
        backgroundImage: `
          radial-gradient(ellipse 110% 70% at 0% 110%, rgba(123,92,170,0.32) 0%, transparent 60%),
          radial-gradient(ellipse 75% 60%  at 100% -5%,  rgba(187,156,222,0.18) 0%, transparent 60%),
          radial-gradient(ellipse 50% 45%  at 55% 80%,   rgba(91,60,138,0.20)  0%, transparent 65%)
        `,
      }
    : {
        background: '#f6f3ff',
        backgroundImage: `
          radial-gradient(ellipse 80% 65% at 15% 85%, rgba(79,70,229,0.22) 0%, transparent 55%),
          radial-gradient(ellipse 65% 55% at 85% 15%, rgba(124,58,237,0.20) 0%, transparent 55%),
          radial-gradient(ellipse 50% 40% at 50% 70%, rgba(37,99,235,0.12) 0%, transparent 60%)
        `,
      };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  const contactMethods = [
    { icon: '📧', label: 'Email', value: 'fahad@example.com', link: 'mailto:fahad@example.com' },
    { icon: '💼', label: 'LinkedIn', value: '/in/fahad-ahmed', link: 'https://linkedin.com' },
    { icon: '🐙', label: 'GitHub', value: 'github.com/fahad', link: 'https://github.com' },
    { icon: '☕', label: 'Open to Chat', value: 'Available for opportunities', link: 'mailto:fahad@example.com' },
  ];

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '10px',
    border: `1.5px solid ${isDarkMode ? 'rgba(123,92,170,0.2)' : 'rgba(123,92,170,0.15)'}`,
    background: isDarkMode ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.9)',
    color: theme.colors.text,
    fontSize: '15px',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  return (
    <div style={sectionBg}>

      {/* ── Section Header ── */}
      <div
        ref={headerRef}
        className={`max-w-7xl mx-auto px-6 pt-32 pb-20 transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <span className="section-label">Get In Touch</span>
        <h2 className="section-title mt-3">Let's Connect</h2>
        <p className="section-desc mt-4 max-w-2xl" style={{ color: theme.colors.secondary }}>
          Whether you have a project idea, job opportunity, or just want to chat about tech
        </p>
      </div>

      {/* ── Contact Method Cards ── */}
      <div ref={cardsRef} className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {contactMethods.map((method, idx) => (
            <a
              key={idx}
              href={method.link}
              target={method.link.startsWith('http') ? '_blank' : undefined}
              rel={method.link.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={`group flex flex-col items-center text-center p-7 rounded-2xl no-underline transition-all duration-700 ${cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{
                transitionDelay: `${100 * idx}ms`,
                background: isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.8)',
                border: `1.5px solid ${isDarkMode ? 'rgba(123,92,170,0.18)' : 'rgba(123,92,170,0.12)'}`,
                backdropFilter: 'blur(8px)',
                textDecoration: 'none',
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
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-4"
                style={{
                  background: isDarkMode ? 'rgba(123,92,170,0.15)' : 'rgba(123,92,170,0.08)',
                  border: `1px solid ${isDarkMode ? 'rgba(123,92,170,0.25)' : 'rgba(123,92,170,0.15)'}`,
                }}
              >
                {method.icon}
              </div>
              <h3 className="font-bold mb-1" style={{ color: theme.colors.text }}>{method.label}</h3>
              <p className="text-sm" style={{ color: theme.colors.secondary }}>{method.value}</p>
            </a>
          ))}
        </div>
      </div>

      {/* ── Divider ── */}
      <div
        className="max-w-7xl mx-auto px-6"
        style={{ height: '1px', background: isDarkMode ? 'rgba(123,92,170,0.12)' : 'rgba(123,92,170,0.1)' }}
      />

      {/* ── Contact Form ── */}
      <div ref={formRef} className="max-w-3xl mx-auto px-6 py-32">
        <div
          className={`p-10 md:p-12 rounded-3xl transition-all duration-700 ${formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{
            background: isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.9)',
            border: `1.5px solid ${isDarkMode ? 'rgba(123,92,170,0.2)' : 'rgba(123,92,170,0.14)'}`,
            backdropFilter: 'blur(12px)',
          }}
        >
          <h2 className="text-2xl font-bold mb-2" style={{ color: theme.colors.text }}>
            Send me a message
          </h2>
          <p className="mb-8" style={{ color: theme.colors.secondary }}>
            I'll get back to you within 24–48 hours.
          </p>

          {submitted ? (
            <div
              className="p-8 rounded-2xl text-center"
              style={{
                background: isDarkMode ? 'rgba(16,185,129,0.1)' : 'rgba(16,185,129,0.06)',
                border: '1.5px solid rgba(16,185,129,0.25)',
              }}
            >
              <div className="text-3xl mb-3">✓</div>
              <h3 className="font-bold text-lg mb-1" style={{ color: theme.colors.text }}>Thank you!</h3>
              <p style={{ color: theme.colors.secondary }}>Your message has been sent successfully.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: theme.colors.text }}>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    style={inputStyle}
                    onFocus={(e) => e.target.style.borderColor = '#7b5caa'}
                    onBlur={(e) => e.target.style.borderColor = isDarkMode ? 'rgba(123,92,170,0.2)' : 'rgba(123,92,170,0.15)'}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: theme.colors.text }}>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    style={inputStyle}
                    onFocus={(e) => e.target.style.borderColor = '#7b5caa'}
                    onBlur={(e) => e.target.style.borderColor = isDarkMode ? 'rgba(123,92,170,0.2)' : 'rgba(123,92,170,0.15)'}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: theme.colors.text }}>Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="What's this about?"
                  style={inputStyle}
                  onFocus={(e) => e.target.style.borderColor = '#7b5caa'}
                  onBlur={(e) => e.target.style.borderColor = isDarkMode ? 'rgba(123,92,170,0.2)' : 'rgba(123,92,170,0.15)'}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: theme.colors.text }}>Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  placeholder="Tell me about your project or opportunity..."
                  style={{ ...inputStyle, resize: 'none' }}
                  onFocus={(e) => e.target.style.borderColor = '#7b5caa'}
                  onBlur={(e) => e.target.style.borderColor = isDarkMode ? 'rgba(123,92,170,0.2)' : 'rgba(123,92,170,0.15)'}
                />
              </div>

              <button
                type="submit"
                className="btn-primary w-full"
                style={{ justifyContent: 'center' }}
              >
                Send Message →
              </button>
            </form>
          )}
        </div>

        {/* Quick response note */}
        <div
          className={`mt-6 p-5 rounded-2xl flex items-start gap-4 transition-all duration-700 delay-200 ${formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{
            background: isDarkMode ? 'rgba(123,92,170,0.08)' : 'rgba(123,92,170,0.05)',
            border: `1px solid ${isDarkMode ? 'rgba(123,92,170,0.2)' : 'rgba(123,92,170,0.12)'}`,
          }}
        >
          <span className="text-xl">💬</span>
          <div>
            <p className="font-semibold text-sm mb-1" style={{ color: theme.colors.text }}>Quick Response</p>
            <p className="text-sm" style={{ color: theme.colors.secondary }}>
              For urgent matters, reach out on LinkedIn or Discord for a faster response.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


// import { useState } from 'react';
// import { useTheme } from '../context/ThemeContext';
// import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

// export default function Contact() {
//   const { theme, isDarkMode } = useTheme();
//   const { ref: contentRef, isVisible } = useIntersectionObserver();
//   const { ref: formRef, isVisible: formVisible } = useIntersectionObserver();
//   const { ref: infoRef, isVisible: infoVisible } = useIntersectionObserver();
//   const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
//   const [submitted, setSubmitted] = useState(false);

//   const sectionBg = isDarkMode
//     ? {
//         background: '#0f0c18',
//         backgroundImage: `
//           radial-gradient(ellipse 120% 60% at 100% 50%, rgba(123,92,170,0.25) 0%, transparent 50%),
//           radial-gradient(ellipse 100% 80% at 0% 0%, rgba(187,156,222,0.15) 0%, transparent 60%)
//         `,
//       }
//     : {
//         background: '#faf8ff',
//         backgroundImage: `
//           radial-gradient(ellipse 120% 60% at 100% 50%, rgba(123,92,170,0.12) 0%, transparent 50%),
//           radial-gradient(ellipse 100% 80% at 0% 0%, rgba(187,156,222,0.10) 0%, transparent 60%)
//         `,
//       };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Here you would typically send the form data to your backend
//     console.log('Form submitted:', formData);
//     setSubmitted(true);
//     setTimeout(() => {
//       setFormData({ name: '', email: '', subject: '', message: '' });
//       setSubmitted(false);
//     }, 3000);
//   };

//   const contactMethods = [
//     {
//       icon: '📧',
//       label: 'Email',
//       value: 'fahad@example.com',
//       link: 'mailto:fahad@example.com',
//     },
//     {
//       icon: '💼',
//       label: 'LinkedIn',
//       value: '/in/fahad-ahmed',
//       link: 'https://linkedin.com',
//     },
//     {
//       icon: '',
//       label: 'GitHub',
//       value: 'github.com/fahad',
//       link: 'https://github.com',
//     },
//     {
//       icon: '☕',
//       label: 'Chat',
//       value: 'Available for opportunities',
//       link: 'mailto:fahad@example.com',
//     },
//   ];

//   return (
//     <>
//       {/* Section Header */}
//       <section className="max-w-7xl mx-auto px-6 pt-32 pb-8">
//         <span className="section-label">Get In Touch</span>
//         <h2 className="section-title">Let's Connect</h2>
//         <p className="section-desc max-w-2xl" style={{ color: theme.colors.secondary }}>
//           Whether you have a project idea, job opportunity, or just want to chat about tech
//         </p>
//       </section>

//       {/* Contact Methods with Background */}
//       <section style={sectionBg} className="w-full relative py-24 overflow-x-hidden">
//         <div ref={contentRef} className="max-w-7xl mx-auto px-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {contactMethods.map((method, idx) => (
//               <a
//                 key={idx}
//                 href={method.link}
//                 target={method.link.startsWith('http') ? '_blank' : undefined}
//                 rel={method.link.startsWith('http') ? 'noopener noreferrer' : undefined}
//                 className={`p-6 rounded-2xl border-2 text-center text-decoration-none transition-all duration-500 cursor-pointer ${isVisible ? 'animate-in-bottom' : 'opacity-0'}`}
//                 style={{
//                   borderColor: theme.colors.border,
//                   backgroundColor: theme.colors.surface,
//                   animationDelay: `${0.1 * (idx + 1)}s`,
//                   transform: 'translateY(0)',
//                 }}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.transform = 'translateY(-8px)';
//                   e.currentTarget.style.boxShadow = `0 20px 40px rgba(123,92,170,0.15)`;
//                   e.currentTarget.style.borderColor = '#7b5caa';
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.transform = 'translateY(0)';
//                   e.currentTarget.style.boxShadow = 'none';
//                   e.currentTarget.style.borderColor = theme.colors.border;
//                 }}
//               >
//                 <div className="text-4xl mb-4">{method.icon}</div>
//                 <h3 className="font-bold mb-2">{method.label}</h3>
//                 <p style={{ color: theme.colors.secondary }} className="text-sm">
//                   {method.value}
//                 </p>
//               </a>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Contact Form with Background */}
//       <section style={sectionBg} className="w-full relative py-24 overflow-x-hidden">
//         <div className="max-w-2xl mx-auto px-6">
//           <div ref={formRef} className={`p-12 rounded-2xl border-2 transition-all duration-500 ${formVisible ? 'animate-in-bottom' : 'opacity-0'}`}
//             style={{
//               borderColor: theme.colors.border,
//               backgroundColor: theme.colors.surface,
//               transform: 'translateY(0)',
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.transform = 'translateY(-4px)';
//               e.currentTarget.style.boxShadow = `0 20px 40px rgba(123,92,170,0.15)`;
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.transform = 'translateY(0)';
//               e.currentTarget.style.boxShadow = 'none';
//             }}>
//             <h2 className="text-3xl font-bold mb-2">Send me a message</h2>
//             <p style={{ color: theme.colors.secondary }} className="mb-8">
//               I'll get back to you as soon as possible. Typically within 24-48 hours.
//             </p>

//           {submitted ? (
//             <div className="p-6 rounded-lg text-center animate-scale-in"
//               style={{ backgroundColor: `${theme.colors.primary}20` }}>
//               <div className="text-4xl mb-3">✓</div>
//               <h3 className="font-bold text-lg">Thank you!</h3>
//               <p style={{ color: theme.colors.secondary }}>Your message has been sent successfully.</p>
//             </div>
//           ) : (
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-semibold mb-3">Name</label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-all duration-300"
//                     style={{
//                       borderColor: theme.colors.border,
//                       backgroundColor: theme.colors.background,
//                       color: theme.colors.text,
//                     }}
//                     onFocus={(e) => e.target.style.borderColor = theme.colors.primary}
//                     onBlur={(e) => e.target.style.borderColor = theme.colors.border}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold mb-3">Email</label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-all duration-300"
//                     style={{
//                       borderColor: theme.colors.border,
//                       backgroundColor: theme.colors.background,
//                       color: theme.colors.text,
//                     }}
//                     onFocus={(e) => e.target.style.borderColor = theme.colors.primary}
//                     onBlur={(e) => e.target.style.borderColor = theme.colors.border}
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold mb-3">Subject</label>
//                 <input
//                   type="text"
//                   name="subject"
//                   value={formData.subject}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-all duration-300"
//                   style={{
//                     borderColor: theme.colors.border,
//                     backgroundColor: theme.colors.background,
//                     color: theme.colors.text,
//                   }}
//                   onFocus={(e) => e.target.style.borderColor = theme.colors.primary}
//                   onBlur={(e) => e.target.style.borderColor = theme.colors.border}
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold mb-3">Message</label>
//                 <textarea
//                   name="message"
//                   value={formData.message}
//                   onChange={handleChange}
//                   required
//                   rows="5"
//                   className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-all duration-300 resize-none"
//                   style={{
//                     borderColor: theme.colors.border,
//                     backgroundColor: theme.colors.background,
//                     color: theme.colors.text,
//                   }}
//                   onFocus={(e) => e.target.style.borderColor = theme.colors.primary}
//                   onBlur={(e) => e.target.style.borderColor = theme.colors.border}
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="w-full py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:shadow-lg"
//                 style={{ 
//                   backgroundColor: theme.colors.primary,
//                   boxShadow: '0 4px 12px rgba(123,92,170,0.15)',
//                 }}
//                 onMouseEnter={(e) => {
//                   e.target.style.transform = 'translateY(-2px)';
//                   e.target.style.boxShadow = '0 8px 24px rgba(123,92,170,0.25)';
//                 }}
//                 onMouseLeave={(e) => {
//                   e.target.style.transform = 'translateY(0)';
//                   e.target.style.boxShadow = '0 4px 12px rgba(123,92,170,0.15)';
//                 }}
//               >
//                 Send Message
//               </button>
//             </form>
//           )}
//         </div>
//         </div>
//       </section>

//       {/* Response Info Section */}
//       <section style={sectionBg} className="w-full relative py-24 overflow-x-hidden">
//         <div className="max-w-2xl mx-auto px-6">
//           <div ref={infoRef} className={`p-8 rounded-2xl border-2 transition-all duration-500 ${infoVisible ? 'animate-in-bottom' : 'opacity-0'}`}
//             style={{
//               borderColor: theme.colors.border,
//               backgroundColor: theme.colors.surface,
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
//             <h3 className="font-bold text-lg mb-4">💬 Quick Response</h3>
//             <p style={{ color: theme.colors.secondary }}>
//               I prioritize communication. For urgent matters, reach out on LinkedIn or Discord for faster response.
//             </p>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }
