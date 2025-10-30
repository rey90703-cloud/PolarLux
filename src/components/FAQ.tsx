import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Tủ lạnh Samsung Inverter khác gì so với tủ lạnh thông thường?",
      answer: "Máy nén Digital Inverter tự động điều chỉnh tốc độ làm lạnh, giúp vận hành êm ái, tiết kiệm điện năng và tăng tuổi thọ so với máy nén bật/tắt truyền thống."
    },
    {
      question: "Tủ lạnh Samsung có thể điều khiển bằng điện thoại không?",
      answer: "Một số dòng cao cấp được trang bị kết nối Wi-Fi và ứng dụng SmartThings, cho phép người dùng kiểm soát nhiệt độ, bật chế độ làm lạnh nhanh và nhận thông báo tiện lợi qua smartphone."
    },
    {
      question: "Chính sách bảo hành của tủ lạnh Samsung như thế nào?",
      answer: "Tủ lạnh Samsung được bảo hành 24 tháng toàn bộ sản phẩm, và 10 năm cho máy nén Digital Inverter (áp dụng cho linh kiện máy nén)."
    },
    {
      question: "Tủ lạnh Samsung tiêu thụ bao nhiêu điện năng?",
      answer: "Mức điện năng phụ thuộc dung tích và model. Thông số chuẩn được ghi trên nhãn năng lượng (kWh/năm) của từng sản phẩm, từ đó có thể ước tính chi phí điện trung bình hàng tháng."
    },
    {
      question: "Nên chọn dung tích tủ lạnh Samsung bao nhiêu lít cho phù hợp?",
      answer: `• Gia đình 1–2 người: 150–250L
• Gia đình 3–4 người: 300–400L
• Gia đình đông người hoặc có nhu cầu trữ nhiều: từ 400L trở lên (dòng 4 cánh, dung tích lớn).`
    },
    {
      question: "Tủ lạnh Samsung có những công nghệ nổi bật nào?",
      answer: "Các dòng tủ lạnh được trang bị công nghệ All-Around Cooling (làm lạnh đa chiều), Digital Inverter tiết kiệm điện, kháng khuẩn khử mùi, ngăn rau củ giữ ẩm tối ưu, và kết nối thông minh SmartThings trên một số mẫu."
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Câu hỏi <span className="text-primary">thường gặp</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Giải đáp những thắc mắc phổ biến về tủ lạnh Samsung
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-card rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-start justify-between text-left gap-4 hover:bg-muted/50 transition-colors"
              >
                <span className="font-semibold text-lg flex-1">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`transition-all duration-300 overflow-hidden ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-5 text-muted-foreground whitespace-pre-line">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
