import { useEffect, useRef, useState } from "react";
import { Leaf, Zap, Shield, Sparkles } from "lucide-react";
import aboutIllustration from "@/assets/about-illustration.jpg";

const About = () => {
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
      title: "Thân thiện môi trường",
      description: "Giảm thiểu khí thải carbon, bảo vệ hành tinh",
    },
    {
      icon: Zap,
      title: "Tiết kiệm điện năng",
      description: "Công nghệ Inverter tiên tiến, tiết kiệm đến 40%",
    },
    {
      icon: Shield,
      title: "Bảo quản tối ưu",
      description: "Khử khuẩn, giữ tươi thực phẩm lâu hơn",
    },
    {
      icon: Sparkles,
      title: "Thiết kế sang trọng",
      description: "Hiện đại, tinh tế, nâng tầm không gian",
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
                Đổi mới để
                <span className="text-primary"> Bền vững</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Chúng tôi cam kết mang đến những giải pháp làm lạnh thông minh,
                kết hợp công nghệ tiên tiến với thiết kế bền vững. Mỗi sản phẩm
                được chế tạo với sứ mệnh tiết kiệm năng lượng và bảo vệ môi trường.
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
