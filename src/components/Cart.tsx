import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import { useState } from "react";
import CheckoutForm from "@/components/CheckoutForm";

// Helper function to get correct image path for GitHub Pages
const getImagePath = (imagePath: string) => {
  const base = import.meta.env.BASE_URL || '/';
  return `${base}${imagePath.startsWith('/') ? imagePath.slice(1) : imagePath}`;
};

const Cart = () => {
  const { items, isCartOpen, setCartOpen, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const handleCheckout = () => {
    setCartOpen(false); // Close cart first
    setShowCheckout(true);
  };

  return (
    <>
      <CheckoutForm 
        isOpen={showCheckout} 
        onClose={() => setShowCheckout(false)} 
      />
      <Sheet open={isCartOpen} onOpenChange={setCartOpen}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Giỏ hàng ({items.length} sản phẩm)
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <ShoppingCart className="w-16 h-16 text-muted-foreground mb-4" />
            <p className="text-lg font-medium text-muted-foreground mb-2">
              Giỏ hàng trống
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm
            </p>
            <Button onClick={() => setCartOpen(false)}>
              Tiếp tục mua sắm
            </Button>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            {/* Cart Items */}
            <div className="flex-1 py-6 space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4 p-4 bg-muted rounded-lg">
                  <img
                    src={getImagePath(item.product.image)}
                    alt={item.product.name}
                    className="w-20 h-20 object-contain rounded"
                  />
                  <div className="flex-1 space-y-2">
                    <h4 className="font-medium text-sm line-clamp-2">
                      {item.product.name}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {item.product.modelName}
                    </p>
                    <p className="font-bold text-primary">
                      {formatPrice(item.product.price)}
                    </p>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 ml-auto text-destructive"
                        onClick={() => removeFromCart(item.product.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="border-t pt-4 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Tạm tính:</span>
                  <span>{formatPrice(getTotalPrice())}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Phí vận chuyển:</span>
                  <span className="text-green-600">Miễn phí</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t">
                  <span>Tổng cộng:</span>
                  <span className="text-primary">{formatPrice(getTotalPrice())}</span>
                </div>
              </div>

              <Button
                className="w-full"
                size="lg"
                onClick={handleCheckout}
              >
                Đặt hàng
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setCartOpen(false)}
              >
                Tiếp tục mua sắm
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
    </>
  );
};

export default Cart;
