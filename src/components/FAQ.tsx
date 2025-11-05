import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

const FAQ = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: t('faq.questions.q1.question'),
      answer: t('faq.questions.q1.answer')
    },
    {
      question: t('faq.questions.q2.question'),
      answer: t('faq.questions.q2.answer')
    },
    {
      question: t('faq.questions.q3.question'),
      answer: t('faq.questions.q3.answer')
    },
    {
      question: t('faq.questions.q4.question'),
      answer: t('faq.questions.q4.answer')
    },
    {
      question: t('faq.questions.q5.question'),
      answer: t('faq.questions.q5.answer')
    },
    {
      question: t('faq.questions.q6.question'),
      answer: t('faq.questions.q6.answer')
    },
    {
      question: t('faq.questions.q7.question'),
      answer: t('faq.questions.q7.answer')
    },
    {
      question: t('faq.questions.q8.question'),
      answer: t('faq.questions.q8.answer')
    },
    {
      question: t('faq.questions.q9.question'),
      answer: t('faq.questions.q9.answer')
    },
    {
      question: t('faq.questions.q10.question'),
      answer: t('faq.questions.q10.answer')
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t('faq.title')} <span className="text-primary">{t('faq.titleHighlight')}</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            {t('faq.description')}
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
