import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Clock, Truck, CreditCard, Shield, Calendar, Phone } from 'lucide-react';
import { useSiteSettings } from '../../../hooks/useSiteSettings';

// ============================================
// ❓ SECCIÓN: PREGUNTAS FRECUENTES
// ============================================

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  icon: React.ElementType;
  color: string;
}

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { phone } = useSiteSettings(); // First question open by default

  const faqs: FAQItem[] = [
    {
      id: 1,
      question: 'How far in advance should I book?',
      answer: 'We recommend booking at least 2 weeks in advance, especially for weekends and high season (spring-summer). However, we do our best to accommodate last-minute bookings depending on availability. Call us and we will check it for you!',
      icon: Calendar,
      color: 'from-orange-500 to-amber-600'
    },
    {
      id: 2,
      question: 'Are delivery and setup included?',
      answer: 'Yes! Delivery, professional setup and pickup are 100% included in the rental price at no extra cost. Our team takes care of everything: bringing the equipment, installing it safely, explaining how it works, and picking it up at the end. You just enjoy the party.',
      icon: Truck,
      color: 'from-yellow-500 to-orange-600'
    },
    {
      id: 3,
      question: 'What happens if it rains on the day of my event?',
      answer: 'We understand that weather is unpredictable. If the weather is bad, you can reschedule your event with no extra fees up to 24 hours before. If bad weather happens on the day of the event, we will work with you to find a solution: rescheduling or a credit for future use.',
      icon: Shield,
      color: 'from-amber-500 to-yellow-600'
    },
    {
      id: 4,
      question: 'What payment methods do you accept?',
      answer: 'We accept multiple payment methods for your convenience: credit/debit cards (Visa, Mastercard, American Express), cash, Zelle, Venmo, PayPal and bank transfers. A 50% deposit is required to confirm the booking; the remaining balance is paid on the event day.',
      icon: CreditCard,
      color: 'from-orange-600 to-amber-500'
    },
    {
      id: 5,
      question: 'Are the products safe for children?',
      answer: 'Absolutely. Safety is our #1 priority. All our products are certified, go through rigorous weekly inspections, and meet all safety standards. They are made with high‑quality, non‑toxic materials and designed specifically for children. We also provide supervision guidelines and safety instructions.',
      icon: Shield,
      color: 'from-amber-600 to-orange-500'
    },
    {
      id: 6,
      question: 'How long can I keep the rental?',
      answer: 'Our standard rental is 4–6 hours, perfect for most parties. If you need more time, we offer extended packages for a full day (8 hours) or even a full weekend. Prices vary depending on duration – contact us for a custom quote.',
      icon: Clock,
      color: 'from-yellow-600 to-amber-500'
    },
    {
      id: 7,
      question: 'What does the cleaning service include?',
      answer: 'Each product goes through a professional 3‑step cleaning and sanitizing process between events: deep cleaning with certified products, full disinfection of all surfaces, and a final quality inspection. You can be 100% sure everything arrives spotless to your party.',
      icon: Shield,
      color: 'from-orange-500 to-yellow-500'
    },
    {
      id: 8,
      question: 'Can I cancel or change my booking?',
      answer: 'Yes, we understand plans can change. You can cancel or modify your booking without any penalty up to 7 days before the event and you will receive a full refund of your deposit. For cancellations within 7 days, the deposit becomes a credit for future use (valid for 1 year).',
      icon: HelpCircle,
      color: 'from-amber-500 to-orange-600'
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-20 lg:py-24 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle, #f97316 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}></div>
      </div>

      {/* Floating emojis */}
      <div className="absolute top-20 left-10 text-6xl animate-bounce opacity-20" style={{ animationDuration: '3s' }}>❓</div>
      <div className="absolute bottom-20 right-10 text-6xl animate-bounce opacity-20" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}>💡</div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 text-white rounded-full font-black shadow-lg border-4 border-white/50 mb-6 animate-bounce-slow">
            <HelpCircle className="w-6 h-6" />
            Frequently Asked Questions
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            <span className="text-gray-800">Have questions?</span>
            <br />
              <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
              We can help!
            </span>
          </h2>

          <p className="text-xl text-gray-600">
            Here are answers to the most common questions from our customers.
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              className={`group relative bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 ${
                openIndex === index ? 'border-orange-400 shadow-2xl' : 'border-orange-200'
              }`}
              style={{ 
                animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both` 
              }}
            >
              {/* Question Button */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left p-6 lg:p-8 flex items-start gap-4 lg:gap-6 hover:bg-gradient-to-r hover:from-orange-50 hover:to-yellow-50 rounded-3xl transition-all duration-300"
              >
                {/* Icon */}
                <div className={`flex-shrink-0 w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br ${faq.color} rounded-2xl flex items-center justify-center shadow-lg ${
                  openIndex === index ? 'scale-110 rotate-6' : ''
                } transition-all duration-300`}>
                  <faq.icon className="w-7 h-7 lg:w-8 lg:h-8 text-white" />
                </div>

                {/* Question Text */}
                <div className="flex-1">
                  <h3 className={`text-lg lg:text-xl font-black ${
                    openIndex === index ? 'text-orange-600' : 'text-gray-800'
                  } transition-colors duration-300`}>
                    {faq.question}
                  </h3>
                </div>

                {/* Chevron */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  openIndex === index 
                    ? 'bg-gradient-to-br from-orange-500 to-amber-500' 
                    : 'bg-gray-100'
                } transition-all duration-300`}>
                  <ChevronDown 
                    className={`w-6 h-6 ${
                      openIndex === index ? 'text-white rotate-180' : 'text-gray-600'
                    } transition-transform duration-300`}
                  />
                </div>
              </button>

              {/* Answer */}
              <div
                className={`overflow-hidden transition-all duration-500 ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 lg:px-8 pb-6 lg:pb-8 pl-20 lg:pl-24">
                  <div className={`p-6 bg-gradient-to-br ${
                    index % 2 === 0 
                      ? 'from-orange-50 to-yellow-50' 
                      : 'from-amber-50 to-orange-50'
                  } rounded-2xl border-l-4 ${
                    openIndex === index ? 'border-orange-500' : 'border-transparent'
                  } transition-all duration-300`}>
                    <p className="text-gray-700 leading-relaxed text-base lg:text-lg">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative line */}
              <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${faq.color} rounded-full transition-all duration-500 ${
                openIndex === index ? 'w-full' : 'w-0'
              }`}></div>
            </div>
          ))}
        </div>

        {/* Still have questions CTA */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-white rounded-3xl p-8 lg:p-10 shadow-2xl border-4 border-orange-300 max-w-2xl">
            <div className="text-5xl mb-4">🤔</div>
            <h3 className="text-2xl lg:text-3xl font-black text-gray-800 mb-4">
              Still have questions?
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              We are here to help. Contact us and we&apos;ll get back to you in less than 1 hour.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:${phone}`}
                className="group px-8 py-4 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 text-white font-black text-lg rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 inline-flex items-center justify-center gap-3"
              >
                <Phone className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                Call us: {phone}
              </a>
              <a
                href="#contact"
                className="px-8 py-4 bg-white border-4 border-orange-400 text-orange-600 font-black text-lg rounded-full hover:bg-orange-50 transition-all duration-300 inline-flex items-center justify-center gap-3"
              >
                Send message
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default FAQSection;