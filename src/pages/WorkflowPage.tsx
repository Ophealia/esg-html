import React, { useState } from 'react';
import { FileText, ChevronDown, ChevronRight, ExternalLink, Code, BookOpen, ArrowDown } from 'lucide-react';
import { Github} from 'lucide-react';


interface SectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function Section({ title, icon, children, defaultOpen = true }: SectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="mb-8 bg-gray-800/50 rounded-xl overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between bg-gray-800 hover:bg-gray-700 transition-colors duration-300"
      >
        <div className="flex items-center gap-3">
          {icon}
          <h2 className="text-2xl font-bold text-[#7FF000]">{title}</h2>
        </div>
        {isOpen ? (
          <ChevronDown className="w-6 h-6 text-[#7FF000] transition-transform duration-300" />
        ) : (
          <ChevronRight className="w-6 h-6 text-[#7FF000] transition-transform duration-300" />
        )}
      </button>
      <div 
        className={`transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div className="group bg-gray-700/50 p-6 rounded-xl hover:bg-gray-700 transition-all duration-300 hover:shadow-[0_0_30px_rgba(127,240,0,0.15)] cursor-pointer">
      <div className="text-[#7FF000] mb-4 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-[#7FF000] mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
}

function DocumentViewer() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex space-x-4 mb-8 overflow-x-auto pb-2">
        {['overview'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 whitespace-nowrap ${
              activeTab === tab
                ? 'bg-[#7FF000] text-gray-900'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        <Section 
          title="Backend Overview" 
          icon={<BookOpen className="w-6 h-6 text-[#7FF000]" />}
          defaultOpen={activeTab === 'overview'}
        >
          <div className="grid gap-6">
            <FeatureCard
              description="Our AI-powered backend leverages cutting-edge technology for deep ESG data extraction and analysis, integrating BERT for seamless NLP processing. It offers comprehensive ESG scoring tailored for the financial sector, with dual verification through human-AI collaboration to ensure higher data accuracy." title={''} icon={undefined}            />
          </div>
        </Section>

        <Section 
          title="Technical Details" 
          icon={<Code className="w-6 h-6 text-[#7FF000]" />}
          defaultOpen={activeTab === 'technical'}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              title="AI-Powered Backend"
              description="Cutting-edge AI drives deep ESG data extraction and analysis."
              icon={<ExternalLink className="w-8 h-8" />}
            />
            <FeatureCard
              title="BERT Integration"
              description="Simplifying NLP for seamless processing."
              icon={<Code className="w-8 h-8" />}
            />
            <FeatureCard
              title="Comprehensive Scoring"
              description="Expert ESG assessment tailored for the financial sector."
              icon={<FileText className="w-8 h-8" />}
            />
            <FeatureCard
              title="Dual Verification"
              description="Human-AI collaboration for higher data accuracy."
              icon={<FileText className="w-8 h-8" />}
            />
          </div>

        </Section>

        <Section 
          title="Workflow" 
          icon={<BookOpen className="w-6 h-6 text-[#7FF000]" />}
          defaultOpen={activeTab === 'overview'}
        >
          <div className="grid gap-6">
            <FeatureCard
              title="Batch Download"
              description="This module acts as a personal assistant for fetching ESG reports, automating the search and download process from Google using keywords, and logging each step for tracking. It minimizes manual effort while efficiently downloading and saving reports, all while avoiding detection as a bot."
              icon={<ExternalLink className="w-6 h-6" />}
            />
            <FeatureCard
              title="PDF Parse"
              description="The PDF Parsing Wizardry module uses Google's Gemini-Flash model to seamlessly convert PDFs into Markdown, capturing tables and charts with RapidLayout. It features multithreading for speed, comprehensive logging, and is highly configurable for automated, efficient processing."
              icon={<ExternalLink className="w-6 h-6" />}
            />
            <FeatureCard
              title="Data Clean"
              description="This module refines Markdown content with precision, transforming tables into readable text, unifying units, and tidying text for clarity. It automates the cleanup process with flexible configurations, ensuring your data is both organized and joyful."
              icon={<ExternalLink className="w-6 h-6" />}
            />
            <FeatureCard
              title="Data Retrieve"
              description="This module leverages LLM capabilities to extract answers from ESG reports, handling up to one million tokens. It efficiently processes texts over 700,000 words, using multi-token polling and producing structured JSON outputs. With comprehensive logging, it automates the retrieval process, making it ideal for lengthy documents like 200-page PDFs."
              icon={<ExternalLink className="w-6 h-6" />}
            />
            <FeatureCard
              title="Text annotates"
              description="This module utilizes Gemini-Flash for precise text annotation, converting words into structured JSON format using the BIO scheme. It offers automated, multithreaded annotation with comprehensive logging for efficient processing"
              icon={<ExternalLink className="w-6 h-6" />}
            />
            <FeatureCard
              title="Green Wash"
              description="This module uses Gemini-Flash to detect greenwashing in ESG reports, ensuring integrity. It features customizable assessment rules, allowing you to adjust prompts for tailored detection. With automated vigilance, it leverages AI to identify and guard against greenwashing effectively."
              icon={<ExternalLink className="w-6 h-6" />}
            />
            <FeatureCard
              title="Real-time Information"
              description="This module acts as a digital news hound, searching for real-time ESG information using AI and Google. It fetches the latest news, providing comprehensive summaries that include both positive and negative reviews for a balanced perspective. With automated news gathering, it ensures you stay updated with current ESG insights."
              icon={<ExternalLink className="w-6 h-6" />}
            />
          </div>
        </Section>

      </div>
    </div>
  );
}

interface ContentBlockProps {
  title: string;
  content: React.ReactNode;
}

function ContentBlock({ title, content }: ContentBlockProps) {
  return (
    <div className="bg-gray-800 rounded-xl p-6 hover:shadow-[0_0_30px_rgba(127,240,0,0.2)] transition-all duration-300">
      <h3 className="text-xl font-semibold text-[#7FF000] mb-3">{title}</h3>
      <p className="text-gray-300">{content}</p>
    </div>
  );
}

function WorkflowPage() {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <><><div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/*Hero*/}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#7FF000]/10 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(127,240,0,0.1)_0%,transparent_50%)]" />
        </div>

        <div className="container mx-auto px-4 text-center relative">
          <div className="flex flex-col items-center justify-center space-y-8">
            <div className="relative">
              <div className="absolute inset-0 animate-glow rounded-full"></div>
              <FileText className="w-20 h-20 text-[#7FF000] animate-float relative" />
            </div>

            <h1 className="text-5xl md:text-7xl font-bold">
              <span className="text-gradient">Workflow</span> Explorer
            </h1>

            <p className="text-xl text-gray-400 max-w-2xl">
            Wonderful back-end development and our efforts
            </p>

            <button
              onClick={scrollToContent}
              className="group bg-[#7FF000] text-gray-900 font-semibold py-3 px-8 rounded-lg inline-flex items-center space-x-2 hover:bg-[#6DD000] transition-all duration-300 animate-pulse-green"
            >
              <span>Explore</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>



        <DocumentViewer />


    {/* Footer */}
    </div><footer className="bg-gray-800/50 mt-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-400">
              <FileText className="w-5 h-5" />
              <span>Document Explorer</span>
            </div>

            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#7FF000] transition-colors duration-300">
                <Github className="w-5 h-5" />
              </a>
              <span className="text-gray-400">Built with React + Tailwind</span>
            </div>
          </div>
        </div>
      </footer></><div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ContentBlock
          title="Wiki Link"
          content={
            <a href="https://nusu.sharepoint.com/:fl:/g/contentstorage/CSP_db84c795-5f91-4546-9adf-51163293c392/ESipuRpZ8gRCoPaUxVug664BLiVDx8kMs0ZQawHOUiC_hg?e=Dv5qHY&nav=cz0lMkZjb250ZW50c3RvcmFnZSUyRkNTUF9kYjg0Yzc5NS01ZjkxLTQ1NDYtOWFkZi01MTE2MzI5M2MzOTImZD1iJTIxbGNlRTI1RmZSa1dhMzFFV01wUERrdHdXXzRsT1pldE50blNodGUwMERZTVVydFg4SEFZRVFhUnQyUTBXRFVVZCZmPTAxS1FWWEQyUklWRzRSVVdQU0FSQktCNVVVWVZOMkIyNU8mYz0lMkYmYT1Mb29wQXBwJnA9JTQwZmx1aWR4JTJGbG9vcC1wYWdlLWNvbnRhaW5lciZ4PSU3QiUyMnclMjIlM0ElMjJUMFJUVUh4dWRYTjFMbk5vWVhKbGNHOXBiblF1WTI5dGZHSWhiR05sUlRJMVJtWlNhMWRoTXpGRlYwMXdVRVJyZEhkWFh6UnNUMXBsZEU1MGJsTm9kR1V3TUVSWlRWVnlkRmc0U0VGWlJWRmhVblF5VVRCWFJGVlZaSHd3TVV0UlZsaEVNbEpPTkRSRlNUUmFNMDFTVGtneU0xWXpVRVpaUzBsSFYwSlMlMjIlMkMlMjJpJTIyJTNBJTIyNGUzOTVlOGYtZjhjMS00YjQzLTg0NjMtY2M0NWExNDc5MjRhJTIyJTdE" target="_blank" rel="noopener noreferrer">
              Systerm knowledge document
            </a>
          }
        />
        <ContentBlock
          title="Git-hub"
          content={
            <div>
              <a 
                href="https://github.com/Ophealia/esg-html" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ marginRight: '50px' }}
              >
                Frontend
              </a>

              <a 
                href="https://github.com/nusduck/esg_data_aepa_project" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Backend
              </a>
            </div>
          }
        />
      </div>

      </div></>

  );
}
export default WorkflowPage;
