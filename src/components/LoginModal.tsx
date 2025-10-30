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
import { useTranslation } from "react-i18next";

// Schemas will be created inside component to access t()
const createLoginSchema = (t: any) => z.object({
  email: z.string().email(t('auth.validation.emailInvalid')),
  password: z.string().min(6, t('auth.validation.passwordMin')),
});

const createRegisterSchema = (t: any) => z.object({
  fullName: z.string().min(2, t('auth.validation.nameRequired')),
  email: z.string().email(t('auth.validation.emailInvalid')),
  phone: z.string().regex(/^0[0-9]{9}$/, t('auth.validation.phoneInvalid')),
  password: z.string().min(6, t('auth.validation.passwordMin')),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: t('auth.validation.passwordsNotMatch'),
  path: ["confirmPassword"],
});

type LoginFormData = {
  email: string;
  password: string;
};

type RegisterFormData = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

const LoginModal = () => {
  const { t } = useTranslation();
  const { isLoginOpen, setLoginOpen, login } = useCart();
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(createLoginSchema(t)),
  });

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(createRegisterSchema(t)),
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
      toast.success(t('auth.welcome', { name: user.fullName }));
      setLoginOpen(false);
      loginForm.reset();
    } else {
      toast.error(t('common.error'));
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
      toast.error(t('common.error'));
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
    
    toast.success(t('common.success'));
    setLoginOpen(false);
    registerForm.reset();
  };

  return (
    <Dialog open={isLoginOpen} onOpenChange={setLoginOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('auth.login')} / {t('auth.register')}</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "login" | "register")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">{t('auth.login')}</TabsTrigger>
            <TabsTrigger value="register">{t('auth.register')}</TabsTrigger>
          </TabsList>

          {/* Login Tab */}
          <TabsContent value="login">
            <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
              <div>
                <Label htmlFor="login-email">{t('auth.email')}</Label>
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
                <Label htmlFor="login-password">{t('auth.password')}</Label>
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
                {t('auth.loginButton')}
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
                <Label htmlFor="register-fullName">{t('auth.fullName')}</Label>
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
                <Label htmlFor="register-email">{t('auth.email')}</Label>
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
                <Label htmlFor="register-phone">{t('auth.phone')}</Label>
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
                <Label htmlFor="register-password">{t('auth.password')}</Label>
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
                <Label htmlFor="register-confirmPassword">{t('auth.confirmPassword')}</Label>
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
                {t('auth.registerButton')}
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
