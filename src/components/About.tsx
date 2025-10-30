import { useEffect, useRef, useState } from "react";
import { Leaf, Zap, Shield, Sparkles } from "lucide-react";
import aboutIllustration from "@/assets/about-illustration.jpg";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: Leaf,
      title: t('about.feature1Title'),
      description: t('about.feature1Desc'),
    },
    {
      icon: Zap,
      title: t('about.feature2Title'),
      description: t('about.feature2Desc'),
    },
    {
      icon: Shield,
      title: t('about.feature3Title'),
      description: t('about.feature3Desc'),
    },
    {
      icon: Sparkles,
      title: t('about.feature1Title'),
      description: t('about.feature1Desc'),
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-light-bg py-16 lg:py-24"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl transform rotate-3" />
              <img
                src={aboutIllustration}
                alt="Smart refrigerator technology"
                className="relative rounded-3xl shadow-lg w-full"
              />
            </div>
          </div>

          {/* Content */}
          <div
            className={`space-y-8 transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                {t('about.title')}
                <span className="text-primary"> {t('about.titleHighlight')}</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('about.description')}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group p-6 rounded-2xl bg-card hover:bg-card/80 shadow-sm hover:shadow-md transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <feature.icon className="w-10 h-10 text-primary mb-4 transition-transform duration-300 group-hover:scale-110" />
                  <h3 className="font-semibold text-lg mb-2 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
