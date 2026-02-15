import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Clock, Truck, CreditCard, Shield, Calendar, Phone } from 'lucide-react';

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
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Primera pregunta abierta por defecto

  const faqs: FAQItem[] = [
    {
      id: 1,
      question: '¿Cuánto tiempo antes debo reservar?',
      answer: 'Recomendamos reservar con al menos 2 semanas de anticipación, especialmente para fines de semana y temporada alta (primavera-verano). Sin embargo, hacemos nuestro mejor esfuerzo para acomodar reservas de último minuto según disponibilidad. ¡Llámanos y lo verificamos!',
      icon: Calendar,
      color: 'from-orange-500 to-amber-600'
    },
    {
      id: 2,
      question: '¿La entrega e instalación están incluidas?',
      answer: '¡Sí! La entrega, instalación profesional y recogida están 100% incluidas en el precio de alquiler sin costo adicional. Nuestro equipo se encarga de todo: llevar el equipo, instalarlo de manera segura, explicarte cómo funciona, y recogerlo al finalizar. Tú solo disfruta la fiesta.',
      icon: Truck,
      color: 'from-yellow-500 to-orange-600'
    },
    {
      id: 3,
      question: '¿Qué pasa si llueve el día de mi evento?',
      answer: 'Entendemos que el clima es impredecible. Si hay mal clima, puedes reprogramar tu evento sin cargos adicionales hasta 24 horas antes. Si el mal clima ocurre el día del evento, trabajaremos contigo para encontrar una solución: reprogramar o un crédito para uso futuro.',
      icon: Shield,
      color: 'from-amber-500 to-yellow-600'
    },
    {
      id: 4,
      question: '¿Cuáles son las formas de pago aceptadas?',
      answer: 'Aceptamos múltiples formas de pago para tu comodidad: tarjetas de crédito/débito (Visa, Mastercard, American Express), efectivo, Zelle, Venmo, PayPal y transferencias bancarias. Requiere un depósito del 50% para confirmar la reserva, el resto se paga el día del evento.',
      icon: CreditCard,
      color: 'from-orange-600 to-amber-500'
    },
    {
      id: 5,
      question: '¿Los productos son seguros para niños?',
      answer: 'Absolutamente. La seguridad es nuestra prioridad #1. Todos nuestros productos están certificados, pasan inspecciones rigurosas semanalmente, y cumplen con todos los estándares de seguridad. Están hechos con materiales de alta calidad, no tóxicos, y diseñados específicamente para uso infantil. Además, proporcionamos supervisión e instrucciones de seguridad.',
      icon: Shield,
      color: 'from-amber-600 to-orange-500'
    },
    {
      id: 6,
      question: '¿Cuánto tiempo puedo tener el alquiler?',
      answer: 'Nuestro alquiler estándar es de 4-6 horas, perfecto para la mayoría de fiestas. Si necesitas más tiempo, ofrecemos paquetes extendidos de día completo (8 horas) o incluso fin de semana completo. Los precios varían según la duración - contáctanos para un presupuesto personalizado.',
      icon: Clock,
      color: 'from-yellow-600 to-amber-500'
    },
    {
      id: 7,
      question: '¿Qué incluye el servicio de limpieza?',
      answer: 'Cada producto pasa por un proceso de limpieza y desinfección profesional de 3 pasos entre cada evento: limpieza profunda con productos certificados, desinfección completa de todas las superficies, e inspección final de calidad. Puedes estar 100% seguro de que todo llega impecable a tu fiesta.',
      icon: Shield,
      color: 'from-orange-500 to-yellow-500'
    },
    {
      id: 8,
      question: '¿Puedo cancelar o cambiar mi reserva?',
      answer: 'Sí, entendemos que los planes pueden cambiar. Puedes cancelar o modificar tu reserva sin penalización hasta 7 días antes del evento y recibirás un reembolso completo del depósito. Para cancelaciones con menos de 7 días, el depósito se convierte en crédito para uso futuro (válido por 1 año).',
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
            Preguntas Frecuentes
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            <span className="text-gray-800">¿Tienes Dudas?</span>
            <br />
            <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
              ¡Te Ayudamos!
            </span>
          </h2>

          <p className="text-xl text-gray-600">
            Aquí están las respuestas a las preguntas más comunes de nuestros clientes
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
              ¿Aún Tienes Preguntas?
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Estamos aquí para ayudarte. Contáctanos y te responderemos en menos de 1 hora.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+1234567890"
                className="group px-8 py-4 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 text-white font-black text-lg rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 inline-flex items-center justify-center gap-3"
              >
                <Phone className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                Llámanos: (123) 456-7890
              </a>
              <a
                href="#contacto"
                className="px-8 py-4 bg-white border-4 border-orange-400 text-orange-600 font-black text-lg rounded-full hover:bg-orange-50 transition-all duration-300 inline-flex items-center justify-center gap-3"
              >
                Enviar Mensaje
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