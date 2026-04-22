import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { FaEnvelope, FaLinkedin, FaGithub, FaComments } from "react-icons/fa";

export default function Contact() {
  const { theme, isDarkMode } = useTheme();
  const { ref: headerRef, isVisible: headerVisible } = useIntersectionObserver();
  const { ref: cardsRef, isVisible: cardsVisible } = useIntersectionObserver();
  const { ref: formRef, isVisible: formVisible } = useIntersectionObserver();

  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [focusedField, setFocusedField] = useState(null);

  const sectionBg = isDarkMode
    ? {
        background: "#0d0a14",
        backgroundImage: `
          radial-gradient(ellipse 110% 70% at 0% 110%, rgba(123,92,170,0.32) 0%, transparent 60%),
          radial-gradient(ellipse 75% 60% at 100% -5%, rgba(187,156,222,0.18) 0%, transparent 60%),
          radial-gradient(ellipse 50% 45% at 55% 80%, rgba(91,60,138,0.20) 0%, transparent 65%)
        `,
      }
    : {
        background: "#f6f3ff",
        backgroundImage: `
          radial-gradient(ellipse 80% 65% at 15% 85%, rgba(79,70,229,0.22) 0%, transparent 55%),
          radial-gradient(ellipse 65% 55% at 85% 15%, rgba(124,58,237,0.20) 0%, transparent 55%),
          radial-gradient(ellipse 50% 40% at 50% 70%, rgba(37,99,235,0.12) 0%, transparent 60%)
        `,
      };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const [result, setResult] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult("sending");
    const formData = new FormData(e.target);
    formData.append("access_key", "e207cbbb-f8b7-4370-8ac8-118e46263a1a");
    formData.append("subject", formData.get("subject") || "New Contact Form Submission");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();

    if (data.success) {
      setSubmitted(true);
      setResult("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitted(false), 3000);
    } else {
      setResult("error");
    }
  };
  
  const contactMethods = [
    {
      icon: FaEnvelope,
      label: "Email",
      value: "fahadkhan1503@gmail.com",
      link: "mailto:fahadkhan1503@gmail.com",
      color: "#3b82f6",
    },
    {
      icon: FaLinkedin,
      label: "LinkedIn",
      value: "/in/muhammad-fahad",
      link: "https://linkedin.com/in/muhammad-fahad-678861273/",
      color: "#8b5cf6",
    },
    {
      icon: FaGithub,
      label: "GitHub",
      value: "/Fahadkhan1503",
      link: "https://github.com/Fahadkhan1503",
      color: isDarkMode ? "#a78bfa" : "#333333",
    },
    {
      icon: FaComments,
      label: "Let's Chat",
      value: "Available Now",
      link: "mailto:fahadkhan1503@gmail.com",
      color: "#8b5cf6",
    },
  ];

  const inputStyle = (field) => ({
    width: "100%",
    padding: "14px 16px",
    borderRadius: "12px",
    border: `2px solid ${
      focusedField === field
        ? "#7b5caa"
        : isDarkMode
        ? "rgba(123,92,170,0.2)"
        : "rgba(123,92,170,0.15)"
    }`,
    background: isDarkMode ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.95)",
    color: theme.colors.text,
    fontSize: "15px",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
    boxShadow: focusedField === field ? "0 0 20px rgba(123,92,170,0.2)" : "none",
    fontFamily: "inherit",
  });

  return (
    <div style={sectionBg}>

      {/* Header */}
      <div
        ref={headerRef}
        className={`max-w-7xl mx-auto px-6 pt-20 pb-20 transition-all duration-700 ${
          headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <span className="section-label">4.Get In Touch</span>
        <h2 className="section-title mt-3">Let's Connect</h2>
        <p className="section-desc mt-4 max-w-2xl" style={{ color: theme.colors.secondary }}>
          Whether you have a project idea, job opportunity, or just want to chat about tech
        </p>
      </div>

      {/* Contact Cards */}
      <div ref={cardsRef} className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactMethods.map((method, idx) => {
            const Icon = method.icon;
            const isHovered = hoveredCard === idx;
            return (
              <a
                key={idx}
                href={method.link}
                target={method.link.startsWith("http") ? "_blank" : undefined}
                rel={method.link.startsWith("http") ? "noopener noreferrer" : undefined}
                className={`flex flex-col items-center text-center p-8 rounded-2xl no-underline transition-all duration-700 ${
                  cardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{
                  transitionDelay: `${100 * idx}ms`,
                  background: isDarkMode ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.85)",
                  border: `2px solid ${
                    isHovered ? method.color : isDarkMode ? "rgba(123,92,170,0.18)" : "rgba(123,92,170,0.12)"
                  }`,
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  textDecoration: "none",
                  transform: isHovered ? "translateY(-12px) scale(1.03)" : "translateY(0) scale(1)",
                  boxShadow: isHovered
                    ? `0 20px 60px rgba(123,92,170,0.2), inset 0 1px 0 rgba(255,255,255,0.1)`
                    : `0 4px 16px ${isDarkMode ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.06)"}`,
                }}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Icon */}
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-all duration-500"
                  style={{
                    background: isHovered
                      ? method.color
                      : isDarkMode
                      ? "rgba(123,92,170,0.15)"
                      : "rgba(123,92,170,0.08)",
                    border: `2px solid ${
                      isHovered ? method.color : isDarkMode ? "rgba(123,92,170,0.25)" : "rgba(123,92,170,0.15)"
                    }`,
                    transform: isHovered ? "scale(1.1) rotate(5deg)" : "scale(1) rotate(0deg)",
                    color: isHovered ? "#fff" : method.color,
                  }}
                >
                  <Icon size={28} />
                </div>

                {/* Accent line */}
                <div
                  style={{
                    height: "2px",
                    width: isHovered ? "40px" : "20px",
                    background: method.color,
                    marginBottom: "12px",
                    borderRadius: "2px",
                    transition: "width 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  }}
                />

                <h3 className="font-bold text-lg mb-2" style={{ color: theme.colors.text }}>
                  {method.label}
                </h3>
                <p
                  className="text-sm font-medium"
                  style={{ color: isHovered ? method.color : theme.colors.secondary }}
                >
                  {method.value}
                </p>
              </a>
            );
          })}
        </div>
      </div>

      {/* Divider */}
      <div
        className="max-w-7xl mx-auto px-6"
        style={{
          height: "1px",
          background: isDarkMode ? "rgba(123,92,170,0.12)" : "rgba(123,92,170,0.1)",
        }}
      />

      {/* Contact Form */}
      <div ref={formRef} className="max-w-3xl mx-auto px-6 py-24">
        <div
          className={`p-10 md:p-14 rounded-3xl transition-all duration-700 ${
            formVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{
            background: isDarkMode ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.92)",
            border: `2px solid ${isDarkMode ? "rgba(123,92,170,0.25)" : "rgba(123,92,170,0.18)"}`,
            backdropFilter: "blur(15px)",
            WebkitBackdropFilter: "blur(15px)",
            boxShadow: isDarkMode
              ? "0 25px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)"
              : "0 25px 60px rgba(123,92,170,0.08), inset 0 1px 0 rgba(255,255,255,0.5)",
          }}
        >
          {/* Form Header */}
          <div className="mb-8">
            <div
              style={{
                height: "3px",
                width: "50px",
                background: "linear-gradient(90deg, #7b5caa, #a855f7)",
                marginBottom: "16px",
                borderRadius: "2px",
              }}
            />
            <h2 className="text-3xl font-bold mb-2" style={{ color: theme.colors.text }}>
              Let's Collaborate
            </h2>
            <p style={{ color: theme.colors.secondary }}>
              Drop a message and I'll respond within 24–48 hours.
            </p>
          </div>

          {submitted ? (
            <div
              className="p-10 rounded-2xl text-center"
              style={{
                background: isDarkMode ? "rgba(16,185,129,0.12)" : "rgba(16,185,129,0.08)",
                border: "2px solid rgba(16,185,129,0.35)",
              }}
            >
              <div className="text-5xl mb-4">✓</div>
              <h3 className="font-bold text-2xl mb-2" style={{ color: "#10b981" }}>
                Message Sent!
              </h3>
              <p style={{ color: theme.colors.secondary }}>
                Thanks for reaching out. I'll get back to you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { name: "name", label: "Your Name", type: "text", placeholder: "e.g. John Doe" },
                  { name: "email", label: "Email Address", type: "email", placeholder: "your@email.com" },
                ].map(({ name, label, type, placeholder }) => (
                  <div key={name}>
                    <label className="block text-sm font-semibold mb-3" style={{ color: theme.colors.text }}>
                      {label}
                    </label>
                    <input
                      type={type}
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      onFocus={() => setFocusedField(name)}
                      onBlur={() => setFocusedField(null)}
                      required
                      placeholder={placeholder}
                      style={inputStyle(name)}
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3" style={{ color: theme.colors.text }}>
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("subject")}
                  onBlur={() => setFocusedField(null)}
                  required
                  placeholder="Project collab, job offer, or just chatting?"
                  style={inputStyle("subject")}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3" style={{ color: theme.colors.text }}>
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  required
                  rows="6"
                  placeholder="Tell me about your idea, opportunity, or just say hi..."
                  style={{ ...inputStyle("message"), resize: "none" }}
                />
              </div>
                <button
              type="submit"
              disabled={result === "sending"}
              className="w-full py-4 text-base font-semibold rounded-xl text-white transition-all duration-300"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                background: result === "sending"
                  ? "rgba(123,92,170,0.5)"
                  : "linear-gradient(135deg, #7b5caa, #a855f7)",
                boxShadow: "0 8px 24px rgba(123,92,170,0.3)",
                border: "none",
                cursor: result === "sending" ? "not-allowed" : "pointer",
              }}
              onMouseEnter={(e) => {
                if (result !== "sending") {
                  e.currentTarget.style.boxShadow = "0 12px 40px rgba(123,92,170,0.45)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(123,92,170,0.3)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <FaEnvelope size={15} />
              {result === "sending" ? "Sending..." : "Send Message →"}
            </button>
            {result === "error" && (
              <p style={{ color: "#ef4444", fontSize: "14px", textAlign: "center", marginTop: "8px" }}>
                Something went wrong. Please try again or email me directly.
              </p>
            )}
            </form>
          )}
        </div>

        {/* Quick Tip */}
        <div
          className={`mt-8 p-5 rounded-2xl transition-all duration-700 delay-200 ${
            formVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{
            background: isDarkMode ? "rgba(123,92,170,0.1)" : "rgba(123,92,170,0.06)",
            border: `1.5px solid ${isDarkMode ? "rgba(123,92,170,0.25)" : "rgba(123,92,170,0.15)"}`,
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
          }}
        >
          <p className="font-bold text-sm mb-1" style={{ color: theme.colors.text }}>
            Quick Tip
          </p>
          <p className="text-sm leading-relaxed" style={{ color: theme.colors.secondary }}>
            For urgent matters, reach out via LinkedIn or email for a faster response. I check them multiple times a day!
          </p>
        </div>
      </div>
    </div>
  );
}
