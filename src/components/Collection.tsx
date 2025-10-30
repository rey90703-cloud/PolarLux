import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRefrigerators } from "@/hooks/useRefrigerators";
import { useCart } from "@/contexts/CartContext";
import type { RefrigeratorProduct } from "@/types/refrigerator.types";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";

// Helper function to get correct image path for GitHub Pages
const getImagePath = (imagePath: string) => {
  const base = import.meta.env.BASE_URL || '/';
  return `${base}${imagePath.startsWith('/') ? imagePath.slice(1) : imagePath}`;
};

// Helper function to calculate original price (simulate discount)
const getOriginalPrice = (currentPrice: number): number => {
  // Simulate 10-20% discount
  const discountPercent = Math.floor(Math.random() * 11) + 10; // 10-20%
  return Math.round(currentPrice / (1 - discountPercent / 100));
};

// Helper function to get rating (simulate ratings)
const getRating = (modelName: string): { stars: number; count: number } => {
  // Generate consistent rating based on model name
  const hash = modelName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const stars = 4 + (hash % 11) / 10; // 4.0 - 5.0
  const count = 50 + (hash % 450); // 50 - 500 reviews
  return { stars: Math.round(stars * 10) / 10, count };
};

const Collection = () => {
  const { data, isLoading, error } = useRefrigerators();
  const { addToCart, setCartOpen } = useCart();
  const [selectedFridge, setSelectedFridge] = useState<RefrigeratorProduct | null>(null);
  const [isVisible, setIsVisible] = useState(true); // Set true để hiển thị ngay
  const [activePriceRange, setActivePriceRange] = useState("low");
  const [searchQuery, setSearchQuery] = useState("");
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

  // Group all products by price range
  const allProducts = data.categories.flatMap(cat => cat.products);
  
  const priceRanges = [
    {
      id: 'low',
      name: 'Phân Khúc THẤP',
      description: 'Dưới 15 triệu - Phù hợp cho mọi gia đình',
      min: 0,
      max: 15000000,
    },
    {
      id: 'medium',
      name: 'Phân Khúc TRUNG BÌNH',
      description: '15-40 triệu - Công nghệ hiện đại, thiết kế đẹp',
      min: 15000000,
      max: 40000000,
    },
    {
      id: 'high',
      name: 'Phân Khúc CAO',
      description: 'Trên 40 triệu - Thiết kế sang trọng, đỉnh cao công nghệ',
      min: 40000000,
      max: Infinity,
    },
  ];

  // Filter by search query
  const filteredProducts = searchQuery.trim()
    ? allProducts.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.modelName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allProducts;

  const productsByPrice = priceRanges.map(range => ({
    ...range,
    products: filteredProducts.filter(p => p.price >= range.min && p.price < range.max)
  }));

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
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            {data.metadata.totalProducts} sản phẩm tủ lạnh Samsung chính hãng tại Việt Nam
          </p>
          
          {/* Search Bar */}
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm theo tên, model..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 border-2 border-muted rounded-lg focus:outline-none focus:border-primary transition-colors"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
            </div>
            {searchQuery && (
              <p className="text-sm text-muted-foreground mt-2">
                Tìm thấy {filteredProducts.length} sản phẩm
              </p>
            )}
          </div>
        </div>

        {/* Price Range Tabs */}
        <Tabs value={activePriceRange} onValueChange={setActivePriceRange} className="w-full">
          <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-3 mb-8">
            {productsByPrice.map((range) => (
              <TabsTrigger key={range.id} value={range.id}>
                {range.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {productsByPrice.map((range) => (
            <TabsContent key={range.id} value={range.id}>
              {/* Price Range Description */}
              <div className="text-center mb-8">
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {range.description}
                </p>
                <p className="text-sm text-primary font-semibold mt-2">
                  {range.products.length} sản phẩm
                </p>
              </div>

              {/* Product Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {range.products.map((fridge, index) => (
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
                    src={getImagePath(fridge.image)}
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

                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(getRating(fridge.modelName).stars) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 fill-gray-300'}`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-xs text-muted-foreground ml-1">
                      {getRating(fridge.modelName).stars} ({getRating(fridge.modelName).count})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="space-y-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold text-primary">
                        {fridge.priceFormatted}
                      </span>
                      <span className="text-xs line-through text-muted-foreground">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(getOriginalPrice(fridge.price))}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded font-semibold">
                        Tiết kiệm {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(getOriginalPrice(fridge.price) - fridge.price)}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {fridge.capacity}{fridge.capacityUnit}
                      </span>
                    </div>
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
                    src={getImagePath(selectedFridge.image)}
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
