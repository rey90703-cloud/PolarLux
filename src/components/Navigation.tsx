import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import HeaderTop from "@/components/HeaderTop";
import { useTranslation } from "react-i18next";

const Navigation = () => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { label: t('nav.home'), id: "hero" },
    { label: t('nav.introduction'), id: "history" },
    { label: t('nav.about'), id: "about" },
    { label: t('nav.collection'), id: "collection" },
    { label: t('nav.gallery'), id: "gallery" },
    { label: t('nav.contact'), id: "contact" },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Header Top Bar */}
      <HeaderTop />

      {/* Main Navigation */}
      <nav
        className={`transition-all duration-300 ${
          isScrolled ? "glass-effect shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-2 group"
          >
            <img 
              src={logo} 
              alt="PolarLux Logo" 
              className="w-8 h-8 lg:w-10 lg:h-10 object-contain transition-transform duration-300 group-hover:scale-110"
            />
            <span className="font-semibold text-base lg:text-lg transition-colors duration-300">
              <span style={{ color: '#3b93bd' }}>Polar</span>
              <span className={isScrolled ? "text-foreground" : "text-white"} style={{ color: isScrolled ? undefined : '#C0C0C0' }}>Lux</span>
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => scrollToSection(item.id)}
                className={`transition-all duration-300 ${
                  isScrolled
                    ? "text-foreground hover:text-primary"
                    : "text-white hover:text-white hover:bg-white/10"
                }`}
              >
                {item.label}
              </Button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden ${isScrolled ? "text-foreground" : "text-white"}`}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-effect border-t border-border animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => scrollToSection(item.id)}
                className="justify-start text-foreground hover:text-primary"
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      )}
    </nav>
    </div>
  );
};

export default Navigation;
