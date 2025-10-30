import { Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer id="contact" className="bg-foreground text-white py-12 lg:py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img 
                src={logo} 
                alt="PolarLux Logo" 
                className="w-10 h-10 object-contain"
              />
              <span className="font-semibold text-lg">
                <span style={{ color: '#3b93bd' }}>Polar</span>
                <span style={{ color: '#C0C0C0' }}>Lux</span>
              </span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              {t('footer.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-3">
              {[
                { label: t('nav.home'), id: "hero" },
                { label: t('nav.about'), id: "about" },
                { label: t('nav.collection'), id: "collection" },
                { label: t('nav.gallery'), id: "gallery" },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-white/70 hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t('nav.collection')}</h3>
            <ul className="space-y-3 text-white/70 text-sm">
              <li>PolarLux French Pro</li>
              <li>PolarLux Side Elite</li>
              <li>PolarLux Smart Connect</li>
              <li>PolarLux Prestige 4D</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:info@mu-fridge.com"
                  className="text-white/70 hover:text-primary transition-colors duration-200 text-sm"
                >
                  info@mu-fridge.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <a
                  href="tel:+84123456789"
                  className="text-white/70 hover:text-primary transition-colors duration-200 text-sm"
                >
                  +84 123 456 789
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-white/70 text-sm">
                  123 Đường ABC, Quận 1, TP.HCM
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-white/50 text-sm">
          <p>&copy; {new Date().getFullYear()} PolarLux. {t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
