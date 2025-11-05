import { useState } from "react";
import { 
  Phone, Mail, Headphones, MessageSquare
} from "lucide-react";
import { useTranslation } from "react-i18next";
import zaloIcon from "@/assets/zalo-icon.png";

// Telegram Icon
const TelegramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
  </svg>
);

// WhatsApp Icon
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const CustomerSupport = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const supportChannels = [
    {
      name: "Hotline",
      icon: Phone,
      link: "tel:1900xxxx",
      bgColor: "bg-green-500 hover:bg-green-600",
      label: "1900 xxxx",
      isImage: false
    },
    {
      name: "Zalo",
      icon: zaloIcon,
      link: "https://zalo.me/84123456789",
      bgColor: "bg-white hover:bg-gray-100",
      label: "Chat Zalo",
      isImage: true
    },
    {
      name: "WhatsApp",
      icon: WhatsAppIcon,
      link: "https://wa.me/84123456789",
      bgColor: "bg-green-600 hover:bg-green-700",
      label: "WhatsApp",
      isImage: false
    },
    {
      name: "Telegram",
      icon: TelegramIcon,
      link: "https://t.me/polarlux",
      bgColor: "bg-blue-400 hover:bg-blue-500",
      label: "Telegram",
      isImage: false
    },
    {
      name: "Email",
      icon: Mail,
      link: "mailto:support@polarlux.vn",
      bgColor: "bg-red-500 hover:bg-red-600",
      label: "Email",
      isImage: false
    },
    {
      name: "Messenger",
      icon: MessageSquare,
      link: "https://m.me/polarlux",
      bgColor: "bg-blue-600 hover:bg-blue-700",
      label: "Messenger",
      isImage: false
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Support Channel Buttons - Appear when open */}
      <div className={`flex flex-col gap-3 mb-4 transition-all duration-300 ${
        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}>
        {supportChannels.map((channel, index) => {
          return (
            <a
              key={index}
              href={channel.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative ${channel.bgColor} text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110`}
              style={{
                transitionDelay: isOpen ? `${index * 50}ms` : '0ms',
                animation: isOpen ? `slideInRight 0.3s ease-out ${index * 0.05}s both` : 'none'
              }}
              aria-label={channel.label}
            >
              {channel.isImage ? (
                <img src={channel.icon as string} alt={channel.name} className="w-6 h-6 object-contain" />
              ) : (
                (() => {
                  const Icon = channel.icon as React.ComponentType<{ className?: string }>;
                  return <Icon className="w-6 h-6" />;
                })()
              )}
              
              {/* Tooltip */}
              <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                {channel.label}
                <span className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900"></span>
              </span>
            </a>
          );
        })}
      </div>

      {/* Main Support Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-primary hover:bg-primary/90 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 ${
          isOpen ? 'rotate-45' : 'rotate-0'
        }`}
        aria-label="Hỗ trợ khách hàng"
      >
        <Headphones className="w-7 h-7" />
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
        )}
      </button>

      {/* CSS Animation */}
      <style>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default CustomerSupport;
