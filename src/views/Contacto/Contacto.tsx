import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  Send,
  CheckCircle,
  MessageCircle,
  Facebook,
  Instagram,
  Calendar,
  Sparkles,
  ArrowRight,
  User,
  MessageSquare,
  Building
} from 'lucide-react';

// ============================================
// 🎯 SECCIÓN 1: HERO - CONTACTO
// ============================================
const ContactHeroSection: React.FC = () => {
  return (
    <section className="relative pt-32 lg:pt-40 pb-16 bg-gradient-to-b from-orange-50 via-amber-50 to-yellow-50 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle, #f97316 2px, transparent 2px)`,
          backgroundSize: '50px 50px',
        }}></div>
      </div>

      {/* Floating emojis */}
      <div className="absolute top-20 left-10 text-6xl animate-bounce opacity-20" style={{ animationDuration: '3s' }}>📞</div>
      <div className="absolute bottom-20 right-10 text-6xl animate-bounce opacity-20" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}>💬</div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 text-white rounded-full font-black shadow-lg border-4 border-white/50">
            <MessageCircle className="w-6 h-6" />
            Contáctanos
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
            <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
              Hablemos de
            </span>
            <br />
            <span className="text-gray-800">Tu Próxima Fiesta 🎉</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Estamos aquí para ayudarte a crear la celebración perfecta. <br />
            <span className="font-bold text-orange-600">¡Respuesta garantizada en menos de 1 hora!</span>
          </p>

          {/* Quick contact buttons */}
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <a
              href="tel:+1234567890"
              className="group px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 inline-flex items-center gap-3"
            >
              <Phone className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              (123) 456-7890
            </a>
            <a
              href="mailto:info@sunnyparty.com"
              className="group px-8 py-4 bg-white border-4 border-orange-400 text-orange-600 font-black rounded-full hover:bg-orange-50 transition-all duration-300 inline-flex items-center gap-3"
            >
              <Mail className="w-6 h-6" />
              Email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// 📝 SECCIÓN 2: FORMULARIO DE CONTACTO
// ============================================
const ContactFormSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    eventType: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="relative py-20 lg:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Left - Form */}
          <div className="relative">
            <div className="sticky top-32">
              <h2 className="text-4xl lg:text-5xl font-black mb-6">
                <span className="text-gray-800">Envíanos un</span>
                <br />
                <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
                  Mensaje
                </span>
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Completa el formulario y nos pondremos en contacto contigo lo antes posible.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div className="group">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Nombre Completo *
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-orange-400 focus:ring-4 focus:ring-orange-100 outline-none transition-all duration-300 font-semibold"
                      placeholder="Juan Pérez"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="group">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-orange-400 focus:ring-4 focus:ring-orange-100 outline-none transition-all duration-300 font-semibold"
                      placeholder="juan@ejemplo.com"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="group">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Teléfono *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-orange-400 focus:ring-4 focus:ring-orange-100 outline-none transition-all duration-300 font-semibold"
                      placeholder="(123) 456-7890"
                    />
                  </div>
                </div>

                {/* Event Date */}
                <div className="group">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Fecha del Evento
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                    <input
                      type="date"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-orange-400 focus:ring-4 focus:ring-orange-100 outline-none transition-all duration-300 font-semibold"
                    />
                  </div>
                </div>

                {/* Event Type */}
                <div className="group">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Tipo de Evento
                  </label>
                  <div className="relative">
                    <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                    <select
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-orange-400 focus:ring-4 focus:ring-orange-100 outline-none transition-all duration-300 font-semibold appearance-none bg-white"
                    >
                      <option value="">Selecciona un tipo</option>
                      <option value="cumpleaños">Cumpleaños Infantil</option>
                      <option value="bautizo">Bautizo</option>
                      <option value="comunion">Primera Comunión</option>
                      <option value="graduacion">Graduación</option>
                      <option value="corporativo">Evento Corporativo</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="group">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Mensaje *
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-orange-400 focus:ring-4 focus:ring-orange-100 outline-none transition-all duration-300 font-semibold resize-none"
                      placeholder="Cuéntanos sobre tu evento y qué necesitas..."
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="group w-full py-5 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 text-white font-black text-lg rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3"
                >
                  {submitted ? (
                    <>
                      <CheckCircle className="w-6 h-6" />
                      ¡Mensaje Enviado!
                    </>
                  ) : (
                    <>
                      <Send className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                      Enviar Mensaje
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

                {submitted && (
                  <div className="p-4 bg-green-50 border-2 border-green-300 rounded-2xl">
                    <p className="text-green-700 font-bold text-center">
                      ✅ ¡Gracias! Te responderemos en menos de 1 hora.
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Right - Contact Info */}
          <div className="space-y-6">
            <h2 className="text-4xl lg:text-5xl font-black mb-8">
              <span className="text-gray-800">Información de</span>
              <br />
              <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
                Contacto
              </span>
            </h2>

            {/* Contact Cards */}
            <div className="space-y-4">
              {/* Phone */}
              <a
                href="tel:+1234567890"
                className="group block bg-gradient-to-br from-orange-50 to-yellow-50 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-orange-200 hover:border-orange-400 hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <Phone className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-black text-gray-800 mb-1">Teléfono</h3>
                    <p className="text-2xl font-black text-orange-600">(123) 456-7890</p>
                    <p className="text-sm text-gray-600 mt-1">Disponible 24/7</p>
                  </div>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:info@sunnyparty.com"
                className="group block bg-gradient-to-br from-orange-50 to-yellow-50 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-orange-200 hover:border-orange-400 hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <Mail className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-black text-gray-800 mb-1">Email</h3>
                    <p className="text-xl font-black text-orange-600">info@sunnyparty.com</p>
                    <p className="text-sm text-gray-600 mt-1">Respuesta en 1 hora</p>
                  </div>
                </div>
              </a>

              {/* Address */}
              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-3xl p-6 shadow-lg border-2 border-orange-200">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <MapPin className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-black text-gray-800 mb-1">Dirección</h3>
                    <p className="text-gray-700 font-semibold">
                      123 Party Street<br />
                      Los Angeles, CA 90001<br />
                      Estados Unidos
                    </p>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-3xl p-6 shadow-lg border-2 border-orange-200">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-orange-600 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Clock className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-black text-gray-800 mb-3">Horarios</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="font-bold text-gray-700">Lunes - Viernes:</span>
                        <span className="text-orange-600 font-black">8:00 AM - 8:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-bold text-gray-700">Sábado:</span>
                        <span className="text-orange-600 font-black">9:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-bold text-gray-700">Domingo:</span>
                        <span className="text-orange-600 font-black">10:00 AM - 4:00 PM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-3xl p-6 shadow-lg border-2 border-orange-200 mt-6">
              <h3 className="text-xl font-black text-gray-800 mb-4">Síguenos</h3>
              <div className="flex gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
                >
                  <Facebook className="w-6 h-6 text-white" fill="white" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
                >
                  <Instagram className="w-6 h-6 text-white" />
                </a>
                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
                >
                  <MessageCircle className="w-6 h-6 text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// 🗺️ SECCIÓN 3: MAPA
// ============================================
const MapSection: React.FC = () => {
  return (
    <section className="relative py-20 lg:py-24 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-black mb-4">
            <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
              Encuéntranos
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            Visítanos en nuestra oficina o te visitamos nosotros
          </p>
        </div>

        <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
          {/* 
            ============================================
            🗺️ GOOGLE MAPS AQUÍ
            ============================================
            <iframe 
              src="https://www.google.com/maps/embed?..."
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          */}
          <div className="aspect-[16/9] bg-gradient-to-br from-blue-200 to-cyan-200 flex items-center justify-center relative">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 30% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
                               radial-gradient(circle at 70% 50%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)`,
            }}></div>
            <div className="text-center space-y-4 relative z-10">
              <MapPin className="w-20 h-20 text-blue-600 mx-auto" />
              <div className="text-2xl font-bold text-gray-700">Google Maps</div>
              <div className="text-gray-500">Integra tu Google Maps API aquí</div>
              <div className="text-sm text-gray-400 max-w-xs mx-auto">
                <code className="bg-white/80 px-3 py-1 rounded">
                  &lt;iframe src="..." /&gt;
                </code>
              </div>
            </div>

            {/* Decorative pin */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full">
              <div className="w-12 h-12 bg-red-500 rounded-full shadow-lg animate-bounce flex items-center justify-center">
                <MapPin className="w-8 h-8 text-white" fill="white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// 📞 SECCIÓN 4: CTA FINAL
// ============================================
const ContactCTASection: React.FC = () => {
  return (
    <section className="relative py-20 lg:py-24 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 text-6xl animate-bounce opacity-30">📞</div>
      <div className="absolute bottom-10 right-10 text-6xl animate-bounce opacity-30" style={{ animationDelay: '0.5s' }}>✉️</div>
      <div className="absolute top-1/2 left-1/3 text-6xl animate-bounce opacity-30" style={{ animationDelay: '1s' }}>🎉</div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="text-7xl mb-6">🚀</div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
            ¿Listo Para Empezar? <br />
            ¡Hablemos Hoy!
          </h2>

          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
            Nuestro equipo está listo para ayudarte a planear la fiesta perfecta.
            <br />
            <span className="font-black">Respuesta garantizada en menos de 1 hora.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <a
              href="tel:+1234567890"
              className="group px-10 py-5 bg-white text-orange-600 font-black text-lg rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 inline-flex items-center justify-center gap-3"
            >
              <Phone className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              Llamar Ahora
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </a>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-8 pt-8 text-white">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-6 h-6" />
              <span className="font-bold">Respuesta Rápida</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-6 h-6" />
              <span className="font-bold">Sin Compromiso</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-6 h-6" />
              <span className="font-bold">Presupuesto Gratis</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// 🎯 COMPONENTE PRINCIPAL
// ============================================
const Contact: React.FC = () => {
  return (
    <main className="relative">
      <ContactHeroSection />
      <ContactFormSection />
      <MapSection />
      <ContactCTASection />
    </main>
  );
};

export default Contact;