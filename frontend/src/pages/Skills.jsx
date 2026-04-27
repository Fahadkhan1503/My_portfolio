import { useTheme } from "../context/ThemeContext";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import {
  FaReact,
  FaServer,
  FaGamepad,
  FaBrain,
  FaTools,
  FaLightbulb,
} from "react-icons/fa";

const swiperStyles = `
  .skills-swiper-wrapper {
    overflow: hidden;
    padding: 12px 0;
    /* no extra padding needed */
  }

  .skills-swiper {
    overflow: visible !important;
  }

  .skills-swiper .swiper-slide {
    width: 280px !important;
  }

  @media (min-width: 640px) {
    .skills-swiper .swiper-slide {
      width: 340px !important;
    }
  }

  @media (min-width: 1024px) {
    .skills-swiper .swiper-slide {
      width: 360px !important;
    }
  }

  .skills-swiper .swiper-slide {
    height: auto;
  }

  .skills-swiper .swiper-wrapper {
    align-items: stretch;
  }
`;

export default function Skills() {
  const { theme, isDarkMode } = useTheme();

  const { ref: headerRef, isVisible: headerVisible } = useIntersectionObserver();
  const { ref: gridRef, isVisible: gridVisible } = useIntersectionObserver();

  const skillCategories = [
    {
      category: "Frontend",
      icon: FaReact,
      skills: ["React", "React Native", "Tailwind CSS", "Next.js", "Redux", "HTML/CSS", "TypeScript", "Vite"],
    },
    {
      category: "Backend",
      icon: FaServer,
      skills: ["Node.js", "Express", "MongoDB", "PostgreSQL", "FastAPI", "REST APIs", "Auth/JWT"],
    },
    {
      category: "AR & Game Dev",
      icon: FaGamepad,
      skills: ["Unity", "AR Foundation", "Vuforia", "C#", "WebXR", "Three.js", "Physics Engine"],
    },
    {
      category: "AI / ML",
      icon: FaBrain,
      skills: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "OpenCV", "NLP", "Computer Vision"],
    },
    {
      category: "Tools & DevOps",
      icon: FaTools,
      skills: ["Git", "Docker", "Firebase", "AWS", "Postman", "Linux", "VS Code"],
    },
    {
      category: "Soft Skills",
      icon: FaLightbulb,
      skills: ["Problem Solving", "Collaboration", "Communication", "Project Mgmt", "Adaptability"],
    },
  ];

  const primaryColor = "#8b5cf6";
  const primaryColorRgb = "139, 92, 246";

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

  return (
    <div style={sectionBg}>
      <style>{swiperStyles}</style>

      {/* Header */}
      <div
        ref={headerRef}
        className={`max-w-7xl mx-auto px-4 md:px-6 pt-16 md:pt-22 pb-12 md:pb-20 transition-all duration-700 ${
          headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <span className="section-label">2.Expertise</span>
        <h2 className="section-title mt-3">My Skills</h2>
        <p
          className="section-desc mt-4 max-w-2xl text-sm md:text-base"
          style={{ color: theme.colors.secondary }}
        >
          A comprehensive toolkit developed through education and hands-on project experience
        </p>
      </div>

      {/* Swiper */}
      <div ref={gridRef} className="max-w-7xl mx-auto px-2 md:px-4 pb-16 md:pb-22">
        <div className="skills-swiper-wrapper">
          <Swiper
            className="skills-swiper"
            modules={[Autoplay, FreeMode]}
            slidesPerView="auto"
            spaceBetween={24}
            speed={3800}
            grabCursor={true}
            loop={true}
            freeMode={{
              enabled: true,
              momentum: true,
              momentumRatio: 0.3,     /* lower = less fly-off after drag */
              momentumVelocityRatio: 0.3,
              momentumBounce: false,
            }}
            autoplay={{
              delay: 0,
              pauseOnMouseEnter: true,
              disableOnInteraction: false,
            }}
          >
            {skillCategories.map((cat, idx) => {
              const IconComponent = cat.icon;
              const gradientAngle = (idx * 60) % 360;
              return (
                <SwiperSlide key={idx}>
                  <SkillCard
                    cat={cat}
                    idx={idx}
                    IconComponent={IconComponent}
                    gradientAngle={gradientAngle}
                    gridVisible={gridVisible}
                    theme={theme}
                    isDarkMode={isDarkMode}
                    primaryColor={primaryColor}
                    primaryColorRgb={primaryColorRgb}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>

      {/* Divider */}
      <div
        className="max-w-7xl mx-auto px-4 md:px-6"
        style={{
          height: "1px",
          background: isDarkMode ? "rgba(123,92,170,0.12)" : "rgba(123,92,170,0.1)",
        }}
      />
    </div>
  );
}

function SkillCard({
  cat,
  idx,
  IconComponent,
  gradientAngle,
  gridVisible,
  theme,
  isDarkMode,
  primaryColor,
  primaryColorRgb,
}) {
  return (
    <div
      className={`group h-full p-4 md:p-6 lg:p-8 rounded-xl md:rounded-2xl cursor-pointer transition-all duration-200 transform hover:shadow-xl ${
        gridVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{
        transitionDelay: `${80 * idx}ms`,
        background: isDarkMode
          ? `linear-gradient(${120 + gradientAngle}deg, rgba(${primaryColorRgb},0.12) 0%, rgba(${primaryColorRgb},0.05) 50%, rgba(${primaryColorRgb},0.08) 100%)`
          : "linear-gradient(135deg, #7b5caa 0%, #9176c0 25%, #7b5caa 50%, #9176c0 75%, #7b5caa 100%)",
        border: `1.5px solid rgba(${primaryColorRgb},${isDarkMode ? "0.25" : "0.3"})`,
        backdropFilter: "blur(10px)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-10px) scale(1.02)";
        e.currentTarget.style.borderColor = isDarkMode
          ? `rgba(${primaryColorRgb},0.45)`
          : "rgba(255,255,255,0.45)";
        e.currentTarget.style.boxShadow = `0 20px 60px rgba(${
          isDarkMode ? primaryColorRgb : "255,255,255"
        },${isDarkMode ? "0.18" : "0.2"})`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0) scale(1)";
        e.currentTarget.style.borderColor = isDarkMode
          ? `rgba(${primaryColorRgb},0.25)`
          : "rgba(255,255,255,0.3)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Icon + Title */}
      <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
        <div
          className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-lg md:rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
          style={{
            background: isDarkMode
              ? `linear-gradient(135deg, rgba(${primaryColorRgb},0.28) 0%, rgba(${primaryColorRgb},0.14) 100%)`
              : `linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.15) 100%)`,
            border: `2px solid ${
              isDarkMode ? `rgba(${primaryColorRgb},0.35)` : "rgba(255,255,255,0.3)"
            }`,
          }}
        >
          <IconComponent
            size={typeof window !== "undefined" && window.innerWidth < 768 ? 20 : 28}
            color={isDarkMode ? "#a78bfa" : "#faf7f5"}
          />
        </div>
        <h3
          className="text-base md:text-lg font-bold transition-all duration-300"
          style={{ color: isDarkMode ? theme.colors.text : "#faf7f5" }}
        >
          {cat.category}
        </h3>
      </div>

      {/* Skill pills */}
      <div className="flex flex-wrap gap-1.5 md:gap-2">
        {cat.skills.map((skill, sIdx) => (
          <span
            key={sIdx}
            className="px-2 md:px-3 py-1 md:py-1.5 rounded-lg text-xs font-medium transition-all duration-300 hover:translate-y-0.5 whitespace-nowrap"
            style={{
              background: isDarkMode
                ? `rgba(${primaryColorRgb},0.16)`
                : theme.colors.primaryDarker,
              border: `1px solid ${
                isDarkMode ? `rgba(${primaryColorRgb},0.32)` : "rgba(255,255,255,0.3)"
              }`,
              color: isDarkMode ? "#a78bfa" : "#faf7f5",
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}