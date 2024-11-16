// HomePage.tsx
import React, { useEffect } from 'react';
import { ArrowRight, Leaf, Users, Scale, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useAnimation} from 'framer-motion';
import { useInView } from 'react-intersection-observer';

function HomePage() {
  
  return (
    <div className="min-h-screen relative">
      <HeroSection />
      <FeaturesSection />
      <BenefitsSection />
    </div>
  );
}

const HeroSection = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <div
      ref={ref}
      className="relative h-[600px] bg-cover bg-center flex flex-col items-center justify-center"
      style={{
        backgroundImage:
          'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")',
      }}
    >
      {/* Text content animation */}
      <motion.div
        className="text-center text-white px-4 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 4 }}
        transition={{ duration: 3 }}
      >
        <motion.h1
          className="text-6xl md:text-8xl font-bold mb-6"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          ESG Analytics Platform
        </motion.h1>

        <motion.p
          className="text-lg md:text-2xl text-center mb-8"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          Empowering sustainable business decisions through<br />
          comprehensive Environmental, Social, and Governance analysis
        </motion.p>

        {/* Link animation */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <Link
            to="/evaluate"
            className="inline-flex items-center bg-white font-bold text-custom-black text-2xl px-10 py-6 rounded-xl hover:bg-gre hover:text-black transition-colors duration-200"
            aria-label="Start Analysis"
          >
            Start Analysis
            <ArrowRight className="ml-2" size={30} />
          </Link>
        </motion.div>
      </motion.div>

      {/* Chevron down animation */}
      <motion.div
        className="absolute bottom-10 w-full flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        >
          <ChevronDown className="w-8 h-8 text-[#7FF000]" />
        </motion.div>
      </motion.div>
    </div>
  );
};


const FeaturesSection = () => (
  <div className="py-20 bg-custom-gray-600">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-gre text-6xl font-bold text-center mb-16">ESG Components</h2>
      <div className="grid md:grid-cols-3 gap-12">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </div>
  </div>
);

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <motion.div
    className="bg-custom-dark-blue text-center hover:shadow-2xl transition-shadow duration-300 p-4 rounded-2xl"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      delay: 1.5, // 等待 HeroSection 完成后再开始
      duration: 1, // 增加持续时间让动画更慢
      ease: 'easeOut',
    }}
    whileHover={{ scale: 1.05, boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.3)' }}
  >
    <div className="flex justify-center mb-4">{icon}</div>
    <h3 className="text-gre text-3xl font-semibold mb-3">{title}</h3>
    <p className="text-white">{description}</p>
  </motion.div>
);

const features = [
  { icon: <Leaf className="h-16 w-16 text-gre" />, title: "Environmental", description: "Evaluate environmental impact, resource usage, and sustainability initiatives." },
  { icon: <Users className="h-16 w-16 text-gre" />, title: "Social", description: "Assess social responsibility, community engagement, labor practices, and human rights." },
  { icon: <Scale className="h-16 w-16 text-gre" />, title: "Governance", description: "Analyze corporate governance structures, ethics policies, and compliance frameworks." }
];

const BenefitsSection = () => (
  <div className="py-20 bg-custom-black">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-gre text-6xl font-bold text-center mb-16">Why Choose Our Platform</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {benefits.map((benefit, index) => (
          <BenefitCard key={index} {...benefit} index={index} />
        ))}
      </div>
    </div>
  </div>
);

const BenefitCard = ({ title, description, index }: { title: string, description: string, index: number }) => (
  <motion.div
    className="bg-custom-dark-blue p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      delay: 2.5 + index * 0.2, // Delay each card's animation slightly to create a staggered effect
      duration: 1.2, // Slower animation for smoother appearance
      ease: 'easeOut',
    }}
    whileHover={{ scale: 1.05, boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.3)' }}
  >
    <h3 className="text-gre text-3xl font-semibold mb-3">{title}</h3>
    <p className="text-white">{description}</p>
  </motion.div>
);

const benefits = [
  { title: "Advanced Analytics", description: "Leverage cutting-edge algorithms and machine learning models for precise ESG analysis." },
  { title: "Real-time Insights", description: "Access up-to-date ESG metrics and analytics through our dynamic dashboard." },
  { title: "Comprehensive Reports", description: "Generate detailed reports with actionable insights and recommendations." },
  { title: "Industry Benchmarking", description: "Compare performance against industry standards and competitors." },
  { title: "Data Security", description: "Enterprise-grade security ensuring your sensitive data remains protected." },
  { title: "Expert Support", description: "Access to ESG specialists for guidance and consultation." }
];


export default HomePage;
