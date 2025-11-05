import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRefrigerators } from "@/hooks/useRefrigerators";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeft, ShoppingCart, Star, Check, Truck, 
  Shield, Wrench, RefreshCw, Gift, User 
} from "lucide-react";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Cart from "@/components/Cart";
import LoginModal from "@/components/LoginModal";
import CustomerSupport from "@/components/CustomerSupport";
import type { RefrigeratorProduct } from "@/types/refrigerator.types";

interface Review {
  id: number;
  name: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

const getImagePath = (imagePath: string) => {
  const base = import.meta.env.BASE_URL || '/';
  return `${base}${imagePath.startsWith('/') ? imagePath.slice(1) : imagePath}`;
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data, isLoading } = useRefrigerators();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<RefrigeratorProduct | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '' });
  const [showReviewForm, setShowReviewForm] = useState(false);
  
  // Create images array from single image (since data only has 'image', not 'images')
  const images = product ? [product.image, product.image, product.image, product.image] : [];

  // Find product effect
  useEffect(() => {
    console.log('ProductDetail - ID from URL:', id);
    console.log('ProductDetail - Data:', data);
    
    if (data && id) {
      // Find product across all categories (ID is string, not number)
      let found: RefrigeratorProduct | null = null;
      for (const category of data.categories) {
        console.log('Searching in category:', category.name);
        const product = category.products.find(p => p.id === id);
        if (product) {
          console.log('Product found:', product);
          found = product;
          break;
        }
      }
      console.log('Final product:', found);
      setProduct(found);
    }
  }, [data, id]);

  // Initialize reviews effect - Load from localStorage or use default
  useEffect(() => {
    if (!product) return;
    
    const storageKey = `reviews_${product.id}`;
    const storedReviews = localStorage.getItem(storageKey);
    
    if (storedReviews) {
      // Load reviews from localStorage
      setReviews(JSON.parse(storedReviews));
    } else {
      // Use initial reviews
      const initialReviews: Review[] = [
        {
          id: 1,
          name: "Nguyễn Văn A",
          rating: 5,
          date: "20/10/2024",
          comment: "Tủ lạnh rất tốt, thiết kế đẹp, tiết kiệm điện. Gia đình tôi rất hài lòng với sản phẩm này!",
          verified: true
        },
        {
          id: 2,
          name: "Trần Thị B",
          rating: 5,
          date: "15/10/2024",
          comment: "Chất lượng xuất sắc, công nghệ làm lạnh rất tốt. Đồ ăn luôn tươi ngon. Giao hàng nhanh, lắp đặt chuyên nghiệp.",
          verified: true
        },
        {
          id: 3,
          name: "Lê Văn C",
          rating: 4,
          date: "10/10/2024",
          comment: "Sản phẩm tốt, giá cả hợp lý. Chỉ có điều thời gian giao hàng hơi lâu một chút.",
          verified: true
        },
        {
          id: 4,
          name: "Phạm Thị D",
          rating: 5,
          date: "05/10/2024",
          comment: "Sản phẩm chính hãng, chất lượng cao. Âm thanh hoạt động rất êm. PolarLux tư vấn và hỗ trợ rất tốt.",
          verified: true
        }
      ];
      setReviews(initialReviews);
      localStorage.setItem(storageKey, JSON.stringify(initialReviews));
    }
  }, [product]);

  // Show loading while data is being fetched
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  // Show not found only after data is loaded
  if (!isLoading && !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Không tìm thấy sản phẩm</h2>
          <Button onClick={() => navigate('/')}>Quay lại trang chủ</Button>
        </div>
      </div>
    );
  }

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product);
    toast.success('Đã thêm vào giỏ hàng', {
      description: product.name,
    });
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newReview.name.trim() || !newReview.comment.trim()) {
      toast.error('Vui lòng điền đầy đủ thông tin');
      return;
    }

    const review: Review = {
      id: reviews.length + 1,
      name: newReview.name,
      rating: newReview.rating,
      date: new Date().toLocaleDateString('vi-VN'),
      comment: newReview.comment,
      verified: false
    };

    const updatedReviews = [review, ...reviews];
    setReviews(updatedReviews);
    
    // Save to localStorage
    const storageKey = `reviews_${product.id}`;
    localStorage.setItem(storageKey, JSON.stringify(updatedReviews));
    
    setNewReview({ name: '', rating: 5, comment: '' });
    setShowReviewForm(false);
    toast.success('Cảm ơn bạn đã đánh giá!');
  };

  const avgRating = reviews.length > 0 ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length : 0;
  const ratingDistribution = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: reviews.filter(r => r.rating === star).length,
    percentage: reviews.length > 0 ? (reviews.filter(r => r.rating === star).length / reviews.length) * 100 : 0
  }));

  const policies = [
    {
      icon: Shield,
      title: t('policies.warranty.title'),
      items: [
        "Bảo hành chính hãng 24 tháng",
        "Tặng 6 tháng bảo hành mở rộng",
        "Hỗ trợ kỹ thuật 24/7"
      ]
    },
    {
      icon: Truck,
      title: t('policies.shipping.title'),
      items: [
        "Miễn phí vận chuyển toàn quốc",
        "Giao hàng trong 1-2 ngày",
        "Kiểm tra hàng trước khi thanh toán"
      ]
    },
    {
      icon: Wrench,
      title: t('policies.installation.title'),
      items: [
        "Lắp đặt miễn phí tại nhà",
        "Hướng dẫn sử dụng chi tiết",
        "Kiểm tra hoạt động trước khi bàn giao"
      ]
    },
    {
      icon: RefreshCw,
      title: t('policies.return.title'),
      items: [
        "Đổi mới trong 15 ngày",
        "1 đổi 1 trong 30 ngày",
        "Miễn phí vận chuyển đổi trả"
      ]
    },
    {
      icon: Gift,
      title: t('policies.promotion.title'),
      items: [
        "Trả góp 0% lãi suất",
        "Giảm giá 5-15%",
        "Quà tặng hấp dẫn"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 mt-20">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Quay lại
        </Button>

        {/* Product Main Info */}
        <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-10 mb-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
                <img
                  src={getImagePath(images[selectedImage])}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === idx ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={getImagePath(img)}
                      alt={`${product.name} ${idx + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold mb-2">{product.name}</h1>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(avgRating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600">
                    {avgRating.toFixed(1)} ({reviews.length} đánh giá)
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-baseline gap-4">
                  <span className="text-4xl font-bold text-primary">
                    {product.price.toLocaleString('vi-VN')}₫
                  </span>
                  <span className="text-xl text-gray-400 line-through">
                    {Math.round(product.price * 1.2).toLocaleString('vi-VN')}₫
                  </span>
                </div>
                <span className="inline-block bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                  Tiết kiệm {Math.round(product.price * 0.2).toLocaleString('vi-VN')}₫
                </span>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Thông số kỹ thuật:</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-primary" />
                    <span className="text-gray-700">Dung tích: {product.capacity}{product.capacityUnit}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-primary" />
                    <span className="text-gray-700">Điện năng: {product.energyRating}</span>
                  </div>
                  {product.specs.slice(0, 2).map((spec, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-primary" />
                      <span className="text-gray-700">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  size="lg"
                  className="flex-1"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Thêm vào giỏ
                </Button>
                <Button size="lg" className="flex-1" variant="outline">
                  Mua ngay
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="reviews" className="bg-white rounded-2xl shadow-lg p-6 lg:p-10">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="reviews">Đánh giá ({reviews.length})</TabsTrigger>
            <TabsTrigger value="specs">Thông số chi tiết</TabsTrigger>
            <TabsTrigger value="policies">Chính sách</TabsTrigger>
          </TabsList>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-8">
            {/* Rating Summary */}
            <div className="grid md:grid-cols-2 gap-8 p-6 bg-gray-50 rounded-xl">
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">{avgRating.toFixed(1)}</div>
                <div className="flex items-center justify-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-6 h-6 ${
                        i < Math.floor(avgRating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-600">{reviews.length} đánh giá</p>
              </div>

              <div className="space-y-2">
                {ratingDistribution.map(({ star, count, percentage }) => (
                  <div key={star} className="flex items-center gap-3">
                    <span className="text-sm font-medium w-12">{star} sao</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-12 text-right">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Add Review Button */}
            <div className="mb-6">
              <Button
                onClick={() => setShowReviewForm(!showReviewForm)}
                variant="outline"
                className="w-full md:w-auto"
              >
                {showReviewForm ? 'Ẩn form đánh giá' : '✍️ Viết đánh giá của bạn'}
              </Button>
            </div>

            {/* Review Form */}
            {showReviewForm && (
              <form onSubmit={handleSubmitReview} className="mb-8 p-6 bg-gray-50 rounded-xl">
                <h4 className="font-semibold text-lg mb-4">Đánh giá sản phẩm</h4>
                
                <div className="space-y-4">
                  {/* Name Input */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Tên của bạn <span className="text-red-500">*</span>
                    </label>
                    <Input
                      value={newReview.name}
                      onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                      placeholder="Nhập tên của bạn"
                      required
                    />
                  </div>

                  {/* Rating */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Đánh giá <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          onClick={() => setNewReview({ ...newReview, rating })}
                          className="transition-transform hover:scale-110"
                        >
                          <Star
                            className={`w-8 h-8 ${
                              rating <= newReview.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Comment */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Nhận xét của bạn <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm..."
                      rows={4}
                      required
                    />
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex gap-3">
                    <Button type="submit" className="flex-1">
                      Gửi đánh giá
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowReviewForm(false)}
                      className="flex-1"
                    >
                      Hủy
                    </Button>
                  </div>
                </div>
              </form>
            )}

            {/* Reviews List */}
            <div className="space-y-6">
              {reviews.length === 0 ? (
                <p className="text-center text-gray-500 py-8">Chưa có đánh giá nào. Hãy là người đầu tiên đánh giá sản phẩm này!</p>
              ) : (
                reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{review.name}</h4>
                        {review.verified && (
                          <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">
                            ✓ Đã mua hàng
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                    </div>
                  </div>
                </div>
                ))
              )}
            </div>
          </TabsContent>

          {/* Specs Tab */}
          <TabsContent value="specs" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <span className="font-semibold">Dung tích:</span>
                <span className="ml-2 text-gray-700">{product.capacity}{product.capacityUnit}</span>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <span className="font-semibold">Điện năng tiêu thụ:</span>
                <span className="ml-2 text-gray-700">{product.energyRating}</span>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <span className="font-semibold">Kích thước (RxSxC):</span>
                <span className="ml-2 text-gray-700">
                  {product.dimensions.width} x {product.dimensions.depth} x {product.dimensions.height} mm
                </span>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <span className="font-semibold">Màu sắc:</span>
                <span className="ml-2 text-gray-700">{product.color.join(', ')}</span>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold text-lg mb-4">Thông số chi tiết:</h3>
              <div className="space-y-2">
                {product.specs.map((spec, index) => (
                  <div key={index} className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold text-lg mb-4">Tính năng nổi bật:</h3>
              <div className="space-y-2">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Policies Tab */}
          <TabsContent value="policies" className="space-y-6">
            {policies.map((policy, index) => {
              const Icon = policy.icon;
              return (
                <div key={index} className="p-6 bg-gray-50 rounded-xl">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-3">{policy.title}</h3>
                      <ul className="space-y-2">
                        {policy.items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
      <Cart />
      <LoginModal />
      <CustomerSupport />
    </div>
  );
};

export default ProductDetail;
