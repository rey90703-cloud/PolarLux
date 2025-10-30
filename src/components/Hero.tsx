import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";
import RotatingText from "@/components/RotatingText";
import FridgeModel3D from "@/components/FridgeModel3D";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();
  
  const scrollToCollection = () => {
    const element = document.getElementById("collection");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-[120px] md:pt-[140px]"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Modern kitchen with premium refrigerator"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 w-full">
        <div className="grid lg:grid-cols-2 gap-8 items-center max-w-7xl mx-auto">
          {/* Left: Text Content */}
          <div className="space-y-6 lg:space-y-8 animate-fade-in-up text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white text-balance leading-relaxed overflow-visible">
              {t('hero.title')} <span className="text-primary">{t('hero.titleHighlight')}</span>
              <br />
              <span className="inline-block overflow-hidden relative" style={{ minHeight: '1.5em', marginTop: '0.5rem' }}>
                <RotatingText
                  texts={['Bespoke AI', 'Twin Cooling', 'Family Hub', 'Digital Inverter']}
                  mainClassName="justify-center lg:justify-start text-cyan-400"
                  elementLevelClassName="text-cyan-400"
                  staggerFrom="last"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-visible"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={2500}
                />
              </span>
            </h1>

            <p className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-2xl mx-auto lg:mx-0 text-balance">
              {t('hero.description')}
            </p>

            {/* Benefits */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start text-sm md:text-base mb-4">
              <div className="flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full backdrop-blur-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                </svg>
                <span className="font-semibold">{t('hero.freeShipping')}</span>
              </div>
              <div className="flex items-center gap-2 bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full backdrop-blur-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                  <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold">{t('hero.installment')}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center pt-4">
              <Button
                variant="hero"
                size="lg"
                onClick={scrollToCollection}
                className="shadow-hover"
              >
                {t('hero.ctaExplore')}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                {t('hero.ctaLearn')}
              </Button>
            </div>
          </div>

          {/* Right: 3D Fridge Model */}
          <div className="relative animate-fade-in-up animation-delay-200 hidden lg:flex justify-center items-center">
            <FridgeModel3D />
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white/70" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
