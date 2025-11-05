import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

interface TimelineEvent {
  year: string;
  events: string[];
}

interface HistoryPeriod {
  id: string;
  period: string;
  title: string;
  description: string;
  timeline: TimelineEvent[];
}

const History = () => {
  const { t } = useTranslation();
  const [activePeriod, setActivePeriod] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);

  const periods: HistoryPeriod[] = t("history.periods", { returnObjects: true }) as HistoryPeriod[];

  useEffect(() => {
    setCurrentSlide(0);
    if (timelineRef.current) {
      timelineRef.current.scrollLeft = 0;
    }
  }, [activePeriod]);

  const handlePrevious = () => {
    if (!timelineRef.current || currentSlide === 0) return;
    const container = timelineRef.current;
    const slideWidth = container.clientWidth;
    container.scrollBy({ left: -slideWidth, behavior: "smooth" });
    setCurrentSlide(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    if (!timelineRef.current) return;
    const container = timelineRef.current;
    const maxSlides = periods[activePeriod].timeline.length - 1;
    if (currentSlide >= maxSlides) return;
    const slideWidth = container.clientWidth;
    container.scrollBy({ left: slideWidth, behavior: "smooth" });
    setCurrentSlide(prev => Math.min(maxSlides, prev + 1));
  };

  if (!periods || periods.length === 0) {
    return null;
  }

  const currentPeriod = periods[activePeriod];
  const totalItems = currentPeriod.timeline.length;

  return (
    <section id="history" className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Title */}
        <h2 className="text-3xl lg:text-5xl font-bold text-center mb-8 lg:mb-12">
          {t("history.title")}
        </h2>

        {/* Period Tabs */}
        <div className="mb-8 lg:mb-12">
          <ul className="flex flex-wrap justify-center gap-2 lg:gap-4" role="tablist">
            {periods.map((period, index) => (
              <li key={period.id} role="presentation">
                <button
                  role="tab"
                  aria-selected={activePeriod === index}
                  onClick={() => setActivePeriod(index)}
                  className={`
                    relative px-4 lg:px-6 py-2 lg:py-3 text-sm lg:text-base font-medium transition-all duration-300
                    ${activePeriod === index 
                      ? 'text-primary' 
                      : 'text-gray-600 hover:text-primary'
                    }
                  `}
                >
                  {period.period}
                  <span 
                    className={`
                      absolute bottom-0 left-0 right-0 h-0.5 bg-primary transition-all duration-300
                      ${activePeriod === index ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}
                    `}
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Content Area */}
        <div className="space-y-6 lg:space-y-8">
          {/* Description */}
          <div className="max-w-5xl mx-auto">
            <h3 className="text-xl lg:text-2xl font-bold mb-4 text-gray-900">
              {currentPeriod.title}
            </h3>
            <div 
              className="text-base lg:text-lg text-gray-600 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: currentPeriod.description }}
            />
          </div>

          
          {/* <div className="relative bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 rounded-xl lg:rounded-2xl p-6 lg:p-8">
            
            <div 
              ref={timelineRef}
              className="overflow-x-auto overflow-y-hidden scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
              style={{ 
                scrollSnapType: 'x mandatory',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              <div className="flex gap-4 lg:gap-6 pb-4">
                {currentPeriod.timeline.map((item, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-[280px] lg:w-[320px] scroll-snap-align-start"
                    style={{ scrollSnapAlign: 'start' }}
                  >
                    
                    <div className="mb-4 pb-3 border-b-2 border-primary">
                      <h6 className="text-2xl lg:text-3xl font-bold text-gray-900">
                        {item.year}
                      </h6>
                    </div>
                    
                   
                    <div className="space-y-3">
                      <ul className="space-y-2.5">
                        {item.events.map((event, eventIndex) => (
                          <li
                            key={eventIndex}
                            className="text-sm lg:text-base text-gray-700 leading-relaxed pl-5 relative
                              before:content-['•'] before:absolute before:left-0 before:top-0.5
                              before:text-primary before:font-bold before:text-lg"
                          >
                            {event}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={handlePrevious}
                disabled={currentSlide === 0}
                className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:shadow-md"
                aria-label="previous"
              >
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div className="text-sm font-medium text-gray-600">
                <span className="text-primary font-bold text-base">{currentSlide + 1}</span>
                <span className="mx-1">/</span>
                <span className="text-gray-500">{totalItems}</span>
              </div>

              <button
                onClick={handleNext}
                disabled={currentSlide >= totalItems - 1}
                className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:shadow-md"
                aria-label="next"
              >
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            
            <div className="absolute left-0 top-0 bottom-16 w-12 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none rounded-l-xl" />
            <div className="absolute right-0 top-0 bottom-16 w-12 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none rounded-r-xl" />
          </div> */}
        </div>
      </div>

      <style>{`
        .scrollbar-thin::-webkit-scrollbar {
          height: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #f3f4f6;
          border-radius: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}</style>
    </section>
  );
};

export default History;
