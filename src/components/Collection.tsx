import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import fridge1 from "@/assets/fridge-1.jpg";
import fridge2 from "@/assets/fridge-2.jpg";
import fridge3 from "@/assets/fridge-3.jpg";
import fridge4 from "@/assets/fridge-4.jpg";

interface FridgeModel {
  id: number;
  name: string;
  image: string;
  description: string;
  specs: string[];
}

const Collection = () => {
  const [selectedFridge, setSelectedFridge] = useState<FridgeModel | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const fridges: FridgeModel[] = [
    {
      id: 1,
      name: "μ-French Pro",
      image: fridge1,
      description: "Tủ lạnh French Door cao cấp với màn hình LED hiển thị nhiệt độ thông minh",
      specs: [
        "Dung tích: 650L",
        "Công nghệ Inverter tiết kiệm điện",
        "Khử mùi, kháng khuẩn Nano Silver",
        "Màn hình LED cảm ứng",
        "Ngăn đá tự động",
      ],
    },
    {
      id: 2,
      name: "μ-Side Elite",
      image: fridge2,
      description: "Thiết kế Side-by-Side sang trọng với hệ thống làm đá và lấy nước tự động",
      specs: [
        "Dung tích: 580L",
        "Làm đá tự động",
        "Lấy nước không cần mở cửa",
        "Công nghệ Multi Air Flow",
        "Tiết kiệm điện 35%",
      ],
    },
    {
      id: 3,
      name: "μ-Smart Connect",
      image: fridge3,
      description: "Tủ lạnh thông minh kết nối WiFi, điều khiển qua smartphone",
      specs: [
        "Dung tích: 450L",
        "Kết nối WiFi, App điều khiển",
        "Màn hình cảm ứng 10 inch",
        "AI dự đoán nhu cầu",
        "Compact, phù hợp căn hộ",
      ],
    },
    {
      id: 4,
      name: "μ-Prestige 4D",
      image: fridge4,
      description: "Đỉnh cao công nghệ với 4 cửa độc lập, cửa kính trong suốt cao cấp",
      specs: [
        "Dung tích: 720L",
        "4 cửa độc lập",
        "Cửa kính trong suốt",
        "Hệ thống làm lạnh 3 chiều",
        "Thiết kế Premium siêu sang",
      ],
    },
  ];

  return (
    <section
      id="collection"
      ref={sectionRef}
      className="py-16 lg:py-24 bg-background"
    >
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            Bộ sưu tập
            <span className="text-primary"> Cao cấp</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Khám phá dòng sản phẩm tủ lạnh thông minh với thiết kế đẳng cấp và công nghệ tiên tiến
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {fridges.map((fridge, index) => (
            <div
              key={fridge.id}
              className={`group transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-hover transition-all duration-300 hover:-translate-y-2">
                {/* Image */}
                <div className="aspect-[3/4] overflow-hidden bg-muted">
                  <img
                    src={fridge.image}
                    alt={fridge.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-foreground">
                    {fridge.name}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {fridge.description}
                  </p>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setSelectedFridge(fridge)}
                  >
                    Xem chi tiết
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <Dialog open={!!selectedFridge} onOpenChange={() => setSelectedFridge(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedFridge && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedFridge.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <img
                  src={selectedFridge.image}
                  alt={selectedFridge.name}
                  className="w-full rounded-lg"
                />
                <p className="text-muted-foreground">{selectedFridge.description}</p>
                <div>
                  <h4 className="font-semibold text-lg mb-3">Thông số kỹ thuật:</h4>
                  <ul className="space-y-2">
                    {selectedFridge.specs.map((spec, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span className="text-muted-foreground">{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Collection;
