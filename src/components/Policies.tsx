import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Shield, Truck, Wrench, RefreshCw, Gift } from "lucide-react";
import policiesIllustration from "@/assets/policies-illustration.png";

interface PolicySection {
  icon: string;
  title: string;
  sections: Array<{
    title: string;
    content?: string;
    items?: string[];
  }>;
  note?: string;
}

const Policies = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [activePolicy, setActivePolicy] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const policyIcons = [Shield, Truck, Wrench, RefreshCw, Gift];
  const policyKeys = ['warranty', 'shipping', 'installation', 'return', 'promotion'];

  const policies: PolicySection[] = policyKeys.map((key, index) => {
    const policy = t(`policies.${key}`, { returnObjects: true }) as any;
    const sections = [];

    if (policy.scope) {
      sections.push({
        title: policy.scope.title,
        content: policy.scope.content
      });
    }

    if (policy.duration) {
      sections.push({
        title: policy.duration.title,
        content: policy.duration.content,
        items: policy.duration.items
      });
    }

    if (policy.coverage) {
      sections.push({
        title: policy.coverage.title,
        items: policy.coverage.items
      });
    }

    if (policy.fee) {
      sections.push({
        title: policy.fee.title,
        items: policy.fee.items
      });
    }

    if (policy.commitment) {
      sections.push({
        title: policy.commitment.title,
        items: policy.commitment.items
      });
    }

    if (policy.service) {
      sections.push({
        title: policy.service.title,
        content: policy.service.content
      });
    }

    if (policy.details) {
      sections.push({
        title: policy.details.title,
        items: policy.details.items
      });
    }

    if (policy.highlights) {
      sections.push({
        title: policy.highlights.title,
        items: policy.highlights.items
      });
    }

    if (policy.loyalty) {
      sections.push({
        title: policy.loyalty.title,
        items: policy.loyalty.items
      });
    }

    return {
      icon: policy.icon,
      title: policy.title,
      sections,
      note: policy.note
    };
  });

  return (
    <section
      id="policies"
      ref={sectionRef}
      className="py-16 lg:py-24 relative overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={policiesIllustration}
          alt="Policies illustration"
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/95 via-white/95 to-gray-50/95" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Title */}
        <div
          className={`text-center mb-12 lg:mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">
            {t("policies.title")}{" "}
            <span className="text-primary">{t("policies.titleHighlight")}</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("policies.description")}
          </p>
        </div>

        {/* Policy Tabs */}
        <div
          className={`mb-8 lg:mb-12 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex flex-wrap justify-center gap-3 lg:gap-4">
            {policies.map((policy, index) => {
              const Icon = policyIcons[index];
              return (
                <button
                  key={index}
                  onClick={() => setActivePolicy(index)}
                  className={`
                    flex items-center gap-2 px-4 lg:px-6 py-3 rounded-xl font-medium transition-all duration-300
                    ${
                      activePolicy === index
                        ? "bg-primary text-white shadow-lg scale-105"
                        : "bg-white text-gray-700 hover:bg-gray-100 shadow-md"
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="hidden sm:inline text-sm lg:text-base">
                    {policy.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Policy Content */}
        <div
          className={`max-w-5xl mx-auto transition-all duration-1000 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {policies.map((policy, index) => (
            <div
              key={index}
              className={`
                transition-all duration-500
                ${activePolicy === index ? "block" : "hidden"}
              `}
            >
              <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-10">
                {/* Policy Header */}
                <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-200">
                  <div className="text-5xl">{policy.icon}</div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">
                    {policy.title}
                  </h3>
                </div>

                {/* Policy Sections */}
                <div className="space-y-6">
                  {policy.sections.map((section, sIdx) => (
                    <div key={sIdx} className="space-y-3">
                      <h4 className="text-lg lg:text-xl font-semibold text-gray-800">
                        {section.title}
                      </h4>
                      
                      {section.content && (
                        <p className="text-base text-gray-700 leading-relaxed">
                          {section.content}
                        </p>
                      )}

                      {section.items && section.items.length > 0 && (
                        <ul className="space-y-2.5">
                          {section.items.map((item, iIdx) => (
                            <li
                              key={iIdx}
                              className="flex items-start gap-3 text-base text-gray-700 leading-relaxed"
                            >
                              <span className="text-primary font-bold text-lg mt-0.5 flex-shrink-0">
                                ✓
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}

                  {/* Note */}
                  {policy.note && (
                    <div className="mt-8 p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg">
                      <p className="text-sm text-gray-700 leading-relaxed">
                        <span className="font-semibold text-amber-800">Lưu ý: </span>
                        {policy.note}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Policies;
