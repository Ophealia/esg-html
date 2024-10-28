import React from 'react';
import { ArrowRight, Leaf, Users, Scale } from 'lucide-react';
import { Link } from 'react-router-dom';

// Home Page Component
function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <BenefitsSection />
    </div>
  );
}

// Hero Section
const HeroSection = () => (
  <div
    className="relative h-[600px] bg-cover bg-center"
    style={{
      backgroundImage:
        'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")'
    }}
  >
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center text-white px-4">
        <h1 className="text-8xl font-bold mb-6">ESG Analytics Platform</h1>
        <p className="text-2xl text-center mb-8 max-w-2xl">
          Empowering sustainable business decisions through comprehensive Environmental, Social, and Governance analysis
        </p>
        <Link
          to="/evaluate"
          className="inline-flex items-center bg-green-600 text-white text-2xl px-10 py-6 rounded-lg hover:bg-custom-green transition-colors duration-200"
        >
          Start Analysis
          <ArrowRight className="ml-2" size={30} />
        </Link>
      </div>
    </div>
  </div>
);

// Features Section
const FeaturesSection = () => (
  <div className="py-20 bg-custom-gray-600">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-custom-green text-6xl font-bold text-center mb-16">ESG Components</h2>
      <div className="grid md:grid-cols-3 gap-12">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </div>
  </div>
);

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="bg-custom-dark-blue text-center hover:shadow-lg transition-shadow duration-300 p-4 rounded-2xl">
    <div className="flex justify-center mb-4">{icon}</div>
    <h3 className="text-custom-green text-3xl font-semibold mb-3">{title}</h3>
    <p className="text-white">{description}</p>
  </div>
);

const features = [
  {
    icon: <Leaf className="h-16 w-16 text-custom-green" />,
    title: "Environmental",
    description: "Evaluate environmental impact, resource usage, and sustainability initiatives through comprehensive metrics and analysis."
  },
  {
    icon: <Users className="h-16 w-16 text-custom-green" />,
    title: "Social",
    description: "Assess social responsibility, community engagement, labor practices, and human rights considerations."
  },
  {
    icon: <Scale className="h-16 w-16 text-custom-green" />,
    title: "Governance",
    description: "Analyze corporate governance structures, ethics policies, and regulatory compliance frameworks."
  }
];

// Benefits Section
const BenefitsSection = () => (
  <div className="py-20 bg-custom-black">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-custom-green text-6xl font-bold text-center mb-16">Why Choose Our Platform</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {benefits.map((benefit, index) => (
          <BenefitCard key={index} {...benefit} />
        ))}
      </div>
    </div>
  </div>
);

const BenefitCard = ({ title, description }: { title: string, description: string }) => (
  <div className="bg-custom-dark-blue  p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200">
    <h3 className="text-custom-green text-3xl font-semibold mb-3">{title}</h3>
    <p className="text-white">{description}</p>
  </div>
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
