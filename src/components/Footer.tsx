import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
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
              <div className="w-10 h-10 flex items-center justify-center bg-primary rounded-lg">
                <span className="text-white font-bold text-xl">μ</span>
              </div>
              <span className="font-semibold text-lg">μ-Fridge</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Công nghệ làm lạnh thông minh cho tương lai bền vững. 
              Tiết kiệm năng lượng, thân thiện môi trường.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Liên kết nhanh</h3>
            <ul className="space-y-3">
              {[
                { label: "Trang chủ", id: "hero" },
                { label: "Giới thiệu", id: "about" },
                { label: "Bộ sưu tập", id: "collection" },
                { label: "Công nghệ", id: "technology" },
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
            <h3 className="font-semibold text-lg mb-4">Sản phẩm</h3>
            <ul className="space-y-3 text-white/70 text-sm">
              <li>μ-French Pro</li>
              <li>μ-Side Elite</li>
              <li>μ-Smart Connect</li>
              <li>μ-Prestige 4D</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Liên hệ</h3>
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
          <p>&copy; {new Date().getFullYear()} μ-Fridge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
