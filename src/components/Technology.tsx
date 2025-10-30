import { useEffect, useRef, useState } from "react";
import { Wind, Thermometer, Wifi, Battery } from "lucide-react";
import { useTranslation } from "react-i18next";

const Technology = () => {
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

  const technologies = [
    {
      icon: Wind,
      title: t('technology.multiAirFlow.title'),
      description: t('technology.multiAirFlow.description'),
    },
    {
      icon: Thermometer,
      title: t('technology.smartCooling.title'),
      description: t('technology.smartCooling.description'),
    },
    {
      icon: Wifi,
      title: t('technology.iotConnected.title'),
      description: t('technology.iotConnected.description'),
    },
    {
      icon: Battery,
      title: t('technology.ecoInverter.title'),
      description: t('technology.ecoInverter.description'),
    },
  ];

  return (
    <section
      id="technology"
      ref={sectionRef}
      className="section-accent-bg py-16 lg:py-24"
    >
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            {t('technology.title')}
            <span className="text-primary"> {t('technology.titleHighlight')}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('technology.description')}
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className={`transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="group h-full bg-card rounded-2xl p-8 shadow-md hover:shadow-hover transition-all duration-300 hover:-translate-y-2">
                {/* Icon */}
                <div className="mb-6">
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:scale-110">
                    <tech.icon className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-3 text-foreground">
                  {tech.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {tech.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Technology;
