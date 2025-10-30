import { Mail, User, ShoppingCart, ChevronDown, LogOut } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Badge } from "@/components/ui/badge";

const HeaderTop = () => {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { getTotalItems, setCartOpen, setLoginOpen, user, logout } = useCart();

  return (
    <div className="bg-foreground text-white py-2 text-sm">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Left: Contact Info */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span className="hidden sm:inline">info@mu-fridge.com</span>
            </div>
          </div>

          {/* Right: Language, Login, Cart */}
          <div className="flex items-center gap-4 lg:gap-6">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <span className="text-xs">🇬🇧</span>
                <span className="hidden sm:inline">English</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              
              {isLangOpen && (
                <div className="absolute top-full right-0 mt-2 bg-white text-foreground rounded-md shadow-lg py-2 min-w-[120px] z-50">
                  <button
                    onClick={() => setIsLangOpen(false)}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors flex items-center gap-2"
                  >
                    <span className="text-xs">🇻🇳</span>
                    <span>VietNam</span>
                  </button>
                  <button
                    onClick={() => setIsLangOpen(false)}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors flex items-center gap-2"
                  >
                    <span className="text-xs">🇬🇧</span>
                    <span>English</span>
                  </button>
                </div>
              )}
            </div>

            {/* Login/User */}
            {user ? (
              <div className="flex items-center gap-3">
                <span className="hidden sm:inline text-xs">
                  Xin chào, {user.fullName}
                </span>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 hover:text-primary transition-colors"
                  title="Đăng xuất"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setLoginOpen(true)}
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Đăng nhập</span>
              </button>
            )}

            {/* Cart */}
            <button
              onClick={() => setCartOpen(true)}
              className="flex items-center gap-2 hover:text-primary transition-colors relative"
            >
              <div className="relative">
                <ShoppingCart className="w-4 h-4" />
                {getTotalItems() > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center text-[10px]">
                    {getTotalItems()}
                  </Badge>
                )}
              </div>
              <span className="hidden sm:inline">Giỏ hàng</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;

