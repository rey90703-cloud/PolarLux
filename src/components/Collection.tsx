import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRefrigerators } from "@/hooks/useRefrigerators";
import { useCart } from "@/contexts/CartContext";
import type { RefrigeratorProduct } from "@/types/refrigerator.types";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";

const Collection = () => {
  const { data, isLoading, error } = useRefrigerators();
  const { addToCart, setCartOpen } = useCart();
  const [selectedFridge, setSelectedFridge] = useState<RefrigeratorProduct | null>(null);
  const [isVisible, setIsVisible] = useState(true); // Set true để hiển thị ngay
  const [activeCategory, setActiveCategory] = useState("top-freezer");
  const sectionRef = useRef<HTMLDivElement>(null);

  console.log('Collection render:', { data, isLoading, error });

  const handleAddToCart = (product: RefrigeratorProduct, showCart = true) => {
    addToCart(product);
    toast.success("Đã thêm vào giỏ hàng", {
      description: product.name,
    });
    if (showCart) {
      setCartOpen(true);
    }
  };

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
      // Check if already in viewport
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setIsVisible(true);
      }
      
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (isLoading) {
    return (
      <section id="collection" className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center">Đang tải sản phẩm...</div>
        </div>
      </section>
    );
  }

  if (error || !data) {
    return (
      <section id="collection" className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center text-red-500">Lỗi tải dữ liệu sản phẩm</div>
        </div>
      </section>
    );
  }

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
            Tủ lạnh
            <span className="text-primary"> Samsung</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {data.metadata.totalProducts} sản phẩm tủ lạnh Samsung chính hãng tại Việt Nam
          </p>
        </div>

        {/* Category Tabs */}
        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
          <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-3 mb-8">
            {data.categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {data.categories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              {/* Category Description */}
              <div className="text-center mb-8">
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {category.description}
                </p>
              </div>

              {/* Product Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {category.products.map((fridge, index) => (
            <div
              key={fridge.id}
              className={`group transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-hover transition-all duration-300 hover:-translate-y-2">
                {/* Image */}
                <div className="aspect-square overflow-hidden bg-muted">
                  <img
                    src={fridge.image}
                    alt={fridge.name}
                    className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground font-medium">{fridge.modelName}</p>
                    <h3 className="text-sm font-bold text-foreground line-clamp-2 min-h-[2.5rem]">
                      {fridge.name}
                    </h3>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold text-primary">
                      {fridge.priceFormatted}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {fridge.capacity}{fridge.capacityUnit}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {fridge.features.slice(0, 2).map((feature, i) => (
                      <span key={i} className="text-xs bg-secondary px-2 py-1 rounded-md">
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedFridge(fridge)}
                    >
                      Chi tiết
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleAddToCart(fridge)}
                      className="gap-1"
                    >
                      <ShoppingCart className="w-3 h-3" />
                      Mua
                    </Button>
                  </div>
                </div>
              </div>
            </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Modal */}
      <Dialog open={!!selectedFridge} onOpenChange={() => setSelectedFridge(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedFridge && (
            <>
              <DialogHeader>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{selectedFridge.modelName}</p>
                  <DialogTitle className="text-2xl">{selectedFridge.name}</DialogTitle>
                </div>
              </DialogHeader>
              <div className="space-y-6">
                <div className="bg-muted rounded-lg p-6 flex items-center justify-center">
                  <img
                    src={selectedFridge.image}
                    alt={selectedFridge.name}
                    className="max-h-96 object-contain"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Dung tích</p>
                    <p className="text-xl font-bold text-primary">{selectedFridge.capacity}{selectedFridge.capacityUnit}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Giá</p>
                    <p className="text-xl font-bold text-primary">{selectedFridge.priceFormatted}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Tiết kiệm điện</p>
                    <p className="text-xl font-bold text-primary">{selectedFridge.energyRating}</p>
                  </div>
                </div>

                <div>
                  <p className="text-muted-foreground">{selectedFridge.description}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-3">Tính năng nổi bật:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedFridge.features.map((feature, index) => (
                      <span key={index} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-3">Thông số kỹ thuật:</h4>
                  <ul className="space-y-2">
                    {selectedFridge.specs.map((spec, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary mt-1">✓</span>
                        <span className="text-muted-foreground">{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-3">Kích thước:</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Rộng</p>
                      <p className="font-semibold">{selectedFridge.dimensions.width}mm</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Cao</p>
                      <p className="font-semibold">{selectedFridge.dimensions.height}mm</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Sâu</p>
                      <p className="font-semibold">{selectedFridge.dimensions.depth}mm</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-2">Màu sắc:</h4>
                  <p className="text-muted-foreground">{selectedFridge.color.join(", ")}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    size="lg"
                    className="flex-1 gap-2"
                    onClick={() => {
                      handleAddToCart(selectedFridge);
                      setSelectedFridge(null);
                    }}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Mua ngay
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => {
                      handleAddToCart(selectedFridge, false);
                      setSelectedFridge(null);
                    }}
                  >
                    Thêm vào giỏ
                  </Button>
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
