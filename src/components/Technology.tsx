import { useEffect, useRef, useState } from "react";
import { Wind, Thermometer, Wifi, Battery } from "lucide-react";

const Technology = () => {
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
      title: "Multi Air Flow",
      description:
        "Hệ thống luồng khí đa chiều phân phối đều nhiệt độ khắp ngăn tủ, giữ thực phẩm tươi lâu hơn.",
    },
    {
      icon: Thermometer,
      title: "Smart Cooling",
      description:
        "Cảm biến thông minh tự động điều chỉnh nhiệt độ theo từng ngăn, tối ưu năng lượng.",
    },
    {
      icon: Wifi,
      title: "IoT Connected",
      description:
        "Kết nối WiFi, điều khiển từ xa qua smartphone, nhận thông báo và cập nhật thông minh.",
    },
    {
      icon: Battery,
      title: "Eco Inverter",
      description:
        "Công nghệ Inverter tiên tiến tiết kiệm điện đến 40%, vận hành êm ái, bền bỉ.",
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
            Công nghệ
            <span className="text-primary"> Nổi bật</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tích hợp những công nghệ tiên tiến nhất cho trải nghiệm sử dụng hoàn hảo
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
