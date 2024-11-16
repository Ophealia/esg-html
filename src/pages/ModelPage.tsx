import { Scale, BarChart3, CheckCircle2, GraduationCap } from 'lucide-react';
import { useEffect, useState } from 'react';
import modelcase from '../components/modelcase.jpg'


const dimensions = [
  {
    title: "Environmental",
    weight: 25, // Dimension total weight
    color: "from-green-400 to-green-600", // Gradient color
    metrics: [
      { name: "GHG Emissions", weight: 40 },
      { name: "Energy Usage", weight: 30 },
      { name: "Water Management", weight: 20 },
      { name: "Waste Control", weight: 10 },
    ],
  },
  {
    title: "Social",
    weight: 30,
    color: "from-blue-400 to-blue-600",
    metrics: [
      { name: "Diversity", weight: 40 },
      { name: "Employment", weight: 30 },
      { name: "Health & Safety", weight: 20 },
      { name: "Training", weight: 10 },
    ],
  },
  {
    title: "Governance",
    weight: 35,
    color: "from-purple-400 to-purple-600",
    metrics: [
      { name: "Board Composition", weight: 30 },
      { name: "Management Diversity", weight: 30 },
      { name: "Ethics", weight: 10 },
      { name: "Transparency", weight: 10 },
      { name: "Certifications", weight: 10 },
      { name: "Assurance", weight: 10 },
    ],
  },
];

function ESGScoringPage() {
  const [dimensionProgress, setDimensionProgress] = useState(
    dimensions.map(() => 0)
  );
  const [metricProgress, setMetricProgress] = useState(
    dimensions.map((dimension) =>
      dimension.metrics.map(() => 0)
    )
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setDimensionProgress((prev) =>
        prev.map((p, index) =>
          p < dimensions[index].weight
            ? Math.min(p + 0.2, dimensions[index].weight)
            : p
        )
      );

      setMetricProgress((prev) =>
        prev.map((dimMetrics, dimIndex) =>
          dimMetrics.map((metricProgress, metricIndex) =>
            metricProgress < dimensions[dimIndex].metrics[metricIndex].weight
              ? Math.min(metricProgress + 0.5, dimensions[dimIndex].metrics[metricIndex].weight)
              : metricProgress
          )
        )
      );
    }, 10);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-10 px-6">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-green-700/20 opacity-50" />
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gre to-green-200">
              ESG Scoring Guidelines
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              A comprehensive framework for evaluating Environmental, Social, and Governance performance
              through advanced metrics and industry-specific benchmarks.
            </p>
          </div>
        </div>
      </section>

      {/* Key Metrics Grid */}
      <section className="max-w-screen-xl mx-auto px-6 py-16 mt-0">
        <div className="grid grid-cols-4 gap-4">
          {[ 
            { icon: <Scale className="w-10 h-10" />, title: "Balanced Scoring", value: "3-Tier System" },
            { icon: <BarChart3 className="w-10 h-10" />, title: "Matrix", value: "50+" },
            { icon: <CheckCircle2 className="w-10 h-10" />, title: "Accuracy Rate", value: "90%" },
            { icon: <GraduationCap className="w-10 h-10" />, title: "Industry Coverage", value: "Finance" }
          ].map((item, index) => (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-green-200 transition-all duration-300"
            >
              <div className="text-gre mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-gray-100">{item.title}</h3>
              <p className="text-3xl font-bold text-green-500 mt-2">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Progress Section */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {dimensions.map((dimension, dimIndex) => (
          <div key={dimIndex} className="bg-gray-800 p-6 rounded-xl border border-gray-700 transform transition-all hover:scale-105 hover:shadow-lg hover:border-green-200">
            <h2 className="text-3xl font-semibold text-gre mb-4">{dimension.title}</h2>

            {/* Total Progress Bar */}
            <div className="mb-6">
              <div className='grid grid-cols-4 gap-4'>
                <div className="col-span-3 font-medium text-gray-300 mb-1">Total Weight: </div>
                <div className="text-right text-3xl font-semibold text-custom-green">{dimension.weight}%</div>
              </div>
              <div className="relative pt-1">
                <div
                  className="progress-bar h-4 bg-gradient-to-r from-gre to-green-600 rounded-md transition-all duration-500 ease-in-out"
                  style={{
                    width: `${dimensionProgress[dimIndex]}%`,
                    transformOrigin: 'left',
                  }}
                />
              </div>
            </div>

            {/* Metrics Progress Bars */}
            <div>
              {dimension.metrics.map((metric, metricIndex) => (
                <div key={metricIndex} className="flex justify-between items-center mb-4">
                  <div className="text-base text-gray-300">{metric.name}</div>
                  <div className="w-1/2">
                    <div className="relative pt-1">
                      <div
                        className="progress-bar h-2 bg-gradient-to-r from-gray-800 to-green-400 rounded-full transition-all duration-500 ease-in-out"
                        style={{
                          width: `${metricProgress[dimIndex][metricIndex]}%`, // Metric-specific progress
                          background: `linear-gradient(to right, ${dimension.color})`,
                        }}
                      />
                    </div>
                  </div>
                  <div className="text-base font-semibold text-gray-200">{metricProgress[dimIndex][metricIndex]}%</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Coverage Score */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold mb-8 text-center text-gre">Coverage Score</h2>
        <div className="bg-gray-800/50 p-6 rounded-md shadow-md">
          <p className="text-gray-400">
            Coverage score reflects the proportion of reported metrics, influencing up to 10% of the final ESG score.
          </p>
          <div className="mt-4 flex justify-center items-center space-x-4">
            <div className="bg-gre w-1/2 h-4 rounded-md"></div>
            <div className="bg-gray-600 w-1/2 h-4 rounded-md"></div>
          </div>
          <p className="text-center text-gray-400 mt-2">Reported (80%) vs. Unreported (20%)</p>
        </div>
      </section>

      {/* Rating Scale */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-gre to-gre">
          ESG Rating Scale
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          {[ 
            { grade: 'AAA', score: '8.6-10.0', color: 'bg-gre' },
            { grade: 'AA', score: '7.1-8.5', color: 'bg-green-500' },
            { grade: 'A', score: '5.7-7.0', color: 'bg-yellow-400' },
            { grade: 'BBB', score: '4.3-5.6', color: 'bg-yellow-500' },
            { grade: 'BB', score: '2.9-4.2', color: 'bg-orange-500' },
            { grade: 'B', score: '1.4-2.8', color: 'bg-red-500' },
            { grade: 'CCC', score: '0.0-1.3', color: 'bg-red-700' }
          ].map((rating, index) => (
            <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 text-center">
              <div className={`w-12 h-12 ${rating.color} rounded-full mx-auto mb-3 shadow-lg shadow-${rating.color}/50`} />
              <h3 className="text-2xl font-bold mb-1">{rating.grade}</h3>
              <p className="text-sm text-gray-400">{rating.score}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Scoring Methodology */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold mb-8 text-center text-gre">Scoring Methodology</h2>        
        <p className="text-white text-center mb-8">
          Each indicator is scored based on its z-score relative to the industry average, with adjustments for positive or negative directionality
        </p>
        <div className="space-y-6">
          <div className="p-6 bg-gray-800/50 rounded-lg shadow-lg">
          <li className="flex text-2xl items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gre" />
                Z-Score
              </li>
            <p className="text-gray-400">The z-score is then converted into a scale of 1 to 10.</p>
          </div>
          <div className="p-6 bg-gray-800/50 rounded-lg shadow-lg">
          <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4  text-gre" />
                Positive Indicators
              </li>
            <p className="text-gray-400">Indicators where a higher value than the industry average is desirable, such as Diversity and Employment.</p>
          </div>
          <div className="p-6 bg-gray-800/50 rounded-lg shadow-lg">
          <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4  text-gre" />
                Negative Indicators
              </li>
            <p className="text-gray-400">Metrics like GHG and Waste where lower values are preferred. Lower z-scores correspond to higher final scores.</p>
          </div>
          <div className="p-6 bg-gray-800/50 rounded-lg shadow-lg">
          <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4  text-gre" />
                Handling Missing Data
              </li>
            <p className="text-gray-400">Missing metrics are filled using the industry average, and a coverage score ensures companies aren't penalized twice.</p>
          </div>
          <div className="p-6 bg-gray-800/50 rounded-lg shadow-lg">
          <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4  text-gre" />
                Industry Benchmark
              </li>
            <p className="text-gray-400">When official ESG benchmarks aren't available, the industry average is used as an implicit benchmark for fairness.</p>
          </div>
        </div>
      </section>

      {/* Individual Sections for Key Points */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold mb-8 text-center text-gre">Key Methodological Points</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 bg-gray-800/50 rounded-lg shadow-lg">
            <h3 className="text-3xl font-bold mb-4">Coverage Score</h3>
            <p className="text-gray-400">
              The coverage scores rewards companies based on the proportion of reported metrics, contributing 10% to the final ESG score. This score encourages companies to disclose more comprehensive ESG data, as higher transparency leads to a more favorable coverage score.
            </p>
          </div>
          <div className="p-6 bg-gray-800/50 rounded-lg shadow-lg">
            <h3 className="text-3xl font-bold mb-4">Handling Missing Data</h3>
            <p className="text-gray-400">
              a. If a metric is missing, the industry average is used as a substitute to avoid penalizing companies for non-reporting. Since the total score includes a coverage score that reflects the proportion of reported metrics, this substitution ensures that companies are not penalized twice for missing data.<br />
              b. If an industry standard deviation is zero, a neutral score of 5 is applied.<br />
              c. Dimension scores are normalized based on reported weights, ensuring fair comparison even when some metrics are missing.
            </p>
          </div>
          <div className="p-6 bg-gray-800/50 rounded-lg shadow-lg">
            <h3 className="text-3xl font-bold mb-4">Industry Benchmark</h3>
            <p className="text-gray-400">
              In the absence of explicit ESG benchmarks, our scoring system treats the industry average as an implicit benchmark. This means that a company’s ESG performance is evaluated relative to the average level within its industry. This approach ensures the scoring system is reliable even without official benchmarks, while also capturing trends and performance levels across the industry.
            </p>
          </div>
        </div>
      </section>

      {/* Example Calculation with Placeholder for Images */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold mb-8 text-center text-gre">Example Calculation</h2>
        <div className="p-6 bg-gray-800/50 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold mb-4 text-center">Case Study: Company A</h3>
          <p className="text-gray-400 mb-4">The following is a step-by-step calculation of the ESG score for a hypothetical company, including a visual guide for each step:</p>
          {/* Placeholder for images */}
          <div className="flex justify-center items-center bg-gray-700 h-72 rounded-md mb-4">
            <img src={modelcase} alt="Example Calculation Process" className="object-cover w-full h-full rounded-md" />
          </div>
          <div className="p-8 bg-gray-800/50 rounded-lg shadow-lg">
            <p className="text-gray-400 text-2xl font-semibold mb-4"><strong>Detailed Calculation:</strong></p>
            <ul className="list-disc pl-8 text-gray-400 mb-6 space-y-4">
              <li className="text-lg"><strong>1. Environmental (ENV) Dimension:</strong></li>
              <ul className="list-inside pl-6 space-y-2">
                <li>GHG: (3000 - 2500) / 500 = 1.0 → Score: 3 (negative metric)</li>
                <li>Energy: Missing, industry average used → Score: 5</li>
                <li>Water: (800 - 1000) / 200 = -1.0 → Score: 9 (negative metric)</li>
                <li>Waste: (150 - 200) / 50 = -1.0 → Score: 9 (negative metric)</li>
              </ul>
              <p className="text-gray-400 text-lg">
                <strong>Environmental Score</strong>: (3 * 0.4 + 5 * 0.3 + 9 * 0.2 + 9 * 0.1) = 5.3
              </p>

              <li className="text-lg"><strong>2. Social (SOC) Dimension:</strong></li>
              <ul className="list-inside pl-6 space-y-2">
                <li>Diversity: (30 - 25) / 5 = 1.0 → Score: 9</li>
                <li>Employment: (40 - 45) / 10 = -0.5 → Score: 5</li>
                <li>HealthSafety: Missing, industry average used → Score: 5</li>
                <li>Training: (12 - 10) / 2 = 1.0 → Score: 9</li>
              </ul>
              <p className="text-gray-400 text-lg">
                <strong>Social Score</strong>: (9 * 0.4 + 5 * 0.3 + 5 * 0.2 + 9 * 0.1) = 6.7
              </p>

              <li className="text-lg"><strong>3. Governance (GOV) Dimension:</strong></li>
              <ul className="list-inside pl-6 space-y-2">
                <li>Board Composition: (8 - 7) / 1 = 1.0 → Score: 9</li>
                <li>Assurance: “Internal” → Score: 5</li>
              </ul>
              <p className="text-gray-400 text-lg">
                <strong>Governance Score</strong>: (9 * 0.3 + 5 * 0.1) = 2.7
              </p>

              <li className="text-lg"><strong>4. Coverage Score:</strong> 8 out of 10 metrics reported → Coverage = 8/10 = 0.8 → Score: 8.0</li>
              <li className="text-lg"><strong>5. Total ESG Score:</strong> (5.3 * 0.25) + (6.7 * 0.3) + (2.7 * 0.35) + (8.0 * 0.1) = 1.325 + 2.01 + 0.945 + 0.8 = 5.08</li>

              <li className="text-lg"><strong>6. Normalization and Rating:</strong></li>
              <ul className="list-inside pl-6 space-y-2">
                <li>Normalized Score: Rescale total score to 0-10 range using MinMaxScaler.</li>
                <li>Letter Rating: Based on the normalized score, assign a letter grade “BBB” if the normalized score is between 4.286 and 5.714.</li>
              </ul>
            </ul>
          </div>
        </div>
      </section>

      {/* Summary Section */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center text-gre">Conclusion</h2>
        <p className="text-white text-center">
          This comprehensive ESG scoring system ensures fair comparison across industries, incentivizes transparency, and maintains consistent benchmarks. By understanding the methodology, stakeholders can make informed decisions that support sustainable and ethical business practices.
        </p>
      </section>



    </div>
  );
}

export default ESGScoringPage;
