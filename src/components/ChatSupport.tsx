import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const ChatSupport = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-primary hover:bg-primary/90 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="Chat hỗ trợ"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 md:w-96 bg-card rounded-lg shadow-2xl overflow-hidden animate-fade-in-up">
          <div className="bg-primary text-white p-4">
            <h3 className="font-bold text-lg">Hỗ trợ trực tuyến</h3>
            <p className="text-sm text-white/80">Chúng tôi luôn sẵn sàng hỗ trợ bạn</p>
          </div>
          
          <div className="p-4 bg-muted/30 min-h-[200px] max-h-[400px] overflow-y-auto space-y-3">
            {/* Bot message */}
            <div className="flex gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm max-w-[80%]">
                <p className="text-sm">Xin chào! Tôi có thể giúp gì cho bạn?</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm max-w-[80%]">
                <p className="text-sm">Vui lòng cho tôi biết nhu cầu của bạn:</p>
                <div className="mt-2 space-y-1">
                  <Button variant="outline" size="sm" className="w-full text-xs justify-start">
                    Tư vấn chọn tủ lạnh
                  </Button>
                  <Button variant="outline" size="sm" className="w-full text-xs justify-start">
                    Hỏi về chính sách bảo hành
                  </Button>
                  <Button variant="outline" size="sm" className="w-full text-xs justify-start">
                    Kiểm tra trạng thái đơn hàng
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 border-t flex gap-2">
            <input
              type="text"
              placeholder="Nhập tin nhắn..."
              className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button size="sm">Gửi</Button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatSupport;
