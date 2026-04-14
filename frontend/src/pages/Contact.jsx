import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function Contact() {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  const contactMethods = [
    {
      icon: '📧',
      label: 'Email',
      value: 'fahad@example.com',
      link: 'mailto:fahad@example.com',
    },
    {
      icon: '💼',
      label: 'LinkedIn',
      value: '/in/fahad-ahmed',
      link: 'https://linkedin.com',
    },
    {
      icon: '',
      label: 'GitHub',
      value: 'github.com/fahad',
      link: 'https://github.com',
    },
    {
      icon: '☕',
      label: 'Chat',
      value: 'Available for opportunities',
      link: 'mailto:fahad@example.com',
    },
  ];

  return (
    <>
      {/* Section Header */}
      <section className="max-w-7xl mx-auto px-6 pt-32 pb-8">
        <span className="section-label">Get In Touch</span>
        <h2 className="section-title">Let's Connect</h2>
        <p className="section-desc max-w-2xl" style={{ color: theme.colors.secondary }}>
          Whether you have a project idea, job opportunity, or just want to chat about tech
        </p>
      </section>

      {/* Contact Methods */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactMethods.map((method, idx) => (
            <a
              key={idx}
              href={method.link}
              target={method.link.startsWith('http') ? '_blank' : undefined}
              rel={method.link.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="p-6 rounded-2xl border-2 text-center text-decoration-none animate-scale-in transition-all duration-500 cursor-pointer"
              style={{
                borderColor: theme.colors.border,
                backgroundColor: theme.colors.surface,
                animationDelay: `${0.1 * idx}s`,
                transform: 'translateY(0)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = `0 20px 40px rgba(123,92,170,0.15)`;
                e.currentTarget.style.borderColor = '#7b5caa';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = theme.colors.border;
              }}
            >
              <div className="text-4xl mb-4">{method.icon}</div>
              <h3 className="font-bold mb-2">{method.label}</h3>
              <p style={{ color: theme.colors.secondary }} className="text-sm">
                {method.value}
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section className="max-w-2xl mx-auto px-6 py-24">
        <div className="p-12 rounded-2xl border-2 transition-all duration-500"
          style={{
            borderColor: theme.colors.border,
            backgroundColor: theme.colors.surface,
            transform: 'translateY(0)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = `0 20px 40px rgba(123,92,170,0.15)`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}>
          <h2 className="text-3xl font-bold mb-2">Send me a message</h2>
          <p style={{ color: theme.colors.secondary }} className="mb-8">
            I'll get back to you as soon as possible. Typically within 24-48 hours.
          </p>

          {submitted ? (
            <div className="p-6 rounded-lg text-center animate-scale-in"
              style={{ backgroundColor: `${theme.colors.primary}20` }}>
              <div className="text-4xl mb-3">✓</div>
              <h3 className="font-bold text-lg">Thank you!</h3>
              <p style={{ color: theme.colors.secondary }}>Your message has been sent successfully.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-3">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-all duration-300"
                    style={{
                      borderColor: theme.colors.border,
                      backgroundColor: theme.colors.background,
                      color: theme.colors.text,
                    }}
                    onFocus={(e) => e.target.style.borderColor = theme.colors.primary}
                    onBlur={(e) => e.target.style.borderColor = theme.colors.border}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-3">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-all duration-300"
                    style={{
                      borderColor: theme.colors.border,
                      backgroundColor: theme.colors.background,
                      color: theme.colors.text,
                    }}
                    onFocus={(e) => e.target.style.borderColor = theme.colors.primary}
                    onBlur={(e) => e.target.style.borderColor = theme.colors.border}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-all duration-300"
                  style={{
                    borderColor: theme.colors.border,
                    backgroundColor: theme.colors.background,
                    color: theme.colors.text,
                  }}
                  onFocus={(e) => e.target.style.borderColor = theme.colors.primary}
                  onBlur={(e) => e.target.style.borderColor = theme.colors.border}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-all duration-300 resize-none"
                  style={{
                    borderColor: theme.colors.border,
                    backgroundColor: theme.colors.background,
                    color: theme.colors.text,
                  }}
                  onFocus={(e) => e.target.style.borderColor = theme.colors.primary}
                  onBlur={(e) => e.target.style.borderColor = theme.colors.border}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:shadow-lg"
                style={{ 
                  backgroundColor: theme.colors.primary,
                  boxShadow: '0 4px 12px rgba(123,92,170,0.15)',
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 24px rgba(123,92,170,0.25)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 12px rgba(123,92,170,0.15)';
                }}
              >
                Send Message
              </button>
            </form>
          )}
        </div>

        {/* Additional Info */}
        <div className="mt-12 p-8 rounded-2xl border-2 transition-all duration-500"
          style={{
            borderColor: theme.colors.border,
            backgroundColor: theme.colors.surface,
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
          <h3 className="font-bold text-lg mb-4">💬 Quick Response</h3>
          <p style={{ color: theme.colors.secondary }}>
            I prioritize communication. For urgent matters, reach out on LinkedIn or Discord for faster response.
          </p>
        </div>
      </section>
    </>
  );
}
