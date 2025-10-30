import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useCart } from "@/contexts/CartContext";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const checkoutSchema = z.object({
  fullName: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự"),
  phone: z.string().regex(/^0[0-9]{9}$/, "Số điện thoại không hợp lệ"),
  email: z.string().email("Email không hợp lệ"),
  address: z.string().min(10, "Địa chỉ phải có ít nhất 10 ký tự"),
  city: z.string().min(2, "Vui lòng chọn Tỉnh/Thành phố"),
  district: z.string().min(2, "Vui lòng chọn Quận/Huyện"),
  ward: z.string().min(2, "Vui lòng chọn Phường/Xã"),
  paymentMethod: z.enum(["cod", "bank_transfer", "credit_card"]),
  notes: z.string().optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

interface CheckoutFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const CheckoutForm = ({ isOpen, onClose }: CheckoutFormProps) => {
  const { items, getTotalPrice, clearCart, setCartOpen, user } = useCart();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderId, setOrderId] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: user?.fullName || "",
      email: user?.email || "",
      phone: user?.phone || "",
      paymentMethod: "cod",
    },
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const onSubmit = (data: CheckoutFormData) => {
    // Giả lập gửi đơn hàng
    const newOrderId = `DH${Date.now()}`;
    setOrderId(newOrderId);
    
    // Lưu vào localStorage (giả lập)
    const order = {
      id: newOrderId,
      ...data,
      items,
      totalAmount: getTotalPrice(),
      createdAt: new Date().toISOString(),
      status: 'pending',
    };
    
    const orders = JSON.parse(localStorage.getItem('samsung-orders') || '[]');
    orders.push(order);
    localStorage.setItem('samsung-orders', JSON.stringify(orders));
    
    // Clear cart và hiển thị success
    clearCart();
    setIsSubmitted(true);
    
    toast.success('Đặt hàng thành công!', {
      description: `Mã đơn hàng: ${newOrderId}`,
    });
  };

  const paymentMethod = watch("paymentMethod");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center py-12 text-center px-4">
            <CheckCircle className="w-20 h-20 text-green-600 mb-6" />
            <h3 className="text-2xl font-bold mb-2">Đặt hàng thành công!</h3>
            <p className="text-muted-foreground mb-2">
              Cảm ơn bạn đã đặt hàng tại <span style={{ color: '#3b93bd' }}>Polar</span><span style={{ color: '#C0C0C0' }}>Lux</span>
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Mã đơn hàng: <span className="font-mono font-bold">{orderId}</span>
            </p>
            <p className="text-sm text-muted-foreground mb-8 max-w-md">
              Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất để xác nhận đơn hàng.
            </p>
            <Button
              size="lg"
              onClick={() => {
                setIsSubmitted(false);
                onClose();
              }}
            >
              Tiếp tục mua sắm
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">Thông tin đặt hàng</DialogTitle>
            </DialogHeader>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Thông tin khách hàng */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Thông tin khách hàng</h3>
          
          <div>
            <Label htmlFor="fullName">Họ và tên *</Label>
            <Input
              id="fullName"
              {...register("fullName")}
              placeholder="Nguyễn Văn A"
            />
            {errors.fullName && (
              <p className="text-sm text-destructive mt-1">{errors.fullName.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Số điện thoại *</Label>
              <Input
                id="phone"
                {...register("phone")}
                placeholder="0901234567"
              />
              {errors.phone && (
                <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="email@example.com"
              />
              {errors.email && (
                <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Địa chỉ giao hàng */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Địa chỉ giao hàng</h3>
          
          <div>
            <Label htmlFor="address">Địa chỉ cụ thể *</Label>
            <Input
              id="address"
              {...register("address")}
              placeholder="Số nhà, tên đường..."
            />
            {errors.address && (
              <p className="text-sm text-destructive mt-1">{errors.address.message}</p>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="city">Tỉnh/Thành phố *</Label>
              <Input
                id="city"
                {...register("city")}
                placeholder="TP.HCM"
              />
              {errors.city && (
                <p className="text-sm text-destructive mt-1">{errors.city.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="district">Quận/Huyện *</Label>
              <Input
                id="district"
                {...register("district")}
                placeholder="Quận 1"
              />
              {errors.district && (
                <p className="text-sm text-destructive mt-1">{errors.district.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="ward">Phường/Xã *</Label>
              <Input
                id="ward"
                {...register("ward")}
                placeholder="Phường Bến Nghé"
              />
              {errors.ward && (
                <p className="text-sm text-destructive mt-1">{errors.ward.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Phương thức thanh toán */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Phương thức thanh toán</h3>
          <RadioGroup defaultValue="cod" {...register("paymentMethod")}>
            <div className="flex items-center space-x-2 p-4 border rounded-lg">
              <RadioGroupItem value="cod" id="cod" />
              <Label htmlFor="cod" className="cursor-pointer flex-1">
                <div>
                  <p className="font-medium">Thanh toán khi nhận hàng (COD)</p>
                  <p className="text-sm text-muted-foreground">
                    Thanh toán bằng tiền mặt khi nhận hàng
                  </p>
                </div>
              </Label>
            </div>

            <div className="flex items-center space-x-2 p-4 border rounded-lg">
              <RadioGroupItem value="bank_transfer" id="bank_transfer" />
              <Label htmlFor="bank_transfer" className="cursor-pointer flex-1">
                <div>
                  <p className="font-medium">Chuyển khoản ngân hàng</p>
                  <p className="text-sm text-muted-foreground">
                    Chuyển khoản trước khi nhận hàng
                  </p>
                </div>
              </Label>
            </div>

            <div className="flex items-center space-x-2 p-4 border rounded-lg">
              <RadioGroupItem value="credit_card" id="credit_card" />
              <Label htmlFor="credit_card" className="cursor-pointer flex-1">
                <div>
                  <p className="font-medium">Thẻ tín dụng/Ghi nợ</p>
                  <p className="text-sm text-muted-foreground">
                    Visa, Mastercard, JCB
                  </p>
                </div>
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Ghi chú */}
        <div>
          <Label htmlFor="notes">Ghi chú đơn hàng (tùy chọn)</Label>
          <Textarea
            id="notes"
            {...register("notes")}
            placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn."
            rows={3}
          />
        </div>

        {/* Order Summary */}
        <div className="bg-muted p-4 rounded-lg space-y-2">
          <h3 className="font-semibold mb-3">Đơn hàng ({items.length} sản phẩm)</h3>
          {items.map((item) => (
            <div key={item.product.id} className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {item.product.name} x{item.quantity}
              </span>
              <span>{formatPrice(item.product.price * item.quantity)}</span>
            </div>
          ))}
          <div className="flex justify-between text-sm pt-2 border-t">
            <span className="text-muted-foreground">Phí vận chuyển:</span>
            <span className="text-green-600">Miễn phí</span>
          </div>
          <div className="flex justify-between text-lg font-bold pt-2 border-t">
            <span>Tổng cộng:</span>
            <span className="text-primary">{formatPrice(getTotalPrice())}</span>
          </div>
        </div>

        {/* Submit Button */}
        <Button type="submit" size="lg" className="w-full">
          Đặt hàng
        </Button>
      </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutForm;
