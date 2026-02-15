import { 
  Heart, 
  Star, 
  Shield, 
  Award,
  Users,
  Sparkles,
  TrendingUp,
  Target,
  Lightbulb,
  Smile,
  ThumbsUp,
  CheckCircle,
  Calendar,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
} from 'lucide-react';

// ============================================
// 🎯 SECCIÓN 1: HERO - SOBRE NOSOTROS
// ============================================
const AboutHeroSection: React.FC = () => {
  return (
    <section className="relative pt-32 lg:pt-40 pb-20 lg:pb-24 bg-gradient-to-b from-orange-50 via-amber-50 to-yellow-50 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle, #f97316 2px, transparent 2px)`,
          backgroundSize: '50px 50px',
        }}></div>
      </div>

      {/* Floating emojis */}
      <div className="absolute top-20 left-10 text-6xl animate-bounce opacity-20" style={{ animationDuration: '3s' }}>🎈</div>
      <div className="absolute top-40 right-20 text-6xl animate-bounce opacity-20" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}>⭐</div>
      <div className="absolute bottom-20 left-1/4 text-6xl animate-bounce opacity-20" style={{ animationDuration: '2.8s', animationDelay: '0.3s' }}>🎉</div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left - Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 text-white rounded-full font-black shadow-lg border-4 border-white/50">
              <Heart className="w-5 h-5 fill-white" />
              Sobre Nosotros
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
              <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
                Creando Sonrisas
              </span>
              <br />
              <span className="text-gray-800">Desde 2012 🎊</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
              Somos más que un servicio de alquiler. Somos <span className="font-bold text-orange-600">creadores de momentos mágicos</span> que transforman celebraciones ordinarias en experiencias inolvidables para toda la familia.
            </p>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              {[
                { number: '12+', label: 'Años' },
                { number: '5K+', label: 'Fiestas' },
                { number: '4.9', label: 'Rating' },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-4 bg-white rounded-2xl shadow-lg border-2 border-orange-200"
                >
                  <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-sm font-bold text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Image */}
          <div className="relative">
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-amber-400 to-yellow-400 p-3 rounded-[3rem]">
                <div className="w-full h-full bg-white rounded-[2.7rem] overflow-hidden">
                  {/* 
                    ============================================
                    📸 IMAGEN DEL EQUIPO / EMPRESA
                    ============================================
                    <img src="/images/equipo-sunny-party.jpg" />
                  */}
                  <div className="aspect-[4/3] bg-gradient-to-br from-orange-200 to-yellow-200 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="text-9xl">👨‍👩‍👧‍👦</div>
                      <div className="text-2xl font-bold text-gray-700">Imagen del Equipo</div>
                      <div className="text-gray-500">Foto grupal del equipo Sunny Party</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Badge */}
              <div className="absolute top-6 right-6 bg-green-500 text-white font-black px-6 py-3 rounded-full shadow-2xl animate-bounce border-4 border-white">
                ¡Familia! 💚
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// 📖 SECCIÓN 2: NUESTRA HISTORIA
// ============================================
const OurStorySection: React.FC = () => {
  return (
    <section className="relative py-20 lg:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-full border-2 border-orange-200 mb-6">
              <Sparkles className="w-5 h-5 text-orange-500" />
              <span className="font-bold text-orange-700">Nuestra Historia</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
              <span className="text-gray-800">Cómo Empezó</span>
              <br />
              <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
                Nuestro Sueño
              </span>
            </h2>
          </div>

          {/* Timeline */}
          <div className="space-y-12">
            {[
              {
                year: '2012',
                title: 'Los Inicios 🌱',
                description: 'Todo comenzó con un sueño: hacer que cada fiesta infantil fuera especial. Con solo 3 trampolines y mucha pasión, iniciamos Sunny Party Rentals en un pequeño garaje.',
                color: 'from-green-400 to-emerald-500'
              },
              {
                year: '2015',
                title: 'Crecimiento 📈',
                description: 'Nuestra dedicación dio frutos. Expandimos nuestro inventario a más de 20 productos diferentes y abrimos nuestra primera bodega oficial. ¡Las familias confiaban en nosotros!',
                color: 'from-blue-400 to-cyan-500'
              },
              {
                year: '2018',
                title: 'Reconocimiento ⭐',
                description: 'Ganamos el premio "Mejor Servicio de Fiestas Infantiles" de nuestra ciudad. Alcanzamos las 2,000 fiestas realizadas con un rating de 4.8/5.',
                color: 'from-purple-400 to-pink-500'
              },
              {
                year: '2024',
                title: 'Líder del Mercado 🏆',
                description: 'Hoy somos la empresa #1 en alquiler de artículos para fiestas. Con más de 50 productos, un equipo de 15 personas, y más de 5,000 familias felices.',
                color: 'from-orange-400 to-amber-500'
              },
            ].map((milestone, index) => (
              <div
                key={index}
                className="relative pl-12 md:pl-20"
                style={{ animation: `fadeInLeft 0.6s ease-out ${index * 0.2}s both` }}
              >
                {/* Timeline line */}
                <div className="absolute left-6 md:left-10 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-200 to-yellow-200"></div>
                
                {/* Year badge */}
                <div className={`absolute left-0 md:left-4 top-0 w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br ${milestone.color} rounded-full flex items-center justify-center text-white font-black text-lg md:text-xl shadow-lg border-4 border-white`}>
                  {milestone.year.slice(2)}
                </div>

                {/* Content */}
                <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-3xl p-6 md:p-8 shadow-lg border-2 border-orange-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <h3 className="text-2xl md:text-3xl font-black text-gray-800 mb-3">
                    {milestone.title}
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// 🎯 SECCIÓN 3: MISIÓN Y VISIÓN
// ============================================
const MissionVisionSection: React.FC = () => {
  return (
    <section className="relative py-20 lg:py-24 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Misión */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-amber-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <div className="relative bg-white rounded-3xl p-8 lg:p-12 shadow-2xl border-4 border-orange-200 hover:border-orange-400 transition-all duration-300 hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Target className="w-10 h-10 text-white" />
              </div>
              
              <h3 className="text-3xl lg:text-4xl font-black text-gray-800 mb-6">
                Nuestra <span className="text-orange-600">Misión</span>
              </h3>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Transformar cada celebración en una experiencia mágica e inolvidable, proporcionando productos de la más alta calidad con un servicio excepcional que supere las expectativas de nuestras familias.
              </p>

              <div className="mt-8 space-y-3">
                {['Calidad Premium', 'Servicio Excepcional', 'Precios Justos'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <span className="font-bold text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Visión */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <div className="relative bg-white rounded-3xl p-8 lg:p-12 shadow-2xl border-4 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Lightbulb className="w-10 h-10 text-white" />
              </div>
              
              <h3 className="text-3xl lg:text-4xl font-black text-gray-800 mb-6">
                Nuestra <span className="text-blue-600">Visión</span>
              </h3>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Ser la empresa líder y más confiable en alquiler de artículos para fiestas en todo Estados Unidos, reconocida por crear momentos de alegría que las familias atesoren por siempre.
              </p>

              <div className="mt-8 space-y-3">
                {['Expansión Nacional', 'Innovación Constante', 'Liderazgo del Mercado'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Star className="w-6 h-6 text-yellow-500 fill-yellow-500 flex-shrink-0" />
                    <span className="font-bold text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// 👥 SECCIÓN 4: NUESTRO EQUIPO
// ============================================
const TeamSection: React.FC = () => {
  const team = [
    {
      name: 'Carlos Rodríguez',
      role: 'Fundador & CEO',
      image: '👨‍💼',
      description: 'Visionario detrás de Sunny Party con 12+ años de experiencia',
      color: 'from-orange-400 to-amber-500'
    },
    {
      name: 'María González',
      role: 'Directora de Operaciones',
      image: '👩‍💼',
      description: 'Experta en logística y satisfacción del cliente',
      color: 'from-pink-400 to-rose-500'
    },
    {
      name: 'Luis Martínez',
      role: 'Jefe de Instalaciones',
      image: '👨‍🔧',
      description: 'Garantiza que cada evento sea perfecto y seguro',
      color: 'from-blue-400 to-cyan-500'
    },
    {
      name: 'Ana Sánchez',
      role: 'Gerente de Atención al Cliente',
      image: '👩',
      description: 'Siempre lista para hacer tu fiesta inolvidable',
      color: 'from-purple-400 to-pink-500'
    },
  ];

  return (
    <section className="relative py-20 lg:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-full border-2 border-orange-200 mb-6">
            <Users className="w-5 h-5 text-orange-500" />
            <span className="font-bold text-orange-700">Nuestro Equipo</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
            <span className="text-gray-800">Conoce a Las Personas</span>
            <br />
            <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
              Que Hacen La Magia
            </span>
          </h2>

          <p className="text-xl text-gray-600">
            Un equipo apasionado dedicado a crear momentos inolvidables
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="group relative"
              style={{ animation: `popIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${index * 0.1}s both` }}
            >
              <div className="relative bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-orange-200 hover:border-orange-400 hover:-translate-y-2">
                {/* Image/Avatar */}
                <div className={`w-24 h-24 mx-auto mb-6 bg-gradient-to-br ${member.color} rounded-full flex items-center justify-center text-5xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {member.image}
                </div>

                {/* Content */}
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-black text-gray-800">{member.name}</h3>
                  <div className={`inline-block px-4 py-1 bg-gradient-to-r ${member.color} text-white text-sm font-bold rounded-full`}>
                    {member.role}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed pt-2">
                    {member.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// 💎 SECCIÓN 5: NUESTROS VALORES
// ============================================
const ValuesSection: React.FC = () => {
  const values = [
    {
      icon: Shield,
      title: 'Seguridad Primero',
      description: 'Todos nuestros productos están certificados y pasan rigurosas inspecciones de seguridad',
      color: 'from-blue-400 to-cyan-500'
    },
    {
      icon: Award,
      title: 'Calidad Premium',
      description: 'Invertimos en los mejores productos del mercado para garantizar experiencias excepcionales',
      color: 'from-purple-400 to-pink-500'
    },
    {
      icon: Smile,
      title: 'Diversión Garantizada',
      description: 'Nuestra pasión es ver sonrisas. Cada detalle está pensado para crear momentos de alegría',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      icon: Heart,
      title: 'Compromiso Total',
      description: 'Tratamos cada evento como si fuera nuestra propia celebración familiar',
      color: 'from-red-400 to-pink-500'
    },
    {
      icon: ThumbsUp,
      title: 'Transparencia',
      description: 'Precios claros, sin sorpresas. Lo que ves es lo que pagas',
      color: 'from-green-400 to-emerald-500'
    },
    {
      icon: TrendingUp,
      title: 'Mejora Continua',
      description: 'Siempre buscamos innovar y mejorar nuestros servicios para ti',
      color: 'from-indigo-400 to-purple-500'
    },
  ];

  return (
    <section className="relative py-20 lg:py-24 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30L0 30z' fill='%23f97316' /%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
              Nuestros Valores
            </span>
            <br />
            <span className="text-gray-800">Que Nos Definen</span>
          </h2>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-orange-200 hover:border-orange-400 hover:-translate-y-2"
              style={{ animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both` }}
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                <value.icon className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-2xl font-black text-gray-800 mb-3">{value.title}</h3>
              <p className="text-gray-600 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// 📊 SECCIÓN 6: LOGROS Y CIFRAS
// ============================================
const AchievementsSection: React.FC = () => {
  const achievements = [
    { icon: '🎉', number: '5,000+', label: 'Fiestas Realizadas', color: 'from-orange-500 to-amber-600' },
    { icon: '⭐', number: '4.9/5', label: 'Calificación Promedio', color: 'from-yellow-500 to-orange-500' },
    { icon: '👨‍👩‍👧‍👦', number: '15+', label: 'Miembros del Equipo', color: 'from-blue-500 to-cyan-600' },
    { icon: '🏆', number: '8', label: 'Premios Ganados', color: 'from-purple-500 to-pink-600' },
    { icon: '🎪', number: '50+', label: 'Productos Disponibles', color: 'from-green-500 to-emerald-600' },
    { icon: '🚚', number: '100%', label: 'Entregas a Tiempo', color: 'from-red-500 to-orange-600' },
  ];

  return (
    <section className="relative py-20 lg:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
            <span className="text-gray-800">Nuestros Logros</span>
            <br />
            <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
              En Números
            </span>
          </h2>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-orange-50 to-yellow-50 rounded-3xl p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-orange-200 hover:border-orange-400 hover:-translate-y-2 overflow-hidden"
              style={{ animation: `popIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${index * 0.1}s both` }}
            >
              {/* Background decoration */}
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${achievement.color} opacity-10 rounded-bl-full`}></div>

              <div className="relative space-y-3 text-center">
                <div className="text-6xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
                  {achievement.icon}
                </div>
                <div className={`text-4xl lg:text-5xl font-black bg-gradient-to-r ${achievement.color} bg-clip-text text-transparent`}>
                  {achievement.number}
                </div>
                <div className="text-sm lg:text-base font-bold text-gray-600">
                  {achievement.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// 🖼️ SECCIÓN 7: GALERÍA DE MOMENTOS
// ============================================
const GallerySection: React.FC = () => {
  const images = [
    { id: 1, emoji: '🎂', label: 'Cumpleaños Mágico' },
    { id: 2, emoji: '🏰', label: 'Castillo Inflable' },
    { id: 3, emoji: '🎪', label: 'Trampolín Gigante' },
    { id: 4, emoji: '🎨', label: 'Decoración Premium' },
    { id: 5, emoji: '🎉', label: 'Fiesta Familiar' },
    { id: 6, emoji: '👨‍👩‍👧', label: 'Familias Felices' },
  ];

  return (
    <section className="relative py-20 lg:py-24 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Momentos Inolvidables
            </span>
            <br />
            <span className="text-gray-800">Que Hemos Creado</span>
          </h2>

          <p className="text-xl text-gray-600">
            Cada imagen cuenta una historia de alegría y diversión
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div
              key={image.id}
              className="group relative aspect-square rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
              style={{ animation: `fadeIn 0.6s ease-out ${index * 0.1}s both` }}
            >
              {/* 
                ============================================
                📸 IMÁGENES DE LA GALERÍA
                ============================================
                <img src={`/images/galeria-${image.id}.jpg`} />
              */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="text-7xl group-hover:scale-125 transition-transform duration-300">
                    {image.emoji}
                  </div>
                  <div className="text-lg font-bold text-gray-700">{image.label}</div>
                </div>
              </div>

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                <span className="text-white font-bold text-lg">{image.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// 📞 SECCIÓN 8: CTA FINAL
// ============================================
const FinalCTASection: React.FC = () => {
  return (
    <section className="relative py-20 lg:py-24 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 text-6xl animate-bounce opacity-30">🎈</div>
      <div className="absolute bottom-10 right-10 text-6xl animate-bounce opacity-30" style={{ animationDelay: '0.5s' }}>🎉</div>
      <div className="absolute top-1/2 left-1/4 text-6xl animate-bounce opacity-30" style={{ animationDelay: '1s' }}>⭐</div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
            ¿Listo Para Crear <br />
            Momentos Mágicos? ✨
          </h2>

          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
            Únete a las miles de familias que han confiado en nosotros para hacer sus celebraciones inolvidables
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <button className="group px-10 py-5 bg-white text-orange-600 font-black text-lg rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 inline-flex items-center justify-center gap-3">
              <Calendar className="w-6 h-6" />
              Reserva Tu Fiesta
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </button>

            <button className="px-10 py-5 bg-transparent border-4 border-white text-white font-black text-lg rounded-full hover:bg-white hover:text-orange-600 transition-all duration-300 inline-flex items-center justify-center gap-3">
              <Phone className="w-6 h-6" />
              Llámanos Ahora
            </button>
          </div>

          {/* Contact info */}
          <div className="flex flex-wrap justify-center gap-6 pt-8 text-white">
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              <span className="font-bold">(123) 456-7890</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              <span className="font-bold">info@sunnyparty.com</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span className="font-bold">Todo Estados Unidos</span>
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
const AboutUs: React.FC = () => {
  return (
    <main className="relative">
      <AboutHeroSection />
      <OurStorySection />
      <MissionVisionSection />
      <TeamSection />
      <ValuesSection />
      <AchievementsSection />
      <GallerySection />
      <FinalCTASection />

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

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

        @keyframes popIn {
          0% {
            opacity: 0;
            transform: scale(0.5) translateY(50px);
          }
          70% {
            transform: scale(1.05) translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </main>
  );
};

export default AboutUs;