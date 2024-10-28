import React from 'react';
import { Brain, Database, BarChart2, TrendingUp } from 'lucide-react';

function ModelPage() {
  return (
    <div className="min-h-screen bg-costum-black py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl text-custom-green font-bold mb-4">Our ESG Analysis Model</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Leveraging advanced machine learning and natural language processing to deliver comprehensive ESG insights
          </p>
        </div>

        {/* Model Overview */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="bg-gray-700 rounded-lg shadow-md p-8">
            <h2 className="text-3xl text-custom-green font-bold mb-10">Model Architecture</h2>
            <div className="text-gray-300 text-xl space-y-10">
              <ArchitectureComponent
                icon={<Brain className="h-10 w-10 text-purple-600" />}
                title="Natural Language Processing"
                description="Advanced NLP algorithms analyze textual data from reports and documents to extract relevant ESG information."
              />
              <ArchitectureComponent
                icon={<Database className="h-10 w-10 text-blue-600" />}
                title="Data Processing"
                description="Multi-layered data processing pipeline ensures accurate and consistent analysis across different document types."
              />
              <ArchitectureComponent
                icon={<BarChart2 className="h-10 w-10 text-green-600" />}
                title="Scoring System"
                description="Proprietary scoring algorithm evaluates companies across 50+ ESG metrics aligned with global standards."
              />
              <ArchitectureComponent
                icon={<TrendingUp className="h-10 w-10 text-red-600" />}
                title="Trend Analysis"
                description="Time-series analysis identifies patterns and trends in ESG performance over time."
              />
            </div>
          </div>

          <div className="bg-gray-700 rounded-lg shadow-md p-8">
            <h2 className="text-3xl text-custom-green font-bold mb-8">Key Features</h2>
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                  <h3 className="text-xl text-gray-300 font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Methodology Section */}
        <div className="bg-gray-700 rounded-lg shadow-md p-8 mb-20">
          <h2 className="text-3xl text-custom-green font-bold mb-8">Our Methodology</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {methodology.map((item, index) => (
              <div key={index} className="relative flex-1 flex flex-col">
                <div className="bg-gray-400 rounded-xl p-8 flex flex-col flex-1">
                  <div className="absolute -top-4 left-6 bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-700">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const ArchitectureComponent = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="flex items-start space-x-4">
    <div className="flex-shrink-0">{icon}</div>
    <div>
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-gray-400 text-base">{description}</p>
    </div>
  </div>
);

const features = [
  {
    title: "Real-time Processing",
    description: "Instant analysis of uploaded documents with continuous updates as new data becomes available."
  },
  {
    title: "Multi-framework Support",
    description: "Compatible with major ESG frameworks including GRI, SASB, and TCFD."
  },
  {
    title: "Customizable Metrics",
    description: "Flexible scoring system that can be adapted to specific industry requirements and company priorities."
  },
  {
    title: "Automated Reporting",
    description: "Generate comprehensive reports with detailed breakdowns of ESG performance and recommendations."
  }
];

const methodology = [
  {
    title: "Data Collection",
    description: "Comprehensive gathering of ESG-related information from multiple sources including company reports, news, and regulatory filings."
  },
  {
    title: "Analysis & Processing",
    description: "Advanced algorithms process and analyze data using machine learning and natural language processing techniques."
  },
  {
    title: "Scoring & Reporting",
    description: "Generation of detailed scores and insights across environmental, social, and governance dimensions."
  }
];

export default ModelPage;