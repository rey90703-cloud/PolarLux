import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

const registerSchema = z.object({
  fullName: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự"),
  email: z.string().email("Email không hợp lệ"),
  phone: z.string().regex(/^0[0-9]{9}$/, "Số điện thoại không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Mật khẩu xác nhận không khớp",
  path: ["confirmPassword"],
});

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

const LoginModal = () => {
  const { isLoginOpen, setLoginOpen, login } = useCart();
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onLogin = (data: LoginFormData) => {
    // Giả lập đăng nhập
    const savedUsers = JSON.parse(localStorage.getItem('samsung-users') || '[]') as Array<{
      id: string;
      email: string;
      fullName: string;
      phone: string;
      password: string;
      createdAt: string;
    }>;
    const user = savedUsers.find((u) => u.email === data.email);
    
    if (user && user.password === data.password) {
      login({
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        phone: user.phone,
        createdAt: new Date(user.createdAt),
      });
      toast.success(`Chào mừng ${user.fullName}!`);
      setLoginOpen(false);
      loginForm.reset();
    } else {
      toast.error('Email hoặc mật khẩu không đúng!');
    }
  };

  const onRegister = (data: RegisterFormData) => {
    // Giả lập đăng ký
    const savedUsers = JSON.parse(localStorage.getItem('samsung-users') || '[]') as Array<{
      id: string;
      email: string;
      fullName: string;
      phone: string;
      password: string;
      createdAt: string;
    }>;
    
    // Check email exists
    if (savedUsers.some((u) => u.email === data.email)) {
      toast.error('Email đã được sử dụng!');
      return;
    }
    
    const newUser = {
      id: `USER${Date.now()}`,
      email: data.email,
      fullName: data.fullName,
      phone: data.phone,
      password: data.password, // Trong thực tế phải hash
      createdAt: new Date().toISOString(),
    };
    
    savedUsers.push(newUser);
    localStorage.setItem('samsung-users', JSON.stringify(savedUsers));
    
    // Auto login
    login({
      id: newUser.id,
      email: newUser.email,
      fullName: newUser.fullName,
      phone: newUser.phone,
      createdAt: new Date(newUser.createdAt),
    });
    
    toast.success('Đăng ký thành công!');
    setLoginOpen(false);
    registerForm.reset();
  };

  return (
    <Dialog open={isLoginOpen} onOpenChange={setLoginOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Đăng nhập / Đăng ký</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "login" | "register")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Đăng nhập</TabsTrigger>
            <TabsTrigger value="register">Đăng ký</TabsTrigger>
          </TabsList>

          {/* Login Tab */}
          <TabsContent value="login">
            <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
              <div>
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  {...loginForm.register("email")}
                  placeholder="email@example.com"
                />
                {loginForm.formState.errors.email && (
                  <p className="text-sm text-destructive mt-1">
                    {loginForm.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="login-password">Mật khẩu</Label>
                <Input
                  id="login-password"
                  type="password"
                  {...loginForm.register("password")}
                  placeholder="••••••"
                />
                {loginForm.formState.errors.password && (
                  <p className="text-sm text-destructive mt-1">
                    {loginForm.formState.errors.password.message}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full">
                Đăng nhập
              </Button>

              <p className="text-sm text-center text-muted-foreground">
                Chưa có tài khoản?{" "}
                <button
                  type="button"
                  onClick={() => setActiveTab("register")}
                  className="text-primary hover:underline"
                >
                  Đăng ký ngay
                </button>
              </p>
            </form>
          </TabsContent>

          {/* Register Tab */}
          <TabsContent value="register">
            <form onSubmit={registerForm.handleSubmit(onRegister)} className="space-y-4">
              <div>
                <Label htmlFor="register-fullName">Họ và tên</Label>
                <Input
                  id="register-fullName"
                  {...registerForm.register("fullName")}
                  placeholder="Nguyễn Văn A"
                />
                {registerForm.formState.errors.fullName && (
                  <p className="text-sm text-destructive mt-1">
                    {registerForm.formState.errors.fullName.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="register-email">Email</Label>
                <Input
                  id="register-email"
                  type="email"
                  {...registerForm.register("email")}
                  placeholder="email@example.com"
                />
                {registerForm.formState.errors.email && (
                  <p className="text-sm text-destructive mt-1">
                    {registerForm.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="register-phone">Số điện thoại</Label>
                <Input
                  id="register-phone"
                  {...registerForm.register("phone")}
                  placeholder="0901234567"
                />
                {registerForm.formState.errors.phone && (
                  <p className="text-sm text-destructive mt-1">
                    {registerForm.formState.errors.phone.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="register-password">Mật khẩu</Label>
                <Input
                  id="register-password"
                  type="password"
                  {...registerForm.register("password")}
                  placeholder="••••••"
                />
                {registerForm.formState.errors.password && (
                  <p className="text-sm text-destructive mt-1">
                    {registerForm.formState.errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="register-confirmPassword">Xác nhận mật khẩu</Label>
                <Input
                  id="register-confirmPassword"
                  type="password"
                  {...registerForm.register("confirmPassword")}
                  placeholder="••••••"
                />
                {registerForm.formState.errors.confirmPassword && (
                  <p className="text-sm text-destructive mt-1">
                    {registerForm.formState.errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full">
                Đăng ký
              </Button>

              <p className="text-sm text-center text-muted-foreground">
                Đã có tài khoản?{" "}
                <button
                  type="button"
                  onClick={() => setActiveTab("login")}
                  className="text-primary hover:underline"
                >
                  Đăng nhập
                </button>
              </p>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
