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
import { useTranslation } from "react-i18next";

// Schema will be created inside component to access t()
const createCheckoutSchema = (t: any) => z.object({
  fullName: z.string().min(2, t('checkout.validation.nameMin')),
  phone: z.string().regex(/^0[0-9]{9}$/, t('checkout.validation.phoneInvalid')),
  email: z.string().email(t('checkout.validation.emailInvalid')),
  address: z.string().min(10, t('checkout.validation.addressRequired')),
  city: z.string().min(2, t('checkout.validation.cityRequired')),
  district: z.string().min(2, t('checkout.validation.districtRequired')),
  ward: z.string().min(2, t('checkout.validation.wardRequired')),
  paymentMethod: z.enum(["cod", "bank_transfer", "credit_card"]),
  notes: z.string().optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

interface CheckoutFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const CheckoutForm = ({ isOpen, onClose }: CheckoutFormProps) => {
  const { t } = useTranslation();
  const { items, getTotalPrice, clearCart, setCartOpen, user } = useCart();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderId, setOrderId] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(createCheckoutSchema(t)),
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
    
    toast.success(t('checkout.success'), {
      description: `${t('checkout.orderSummary')}: ${newOrderId}`,
    });
  };

  const paymentMethod = watch("paymentMethod");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center py-12 text-center px-4">
            <CheckCircle className="w-20 h-20 text-green-600 mb-6" />
            <h3 className="text-2xl font-bold mb-2">{t('checkout.success')}</h3>
            <p className="text-muted-foreground mb-2">
              Cảm ơn bạn đã đặt hàng tại <span style={{ color: '#3b93bd' }}>Polar</span><span style={{ color: '#C0C0C0' }}>Lux</span>
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              {t('checkout.orderSummary')}: <span className="font-mono font-bold">{orderId}</span>
            </p>
            <p className="text-sm text-muted-foreground mb-8 max-w-md">
              {t('checkout.success')}
            </p>
            <Button
              size="lg"
              onClick={() => {
                setIsSubmitted(false);
                onClose();
              }}
            >
              {t('cart.continueShopping')}
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">{t('checkout.title')}</DialogTitle>
            </DialogHeader>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Thông tin khách hàng */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">{t('checkout.customerInfo')}</h3>
          
          <div>
            <Label htmlFor="fullName">{t('checkout.fullName')} *</Label>
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
              <Label htmlFor="phone">{t('checkout.phone')} *</Label>
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
              <Label htmlFor="email">{t('checkout.email')} *</Label>
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
          <h3 className="font-semibold text-lg">{t('checkout.address')}</h3>
          
          <div>
            <Label htmlFor="address">{t('checkout.address')} *</Label>
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
              <Label htmlFor="city">{t('checkout.city')} *</Label>
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
              <Label htmlFor="district">{t('checkout.district')} *</Label>
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
              <Label htmlFor="ward">{t('checkout.ward')} *</Label>
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
          <h3 className="font-semibold text-lg">{t('checkout.paymentMethod')}</h3>
          <RadioGroup defaultValue="cod" {...register("paymentMethod")}>
            <div className="flex items-center space-x-2 p-4 border rounded-lg">
              <RadioGroupItem value="cod" id="cod" />
              <Label htmlFor="cod" className="cursor-pointer flex-1">
                <div>
                  <p className="font-medium">{t('checkout.cod')}</p>
                  <p className="text-sm text-muted-foreground">
                    {t('checkout.cod')}
                  </p>
                </div>
              </Label>
            </div>

            <div className="flex items-center space-x-2 p-4 border rounded-lg">
              <RadioGroupItem value="bank_transfer" id="bank_transfer" />
              <Label htmlFor="bank_transfer" className="cursor-pointer flex-1">
                <div>
                  <p className="font-medium">{t('checkout.bankTransfer')}</p>
                  <p className="text-sm text-muted-foreground">
                    {t('checkout.bankTransfer')}
                  </p>
                </div>
              </Label>
            </div>

            <div className="flex items-center space-x-2 p-4 border rounded-lg">
              <RadioGroupItem value="credit_card" id="credit_card" />
              <Label htmlFor="credit_card" className="cursor-pointer flex-1">
                <div>
                  <p className="font-medium">{t('checkout.creditCard')}</p>
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
          <Label htmlFor="notes">{t('checkout.notes')}</Label>
          <Textarea
            id="notes"
            {...register("notes")}
            placeholder={t('checkout.notesPlaceholder')}
            rows={3}
          />
        </div>

        {/* Order Summary */}
        <div className="bg-muted p-4 rounded-lg space-y-2">
          <h3 className="font-semibold mb-3">{t('checkout.orderSummary')} ({t('cart.items', { count: items.length })})</h3>
          {items.map((item) => (
            <div key={item.product.id} className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {item.product.name} x{item.quantity}
              </span>
              <span>{formatPrice(item.product.price * item.quantity)}</span>
            </div>
          ))}
          <div className="flex justify-between text-sm pt-2 border-t">
            <span className="text-muted-foreground">{t('cart.shipping')}:</span>
            <span className="text-green-600">{t('cart.freeShipping')}</span>
          </div>
          <div className="flex justify-between text-lg font-bold pt-2 border-t">
            <span>{t('cart.total')}:</span>
            <span className="text-primary">{formatPrice(getTotalPrice())}</span>
          </div>
        </div>

        {/* Submit Button */}
        <Button type="submit" size="lg" className="w-full">
          {t('checkout.placeOrder')}
        </Button>
      </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutForm;
