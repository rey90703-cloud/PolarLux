import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  const scrollToCollection = () => {
    const element = document.getElementById("collection");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Modern kitchen with premium refrigerator"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-6 lg:space-y-8 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white text-balance leading-tight">
            Công nghệ làm lạnh
            <br />
            <span className="bg-gradient-to-r from-primary-light to-secondary bg-clip-text text-transparent">
              Tương lai
            </span>
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-2xl mx-auto text-balance">
            Trải nghiệm sự kết hợp hoàn hảo giữa thiết kế hiện đại và công nghệ tiên tiến.
            Tiết kiệm năng lượng, thân thiện môi trường.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button
              variant="hero"
              size="lg"
              onClick={scrollToCollection}
              className="shadow-hover"
            >
              Xem bộ sưu tập
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
              className="border-white text-white hover:bg-white hover:text-primary"
            >
              Tìm hiểu thêm
            </Button>
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
